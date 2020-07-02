import { routes as StationsRoutes } from 'frontend/pages/Stations/routes'
import { routes as SettingsRoutes } from 'frontend/pages/Settings/routes'
import { routes as FleetsRoutes } from 'frontend/pages/Fleets/routes'
import { routes as RoadmapRoutes } from 'frontend/pages/Roadmap/routes'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.home" */ 'frontend/pages/Home'
      ),
    meta: {
      title: 'home',
    },
  },
  {
    path: '/search/',
    name: 'search',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.search" */ 'frontend/pages/Search'
      ),
    meta: {
      title: 'search',
    },
  },
  {
    path: '/impressum/',
    name: 'impressum',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.impressum" */ 'frontend/pages/Impressum'
      ),
    meta: {
      title: 'impressum',
    },
  },
  {
    path: '/privacy-policy/',
    name: 'privacy-policy',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.privacy" */ 'frontend/pages/PrivacyPolicy'
      ),
    meta: {
      title: 'privacyPolicy',
    },
  },
  {
    path: '/hangar/',
    name: 'hangar',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.hangar" */ 'frontend/pages/Hangar'
      ),
    meta: {
      needsAuthentication: true,
      quickSearch: 'nameCont',
      title: 'hangar.index',
      primaryAction: true,
      backgroundImage: 'bg-5',
    },
  },
  {
    path: '/hangar/preview',
    name: 'hangar-preview',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.hangar-preview" */ 'frontend/pages/Hangar/Preview'
      ),
    meta: {
      title: 'hangar.preview',
      backgroundImage: 'bg-5',
    },
  },
  {
    path: '/hangar/fleetchart/',
    name: 'hangar-fleetchart',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.hangar-fleetchart" */ 'frontend/pages/Hangar/Fleetchart'
      ),
    meta: {
      needsAuthentication: true,
      title: 'hangar.fleetchart',
      backgroundImage: 'bg-5',
    },
  },
  {
    path: '/hangar/stats/',
    name: 'hangar-stats',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.hangar-stats" */ 'frontend/pages/Hangar/Stats'
      ),
    meta: {
      needsAuthentication: true,
      title: 'hangar.stats',
      backgroundImage: 'bg-5',
    },
  },
  {
    path: '/hangar/:user/',
    name: 'hangar-public',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.hangar-public" */ 'frontend/pages/Hangar/Public'
      ),
    meta: {
      backgroundImage: 'bg-5',
    },
  },
  {
    path: '/hangar/:user/fleetchart',
    name: 'hangar-public-fleetchart',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.hangar-public-fleetchart" */ 'frontend/pages/Hangar/PublicFleetchart'
      ),
    meta: {
      backgroundImage: 'bg-5',
    },
  },
  {
    path: '/ships/',
    name: 'models',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.ships" */ 'frontend/pages/Models'
      ),
    meta: {
      title: 'models.index',
      quickSearch: 'searchCont',
    },
  },
  {
    path: '/ships/fleetchart',
    name: 'models-fleetchart',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.ships-fleetchart" */ 'frontend/pages/Models/Fleetchart'
      ),
    meta: {
      title: 'models.fleetchart',
      quickSearch: 'searchCont',
    },
  },
  {
    path: '/ships/compare/',
    name: 'models-compare',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.ships-compare" */ 'frontend/pages/Models/Compare'
      ),
    meta: {
      title: 'compare.models',
    },
  },
  {
    path: '/ships/:slug/',
    name: 'model',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.ships-detail" */ 'frontend/pages/Models/Show'
      ),
  },
  {
    path: '/ships/:slug/images/',
    name: 'model-images',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.ships-images" */ 'frontend/pages/Models/Show/Images'
      ),
  },
  {
    path: '/ships/:slug/videos/',
    name: 'model-videos',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.ships-videos" */ 'frontend/pages/Models/Show/Videos'
      ),
  },
  {
    path: '/stats/',
    name: 'stats',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.stats" */ 'frontend/pages/Stats'
      ),
    meta: {
      title: 'stats',
    },
  },
  {
    path: '/fleets/',
    name: 'fleets',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.fleets" */ 'frontend/pages/Fleets'
      ),
    children: FleetsRoutes,
    meta: {
      title: 'fleets',
      backgroundImage: 'bg-8',
    },
  },
  {
    path: '/images/',
    name: 'images',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.images" */ 'frontend/pages/Images'
      ),
    meta: {
      title: 'images',
    },
  },
  {
    path: '/stations/',
    name: 'stations',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.stations" */ 'frontend/pages/Stations'
      ),
    children: StationsRoutes,
    meta: {
      title: 'stations',
      quickSearch: 'searchCont',
      backgroundImage: 'bg-0',
    },
  },
  {
    path: '/trade-routes/',
    name: 'trade-routes',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.stations" */ 'frontend/pages/TradeRoutes'
      ),
    meta: {
      title: 'tradeRoutes',
      backgroundImage: 'bg-7',
    },
  },
  {
    path: '/roadmap/',
    name: 'roadmap',
    children: RoadmapRoutes,
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.roadmap" */ 'frontend/pages/Roadmap'
      ),
    meta: {
      title: 'roadmap.index',
    },
  },
  {
    path: '/settings/',
    name: 'settings',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.settings" */ 'frontend/pages/Settings'
      ),
    meta: {
      needsAuthentication: true,
    },
    redirect: {
      name: 'settings-profile',
    },
    children: SettingsRoutes,
  },
  {
    path: '/sign-up/',
    name: 'signup',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.signup" */ 'frontend/pages/Signup'
      ),
    meta: {
      title: 'signUp',
    },
  },
  {
    path: '/login/',
    name: 'login',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.login" */ 'frontend/pages/Login'
      ),
    meta: {
      title: 'login',
    },
  },
  {
    path: '/password/request/',
    name: 'request-password',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.password" */ 'frontend/pages/RequestPassword'
      ),
    meta: {
      title: 'requestPassword',
    },
  },
  {
    path: '/password/update/:token/',
    name: 'change-password',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.password" */ 'frontend/pages/ChangePassword'
      ),
    meta: {
      title: 'changePassword',
    },
  },
  {
    path: '/confirm/:token/',
    name: 'confirm',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.signup" */ 'frontend/pages/Confirm'
      ),
  },
  {
    path: '/404/',
    name: '404',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.404" */ 'frontend/pages/NotFound'
      ),
    meta: {
      title: 'notFound',
    },
  },
  {
    path: '*',
    component: () =>
      import(
        /* webpackChunkName: "frontend.page.404" */ 'frontend/pages/NotFound'
      ),
  },
]

export default routes
