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
    // 形状
    shape: {
      type: String
    },
    // 是否允许选择
    checkable: {
      type: Boolean,
      value: false
    },
    checked: {
      type: Boolean,
      value: false
    },
    extra: {
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
      var _checked = this.data.checked
      if (this.data.checkable) {
        _checked = !this.data.checked
        this.setData({
          checked: _checked
        })
      }
      this.triggerEvent('ftap', {
        extra: this.data.extra,
        checked: _checked
      })
    }
  }
})
