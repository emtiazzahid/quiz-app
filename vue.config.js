module.exports = {
    devServer: {
        disableHostCheck: true,
    },
    "transpileDependencies": [
        "vuetify"
    ],
    lintOnSave: false,
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: false,
        },
    },
}
