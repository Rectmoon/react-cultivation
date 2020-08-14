const fs = require('fs')
const path = require('path')
const globby = require('globby')
const { paths } = require('react-app-rewired')
const { override, addLessLoader, addExternalBabelPlugin } = require('customize-cra')

const resolve = dir => path.resolve(__dirname, dir)
const defaultTemplatePath = resolve('public/index.html')
const isDev = process.env.NODE_ENV === 'development'

function multiEntryPlugin (entries) {
  return function (config) {
    if (!entries || !entries.length) return config
    const defaultEntryName = 'main'
    const defaultEntryHTMLPlugin = config.plugins.filter(
      plugin => plugin.constructor.name === 'HtmlWebpackPlugin',
    )[0]
    defaultEntryHTMLPlugin.options.chunks = [defaultEntryName]

    config.entry = entries.reduce(
      (res, next) => {
        const { name, entry, template, filename } = next
        const chunks = !isDev ? ['manifest', 'polyfill', 'vendor', 'styles', name] : [name]
        config.plugins.push(
          new defaultEntryHTMLPlugin.constructor(
            Object.assign({}, defaultEntryHTMLPlugin.options, {
              filename,
              template,
              chunks,
            }),
          ),
        )
        res[name] = isDev
          ? [require.resolve('react-dev-utils/webpackHotDevClient'), entry]
          : [entry]
        return res
      },
      { [defaultEntryName]: config.entry },
    )

    if (isDev) {
      config.output.filename = 'static/js/[name].js'
    } else {
      config.output.filename = 'static/js/[name].[chunkhash:6].js'
      config.output.chunkFilename = 'static/js/[name].[chunkhash:6].js'

      config.optimization = {
        moduleIds: 'hashed',

        runtimeChunk: {
          name: 'manifest',
        },

        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/](react|react-dom|echarts-for-react)[\\/]/,
              name: 'vendor',
              chunks: 'all',
            },

            polyfill: {
              test: /[\\/]node_modules[\\/](core-js|raf|@babel|babel)[\\/]/,
              name: 'polyfill',
              priority: 30,
              chunks: 'all',
              reuseExistingChunk: true,
            },

            styles: {
              name: 'styles',
              test: /(reset|common)\.css|less$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      }
    }

    return config
  }
}

const entries = globby
  .sync([paths.appSrc + '/*/index.js'], { cwd: process.cwd() })
  .reduce((res, entry) => {
    const name = path
      .relative(paths.appSrc, entry)
      .split(path.sep)
      .slice(0, -1)
      .join('/')
    const tpName = entry.replace('.js', '.html')
    const template = fs.existsSync(tpName) ? tpName : defaultTemplatePath
    const filename = `${name}.html`

    res.push({
      name,
      entry,
      template,
      filename,
    })

    return res
  }, [])

const plugins = [
  multiEntryPlugin(entries),
  addLessLoader(),
  isDev && addExternalBabelPlugin('react-hot-loader/babel'),
].filter(Boolean)

module.exports = {
  webpack: override.apply(null, plugins),

  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost)

      config.proxy = {
        '/api': {
          target: 'https://www.bootcdn.cn',
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            '^/api': '',
          },
        },
      }
      // const fs = require('fs');
      // config.https = {
      //   key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
      //   cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
      //   ca: fs.readFileSync(process.env.REACT_HTTPS_CA, 'utf8'),
      //   passphrase: process.env.REACT_HTTPS_PASS
      // };

      return config
    }
  },

  paths: paths => {
    // paths.servedPath = '/react-cultivation/'
    return paths
  },
}
