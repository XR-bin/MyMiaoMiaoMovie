<template>
  <Loading v-if="isLoading" />
  <div class="city_body" v-else>
    <div class="city_div">
      <div class="city_list">
        <div class="city_hot">
          <h2>热门城市</h2>
          <ul class="clearfix">
            <li v-for="item in hotList" :key="item.id" @tap="toCityHandler(item.nm, item.id)">{{ item.nm }}</li>
          </ul>
        </div>
        <div class="city_sort" ref="city_sort">
          <div v-for="item in cityList" :key="item.index">
            <h2>{{ item.index }}</h2>
            <ul>
              <li v-for="itemList in item.list" :key="itemList.id" @tap="toCityHandler(itemList.nm, itemList.id)">
                {{ itemList.nm }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="city_index">
      <ul>
        <li v-for="(item, index) in cityList" :key="item.index" @touchstart="toIndexHandler(index)">
          {{ item.index }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'

export default {
  name: "City",

  data() {
    return {
      cityList: [],
      hotList: [],
      isLoading: true
    }
  },

  mounted() {
    var cityList = window.localStorage.getItem('cityList')
    var hotList = window.localStorage.getItem('hotList')

    if (cityList && hotList) {
      this.cityList = JSON.parse(cityList)
      this.hotList = JSON.parse(hotList)
      this.isLoading = false

      this.$nextTick(() => {
        this.scroll = new Bscroll('.city_div', {
          tap: 'tap',
          probeType: 1
        })
      })
    } else {
      this.axios.get('/dianying/cities.json').then(
        res => {
          var { cityList, hotList } = this.formatCityList(res.data.cts)

          this.cityList = cityList
          this.hotList = hotList
          this.isLoading = false
          window.localStorage.setItem('cityList', JSON.stringify(cityList))
          window.localStorage.setItem('hotList', JSON.stringify(hotList))

          this.$nextTick(() => {
            this.scroll = new Bscroll('.city_div', {
              tap: 'tap',
              probeType: 1
            })
          })
        })
    }
  },

  methods: {
    formatCityList(cities) {
      var cityList = []
      var hotList = []

      hotList.push(cities[1], cities[0], cities[2], cities[3], cities[13], cities[5], cities[4], cities[10], cities[9], cities[12], cities[7])

      for (let i = 0; i < cities.length; i++) {
        var firstLetter = cities[i].py.substr(0, 1).toUpperCase()
        if (toCom(firstLetter)) {
          cityList.push({ index: firstLetter, list: [{ nm: cities[i].nm, id: cities[i].id }] })
        } else {
          for (let j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id })
            }
          }
        }
      }

      function toCom(firstLetter) {
        for (let i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false
          }
        }
        return true
      }

      cityList.sort((a, b) => { return a.index.charCodeAt() - b.index.charCodeAt() })

      return {
        cityList,
        hotList
      }
    },

    toIndexHandler(index) {
      var oH2 = this.$refs.city_sort.getElementsByTagName("h2")
      // this.$refs.city_sort.parentElement.scrollTop = oH2[index].offsetTop
      // this.$refs.city_list.toScrollTop(-oH2[index].offsetTop)
      this.scroll.scrollTo(0, -oH2[index].offsetTop)
    },

    toCityHandler(cityName, cityId) {
      this.$store.commit('city/CITY_INFO', { cityName, cityId })
      window.localStorage.setItem('cityName', cityName)
      window.localStorage.setItem('cityId', cityId)
      this.$router.push('/movie/nowPlaying')
    }
  },

  activated() {
    if (this.scroll) {
      if (this.scroll.hasVerticalScroll === false) {
        this.scroll = new Bscroll('.city_div', {
          probeType: 1
        })
      }
    }
  }
}
</script>

<style scoped>
  .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
  .city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
  .city_body .city_list::-webkit-scrollbar{
      background-color:transparent;
      width:0;
  }
  .city_body .city_hot{ margin-top: 20px;}
  .city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
  .city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
  .city_body .city_sort div{ margin-top: 20px;}
  .city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
  .city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
  .city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
  .city_body .city_index{ font-size: 14px; width:24px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>
