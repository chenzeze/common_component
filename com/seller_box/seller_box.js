// pages/component/seller_box/seller_box.js
const app = getApp()

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

  },

  ready(){
    // this.initExistSellerInfo();
    // 加载分销员信息
    app.initSellerInfo().then((res) => {
      this.initExistSellerInfo();
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initExistSellerInfo() {
      let sellerInfo = wx.getStorageSync('M60_SELLER_INFO');
      let storeInfo = wx.getStorageSync('M60_STORE_INFO');
      console.log('渲染列表页分销员的头像店铺信息', sellerInfo, storeInfo);
      this.setData({ sellerInfo: sellerInfo, storeInfo: storeInfo });
    },
  }
})
