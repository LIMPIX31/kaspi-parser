import { axios } from './fetch'

export interface Article {
  // Article types....
}

export function getArticle(id: string) {
  return axios.get<Article>(`offer-view/offers/${id}`).then((res) => res.data)
}
