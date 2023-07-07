import { create } from 'axios'

const REFERER = 'https://kaspi.kz/'

export const axios = create({
  baseURL: 'https://kaspi.kz/yml/',
  headers: {
    Referer: REFERER,
  }
})

export function configureProxy(host: string, port: number) {
  axios.defaults.proxy = {
    protocol: 'http',
    host,
    port,
  }
}
