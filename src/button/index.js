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
    },
    block: {
      type: Boolean,
      value: false
    },
    openType: {
      type: String,
      value: ''
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
    },
    bindGetUserInfo: function (event) {
      this.triggerEvent('getuserinfo', event.detail);
    },
    bindContact: function (event) {
      this.triggerEvent('contact', event.detail);
    },
    bindGetPhoneNumber: function (event) {
      this.triggerEvent('getphonenumber', event.detail);
    },
    bindError: function (event) {
      this.triggerEvent('error', event.detail);
    },
    bindLaunchApp: function (event) {
      this.triggerEvent('launchapp', event.detail);
    },
    bindOpenSetting: function (event) {
      this.triggerEvent('opensetting', event.detail);
    }
  }
})
