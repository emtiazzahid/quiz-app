import Vue from "vue";
import Vuex from "vuex";

import authModule from'@/store/modules/auth';

Vue.use(Vuex);

// import user from'@/store/modules/user';
// import form from'@/store/modules/form';

export default new Vuex.Store({
    modules: {
        auth: authModule,
    }
});
