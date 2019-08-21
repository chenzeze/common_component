// com/wrapper/wrapper.js
Component({
  // options:{
  //   multipleSlots: true
  // },
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹出层内容宽高
    panelWidth: {
      type: Number,
      value: 650
    },
    panelHeight: {
      type: Number,
      value: 188
    },

    // 弹出层位置： 底部 / 居中(优先级更高)
    panelBottom: {
      type: Boolean,
      value: false
    },
    panelCenter: {
      type: Boolean,
      value: true
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
          if (newVal) {
            wx.hideTabBar({});
          } else {
            wx.showTabBar({});
          }
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
