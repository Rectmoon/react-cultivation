import { WelcomePage, CounterPage, ListPage, Layout } from './'

export default {
  path: 'demo',
  component: Layout,
  childRoutes: [
    { path: '', component: WelcomePage, isIndex: true },
    { path: 'counter', component: CounterPage },
    { path: 'list', component: ListPage },
  ],
}
