const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    configureWebpack: {
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 200000,
            }
        },
        plugins: [new BundleAnalyzerPlugin()]
    }
}