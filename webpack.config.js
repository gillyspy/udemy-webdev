const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')

const postcssplugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-hexrgba'),
    require('postcss-nested'),
    require('autoprefixer')
]

class RunAfterCompile{
    apply(compiler) {
        compiler.hooks.done.tap('Copy images', function(){
            fse.copySync('./app/assets/images','./docs/assets/images')
        })
    }

}

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

let pages = fse.readdirSync('./app').filter(function(f){
    return f.endsWith('.html');
}).map(function(page){
    return new HtmlWebpackPlugin({
        filename : page,
        template : `./app/${page}`
    })
})

let config = {
    entry: './app/assets/scripts/App.js',
    plugins : pages,
    /*
    plugins : [ new HtmlWebpackPlugin({
        filename : 'index.html',
        template : './app/index.html'
    })],*/
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
    config.module.rules.push({
        test : /\.js$/,
        exclude : /(node_modules)/,
        use : {
            loader : 'babel-loader',
            options : {
                presets : ['@babel/preset-env']
            }
        }
    })
    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename : '[name].[chunkhash].js',
        path    : path.resolve(__dirname, 'docs') //multiplatform friendly
    };
    config.mode = 'production';
    config.optimization = {
        splitChunks : {
            chunks : 'all'
        }
    }
    config.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.[chunkhash].css'
        }),
        new RunAfterCompile()
    )
    config.module = {
        rules : [ cssConfig ]
    }

    cssConfig.use.unshift(MiniCssExtractPlugin.loader)
    postcssplugins.push( require('cssnano') )

}
module.exports = config;
