const path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    context: __dirname,
    entry: './src/app.js',
    devtool: 'eval',
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    devServer: {
        publicPath: '/public/'
    },
    stats: {
        colors: true,
        reasons: true,
        chunks: true
    },
    plugins: [
        new ExtractTextPlugin({ filename: 'main.css', disable: false, allChunks: true })
    ],
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
        ]

    }

}