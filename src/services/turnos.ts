import type { Axios } from "axios";

export default (httpClient: Axios) => ({
    getAll: async () => {
        const response = await httpClient.get('/turn');

        return {
            data: response.data
        }
    },
    getById: async (id: string| string[]) => {
        const response = await httpClient.get(`/turn/${id}`);

        return {
            data: response.data
        }
    },
    create: async (data: Object) => {
        const response = await httpClient.post('/turn', data);

        console.log(response);

        return {
            data: response.data
        }
    },
    updateById: async (id: string, data: Object) => {
        const response = await httpClient.put(`/turn/${id}`, data);

        return {
            data: response.data
        }
    },
    deleteById: async (id: string) => {
        const response = await httpClient.delete(`/turn/${id}`);

        return {
            data: response.data
        }
    }
});
