import type { Axios } from "axios";

export default (httpClient: Axios) => ({
    getAll: async () => {
        const response = await httpClient.get('/company');

        return {
            data: response.data
        }
    },
    create: async (data: Object) => {
        const response = await httpClient.post('/company', data);

        console.log(response);

        return {
            data: response.data
        }
    },
    deleteById: async (id: string) => {
        const response = await httpClient.delete(`/company/${id}`);

        return {
            data: response.data
        }
    }
});
