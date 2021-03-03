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
    contentClassName: ''
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
    handleChange (e) {
      this.setData({
        value: e.detail.value
      })
      wx.nextTick(() => {
        this.triggerEvent('change', {
          position: e.detail.value,
          value: this.getValue()
        })
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
      return result;
    }
  }
})
