/*
	./webpack.config.js
*/

const themeName = 'my-cool-wordpress-theme';

const path = require('path');
const wpThemePath = `www/wp-content/themes/${themeName}`;

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


// Separate out css file for production for caching but use style-loader
// in development so we can use source maps
let cssLoader;
if (process.env.NODE_ENV === 'development') {
    console.log(':: ===== DEVELOPMENT');

    CleanWebpackPluginConfig = new CleanWebpackPlugin([wpThemePath]);

} else {
	console.log(':: ===== PRODUCTION');

	CleanWebpackPluginConfig = new CleanWebpackPlugin([wpThemePath]);
}


module.exports = {
	entry: './src/index.js',

	output: {
		path: path.resolve(__dirname, wpThemePath),
		filename: 'bundle.js'
	},

	devtool: 'source-map',

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

			{
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
	        },

	        {
	        	test: /\.(jpe?g|png|gif|svg)$/i,
	        	use: 'file-loader?name=/assets/images/[name].[ext]'
	        }
		]
	},

	plugins: [
        ExtractTextPluginConfig,
        CopyWebpackPluginConfig,
        CleanWebpackPluginConfig
    ]

}