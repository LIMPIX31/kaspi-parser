import Axios from 'axios'
import * as process from 'process'

const REFERER = 'https://kaspi.kz/'

export const BASE_USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0;'

export function generateUserAgent() {
  return BASE_USER_AGENT + Date.now().toString(10)
}

export const axios = Axios.create({
  ...Axios.defaults,
  baseURL: 'http://kaspi.kz/yml/',
  headers: {
    Referer: REFERER,
    'User-Agent': generateUserAgent(),
    Accept: 'application/json'
  },
  timeout: Number(process.env.TIMEOUT ?? 7) * 1000
})

export function configureUserAgent() {
  (axios.defaults.headers as any)['User-Agent'] = generateUserAgent()
}

export function configureProxy(host: string, port: number) {
  axios.defaults.proxy = {
    host,
    port,
  }
}
