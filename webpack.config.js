const currentTask = process.env.npm_lifecycle_event;
const path = require('path');

const postcssplugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-hexrgba'),
    require('postcss-nested'),
    require('autoprefixer')
];

let config = {
    entry: './app/assets/scripts/App.js'
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
    };
    config.mode = 'development'
    config.module = {
        rules : [
            {
                test : /[.]css$/i,
                use : [
                    'style-loader',
                    'css-loader?url=false',
                    {
                        loader: 'postcss-loader',
                        options : {
                            plugins : postcssplugins
                        }
                    }
                ]
            }
        ]
    }


} else if (currentTask == 'build'){
    config.output = {
        filename: 'bundled.js',
        path    : path.resolve(__dirname, 'dist') //multiplatform friendly
    };
    config.mode = 'production';
    config.module = {
        rules : [
            {
                test : /[.]css$/i,
                use : [
                    'style-loader',
                    'css-loader?url=false',
                    {
                        loader: 'postcss-loader',
                        options : {
                            plugins : postcssplugins
                        }
                    }
                ]
            }
        ]
    }
}
module.exports = config;
