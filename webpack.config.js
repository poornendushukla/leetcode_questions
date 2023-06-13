const path =  require('path')

module.exports = {
    target: "node",
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js',
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            targets: {
                                node: "14.17.0"
                            }
                        }
                    ]
                ]
            }
        }]
    },
    resolveLoader: {
        modules: [
            __dirname + '/node_modules'
        ]
    }
}