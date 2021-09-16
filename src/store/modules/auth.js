import ApiService from "@/common/api.service"
import {
    LOGIN,
    REGISTER,
    LOGOUT,
    CHECK_AUTH
} from '@/store/actions/type'
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from '@/store/mutations/type'
import authService from "@/common/auth.service"

const state = {
    errors: null,
    user: {},
    token: null,
    isAuthenticated: !!authService.getToken()
}

const getters = {
    currentUser(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    }
}

const actions = {
    [LOGIN](context, credentials) {
        return new Promise((resolve, reject) => {
            ApiService.post("/auth/login", credentials)
                .then((resp) => {
                    context.commit(SET_AUTH, resp.data);
                    resolve({user: resp.data.user, message: resp.data.message});
                })
                .catch((err) => {
                    context.commit(SET_ERROR, err);
                    reject(err)
                });
        });
    },

    [REGISTER](context, credentials) {
        return new Promise((resolve, reject) => {
            ApiService.post("/auth/register", credentials)
                .then((resp) => {
                    resolve(resp.data.message);
                })
                .catch((err) => {
                    context.commit(SET_ERROR, err.response.data.errors);
                    reject(err.response.data.message)
                });
        });
    },

    [CHECK_AUTH](context) {
        // if (authService.getToken()) {
        //     ApiService.setHeader()
        //     ApiService.post("/auth/refresh",{})
        //         .then((resp) => {
        //             context.commit(SET_AUTH, resp.data);
        //         })
        //         .catch((err) => {
        //             context.commit(SET_ERROR, err.response);
        //         });
        // } else {
        //   context.commit(PURGE_AUTH);
        // }
    },

    [LOGOUT](context) {
        context.commit(PURGE_AUTH);
    },
}

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_AUTH](state, user) {
        state.isAuthenticated = true;
        state.user = user.user;
        state.token = user.access_token;
        state.errors = {};
        authService.saveToken(state.token);
    },
    [PURGE_AUTH](state) {
        state.isAuthenticated = false;
        state.user = {};
        state.errors = {};
        authService.destroyToken();
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
