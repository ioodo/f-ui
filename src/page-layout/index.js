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
    }
  },
  data : {
    contentHeight: 0,
    refreshing: false,
    nomore: false
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
    onBack () {
      this.triggerEvent('back');
    },
    onNavbarResize ({ detail }) {
      const gd = getApp().globalData[strings.globalDataName]

      var query = this.createSelectorQuery();
      query.select('.page-layout-navbar').boundingClientRect()
      query.exec((res) => {
        this.setData({
          contentHeight: gd.windowHeight - res[0].height
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
      this.setData({
        nomore: !hasMore,
        refreshing: false
      })
    }
  }
})
