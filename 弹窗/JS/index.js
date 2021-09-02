import Vue from 'vue'
import MessageBox from './MessageBox/massageBox.vue'

export var messageBox = (function() {
  var defaults = {
    title: '',
    conten: '',
    cancel: '',
    ok: '',
    cancelHandler: null,
    okHandler: null
  }

  var MyComponent = Vue.extend(MessageBox)

  return function(opts) {
    for (var attr in opts) {
      defaults[attr] = opts[attr]
    }

    var vm = new MyComponent({
      el: document.createElement('div'),

      data: {
        title: defaults.title,
        conten: defaults.conten,
        cancel: defaults.cancel,
        ok: defaults.ok
      },

      methods: {
        cancelHandler() {
          defaults.cancelHandler && defaults.cancelHandler.call(this)
          document.body.removeChild(vm.$el)
        },

        okHandler() {
          defaults.okHandler && defaults.okHandler.call(this)
          document.body.removeChild(vm.$el)
        }
      }
    })

    document.body.appendChild(vm.$el)
  }
})()
