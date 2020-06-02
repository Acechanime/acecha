module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.coffee$/,
                    loader: 'coffee-loader',
                },
                {
                    test: /\.ya?ml$/,
                    type: 'json', // Required by Webpack v4
                    use: 'yaml-loader'
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
