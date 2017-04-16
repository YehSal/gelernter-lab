var webpack = require('webpack');

module.exports = {
    entry: {
        'app': './assets/app/main.ts'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        loaders: [
            {
                test: /\.es6\.js$/, loader: "babel-loader",
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular2-router-loader',
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                    loaders: ['file-loader?name=/uploads/[name].[ext]', {
                    loader: 'file',
                    query: {
                        mozjpeg: {
                            progressive: true,
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        optipng: {
                            optimizationLevel: 4,
                        },
                        pngquant: {
                            quality: '75-90',
                            speed: 3,
                        }
                    },
                    output: {
                        path: './public/uploads',
                        publicPath: "/uploads/",
                    }
                }],
                exclude: /node_modules/,
                include: './uploads'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.css$/,
                loader: 'raw'
            }
        ]

    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            './src' // location of your src
        )
    ]
};