//index.js
//获取应用实例
const app = getApp()
import Poster from '../../com/json2poster/poster-model.js';

Page({
  data: {
    isShowIndexAddTip: "pending",
    imgUrl: '/images',
    navList : [ // 导航菜单
      {
        "action": "",
        "icon": "/index/icon_micro_shop.svg",
        "title":"点击展开弹窗",
        "method": "showWrapper"
      },
      {
        "action": "/pages/concern_poster/concern_poster",
        "icon": "/index/icon_concern.svg",
        "title":"授权显示可拖动个人信息悬浮框",
        "method": ""
      },
      {
        "action": "/pages/material_center/material_center",
        "icon": "/index/icon_sucai.svg",
        "title":"显示收藏提示",
        "method": "showAddTip"
      },
      {
        "action": "/pages/sales/myFans/myFansList",
        "icon": "/index/icon_fans.svg",
        "title":"绘制海报",
        "method": "handleClickPic"
      }
    ],

    isshowWrapper: false, // 默认是否显示弹窗

    isShowSellerInfo: false, // 默认不显示可拖动悬浮窗弹窗
    hasUserInfo: false,
    SellerInfoTop: 0,
    userInfo: {},

    ifShowPoster: false, // 单张图片是否开始生成海报
    posterType: 'default', // 海报类型
    reqParams: {},
    poster: null, 
    item: {},

    motto: 'Hello World',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  showAddTip: function() {
    this.setData({
      isShowIndexAddTip: "resolve"
    })
  },
  // 点击生成海报
  handleClickPic: function(event) {
    let _this = this;
    wx.showModal({
      title: '获取二维码警告',
      content: '请确保小程序已经发布，在未发布之前无法获取小程序码，体验版也不可以。',
      success: function (res) {
        if (res.confirm) {
          _this.drawPoster(event, true);
          return;
        }else if (res.cancel) {
          _this.drawPoster(event, false);
          return;
        }
      }
    })
    // console.log("将会报错 ！！！！fail invalid page hint");
  },

  drawPoster: function(event, withQrCode) {
    if(this.data.isDoingSaveAll) return;
    let item = this.data.item;
    let reqParams = {};
    if(!this.data.poster){
      this.data.poster = new Poster();
    }
    let poster = this.data.poster;
    if(withQrCode){
      poster.getQrCode('index').then((path)=> {
        console.log("生成的二维码", path);
        wx.showLoading({
          title: '绘制分享图片中',
          mask: true
        })
        // 改变动态参数
        if (item.pictureSort === 0) {
          reqParams = {
            mainPic: CONFIG.productGroupItemImgUrl + item.imgUrl,
            avatarUrl: this.data.avatarUrl,
            sellerName: this.data.sellerName,
            shopName: this.data.shopName,
            qrCode: path,
            productName: item.productName,
            salePrice: item.price.toString(),
            originPrice: "￥ " + item.listPrice
          }
        }else {
          reqParams = {
            mainPic: CONFIG.productGroupItemImgUrl +item.imgUrl,
            qrCode: path
          }
        }
        this.setData({
          ifShowPoster: true,
          posterType: item.pictureSort,
          reqParams: reqParams
        })
      }).catch(e=>{
        wx.showToast({
          title: '需先发布小程序',
          image: '/images/err_tip_icon.png',
          duration: 2000
        })
      })
    }else{
      wx.showLoading({
        title: '绘制分享图片中',
        mask: true
      })
      this.setData({
        ifShowPoster: true,
        posterType: 'index',
        reqParams: reqParams
      })
    }
    
  },
        

  // 关闭海报预览
  closePoster: function() {
    this.setData({
      ifShowPoster: false
    })
  },

  // 可拖动悬浮中用户身份弹窗
  showSellerInfoWrapper: function(e){
      console.log("从movable组件中获取到元素当前位置：", e.detail);
      this.setData({
        isShowSellerInfo: true,
        SellerInfoTop: e.detail
      })
      wx.hideTabBar({});
  },
  closedSellerInfoWrapper: function(){
    this.setData({
      isShowSellerInfo: false
    })
    wx.showTabBar({});
  },

  // 遮盖层
  showWrapper(){
    this.setData({
      isshowWrapper: true
    })
  },
  hideWrapper(){
    this.setData({
      isshowWrapper: false
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.showAddTip();
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },

  // 授权获取用户个人信息
  getUserInfo: function(e) {
    console.log("用户个人信息授权情况", e);
    app.globalData.userInfo = e.detail.userInfo
    if(e.detail.userInfo){
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },

  /**
   * 普通页跳转函数
   */
  navigateFn: function(e) {
    const action = e.currentTarget.dataset.action;
    wx.navigateTo({
        url: action
    })
  },

})
