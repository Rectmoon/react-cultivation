import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'
import { hot, setConfig } from 'react-hot-loader'
import routeConfig from './common/routeConfig'
import history from './common/history'
import store from './common/store'

setConfig({
  logLevel: 'debug',
})

function renderRouteConfig (routes, contextPath) {
  const children = []

  const renderRoute = (item, routeContextPath) => {
    let newContextPath
    if (/^\//.test(item.path)) {
      newContextPath = item.path
    } else {
      newContextPath = `${routeContextPath}/${item.path}`
    }
    newContextPath = newContextPath.replace(/\/+/g, '/')

    if (item.component && item.childRoutes) {
      const childRoutes = renderRouteConfig(item.childRoutes, newContextPath)
      children.push(
        <Route
          key={newContextPath}
          path={newContextPath}
          render={props => <item.component {...props}>{childRoutes}</item.component>}
        />,
      )
    } else if (item.component) {
      children.push(
        <Route key={newContextPath} path={newContextPath} component={item.component} exact />,
      )
    } else if (item.childRoutes) {
      item.childRoutes.forEach(r => renderRoute(r, newContextPath))
    }
  }

  routes.forEach(item => renderRoute(item, contextPath))

  return <Switch>{children}</Switch>
}

function Root () {
  const children = renderRouteConfig(routeConfig, '/')
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>{children}</ConnectedRouter>
    </Provider>
  )
}

export default hot(module)(Root)
