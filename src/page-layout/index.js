var strings = require('../common/strings.js');
/**
 * 基础布局
 */
Component({
  options :{
    addGlobalClass: true,
    multipleSlots: true,
    styleIsolation: 'shared'
  },
  properties: {
    navbar: {
      type: Object,
      value: {}
    },
    backgroundImage: {
      type: String
    },
    disablePullDownRefresh: {
      type: Boolean,
      value: false
    },
    disablePullUpRefresh: {
      type: Boolean,
      value: false
    },
    toolbar: {
      type: Boolean,
      value: false
    }
  },
  data : {
    contentHeight: 0,
    refreshing: false,
    nomore: false,
    keyboardHeight: 0
  },
  observers : {
  },
  lifetimes: {
    ready: function () {
      this.resize()
    }
  },
  created () {
  },
  attached () {
  },
  methods: {
    onBack () {
      this.triggerEvent('back');
    },
    onNavbarResize ({ detail }) {
      this.resize()
    },
    resize () {
      // const gd = getApp().globalData[strings.globalDataName]
      const sysInfo = wx.getSystemInfoSync()

      var query = this.createSelectorQuery();
      query.select('.page-layout-navbar').boundingClientRect()
      query.select('.f-toolbar-comp').boundingClientRect()
      query.exec((res) => {
        this.setData({
          contentHeight: sysInfo.windowHeight - res[0].height - (res[1] != null ? res[1].height : 0) - this.data.keyboardHeight
        })
      });
    },
    refreshData: function () {
      this.setData({
        refreshing: true
      })
      this.triggerEvent("refresh", {
        refreshing: true
      })
      // setTimeout(() => {
      //   this.setData({
      //     refreshing: false,
      //     nomore: false,
      //   });
      // }, 2000);
    },
    loadMore () {
      this.setData({
        refreshing: true,
      })
      this.triggerEvent("refresh", {
        refreshing: false
      })
      // setTimeout(() => {
      //   this.setData({
      //     nomore: true,
      //     refreshing: false
      //   })
      // }, 2000);
    },
    stopRefresh (hasMore) {
      const params = {
        refreshing: false
      }
      if (hasMore != null)
        params.nomore = !hasMore
      this.setData(params)
    },
    scrollTop () {
      var ptf = this.selectComponent(".page-content-ptf");
      ptf.scrollTop()
    },
    registKeyboardEvent (callback) {
      wx.onKeyboardHeightChange(res => {
        if (callback) {
          callback(res)
        }
        this.data.keyboardHeight = res.height
        wx.nextTick(() => {
          this.resize()
        })
      })
    },
    unregistKeyboardEvent () {
      this.data.keyboardHeight = 0
      wx.offKeyboardHeightChange()
    }
  }
})
