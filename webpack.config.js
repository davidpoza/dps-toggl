//Vamos a usar el paquete path para que las rutas sean válidas tanto en windows como en linux
var path = require("path");
var entryPath = path.join(__dirname, "src"),
    outPath = path.join(__dirname, "dist");

//Vamos a usar este plugin para combinar todos los ficheros scss
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: [path.join(entryPath, "app.js")],
    output: {
        path: outPath,
        filename: "bundle.js"
    },
    module: {
        rules : [
            {
                test: /\.js$/,
                include: entryPath,
                exclude: path.join(__dirname, "node_modules"),
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'react-hot-loader/webpack',
                    },
                ]
            },
            {
                test: /\.scss$/,
                include: entryPath,
                exclude: path.join(__dirname, "node_modules"),
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }                    
                ]
           },
            {
                test: /\.(png|jpg|gif)$/,
                include: entryPath,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      outputPath: 'images/',
                      publicPath: 'images/',
                    },
                  },
                ],
            }
        ]
    },
    devServer: {
        contentBase: outPath
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css",
            chunkFilename: "styles.css"
        }),
    ]    
}