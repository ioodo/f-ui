/**
 */
Component({
  options :{
    addGlobalClass: true,
    multipleSlots: true,
    styleIsolation: 'shared'
  },
  properties: {
    text: {
      type: String
    },
    // 图标
    icon: {
      type: String
    },
    size: {
      type: String,
      value: 'default'
    },
    type: {
      type: String,
      value: 'default'
    },
    fill: {
      type: Boolean,
      value: false
    },
    shape: {
      type: String
    },
    extClass: {
      type: String
    }
  },
  data : {
    _value: ''
  },
  observers : {
  },
  lifetimes: {
    ready: function () {
    }
  },
  created () {
  },
  attached () {
  },
  methods: {
    onTap () {
      this.triggerEvent('ftap')
    }
  }
})
