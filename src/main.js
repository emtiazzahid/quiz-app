require('@/bootstrap')

import { createApp, h } from 'vue'
import Toaster from "@meforma/vue-toaster";

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import myMixin from '@/mixins'
import authService from "@/common/auth.service";
import { CHECK_AUTH } from "@/store/actions/type";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp({
    beforeCreate(){
       if(authService.getToken()) store.dispatch(CHECK_AUTH)
    },
    render: () => h(App)
}, {h, App})

app.config.productionTip = false
app.mixin(myMixin)

app.use(store)
app.use(router)
app.use(Toaster)
app.mount('#app')