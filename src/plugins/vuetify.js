import Vue from 'vue';
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib'
Vue.use(Vuetify,{
    components: {
        VSnackbar,
        VBtn,
        VIcon
    }
});

export default new Vuetify({});
