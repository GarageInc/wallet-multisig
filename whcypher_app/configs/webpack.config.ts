/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseManifest = require('./manifest.json')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const config = require('config')

const nodeEnv = process.env.NODE_ENV || 'development'

const commitHash = require('child_process').execSync('git rev-parse --short HEAD').toString().trim()

const isProd = nodeEnv === 'production'

const viewsPath = path.join(__dirname, './../src/app/static/views')
const sourcePath = path.join(__dirname, './../src/app')

const views = ['app.html']

const ignoreChunks = {
  inpage: true,
  serviceWorker: true,
  content: true,
}

const plugins = isProd
  ? [
      new TerserPlugin({
        exclude: [/\/node_modules/, /\/test/],
        terserOptions: {
          compress: {},
          mangle: true,
        },
      }),
    ]
  : []

const configWebpack = {
  // ManifestV3 does not work with unsafe-eval
  // Changed from eval-source-map to cheap-module-source-map because
  // chrome does not allow unsafe-eval
  // NOTE: rebuild is slow
  devtool: isProd ? undefined : 'source-map',
  entry: {
    app: path.join(sourcePath, 'app.tsx'),
    serviceWorker: path.join(__dirname, '../src/serviceWorker/app/serviceWorker.ts'),
    content: path.join(__dirname, '../src/content/content'),
    inpage: path.join(__dirname, '../src/content/inpage'),
  },
  output: {
    path: path.resolve(__dirname, isProd ? '../prod' : '../build'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.json', '.scss'],
    alias: {
      '@material-ui/styles': path.join(__dirname, '../node_modules/@material-ui/styles'),
      content: path.resolve(__dirname, '../src/content'),
      app: path.resolve(__dirname, '../src/app'),
      hooks: path.resolve(__dirname, '../src/app/hooks'),
      providers: path.resolve(__dirname, '../src/providers'),
      serviceWorker: path.resolve(__dirname, '../src/serviceWorker'),
      'ui-kit': path.resolve(__dirname, '../src/app/ui-kit'),
      icons: path.resolve(__dirname, '../src/icons'),
      src: path.resolve(__dirname, '../src'),
    },
    fallback: {
      querystring: require.resolve('querystring-es3'),
      crypto: require.resolve('crypto-browserify'),
      os: require.resolve('os-browserify/browser'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert/'),
      url: require.resolve('url/'),
      events: require.resolve('events/'),
      path: require.resolve('path-browserify'),
      constants: require.resolve('constants-browserify'),
      zlib: require.resolve('browserify-zlib'),
      fs: false,
    },
  },
  plugins: [
    ...plugins,
    new WebpackBar({
      color: 'blue',
    }),

    new webpack.DefinePlugin({
      COMMIT_HASH: JSON.stringify(commitHash), // calculated commit hash
      CONFIG: JSON.stringify(config),
      'process.env.NODE_CONFIG': JSON.stringify(JSON.stringify(config)),
      'process.env.REACT_APP_DEV_API': JSON.stringify(process.env.REACT_APP_DEV_API),
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
      React: 'react',
    }),
    // write css file(s) to build folder
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),

    new CleanWebpackPlugin([isProd ? 'prod' : 'build'], {
      root: path.join(__dirname, '..'),
      verbose: !isProd,
      dry: !isProd,
      exclude: ['icons', 'image'],
    }),
    ...views.map(
      (view) =>
        new HtmlWebpackPlugin({
          title: 'TotalSig',
          meta: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            'theme-color': '#000000',
          },
          manifest: 'manifest.json',
          hash: true,
          template: path.join(viewsPath, view),
          filename: view,
          inject: 'body',
          chunks: [path.basename(view, '.html')],
        }),
    ),
    new CopyPlugin([
      {
        from: 'src/app/static/image',
        to: 'static/image/',
      },
      {
        from: 'src/app/static/fonts',
        to: 'static/fonts/',
      },
    ]),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest,
      },
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: (chunk) => {
        return !ignoreChunks[chunk.name]
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: 'webpack-strip-block',
        exclude: /node_modules\/(!:@whalesheaven)/,
      },
      {
        test: /\.(js|ts)x?$/,
        loader: 'esbuild-loader',
        exclude: /node_modules\/(!:@whalesheaven)/,
        options: {
          loader: 'tsx',
          target: 'es2020',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.scss$/,
        use: [
          {
            loader: 'style-loader', // Takes the Sass/SCSS file and compiles to the CSS
          },
          {
            loader: 'css-loader', // Takes the CSS files and returns the CSS with imports and url(...) for Webpack
            options: {
              modules: false,
              sourceMap: !isProd,
            },
          },
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'css',
              minify: isProd, // do not minify on dev
            },
          },
          {
            loader: 'resolve-url-loader', // Rewrites relative paths in url() statements
          },
          {
            loader: 'sass-loader', // Takes the Sass/SCSS file and compiles to the CSS
            options: {
              sourceMap: !isProd,
            },
          },
        ],
      },
      {
        test: /\.module\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProd,
              modules: {
                localIdentName: isProd ? '[hash:base64:5]' : '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
}

module.exports = configWebpack
