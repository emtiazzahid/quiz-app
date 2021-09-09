const myMixin = {
    name: "my-mixin",
    methods: {
        SiteUrl(param){
            return process.env.VUE_APP_API_URL + param
        },

        GetLog(callback, value = null) {
            console.log(callback, value, 'call get log function')
        },

        IsRequired(value) {
            return value ? true : 'This field is required';
        },
    }
}

export default myMixin  