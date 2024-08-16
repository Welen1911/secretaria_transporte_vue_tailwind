import type { Axios } from "axios";

export default (httpClient: Axios) => ({
    login: async () => {
        await console.log("LOGIN");
    }
});