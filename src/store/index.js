import { createStore } from 'vuex'
import authModule from'@/store/modules/auth';
// import user from'@/store/modules/user';
// import form from'@/store/modules/form';

const store = createStore({
    modules: {
        auth: authModule,
        // user,
        // form
    }
})

export default store