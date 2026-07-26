import '@/bootstrap'

import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import myMixin from '@/mixins'
import authService from '@/common/auth.service'
import { CHECK_AUTH } from '@/store/actions/type'
import base from '@/plugins/base'
import vuetify from '@/plugins/vuetify'
import toastr from '@/plugins/toastr'
import i18n from '@/i18n'
import moment from 'moment'
import Gravatar from '@/components/Gravatar.vue'

const app = createApp(App)

app.mixin(myMixin)
app.component('v-gravatar', Gravatar)
app.config.globalProperties.moment = moment

app.use(store)
app.use(router)
app.use(vuetify)
app.use(i18n)
app.use(base)
app.use(toastr)

// Restore session before first render (parity with old beforeCreate hook)
if (authService.getToken()) store.dispatch(CHECK_AUTH)

// Document title per-route (parity with old $route watcher)
router.afterEach((to) => {
  document.title = to.meta && to.meta.title
    ? `${to.meta.title} - Quiz System`
    : 'Simple Quiz System'
})

app.mount('#app')
