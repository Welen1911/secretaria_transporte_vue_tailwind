import type { Axios } from 'axios'

export default (httpClient: Axios) => ({
  login: async () => {
    const { data } = await httpClient.post('/users');

    return {
      data: data
    }
  },
  getMe: async () => {
    const { data } = await httpClient.get('/me');

    return {
      data: data
    }
  },
  getAll: async () => {
    const { data } = await httpClient.get('/users');

    return {
      data
    }
  }
})
