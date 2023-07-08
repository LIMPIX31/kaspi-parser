import { axios } from './fetch.js'

export interface GetArticleResponse {
  total: number
  offers: any[] /* Offer type */
}

export interface GetArticleRequest {
  cityId: string
  id: string
  limit: number
  page: number
  installationId: -1
}

export function getArticle(data: GetArticleRequest) {
  return axios.post<GetArticleResponse>(`offer-view/offers/${data.id}`, data)
    .then(({ data }) => data)
}

export interface GetTotalArticlesResponse {
  data: {
    total: number
  }
}

export function getTotalArticles() {
  return axios.get<GetTotalArticlesResponse>('product-view/pl/filters?q=:category:categories&page=0&all=false&fl=true&ui=d&i=-1')
    .then(({ data }) => data.data.total)
}

export interface QueryArticlesResponse {
  data: Array<{id: string}>
}

export function queryArticleIds(page: number) {
  return axios.get<QueryArticlesResponse>(`product-view/pl/results?page=${page}&q=:category:Categories&text=&sort=relevance&qs=&ui=d&i=-1`)
    .then(({ data }) => data?.data?.map(({ id }) => id))
}
