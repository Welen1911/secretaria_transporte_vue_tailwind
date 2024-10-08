import type { Axios } from "axios";

export default (httpClient: Axios) => ({
    getAll: async () => {
        const response = await httpClient.get('/travel');

        return {
            data: response.data
        }
    },
    getById: async (id: string| string[]) => {
        const response = await httpClient.get(`/travel/${id}`);

        return {
            data: response.data
        }
    },
    getByAutomobileId: async (id: string| string[]) => {
        const response = await httpClient.get(`/travel/automobile/${id}`);

        return {
            data: response.data
        }
    },
    getByDriverId: async (id: string| string[]) => {
        const response = await httpClient.get(`/travel/driver/${id}`);

        return {
            data: response.data
        }
    },
    create: async (data: Object) => {
        const response = await httpClient.post('/travel', data);

        console.log(response);

        return {
            data: response.data
        }
    },
    updateById: async (id: string, data: Object) => {
        const response = await httpClient.put(`/travel/${id}`, data);

        return {
            data: response.data
        }
    },
    deleteById: async (id: string) => {
        const response = await httpClient.delete(`/travel/${id}`);

        return {
            data: response.data
        }
    }
});
