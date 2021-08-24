export default {
  path: '/movie',
  component: () => import('../../views/Movie/index.vue'),
  children: [
    {
      path: 'city',
      component: () => import('../../components/City/city.vue')
    },
    {
      path: 'nowPlaying',
      component: () => import('../../components/NowPlaying/nowPlaying.vue')
    },
    {
      path: 'comingSoon',
      component: () => import('../../components/ComingSoon/comingSoon.vue')
    },
    {
      path: 'search',
      component: () => import('../../components/Search/search.vue')
    },
    {
      path: '/movie',
      redirect: '/movie/nowPlaying'
    }
  ]
}
