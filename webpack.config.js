/*
	./webpack.config.js
*/

const themeName = 'my-cool-wordpress-theme';

const path = require('path');
const wpThemePath = `www/wp-content/themes/${themeName}`;


const webpack = require('webpack');

// Copy over static files
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
    { from: 'src/theme-files' }
  ], {
    ignore: []
  });

// Clean out public folder
const CleanWebpackPlugin = require('clean-webpack-plugin');
let CleanWebpackPluginConfig = new CleanWebpackPlugin([wpThemePath]);

// Extract css for production
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ExtractTextPluginConfig = new ExtractTextPlugin({
        filename: 'style.css'
      });


const ProvidePluginConfig = new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
        // In case you imported plugins individually, you must also require them here:
        Util: "exports-loader?Util!bootstrap/js/dist/util",
        Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      });


// Separate out css file for production for caching but use style-loader
// in development so we can use source maps
let cssLoader;
if (process.env.NODE_ENV === 'development') {
    console.log(':: ===== DEVELOPMENT');

    CleanWebpackPluginConfig = new CleanWebpackPlugin([wpThemePath]);

    cssLoader = {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader', options: { sourceMap: true } },
        { loader: 'css-loader', options: { sourceMap: true } },
        { loader: 'postcss-loader', options: { sourceMap: true } },
        { loader: 'sass-loader', options: { sourceMap: true } }
      ]
    }

} else {
  console.log(':: ===== PRODUCTION');

  CleanWebpackPluginConfig = new CleanWebpackPlugin([wpThemePath]);

  cssLoader = {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      //resolve-url-loader may be chained before sass-loader if necessary
      use: [
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    })
  }
}


module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, wpThemePath),
    filename: 'bundle.js'
  },

  devtool: 'source-map',
  // devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          "babel-loader",
          // "eslint-loader",
        ],
        exclude: /node_modules/
      },
     
      // Trying to get sourcemaps to work with extracttextplugin but no luck so far,
      // extractplugin will be for production only at the moment
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       { loader: 'css-loader', options: { sourceMap: true } },
      //       // 'postcss-loader',
      //       { loader: 'postcss-loader', options: { sourceMap: true } },
      //       { loader: 'sass-loader', options: { sourceMap: true } },
      //     ],
      //     publicPath: wpThemePath,
      //   })
      // },

      cssLoader,

      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff2|woff)$/i,
        use: 'file-loader?name=/assets/images/[name].[ext]'
      }
    ]
  },

  resolve: {
    alias: {
      "TweenLite": path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      "TweenMax": path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      "TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      "TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
      "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    }
  },

  plugins: [
        ExtractTextPluginConfig,
        CopyWebpackPluginConfig,
        CleanWebpackPluginConfig,
        ProvidePluginConfig
    ]

}