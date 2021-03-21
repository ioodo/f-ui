var strings = require('../common/strings.js');
/**
 */
Component({
  options :{
    addGlobalClass: true,
    multipleSlots: true,
    styleIsolation: 'shared'
  },
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    position: {
      type: String,
      value: 'center'
    },
    toolbar: {
      type: Boolean,
      value: true
    },
    columns: {
      type: Array,
      value: []
    },
    value: {
      type: Array,
      value: []
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    okText: {
      type: String,
      value: '确认'
    },
    title: {
      type: String,
      value: ''
    }
  },
  data : {
    contentClassName: '',
    isPickStart: false,
    isOkTrigger: false
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
    onCancel () {
      this.handleAction('cancel')
    },
    onOk () {
      const { isPickStart } = this.data
      if (isPickStart) {
        this.data.isOkTrigger = true
        return
      }
      this.handleAction('ok')
    },
    handleAction(action) {
      wx.nextTick(() => {
        this.triggerEvent(action, {
          position: this.data.value,
          value: this.getValue()
        })
      })
    },
    handlePickstart (e) {
      this.data.isPickStart = true
    },
    handlePickend (e) {
      this.data.isPickStart = false
    },
    handleChange (e) {
      const { value } = e.detail
      this.setData({
        value: value
      }, () => {
        this.triggerEvent('change', {
          position: value,
          value: this.getValue()
        })

        if (this.data.isOkTrigger) {
          this.handleAction('ok')
          this.data.isOkTrigger = false
        }
      })
    },
    getValue () {
      var result = []
      var { value, columns } = this.data
      var i = 0
      columns.forEach(col => {
        result.push(col[value[i] != null ? value[i] : 0 ])
        i++;        
      })
      console.log(result)
      return result;
    }
  }
})
