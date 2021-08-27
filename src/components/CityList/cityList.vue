<template>
  <div class="cinema_body">
    <ul>
      <li v-for="item in cinemaList" :key="item.id">
        <div>
          <span>{{ item.nm }}</span>
          <span class="q"><span class="price">{{ item.sellPrice }}</span> 元起</span>
        </div>
        <div class="address">
          <span>{{ item.addr }}</span>
          <span>{{ item.distance }}</span>
        </div>
        <div class="card">
          <div v-if="item.tag.allowRefund === 1" class="bl">退</div>
          <div v-if="item.tag.endorse === 1" class="bl">改签</div>
          <div v-if="item.tag.sell === 1" class="or">小吃</div>
          <div v-if="item.tag.snack === 1" class="or">折扣卡</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CityList",

  data() {
    return {
      cinemaList: []
    }
  },

  mounted() {
    var d = new Date()
    var n = d.toJSON().substr(0, 10)
    this.axios.get(`/ajax/cinemaList?day=${n}&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1630047756731&cityId=20&optimus_uuid=A56D8830F66911EBA425CFF8F161357066025D44E0874C4EA5E4EC182D56F2F7&optimus_risk_level=71&optimus_code=10`).then(
      res => {
        this.cinemaList = res.data.cinemas
      }
    )
  }
}
</script>

<style scoped>
  .cinema_body{ flex:1; overflow:auto;}
  .cinema_body ul{ padding:20px;}
  .cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
  .cinema_body div{ margin-bottom: 10px;}
  .cinema_body .q{ font-size: 11px; color:#f03d37;}
  .cinema_body .price{ font-size: 18px;}
  .cinema_body .address{ font-size: 13px; color:#666;}
  .cinema_body .address span:nth-of-type(2){ float:right; }
  .cinema_body .card{ display: flex;}
  .cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
  .cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
  .cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>
