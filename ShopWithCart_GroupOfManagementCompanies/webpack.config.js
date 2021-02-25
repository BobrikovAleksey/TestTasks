const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/main'),
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },

    resolve: {
        extensions: [ '.js', '.jsx', '.css', '.scss', '.sass' ],
        alias: {
            Components: path.resolve(__dirname, 'src', 'components'),
            Containers: path.resolve(__dirname, 'src', 'containers'),
            Scripts: path.resolve(__dirname, 'src', 'scripts'),
            Store: path.resolve(__dirname, 'src', 'store'),
            Styles: path.resolve(__dirname, 'src', 'styles'),
        },
    },

    module: {
        rules: [
            // scripts
            {
                test: /\.jsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: [ '@babel/preset-env' ] },
                },
            },

            // styles
            {
                test: /\.(s[ac]ss|css)$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },

            // images
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },

            // fonts and svg
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ],
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './src/assets', to: './src/assets' },
            ],
        }),

        new HtmlWebpackPlugin({
            title: 'Петрович: Магазин строительных материалов',
            template: path.resolve(__dirname, 'index.html'),
        }),

        new CleanWebpackPlugin(),
    ],
};
