module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.coffee$/,
                    loader: 'coffee-loader',
                }
            ]
        },
        devServer: {
            compress: true,
            disableHostCheck: true
        }
    },
    productionSourceMap: false
};
