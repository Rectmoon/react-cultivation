const fs = require('fs')
const path = require('path')
const globby = require('globby')
const { paths } = require('react-app-rewired')
const { override } = require('customize-cra')

const resolve = dir => path.resolve(__dirname, dir)
const defaultTemplatePath = resolve('public/index.html')

function multiEntryPlugin(entries) {
  return function(config, env) {
    if (!entries || !entries.length) return config
    const defaultEntryName = 'main'
    const defaultEntryHTMLPlugin = config.plugins.filter(plugin => plugin.constructor.name === 'HtmlWebpackPlugin')[0]
    defaultEntryHTMLPlugin.options.chunks = [defaultEntryName]

    config.entry = entries.reduce(
      (res, next) => {
        const { name, entry, template, filename } = next
        const chunks = env === 'production' ? ['manifest', 'polyfill', 'vendor', 'styles', name] : [name]
        config.plugins.push(
          new defaultEntryHTMLPlugin.constructor(
            Object.assign({}, defaultEntryHTMLPlugin.options, {
              filename,
              template,
              chunks
            })
          )
        )
        res[name] = entry
        return res
      },
      { [defaultEntryName]: config.entry }
    )

    if (env === 'development') {
      config.output.filename = 'static/js/[name].js'
    } else {
      config.output.filename = 'static/js/[name].[chunkhash:6].js'
      config.output.chunkFilename = 'static/js/[name].[chunkhash:6].js'

      config.optimization = {
        moduleIds: 'hashed',

        runtimeChunk: {
          name: 'manifest'
        },

        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/](react|react-dom|echarts-for-react)[\\/]/,
              name: 'vendor',
              chunks: 'all'
            },

            polyfill: {
              test: /[\\/]node_modules[\\/](core-js|raf|@babel|babel)[\\/]/,
              name: 'polyfill',
              priority: 30,
              chunks: 'all',
              reuseExistingChunk: true
            },

            styles: {
              name: 'styles',
              test: /\.css|less$/,
              chunks: 'all',
              enforce: true
            }
          }
        }
      }
    }

    return config
  }
}

const entries = globby.sync([paths.appSrc + '/*/index.js'], { cwd: process.cwd() }).reduce((res, entry) => {
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
    filename
  })

  return res
}, [])

module.exports = {
  webpack: override(multiEntryPlugin(entries)),

  paths: paths => {
    // paths.servedPath = '/react-cultivation/'
    return paths
  }
}
