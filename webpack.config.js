const path = require('path');
const Dotenv = require('dotenv-webpack');


module.exports = {
    entry: {
        Reservations: './src/firebase-config.js',
        Reviews: './src/Reviews.js',
        
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
    ],
};


