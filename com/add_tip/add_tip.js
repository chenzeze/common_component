// pages/component/add-tips/add-tip.js
const app = getApp()
const CONFIG = app.globalData.config;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: '添加到我的小程序，下次使用更方便'
    },
    duration: {
      type: Number,
      value: 5
    },
    status:{
      type: String,
      value: "pending", // 默认状态
      observer(newVal, oldVal){
        // 值只第一次改变
        if(newVal == "resolve" && oldVal=="pending"){ 
          this.setData({
            SHOW_TIPS: true
          })
          this.init();
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: "/images",
    timer: null,
    SHOW_TIPS: false
  },

  ready: function () {
    // 开始显示并计时
    this.init();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init(){
      //判断是否需要显示
      if (!this.data.SHOW_TIPS) return;
      // 判断用户是否主动关闭了显示
      if (wx.getStorageSync('M60_hideTips')) {
        this.setData({
          SHOW_TIPS: false
        })
        return;
      }
      //关闭时间
      this.data.timer = setTimeout(() => {
        this.setData({
          SHOW_TIPS: false
        })
      }, this.data.duration * 1000)
    },
    closeTip() {
      // 用户主动关闭
      let timer = this.data.timer;
      if (timer) {
        clearTimeout(timer);
      }
      this.setData({
        SHOW_TIPS: false
      });
      wx.setStorageSync('M60_hideTips', true);
    }
  }
})