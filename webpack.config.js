const envs = require('./env');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');


const { NODE_ENV } = process.env;

const entry = "./src/index.ts";
const { stringified } = envs();
module.exports = () => ({
	target: 'node',
	node: {
		__filename: false,
		__dirname: false
	},
	externals: [nodeExternals()],
	entry: [
		"@babel/register",
		"core-js/stable",
		"@babel/runtime",
		"es6-promise/auto",
		entry
	],
	mode: NODE_ENV,
	devtool: 'source-map',
	output: {
		filename: '[name]-bundle.js',
		chunkFilename: '[name].chunk.js',
		path: path.resolve(__dirname, './dist-webpack'),
		publicPath: '/',
		libraryTarget: 'commonjs2'
	},
	optimization: {
		splitChunks: {
			automaticNameDelimiter: '_',
			cacheGroups: {
				vendor: {
					name: 'vendor',
					test: /[\\/]node_modules[\\/]/,
					chunks: 'initial',
					minChunks: 2
				}
			}
		}
	},
	resolve: {
		extensions: [".js", ".ts"]
	},
	module: {
		rules: [
			{
				test: /\.(js|ts)$/,
				exclude: /node_modules/,
				include: /src/,
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader'
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin(stringified)
	]
});
