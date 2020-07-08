import { App } from '../features/home'
import { PageNotFound } from '../features/common'
import homeRoute from '../features/home/route'

const childRoutes = [homeRoute]

const routes = [
  {
    path: '/',
    component: App,
    childRoutes: [
      ...childRoutes,
      { path: '*', name: 'Page not found', component: PageNotFound },
    ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
  },
]

function handleIndexRoute (route) {
  if (!route.childRoutes || !route.childRoutes.length) return

  const indexRoute = route.childRoutes.find(child => child.isIndex)

  if (indexRoute) {
    const first = { ...indexRoute }
    first.path = ''
    first.exact = true
    first.autoIndexRoute = true
    route.childRoutes.unshift(first)
  }

  route.childRoutes.forEach(handleIndexRoute)
}

routes.forEach(handleIndexRoute)

export default routes
