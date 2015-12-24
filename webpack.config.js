var path = require('path');
module.exports = {
    entry : __dirname + '/index.js',
    output : {
        path : __dirname + '/dist',
        filename : 'index.js',
        libraryTarget : 'umd'
    },
    module : {
        loaders : [ {
            test : /\.jsx?$/,
            include : [ //
                path.resolve(__dirname, 'index.js'),//
                path.resolve(__dirname, 'lib'), //
                /.*mosaic-.*/ //
            ],
            loader : 'babel-loader'
        }, {
            test : /\.less|\.css/,
            loader : "style-loader!css-loader!less-loader"
        }, {
            test : /\.(png|jpg|svg|woff2?|eot|ttf)$/,
            loader : 'url-loader?limit=150000'
        }  ]
    },
    externals : [ 'react', 'leaflet' ],
    resolve : {
        alias : {
            react : __dirname + '/node_modules/react',
            'mosaic-adapters' : __dirname + '/node_modules/mosaic-adapters'
        }
    }

};
