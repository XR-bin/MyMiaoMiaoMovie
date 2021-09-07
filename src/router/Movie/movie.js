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
      path: 'detail/1/:movieId',
      components: {
        default: () => import('../../components/NowPlaying/nowPlaying.vue'),
        detail: () => import('../../views/Movie/detail.vue')
      },
      props: {
        detail: true
      }
    },

    {
      path: 'detail/2/:movieId',
      components: {
        default: () => import('../../components/ComingSoon/comingSoon.vue'),
        detail: () => import('../../views/Movie/detail.vue')
      },
      props: {
        detail: true
      }
    },

    {
      path: '/movie',
      redirect: '/movie/nowPlaying'
    }
  ]
}
