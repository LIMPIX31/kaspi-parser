import { prisma } from './prisma.js'
import { ProxySource } from './proxy.js'
import { configureUserAgent } from './fetch.js'
import { getArticle, queryArticleIds } from './api.js'
import { retry } from './utils.js'
import pAll from 'p-all'
import { writeFile } from 'fs/promises'

const CITY_ID = process.env.CITY_ID ?? '235230100'
const PROXY_MAX_USAGE = Number(process.env.PROXY_MAX_USAGE ?? 30)
const CONCURRENCY = Number(process.env.CONCURRENCY ?? 5)
const PER_PAGE = 12

async function dispose() {
  await prisma.$disconnect()
}

const proxySource = new ProxySource(prisma, PROXY_MAX_USAGE)

async function main() {
  // Получить первые 5000 артикулов
  const totalArticles = 5000

  const pages = Math.ceil(totalArticles / PER_PAGE)
  console.log(`Expected pages: ${pages}`)

  let fetchedPages = 0

  const articleIds = await pAll(
    Array.from({ length: pages }, (_, idx) => idx)
      .map(page => () => retry(async () => {
        // Для теста прокси на самом деле не требуется,
        // достаточно сменить User-Agent
        // proxySource.take()
        configureUserAgent()
        fetchedPages += 1
        const result = await queryArticleIds(page)
        console.log(`Page fetched: ${fetchedPages}`)
        return result
      }, 3)),
    {
      concurrency: CONCURRENCY,
    }
  ).then(ids => ids.flat().filter(Boolean) as string[])

  console.log(`Article ids fetched: ${articleIds.length}`)

  let articlesFetched = 0

  const articles = await pAll(
    articleIds.map(id => async () => {
      configureUserAgent()
      // proxySource.take()
      const initial = await retry(() => getArticle({ id, cityId: CITY_ID, page: 0, limit: 64, installationId: -1 }), 3)
      articlesFetched += 1
      if (!initial) {
        console.log(`Article fetched (failed): ${articlesFetched}`)
        return
      } else {
        console.log(`Article fetched: ${articlesFetched}`)
        return initial
      }
    }),  {
      concurrency: CONCURRENCY
    }).then(pages => pages.filter(Boolean) as any[])

  console.log(`Articles: ${articlesFetched}`)

  // Save articles
  await writeFile('./articles.json', JSON.stringify(articles, null, 2))
}

main().then(dispose)
