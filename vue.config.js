module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.coffee$/,
                    loader: 'coffee-loader',
                }
            ]
        }
    },

    pluginOptions: {
      express: {
        shouldServeApp: true,
        serverDir: './srv'
      }
    }
};
