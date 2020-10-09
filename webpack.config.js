const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const postcssplugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-hexrgba'),
    require('postcss-nested'),
    require('autoprefixer')
];

let cssConfig = {
    test : /[.]css$/i,
    use : [
        //'style-loader',
        'css-loader?url=false',
        {
            loader: 'postcss-loader',
            options : {
                plugins : postcssplugins
            }
        }
    ]
}

let config = {
    entry: './app/assets/scripts/App.js',
    module : {
        rules : [ cssConfig ]
    }
}

if (currentTask == 'dev') {
    config.output = {
        filename : 'bundled.js',
        path : path.resolve( __dirname, 'app' ) //multiplatform friendly
    };
    config.devServer = {
        before : function(app, server){
            server._watch('./app/**/*.html')

        },
        contentBase : path.join(__dirname, 'app'),
        hot : true,
        port : 3000,
        host : '0.0.0.0'
    }
    config.mode = 'development'
    cssConfig.use.unshift('style-loader')

} else if (currentTask == 'build'){
    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename : '[name].[chunkhash].js',
        path    : path.resolve(__dirname, 'dist') //multiplatform friendly
    };
    config.mode = 'production';
    config.optimization = {
        splitChunks : {
            chunks : 'all'
        }
    }
    config.plugins = [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.[chunkhash].css'
        })
    ]
    config.module = {
        rules : [ cssConfig ]
    }

    cssConfig.use.unshift(MiniCssExtractPlugin.loader)
    postcssplugins.push( require('cssnano') )
}
module.exports = config;
