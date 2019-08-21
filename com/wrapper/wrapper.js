// com/wrapper/wrapper.js
Component({
  // options:{
  //   multipleSlots: true
  // },
  /**
   * 组件的属性列表
   */
  properties: {
    // 背景色
    backgroundColor:{
      type: String,
      value: 'rgba(0, 0, 0, .66)'
    },
    // 是否为tab页，如果是，显示遮盖层时需要hideTabBar
    isTabPage: {
      type: Boolean,
      value: false
    },

    // 是否显示遮盖层，默认
    showWrapper: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        // console.log('从默认值false到传入值true执行一次')
        if (this.data.isTabPage) {
          // if (newVal) {
          //   wx.hideTabBar({});
          // } else {
          //   wx.showTabBar({});
          // }
        }
      }
    },

    // 关闭按钮图标
    closeBtnIcon: {
      type: String,
      value: "/resources/images/close_btn.svg"
    },

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideWrapper() {
      this.setData({
        showWrapper: false
      })
    },
    emptyFn: function () {

    },
  }
})
