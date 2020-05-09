module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.coffee$/,
                    loader: 'coffee-loader',
                },
                {
                    test: /\.ls$/,
                    loader: "6du-livescript-loader"
                }
            ]
        },
        devServer: {
            compress: true,
            disableHostCheck: true
        }
    },
    pluginOptions: {
        express: {
            shouldServeApp: true,
            serverDir: './srv'
        }
    },
    productionSourceMap: false,
    pwa: {
        workboxPluginMode: "InjectManifest",
        workboxOptions: {
            swSrc: __dirname + "/public/service-worker.js"
        }
    }
};
