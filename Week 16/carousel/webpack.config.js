module.exports = {
    entry: "./main.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [["@babel/plugin-transform-react-jsx", {pragma:"createElement"}]]
                    }
                }
            }
        ]
    },
    devServer: {
        port: 8099,
        open: true
    },
    mode: "development"
}