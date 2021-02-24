/**
 * https://github.com/youzan/vant-weapp/blob/dev/lib/dialog/index.js
 */
Component({
  options :{
    addGlobalClass: true,
    multipleSlots: true,
    styleIsolation: 'shared'
  },
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    showCancelButton: {
      type: Boolean,
      value: false
    },
    showOkButton: {
      type: Boolean,
      value: true
    },
    cancelButtonText: {
      type: String,
      value: '取消'
    },
    okButtonText: {
      type: String,
      value: '确定'
    },
    buttonGutter: {
      type: Array,
      value: [ 0, 35 ]
    },
    title: {
      type: String
    },
    content: {
      type: String
    }
  },
  data : {
    buttonSpan: 0,
    callback: function (){}
  },
  observers : {
    'showCancelButton,showOkButton': function () {
      this.resizeButtons()
    }
  },
  lifetimes: {
    ready: function () {
    }
  },
  created () {
  },
  attached () {
    this.resizeButtons()
  },
  methods: {
    resizeButtons () {
      var buttons = 0;
      if (this.data.showCancelButton)
        buttons++;
      if (this.data.showOkButton)
        buttons++;
      this.setData({
        buttonSpan: 6 / buttons
      })
    },
    onCancel () {
      this.handleAction('cancel')
    },
    onOk () {
      this.handleAction('ok')
    },
    handleAction (action) {
      this.setData({
        show: false
      })
      wx.nextTick(() => {
        this.triggerEvent(action)
        const { callback } = this.data
        if (callback) {
          callback(action, this)
        }
      })
    }
  }
})
