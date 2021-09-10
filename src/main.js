require('@/bootstrap')

import Vue from 'vue'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import myMixin from '@/mixins'
import authService from "@/common/auth.service";
import { CHECK_AUTH } from "@/store/actions/type";
import vuetify from '@/plugins/vuetify';
import VueToastr from "vue-toastr";
Vue.use(VueToastr);

Vue.config.productionTip = false
Vue.mixin(myMixin)

Vue.use(store)
Vue.use(router)
Vue.use(vuetify);

new Vue({
    store,
    router,
    beforeCreate(){
       if(authService.getToken()) store.dispatch(CHECK_AUTH)
    },
    watch: {
        $route(to, from) {
            if (to || from)
                document.title = to.meta.title ? `${to.meta.title} - Quiz System` : 'Simple Quiz System';
        }
    },
    vuetify,
    render: h => h(App)
}).$mount('#app')
