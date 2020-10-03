const path = require('path');
const postcssplugins = [
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer'),
];

module.exports = {
    entry: './app/assets/scripts/App.js',
    mode : 'development',
    output : {
        filename : 'bundled.js',
        path : path.resolve( __dirname, 'app' ) //multiplatform friendly
    },
    watch : true,
    module : {
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
};