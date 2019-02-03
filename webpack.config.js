module.exports = {
    entry: {
        posts: "./src/js/posts.js"
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/static/blog/js"
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
};
