// components/poster/poster.js
import Poster from './poster-model.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否展示
    showed:{
      type: Boolean,
      value: false,
      observer(newVal, oldVal){
        if(newVal){
          this.eventDraw();
        }
      }
    },
    // 海报类型
    posterType: {
      type: String,
      value: 'default'
    },
    // 动态改变参数
    reqParams:{
      type: Object,
      value: {},
      observer(newVal, oldVal) {
        console.log("绘制海报类型:", this.data.posterType);
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal))
          this.eventDraw(this.data.posterType, newVal);
      }
    },
    showed: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    poster: null,
    painting: {},
    shareImage: '',
    isPaint: false
  },

  ready() {
    if(this.data.showed){
      console.log("要动态改变的海报参数",this.data.reqParams)
      this.eventDraw();
    }else{
      console.log("不绘制海报");
      return
    }
  },

 
  methods: {
    // 关闭展示
    closePoster() {
      this.triggerEvent('closePoster')
    },
    
    // 获取选择的图片
    bindChooseImg() {
      let that = this;
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          // tempFilePaths中第一张，作为img标签的src属性显示图片
          let tempFilePaths = res.tempFilePaths[0];
          // that.setData({
          //   customImg: tempFilePaths,
          // })
          
          /* 获取本地图片成功后，生成自定义海报图 */
          wx.getImageInfo({
            src: tempFilePaths,
            success(res) {
              // 根据传进来的参数类型，绘制不同版的海报
              that.data.reqParams = {
                mainPic: res.path
              }
              that.eventDraw(that.data.posterType, that.data.reqParams);
            }
          })
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    },

    // 绘制海报，根据不同的海报类型，传入默认的参数，再根据传进去的的具体主图和描述进行修改
    eventDraw() {
      let posterType = this.data.posterType;
      let reqParams = this.data.reqParams;
      let poster = new Poster();
      this.data.poster = poster;
      let painting = poster.getPosterParams(posterType, reqParams);
      this.setData({
        painting,
        isPaint: true // 开始绘制
      })
    },

    // 保存图片，没有处理如果用户不授权的情况
    eventSave() {
      let poster = this.data.poster;
      poster.trySaveImg(this.data.shareImage);
    },

    // 画报触发事件，返回海报image临时链接
    eventGetImage(event) {
      wx.hideLoading()
      const {
        tempFilePath,
        errMsg
      } = event.detail
      if (errMsg === 'canvasdrawer:ok') {
        this.setData({
          shareImage: tempFilePath
        })
      }else{
        console.error("绘制出错:", errMsg);
      }
    }
  }
})