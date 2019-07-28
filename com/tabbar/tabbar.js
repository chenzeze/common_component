// com/tabbar/tabbar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabbar: {},
    curRoute: ''
  },

  attached() {
    this.data.tabbar = app.globalData.tabBar;
    let pages = getCurrentPages();
    this.data.curRoute = pages[pages.length - 1].route;
    this.setData(this.data)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchtab(e) {
      let taburl = e.currentTarget.dataset.taburl;
      // console.log(this.data.curRoute)
      if (taburl == this.data.curRoute) return
      wx.redirectTo({
        url: '/' + taburl
      })
    }
  }
})
