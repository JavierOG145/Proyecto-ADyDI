
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: 'login' },
      { path: 'login', component: () => import('src/pages/Login.vue') },
      { path: 'formulari', component: () => import('pages/Formulari.vue') },
      { path: 'about', component: () => import('pages/About.vue') }
    ]
  },

  // Always leave this as last one, but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
