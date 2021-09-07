<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'

export default {
  name: 'scroller',
  props: {
    toScrollHandler: {
      type: Function,
      default: function() {}
    },

    toTouchEndHandler: {
      type: Function,
      default: function() {}
    }
  },

  mounted() {
    var oScroll = new Bscroll('.wrapper', {
      tap: 'tap',
      probeType: 1
    })

    this.scroll = oScroll

    oScroll.on('scroll', (pos) => {
      this.toScrollHandler(pos)
    })

    oScroll.on('touchEnd', (pos) => {
      this.toTouchEndHandler(pos)
    })
  },

  methods: {
    toScrollTop(y) {
      this.scroll.scrollTo(0, y)
    }
  }
}
</script>

<style scoped>
  .wrapper{ height: 100%; }
</style>
