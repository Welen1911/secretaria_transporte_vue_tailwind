import type { Axios } from 'axios'

export default (httpClient: Axios) => ({
  login: async () => {
    const { data } = await httpClient.post('/user')

    return {
      data: data
    }
  }
})
