// Compatibility shim for the old `this.$toastr` API (vue-toastr, Vue 2).
// Backed by vue3-toastify. Only `.e` (error) and `.s` (success) are used in
// this codebase; the rest are provided for safety.
import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const shim = {
  e: (msg, title) => toast.error(title ? `${title}: ${msg}` : msg),
  s: (msg, title) => toast.success(title ? `${title}: ${msg}` : msg),
  i: (msg) => toast.info(msg),
  w: (msg) => toast.warning(msg),
  Add: (opts = {}) => toast(opts.msg || opts.message || '', { type: opts.type || 'default' }),
}

export default {
  install(app) {
    app.use(Vue3Toastify, { autoClose: 3000, position: toast.POSITION.TOP_RIGHT })
    app.config.globalProperties.$toastr = shim
  },
}
