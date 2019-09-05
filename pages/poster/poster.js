// pages/poster/poster.js
import Poster from "../../com/json2poster/poster-model.js";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isDoingSaveAll: false, // 一键保存中
    isShowCanvas: false, // 一键保存中开始绘制海报
    reqParams: {
      // 海报模板动态改变参数
      "0": function(item) {
        return {
          mainPic: item.url,
          avatarUrl: item.avatarUrl,
          sellerName: item.sellerName,
          shopName: item.shopName,
          qrCode: item.qrCode,
          productName: item.productName,
          salePrice: item.salePrice,
          originPrice: "￥ " + item.originPrice
        };
      },
      "1": function(item) {
        return {
          mainPic: item.url,
          qrCode: item.qrCode
        };
      }
    },
    productList: [
      {
        pictureSort: 0,
        painting: {},
        url:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567611837157&di=81bcf074a937055f20dc628d42239819&imgtype=0&src=http%3A%2F%2Fi1.17173.itc.cn%2F2009%2Fkx%2F2009%2F06%2F16%2F20090616171420490.jpg",
        avatarUrl:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567611837156&di=96a2ff1ee4098fbee46542f0d7e69c01&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-vo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F7af40ad162d9f2d37a55e7ebaaec8a136327cc6a.jpg",
        sellerName: "Dynamite",
        shopName: "广州bat哈哈哈哈哈哈够优秀才可以",
        qrCode:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=620579142,3051099267&fm=26&gp=0.jpg",
        productName: "房间卡就付款啦发进口量",
        salePrice: "1223",
        originPrice: "￥ " + "1234"
      },
      {
        pictureSort: 0,
        painting: {},
        url:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567611837156&di=1e960aaa252f8b86ec38d2e7172f85e3&imgtype=0&src=http%3A%2F%2Fpic.k73.com%2Fup%2Fsoft%2F2016%2F0102%2F092635_44907394.jpg",
        avatarUrl:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567611837156&di=96a2ff1ee4098fbee46542f0d7e69c01&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-vo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F7af40ad162d9f2d37a55e7ebaaec8a136327cc6a.jpg",
        sellerName: "Dynamite",
        shopName: "广州bat哈哈哈哈哈哈够优秀才可以",
        qrCode:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=620579142,3051099267&fm=26&gp=0.jpg",
        productName: "房间卡就付款啦发进口量",
        salePrice: "1223",
        originPrice: "￥ " + "1234"
      },
      {
        pictureSort: 1,
        painting: {},
        url:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567611837156&di=a2052a04124f7ac3949189e7fa75bae0&imgtype=0&src=http%3A%2F%2Fimage.finance.china.cn%2Fupload%2Fimages%2F2014%2F0410%2F085000%2F0_2323627_580fd395d60d023a4cf8b45c31cd1218.jpg",
        qrCode:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=620579142,3051099267&fm=26&gp=0.jpg"
      },
      {
        pictureSort: 1,
        painting: {},
        url:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567611837156&di=e065f703ed4aeef684752338fee82919&imgtype=0&src=http%3A%2F%2Fpic.syd.com.cn%2F0%2F100%2F72%2F68%2F100726839_00000000171c5904.jpg",
        qrCode:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=620579142,3051099267&fm=26&gp=0.jpg"
      },
      {
        pictureSort: 0,
        painting: {},
        url:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567611837155&di=3621bfb678846d40f309203d924a8c3e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201111%2F24%2F20111124171617_iNukV.jpg",
        avatarUrl:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567611837156&di=96a2ff1ee4098fbee46542f0d7e69c01&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-vo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F7af40ad162d9f2d37a55e7ebaaec8a136327cc6a.jpg",
        sellerName: "Dynamite",
        shopName: "广州bat哈哈哈哈哈哈够优秀才可以",
        qrCode:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=620579142,3051099267&fm=26&gp=0.jpg",
        productName: "房间卡就付款啦发进口量",
        salePrice: "1223",
        originPrice: "￥ " + "1234"
      },
      {
        pictureSort: 0,
        painting: {},
        url:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567611837153&di=36ee63efa40fb45b5ce2ae79b93a977a&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F86%2F98%2F14300001030807128763987030586.jpg",
        avatarUrl:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567611837156&di=96a2ff1ee4098fbee46542f0d7e69c01&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-vo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F7af40ad162d9f2d37a55e7ebaaec8a136327cc6a.jpg",
        sellerName: "Dynamite",
        shopName: "广州bat哈哈哈哈哈哈够优秀才可以",
        qrCode:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=620579142,3051099267&fm=26&gp=0.jpg",
        productName: "房间卡就付款啦发进口量",
        salePrice: "1223",
        originPrice: "￥ " + "1234"
      },
      {
        pictureSort: 1,
        painting: {},
        url:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567611837155&di=43c32abd99d03c303859b5d8827bc1a4&imgtype=0&src=http%3A%2F%2Fimg3.ph.126.net%2F1KDLXCf_5HxC0KDAxUQZSg%3D%3D%2F2866541162838628463.jpg",
        qrCode:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=620579142,3051099267&fm=26&gp=0.jpg"
      },
      {
        pictureSort: 1,
        painting: {},
        url:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567611837154&di=588397e27dd1dacb51d8cbf515a9af46&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20131022%2FImg388642374.jpg",
        qrCode:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=620579142,3051099267&fm=26&gp=0.jpg"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.poster = new Poster();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  // 根据海报模板去拼接painting
  getPosterParams(productList, index) {
    let item = productList[index];
    // TODO:先去获取二维码，设置item.qrCode
    let reqParams = this.data.reqParams[item.pictureSort.toString()](item);
    let poster = this.poster;
    let painting = poster.getPosterParams(
      item.pictureSort.toString(),
      reqParams
    );
    productList[index].painting = painting;
  },

  // 获取需要根据海报模板动态改变的参数并开始绘制
  startPainting(productList) {
    wx.showLoading({
      title: "正在准备下载",
      mask: true
    });
    for (let index = 0, len = productList.length; index < len; index++) {
      this.getPosterParams(productList, index);
    }
    this.setData({
      isShowCanvas: true,
      productList: productList
    });
  },

  // 获取设置
  goOpenSetting() {
    wx.openSetting({
      success(res) {
        // 如果还是没有授权的话
        if (res.authSetting["scope.writePhotosAlbum"] === false) {
          wx.showToast({
            title: "未开启保存权限",
            image: "/images/common/err_tip_icon.png",
            duration: 2000
          });
          return;
        }
      }
    });
  },

  // 一键保存
  saveAll(event) {
    const _this = this;
    if (this.data.isDoingSaveAll) return;
    wx.getSetting({
      success(res) {
        // 如果用户拒绝过授权,则打开设置引导用户重新授权
        if (res.authSetting["scope.writePhotosAlbum"] === false) {
          this.goOpenSetting();
        }
        // 已授权或者未打开过授权窗口
        else {
          _this.setData({
            isDoingSaveAll: true
          });

          _this.data.activeItemIndex = 0; // 默认从第一张图片开始绘制
          _this.data.failItemIndexList = []; // 默认无绘制失败的海报

          _this.startPainting(_this.data.productList);
        }
      }
    });
  },

  // 当前海报绘制完成
  eventGetImage(event) {
    const { tempFilePath, errMsg } = event.detail;
    if (errMsg === "canvasdrawer:ok") {
      this.saveImg(tempFilePath);
    } else {
      console.log(errMsg);
    }
  },

  // 显示下载进度
  showDownLoadProcess() {
    wx.showLoading({
      title:
        "正在下载 " +
        this.data.activeItemIndex +
        "/" +
        this.data.productList.length,
      mask: true
    });
  },

  // 保存图片
  saveImg(imgUrl) {
    let _this = this;
    wx.saveImageToPhotosAlbum({
      filePath: imgUrl,
      success(res) {
        _this.data.activeItemIndex++;
        _this.showDownLoadProcess();
        if (_this.data.activeItemIndex == _this.data.productList.length) {
          _this.setData({
            isShowCanvas: false, // 重新初始化canvas画报为false,等参数拼接完再去绘制下一张
            isDoingSaveAll: false
          });
          wx.hideLoading();
        }
      },
      fail() {
        wx.showToast({
          title: "未开启保存权限",
          image: "/images/common/err_tip_icon.png",
          duration: 2000
        });
        _this.setData({
          isDoingSaveAll: false
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
