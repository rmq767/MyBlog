import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5f72219e = () => interopDefault(import('..\\..\\web\\pages\\about\\index.vue' /* webpackChunkName: "pages/about/index" */))
const _5ad8b994 = () => interopDefault(import('..\\..\\web\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _bca92c04 = () => interopDefault(import('..\\..\\web\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _6815123c = () => interopDefault(import('..\\..\\web\\pages\\link\\index.vue' /* webpackChunkName: "pages/link/index" */))
const _bb2a9512 = () => interopDefault(import('..\\..\\web\\pages\\message\\index.vue' /* webpackChunkName: "pages/message/index" */))
const _cad3a9b6 = () => interopDefault(import('..\\..\\web\\pages\\project\\index.vue' /* webpackChunkName: "pages/project/index" */))
const _4b0d5214 = () => interopDefault(import('..\\..\\web\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'hash',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _5f72219e,
    name: "about"
  }, {
    path: "/blog",
    component: _5ad8b994,
    name: "blog"
  }, {
    path: "/inspire",
    component: _bca92c04,
    name: "inspire"
  }, {
    path: "/link",
    component: _6815123c,
    name: "link"
  }, {
    path: "/message",
    component: _bb2a9512,
    name: "message"
  }, {
    path: "/project",
    component: _cad3a9b6,
    name: "project"
  }, {
    path: "/",
    component: _4b0d5214,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
