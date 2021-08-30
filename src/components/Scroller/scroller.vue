<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'

export default {
  name: 'scroller',
  props: {
    isFinish: {
      type: Boolean,
      default: false
    },

    toScrollHandler: {
      type: Function,
      default: function() {}
    },

    toTouchEndHandler: {
      type: Function,
      default: function() {}
    }
  },

  // 每次isFinish改变都会触发
  watch: {
    isFinish(is) {
      if (is === true) {
        var oScroll = new Bscroll(this.$refs.wrapper, {
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
      }
    }
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
