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
    content: String
  },
  /**
   * 组件的初始数据
   */
  data: {
    SellerInfoTop: 0,
    imgUrl: app.globalData.imgUrl,
    showOnTop:false,
    isShowSellerInfo: false,
    endLeft: localCoord.x > sysAveWidth ? false: true,
    endRight: localCoord.x > sysAveWidth ? true: false,
    status: true,
    x: (localCoord.x >= 0) ? localCoord.x : 0,
    y: localCoord.y ? localCoord.y : windowHeight - 150
  },
  /*
   * 组件的方法列表
   */
  methods: {
    showSellerInfoWrapper: function(){
       this.setData({
         isShowSellerInfo: true
       })
       wx.hideTabBar({});
    },
    closedSellerInfoWrapper: function(){
      this.setData({
        isShowSellerInfo: false
      })
      wx.showTabBar({});
   },
    onShareMoveStart: function(e) {
      // 防止误触碰
      if(e.changedTouches[0]){
        this.setData({
          endLeft: false,
          endRight: false,
          showOnTop: false
        })
        this.y = e.changedTouches[0].clientY - 30;
        this.x = e.changedTouches[0].clientX - 30;
      }
    },
    onShareMoving: function(e) {
      if(this.data.isShowSellerInfo){
        return
      }
      if ((e.changedTouches[0].clientY) < -100) {
        this.setData({
          x: this.x,
          status: false,
          y: this.y
        })
      }
    },
    onShareMoveEnd: function(e) {
      if ((e.changedTouches[0].clientY) < -100) {
        this.setData({
          x: this.x,
          status: true,
          y: this.y,
        })
        return;
      }
      let currentP = {
        x: 0,
        y: (e.changedTouches[0].clientY - 30) > 0 ? Math.abs(e.changedTouches[0].clientY - 30) : 0,
      }
      if (e.changedTouches[0].clientX > sysAveWidth) {
        this.setData({
          endRight: true
        })
        currentP.x = windowWidth - 63;
      }else{
        this.setData({
          endLeft: true
        })
        currentP.x = 13
      }
      if ((sysHeight - e.changedTouches[0].clientY) <= 60) {
        currentP.y = windowHeight - 60;
      }
      

      // 当距离屏幕上方距离>= 384 时，显示在上方
      if(currentP.y >= 384){
        this.setData({
          SellerInfoTop: currentP.y - 188
        })
      }else{
        this.setData({
          SellerInfoTop: currentP.y + 188
        })
      }
      
      this.setData({
        x: currentP.x,
        y: currentP.y,
        status: true
      })
      console.log(currentP.x,currentP.y)
      wx.setStorageSync('localPostion', currentP);
    },
  }
})