<template>
  <Loading v-if="isLoading" />
  <div class="movie_body" v-else>
    <ul>
      <li class="scroll_down">{{ pullDownMsg }}</li>
      <li v-for="item in movieList" :key="item.id">
        <div class="pic_show" @tap="toDetailHandler(item.id)"><img :src="item.img | setWH('128.180')"></div>
          <div class="info_list">
            <h2 @tap="toDetailHandler(item.id)">{{ item.nm }}<img v-if="item.version" src="../../assets/maxs.png"></h2>
            <p>观众评 <span class="grade">{{ item.sc }}</span></p>
            <p>主演: {{ item.star }}</p>
            <p>{{ item.showInfo }}</p>
        </div>
        <div class="btn_mall">
          <div v-if="item.globalReleased">购票</div>
          <div v-else style="background-color: #3C9FE6; border-radius: 4px;">预售</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'

export default {
  name: "NowPlaying",

  data() {
    return {
      movieList: [],
      pullDownMsg: '',
      isLoading: true,
      prevCity: -1
    }
  },

  methods: {
    toDetailHandler(movieId) {
      this.$router.push(`/movie/detail/1/${movieId}`)
    },

    toScrollHandler(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = '正在更新中'
      }
    },

    toTouchEndHandler(pos) {
      if (pos.y > 30) {
        this.axios.get("ajax/movieOnInfoList?token=&optimus_uuid=A56D8830F66911EBA425CFF8F161357066025D44E0874C4EA5E4EC182D56F2F7&optimus_risk_level=71&optimus_code=10").then(
          res => {
            this.pullDownMsg = '更新成功'
            setTimeout(() => {
              this.movieList = res.data.movieList
              this.pullDownMsg = ''
            }, 1000)
          }
        )
      }
    }
  },

  activated() {
    var cityId = this.$store.state.city.cityId

    if (cityId === this.prevCity) {
      if (this.scroll.hasVerticalScroll === false) {
        this.scroll = new Bscroll('.movie_body', {
          tap: 'tap',
          probeType: 1
        })
        
        this.scroll.on('scroll', (pos) => {
          this.toScrollHandler(pos)
        })
        
        this.scroll.on('touchEnd', (pos) => {
          this.toTouchEndHandler(pos)
        })
      }

      return
    }

    this.isLoading = true

    this.axios.get(`/ajax/movieOnInfoList?token=&optimus_uuid=A56D8830F66911EBA425CFF8F161357066025D44E0874C4EA5E4EC182D56F2F7&optimus_risk_level=71&optimus_code=10&cityId=${cityId}`).then(
      res => {
        this.movieList = res.data.movieList
        this.isLoading = false
        this.prevCity = cityId

        this.$nextTick(() => {
          this.scroll = new Bscroll('.movie_body', {
            tap: 'tap',
            probeType: 1
          })

          this.scroll.on('scroll', (pos) => {
            this.toScrollHandler(pos)
          })

          this.scroll.on('touchEnd', (pos) => {
            this.toTouchEndHandler(pos)
          })
        })
      }
    )
  }
}
</script>

<style scoped>
  .movie_body{ flex:1; overflow:auto;}
  .movie_body ul{ margin:0 12px; overflow: hidden;}
  .movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
  .movie_body .pic_show{ width:64px; height: 90px;}
  .movie_body .pic_show img{ width:100%;}
  .movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
  .movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
  .movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
  .movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
  .movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
  .movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
  .movie_body .btn_pre{ background-color: #3c9fe6;}

  .movie_body .scroll_down{ margin: 0;padding: 0; border: none; text-align: center;display: block;}
</style>
