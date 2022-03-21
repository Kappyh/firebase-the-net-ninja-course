const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    plugins: [
        new Dotenv()
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    watch: true
}