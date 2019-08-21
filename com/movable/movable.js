// com/movable/movable.js
const app = getApp()

let {
  windowWidth,
  windowHeight
} = wx.getSystemInfoSync();

let sysAveWidth = windowWidth / 2;
let sysHeight = windowHeight;
let leftDistance = 9; // 停靠时距离左边距离
let rightDistance = 54; // 停靠时距离右边距离

let localCoord = wx.getStorageSync('localPostion');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 移动图像url
    content: {
      type: String,
      value: ''
    },
    isShowSellerInfo: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    SellerInfoTop: 0, // 距离屏幕上方距离
    endLeft: localCoord.x > sysAveWidth ? false: true,
    endRight: localCoord.x > sysAveWidth ? true: false,
    status: true, // 用来隐藏移动图标，没用到
    x: (localCoord.x >= leftDistance) ? localCoord.x : leftDistance,
    y: localCoord.y ? localCoord.y : windowHeight - 150
  },
  /*
   * 组件的方法列表
   */
  methods: {
    showSellerInfoWrapper: function(){
      this.setData({
        isShowSellerInfo: true
      });
      this.triggerEvent('isShowSellerInfo', this.data.SellerInfoTop);
    },

    onShareMoveStart: function(e) {
      // 防止误触碰
      if(e.changedTouches[0]){
        this.y = e.changedTouches[0].clientY - 30;
        this.x = e.changedTouches[0].clientX - 30;
      }
    },
    onShareMoving: function(e) {
      // 移动中不显示停靠状态
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
        currentP.x = windowWidth - rightDistance;
      }else{
        currentP.x = leftDistance
      }
      if ((sysHeight - e.changedTouches[0].clientY) <= 60) {
        currentP.y = windowHeight - 60;
      }


      // 当距离屏幕上方距离>= 384 时，显示在上方
      if (currentP.y >= 384) {
        this.setData({
          SellerInfoTop: currentP.y + 288
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
      wx.setStorageSync('localPostion', currentP);

      let _this = this;
      setTimeout(() => {
        if (currentP.x <= (leftDistance + 30)){ //x坐标小于[指定距离 + 30（误差距离）时，显示子弹头虚化背景]lop
          _this.setData({
            endLeft: true
          })
        }else{
          _this.setData({
            endRight: true
          })
        }
      }, 100);
    },
  }
})