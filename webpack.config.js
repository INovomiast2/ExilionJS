import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';
import ExilonWebpackPlugin from './src/server/ExilonWebpackPlugin.js';

const isDevelopment = process.env.NODE_ENV !== 'production';
const __dirname = process.cwd();

export default {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '.exilon'),
    filename: 'js/[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    fallback: {
      "path": false,
      "os": false,
      "crypto": false,
      "stream": false,
      "buffer": false,
      "util": false,
      "process": false,
      "url": false,
      "events": false,
      "fs": false,
      "child_process": false
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: true,
                dynamicImport: true
              },
              transform: {
                react: {
                  runtime: "automatic"
                }
              }
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash][ext]'
        }
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      React: 'react',
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, 'src/styles'),
          to: path.resolve(__dirname, '.exilon/css'),
          noErrorOnMissing: true
        },
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, '.exilon/assets'),
          noErrorOnMissing: true
        },
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, '.exilon'),
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['**/index.html'],
          },
        }
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
      favicon: './public/favicon.png'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
    }),
    new ExilonWebpackPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
    static: {
      directory: path.join(__dirname, '.exilon'),
      watch: true,
    },
    client: {
      overlay: false,
    },
    watchFiles: ['src/**/*', 'public/**/*'],
  },
  optimization: {
    runtimeChunk: isDevelopment,
    splitChunks: {
      chunks: 'all',
    },
  },
  stats: 'minimal',
  infrastructureLogging: {
    level: 'none',
  },
}; 