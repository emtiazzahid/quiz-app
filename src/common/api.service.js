import authService from "@/common/auth.service";
import router from '@/router'

import { axiosConnection } from "./connection";

axiosConnection.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axiosConnection.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            authService.destroyToken()
            router.push({ name: "Login" })
        } else {
            return Promise.reject(error);
        }
    }
);


const ApiService = {
    setHeader() {
        axiosConnection.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${authService.getToken()}`;
    },

    query(resource, params) {
        return axiosConnection.get(resource, params).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    get(resource) {
        return axiosConnection.get(resource).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    post(resource, params) {
      return axiosConnection.post(`${resource}`, params);
    },

    update(resource, slug, params) {
        return axiosConnection.put(`${resource}/${slug}`, params);
    },

    put(resource, params) {
        return axiosConnection.put(`${resource}`, params);
    },

    delete(resource) {
        return axiosConnection.delete(resource).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }
};

export default ApiService
