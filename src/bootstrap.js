import axios from 'axios'

window.axios = axios

window.axios.defaults.baseURL = import.meta.env.VUE_APP_API_URL
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
