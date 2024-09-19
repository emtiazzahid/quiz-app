module.exports = {
    publicPath: "./",
    lintOnSave: false,
    "transpileDependencies": [
        "vuetify"
    ],
    configureWebpack: {
        devServer: {
        historyApiFallback: true
        }
    }
};