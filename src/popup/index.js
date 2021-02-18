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
    contentClass: {
      type: String
    },
    visible: {
      type: Boolean,
      value: false
    },
    position: {
      type: String,
      value: 'center'
    }
  },
  data : {
    contentClassName: ''
  },
  observers : {
    'visible': function () {
      this.setClassName()
    },
    'position': function () {
      this.setClassName()
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
    onPopupTap () {
      this.triggerEvent('overlayTap')
    },
    setClassName () {
      var cls = [];
      cls.push('f-popup-content-' + this.data.position);
      if (this.data.visible)
        cls.push('f-popup-content-show');
      this.setData({
        contentClassName: cls.join(' ')
      })
    }
  }
})
