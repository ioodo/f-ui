/**
 */
Component({
  options :{
    addGlobalClass: true,
    styleIsolation: 'shared'
  },
  properties: {
    span: {
      type: Number,
      value: 6 // 100%
    },
    gutter: {
      type: Array
    }
  },
  data : {
    style: ''
  },
  observers : {
    'gutter': function (val) {
      var padding = '';
      if (val != null && val.length > 0) {
        padding = val.map(v => v/2 + 'rpx').join(' ')
      }
      this.setData({
        style: padding.length > 0 ? 'padding: ' + padding : ''
      })
    }
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
  }
})
