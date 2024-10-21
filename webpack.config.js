const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');


module.exports = {
    entry: {
        Reservations: '/src/firebase-config.js',
        Reviews: '/src/Reviews.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        new Dotenv(),
        // This makes environment variables accessible in the client-side code
        new webpack.DefinePlugin({
            'process.env.': JSON.stringify({
                GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
                GOOGLE_PLACE_ID: process.env.GOOGLE_PLACE_ID,
            })
        }),
    ],
};


