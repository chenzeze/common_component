// pages/component/nav_bar/nav_bar.js
const app = getApp()
Component({
  properties: {
    navbarData: { //navbarData由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {}
    }
  },
  data: {
    editFromHomePage: false, //默认不是从首页进来的
    placeHoderHeight: 64,
    toolBarHeight: 20,
    titleBarHeight: 44,
  },
  attached: function () {
    // 1.判断页面来源
    let pages = getCurrentPages()
    let prev_page = pages.length > 1 ? pages[pages.length - 2].route : null;
    console.log(prev_page);
    const NORMAL_ENTRY = 'pages/index/index';

    // 从首页进来的
    if (prev_page && prev_page === NORMAL_ENTRY) {
      console.log("从首页进来");
      // 设置显示首页
      this.setData({
        editFromHomePage: true
      });
    }

    // 2.设置导航栏高度
    let placeHoderHeight, totalBarHeight, toolBarHeight, titleBarHeight, phoneModel;


    // 获取状态栏高度 时间、信号
    let res = wx.getSystemInfoSync();
    console.log(res);
    toolBarHeight = res.statusBarHeight;
    phoneModel = res.model;

    // 各手机型号导航栏总高度 & 占位块高度
    let phoneModels = {
      'iPhone X': 88,
      'Plus':60,
      'iPhone': 64//44+20

    }

    // 手机型号列表匹配 有问题！！
    for (let key in phoneModels) {
      if (phoneModel.search(key)>-1) {
        console.log(key);
        placeHoderHeight = totalBarHeight = phoneModels[key];
        titleBarHeight = totalBarHeight - toolBarHeight
        break;
      }
    }

    this.setData({
      placeHoderHeight: placeHoderHeight,
      toolBarHeight: toolBarHeight,
      titleBarHeight: titleBarHeight
    })


  },
  methods: {
    // 返回上一层方法
    navBack() {
      let pages = getCurrentPages()
      let prev_page = pages.length > 1 ? pages[pages.length - 2].route : null;
      const NORMAL_ENTRY = 'pages/index/index';
      // 从首页进来的,退回到组货列表
      if (prev_page && prev_page === NORMAL_ENTRY) {
        this._navToList();
      } else {
        this._navBack();
      }
    },
    // 返回上一页面
    _navBack() {
      wx.navigateBack()
    },

    // 回到组货列表
    _navToList() {
      wx.redirectTo({
        url: '/pages/sales/groupProduct/groupProduct',
      })
    },

    //返回到首页
    backHome() {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  }

})