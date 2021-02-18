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
    handleChange (e) {
      this.setData({
        value: e.detail.value
      })
      this.triggerEvent('change', {
        ...(e.detail)
      })
    }
  }
})
