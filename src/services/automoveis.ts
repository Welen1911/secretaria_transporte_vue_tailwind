import type { Axios } from 'axios'

export default (httpClient: Axios) => ({
  getAll: async () => {
    const response = await httpClient.get('/automobile')

    return {
      data: response.data
    }
  },
  getById: async (id: string | string[]) => {
    const response = await httpClient.get(`/automobile/${id}`)

    return {
      data: response.data
    }
  },
  getByTurnCapacity: async (turn_id: String, capacity: String) => {
    const response = await httpClient.get(`/automobile/${turn_id}/${capacity}`)

    return {
      data: response.data
    }
  },
  create: async (data: Object) => {
    const response = await httpClient.post('/automobile', data)

    console.log(response)

    return {
      data: response.data
    }
  },
  updateById: async (id: string, data: Object) => {
    const response = await httpClient.put(`/automobile/${id}`, data)

    return {
      data: response.data
    }
  },
  deleteById: async (id: string) => {
    const response = await httpClient.delete(`/automobile/${id}`)

    return {
      data: response.data
    }
  }
})
