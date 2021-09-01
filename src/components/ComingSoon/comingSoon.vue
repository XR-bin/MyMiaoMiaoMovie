<template>
  <div class="movie_body">
    <Loading v-if="isLoading" />
    <Scroller v-else :isFinish="isFinish">
      <ul>
        <li v-for="item in comingList" :key="item.id">
          <div class="pic_show"><img :src="item.img | setWH('128.180')"></div>
            <div class="info_list">
              <h2>{{ item.nm }}<img v-if="item.version" src="../../assets/maxs.png"></h2>
                <p><span class="grade">{{ item.wish }}</span> 人想看</p>
                <p>主演: {{ item.star }}</p>
                <p>{{ item.showInfo }}</p>
          </div>
          <div class="btn_mall">
            预售
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: "ComingSoon",

  data() {
    return {
      comingList: [],
      isFinish: false,
      isLoading: true,
      prevCity: -1
    }
  },

  activated() {
    var cityId = this.$store.state.city.cityId
    
    if (cityId === this.prevCity) {
      return
    }
    
    this.isLoading = true
    
    this.axios.get(`ajax/comingList?ci=20&token=&limit=10&optimus_uuid=A56D8830F66911EBA425CFF8F161357066025D44E0874C4EA5E4EC182D56F2F7&optimus_risk_level=71&optimus_code=10&cityId=${cityId}`).then(
      res => {
        this.comingList = res.data.coming
        this.isLoading = false
        this.prevCity = cityId
        
        this.$nextTick(() => {
          this.isFinish = true
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
  .movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #3C9FE6; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
  .movie_body .btn_pre{ background-color: #3c9fe6;}
</style>
