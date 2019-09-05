//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    tabBar: {
      "borderStyle": "#b2b2b2",
      "color": "#b2b2b2",
      "selectedColor": "#333",
      "backgroundColor": "#fff",
      "list": [
        {
          "pagePath": "pages/index/index",
          "text": "首页",
          "iconPath": "/images/home.jpg",
          "selectedIconPath": "/images/home_active.jpg"
        },
        {
          "pagePath": "pages/poster/poster",
          "text": "海报",
          "iconPath": "/images/discover.jpg",
          "selectedIconPath": "/images/discover_active.jpg"
        }
      ]
    }
  },

  // 封装接口请求
  wxRequest: function ({
    interfaceName,
    reqData,
    bodyData,
    failCb = (res) => {
      console.log('请求失败~具体信息为：', res);
      wx.showToast({
        title: res.message && res.message.length > 7 ? '接口请求错误' : res.message && res.message.length <= 7 ? res.message : '接口请求错误',
        image: '/images/err_tip_icon.png',
        duration: 2000
      })
      
    },
    extendsOptions = {}
  }) {
    // 页面中请求数量++,处理多并发情况
    if (this.globalData.pageRequestCount === 0) {
      wx.showLoading({
        title: '加载中...',
      });
    }
    this.globalData.pageRequestCount++;

    const domin = extendsOptions.interfaceDomin || CONFIG.goodsInterfaceDomin;
    const reqUrl = reqData ?
      `${domin}${interfaceName}?${queryHelper.queryEncoded(reqData)}` :
      `${domin}${interfaceName}`;
    let header;

    // console.log('请求信息：', reqUrl, reqData);

    if(extendsOptions.contentType){
      header = {
        'content-type': extendsOptions.contentType,
        cookie_id: this.appData.cookieId
      }
    }else{
      header = {
        ...CONFIG.header,
        cookie_id: this.appData.cookieId
      }
    }
    return wsAPI.request({
      url: reqUrl,
      data: bodyData || '',
      method: extendsOptions.method || CONFIG.reqMethod,
      header: header
    }).then((res) => {
      if(this.globalData.pageRequestCount <= 0) return;
      this.globalData.pageRequestCount--;
      if (this.globalData.pageRequestCount === 0) {
        let _this = this;
        // 加载完之后等待 500ms，再次检查是否没有新的请求, 如果没有，这才结束加载框
        let timer = setTimeout(function(){
          if(timer){
            clearTimeout(timer);
          }
          if(_this.globalData.pageRequestCount === 0){
            wx.hideLoading();
          }
        }, 500)
      }
      if (res.data.code != '1') {
        if (extendsOptions.skipFailCb) {
          console.log('request error: ', res.data);
        } else {
          console.log('请求失败的路径0：', reqUrl, reqData);
          failCb(res.data);
        }
      }
      if (extendsOptions.wantRes) {
        return res.data;
      } else {
        return res.data.content;
      }

    }, (res) => {
      if (isShowLoad === 1) {
        // wx.hideLoading();
        this.hideLoading();
      }
      console.log('请求失败的路径1：', reqUrl, reqData);
      failCb(res.data);
      return res;
    })
  },
})