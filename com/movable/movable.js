// com/movable/movable.js
const app = getApp()

let {
  windowWidth,
  windowHeight
} = wx.getSystemInfoSync();

let sysAveWidth = windowWidth / 2;
let sysHeight = windowHeight;

let localCoord = wx.getStorageSync('localPostion');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 移动图像url
    movabaleImg: {
      type: String,
      value: ''
    },
    // 起始位置
    startPoint: {
      type: Object,
      value: {
        x: 0,
        y: 250
      }
    },
    // 可移动水平范围
    movableAreaX: {
      type: Object,
      value: {
        from: 0,
        to: windowWidth
      }
    },
    // 可移动垂直范围
    movableAreaY: {
      type: Object,
      value: {
        from: 0,
        to: windowHeight
      }
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    endLeft: localCoord.x > sysAveWidth ? false : true,
    endRight: localCoord.x > sysAveWidth ? true : false,
    status: true,
    x: (localCoord.x >= 0) ? localCoord.x : 0,
    y: localCoord.y ? localCoord.y : windowHeight - 150
  },
  /*
   * 组件的方法列表
   */
  methods: {
    onMoveStart: function (e) {
      // 记录下此时的位置
      console.log("onMoveStart", e.changedTouches[0]);
      this.y = e.changedTouches[0].clientY - 30;
      this.x = e.changedTouches[0].clientX - 30;
    },
    onMoving: function (e) {
      this.setData({
        endLeft: false,
        endRight: false
      })
      if ((e.changedTouches[0].clientY) < -100) {
        this.setData({
          x: this.x,
          status: false,
          y: this.y
        })
      }
    },
    onMoveEnd: function (e) {
      if ((e.changedTouches[0].clientY) < -100) {
        this.setData({
          x: this.x,
          status: true,
          y: this.y,
        })
        return;
      }
      // 判断移动距离小于30的话就是单击事件
      
      let currentP = {
        x: 0,
        y: (e.changedTouches[0].clientY - 30) > 0 ? Math.abs(e.changedTouches[0].clientY - 30) : 0,
      }
      if (e.changedTouches[0].clientX > sysAveWidth) {
        this.setData({
          endRight: true
        })
        currentP.x = windowWidth - 63;
      } else {
        this.setData({
          endLeft: true
        })
        currentP.x = 13
      }
      if ((sysHeight - e.changedTouches[0].clientY) <= 60) {
        currentP.y = windowHeight - 60;
      }


      // 当距离屏幕上方距离>= 384 时，显示在上方
      if (currentP.y >= 384) {
        this.setData({
          SellerInfoTop: currentP.y - 188
        })
      } else {
        this.setData({
          SellerInfoTop: currentP.y + 188
        })
      }

      this.setData({
        x: currentP.x,
        y: currentP.y,
        status: true
      })
      console.log(currentP.x, currentP.y)
      wx.setStorageSync('localPostion', currentP);
    },
  }
})