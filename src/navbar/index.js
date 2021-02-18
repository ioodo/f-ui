var strings = require('../common/strings.js');
/**
 * 导航栏
 */
Component({
  options :{
    addGlobalClass: true,
    multipleSlots: true,
    styleIsolation: 'shared'
  },
  properties: {
    globalDataName: {
      type: String,
      value: strings.globalDataName
    },
    extClass: {
      type: String
    },
    // String/slot
    back: {
      type: String
    },
    // 标题
    title: {
      type: String
    },
    subTitle: {
      type: String,
      value: ''
    }
  },
  data : {
    // 状态栏
    statusBar: {
      height: 0
    },
    // 导航栏
    navbar: {
      height: 0,
      right: 0,
      left: 0,
      displayHeight: 0
    },
    capsule: {
      height: 0
    }
  },
  observers : {
    /**
     * 观察文字内容变更
     */
    'subTitle' : function() {
      this.resizeNavbar()
    }
  },
  lifetimes: {
    ready: function () {
      // console.log('----- subtitle')
      // // var query = wx.createSelectorQuery().in(this);
      // var query = this.createSelectorQuery();
      // query.select('.f-navbar').boundingClientRect()
      // query.exec((res) => {
      //   console.log('---------///')
      //   console.log(res[0])
      // });
    }
  },
  created () {
    this.systemInfo();
  },
  attached () {
    this.render()
  },
  methods: {
    systemInfo () {
      const app = getApp()
      const { globalDataName } = this.data
      let gData = app.globalData[globalDataName]
      if (gData) {
        return gData
      }
      const sysInfo = wx.getSystemInfoSync()
      if (!sysInfo.statusBarHeight) {
        sysInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20
      }
      const menuButtonRect = this.getMenuButtonBoundingClientRect(sysInfo)
      const navHeight = menuButtonRect.height +
        (menuButtonRect.top - sysInfo.statusBarHeight) * 2;
      const navRight = sysInfo.windowWidth - menuButtonRect.left + 
        (sysInfo.windowWidth - menuButtonRect.right)
      gData = {
        windowHeight: sysInfo.windowHeight,
        statusBarHeight: sysInfo.statusBarHeight,
        navBarHeight: navHeight,
        navBarRight: navRight,
        navBarLeft: sysInfo.windowWidth - menuButtonRect.right,
        capsule: menuButtonRect
      }
      app.globalData[globalDataName] = gData
      return gData
    },
    getMenuButtonBoundingClientRect(systemInfo) {
      const ios = !!(systemInfo.system.toLowerCase().search('ios') + 1)
      let rect
      try {
        rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null
        if (rect === null) {
          throw new Error('getMenuButtonBoundingClientRect error')
        }
        // 取值为0的情况  有可能width不为0 top为0的情况
        if (!rect.width || !rect.top || !rect.left || !rect.height) {
          throw new Error('getMenuButtonBoundingClientRect error')
        }
      } catch (error) {
        let gap = '' // 胶囊按钮上下间距 使导航内容居中
        let width = 96 // 胶囊的宽度
        if (systemInfo.platform === 'android') {
          gap = 8
          width = 96
        } else if (systemInfo.platform === 'devtools') {
          if (ios) {
            gap = 5.5 // 开发工具中ios手机
          } else {
            gap = 7.5 // 开发工具中android和其他手机
          }
        } else {
          gap = 4
          width = 88
        }
        if (!systemInfo.statusBarHeight) {
          // 开启wifi的情况下修复statusBarHeight值获取不到
          systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20
        }
        rect = {
          // 获取不到胶囊信息就自定义重置一个
          bottom: systemInfo.statusBarHeight + gap + 32,
          height: 32,
          left: systemInfo.windowWidth - width - 10,
          right: systemInfo.windowWidth - 10,
          top: systemInfo.statusBarHeight + gap,
          width
        }
      }
      return rect
    },
    render () {
      const sysInfo = getApp().globalData[this.data.globalDataName]
      this.setData({
        ['statusBar.height']: sysInfo.statusBarHeight,
        ['navbar.height']: sysInfo.navBarHeight,
        ['navbar.right']: sysInfo.navBarRight,
        ['navbar.left']: sysInfo.navBarLeft,
        capsule: sysInfo.capsule
      }, () => {
        this.resizeNavbar()
      })
    },
    resizeNavbar () {
      const { navbar } = this.data;
      var query = this.createSelectorQuery();
      query.select('.navbar-left').boundingClientRect()
      query.select('.navbar-right').boundingClientRect()
      query.exec((res) => {
        var h = res.map(r => r.height).sort((r1, r2) => {
          return r2 - r1
        })[0]
        this.setData({
          ['navbar.displayHeight']: h < navbar.height ? navbar.height : h
        }, () => {
          this.emitResize()
        })
      });
    },
    emitResize () {
      const sysInfo = getApp().globalData[this.data.globalDataName]
      this.triggerEvent('resize', {
        height: sysInfo.statusBarHeight + this.data.navbar.displayHeight
      });
    },
    handleBack () {
      const { back } = this.data;
      if (!back) {
        wx.navigateBack();
      } else {
        wx.redirectTo({
          url: back
        })
      }
      this.triggerEvent('back');
    }
  }
})
