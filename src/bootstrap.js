import router from '@/router'
import authService from "@/common/auth.service"

window.axios = require('axios')

window.axios.defaults.baseURL = process.env.VUE_APP_API_URL
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// window.axios.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response.status === 401) {
//             authService.destroyToken()
//             router.push({ name: "Login" })
//         } else {
//             return Promise.reject(error);
//         }
//     }
// );
