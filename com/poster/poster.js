// components/poster/poster.js
// import posteTypeObj from other file
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 海报类型
    posterType: {
      type: String,
      value: 'default'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    painting: {},
    shareImage: '',
    // 商品详情 ，种草机详情， 组货详情
    // 作为海报模版
    posterTypeObj: {
      'default': {
        width: 375,
        height: 555,
        clear: true,
        // views后面的会覆盖在前面画布之上，注意顺序
        // image ， circle（圆形头像），text，rect

        /**
         * 标题（样式，位置）
         * 商品缩率图
         * 
         */
        views: [{
            type: 'image',
            desc:'bg',
            // 海报背景，图片1地址，到时根据每个页面再修改对象的属性
            url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531103986231.jpeg',
            top: 0,
            left: 0,
            width: 375,
            height: 555
          },
          {
            type: 'image',
            desc: 'avatar',
            // 圆形头像，
            url: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epJEPdPqQVgv6D8bojGT4DrGXuEC4Oe0GXs5sMsN4GGpCegTUsBgL9SPJkN9UqC1s0iakjQpwd4h4A/132',
            top: 27.5,
            left: 29,
            width: 55,
            height: 55
          },
          {
            type: 'image',
            desc: 'avatarBorder',
            // 头将一个圆框图片覆盖在头像上面，使头像呈现圆形
            url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531401349117.jpeg',
            top: 27.5,
            left: 29,
            width: 55,
            height: 55
          },
          {
            type: 'text',
            content: '您的好友【kuckboy】',
            fontSize: 16,
            color: '#402D16',
            textAlign: 'left',
            top: 33,
            left: 96,
            bolder: true
          },
          {
            type: 'text',
            content: '发现一件好货，邀请你一起0元免费拿！',
            fontSize: 15,
            color: '#563D20',
            textAlign: 'left',
            top: 59.5,
            left: 96
          },
          {
            type: 'image',
            desc: 'mainPic',
            // 中心图
            url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385366950.jpeg',
            top: 136,
            left: 42.5,
            width: 290,
            height: 186
          },
          {
            type: 'image',
            desc: 'qrCode',
            // 小程序码
            url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385433625.jpeg',
            top: 443,
            left: 85,
            width: 68,
            height: 68
          },
          {
            type: 'text',
            content: '正品MAC魅可口红礼盒生日唇膏小辣椒Chili西柚情人',
            fontSize: 16,
            lineHeight: 21,
            color: '#383549',
            textAlign: 'left',
            top: 336,
            left: 44,
            width: 287,
            MaxLineNumber: 2,
            breakWord: true,
            bolder: true
          },
          {
            type: 'text',
            content: '￥0.00',
            fontSize: 19,
            color: '#E62004',
            textAlign: 'left',
            top: 387,
            left: 44.5,
            bolder: true
          },
          {
            type: 'text',
            content: '原价:￥138.00',
            fontSize: 13,
            color: '#7E7E8B',
            textAlign: 'left',
            top: 391,
            left: 110,
            textDecoration: 'line-through'
          },
          {
            type: 'text',
            content: '长按识别图中二维码帮我砍个价呗~',
            fontSize: 14,
            color: '#383549',
            textAlign: 'left',
            top: 460,
            left: 165.5,
            lineHeight: 20,
            MaxLineNumber: 2,
            breakWord: true,
            width: 125
          }
        ]
      },
      // 每张画报都会有分销员的信息
      // 怎么让每张图片都按照比例缩放就好

      'productDetail': {

      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
          that.setData({
            customImg: tempFilePaths,
          })
          // 发送参数
          let reqParams={
            width: 375,
            height: 555,
            img: [{ url: res.path, desc:"mainPic"}],
            text:[]
          }
          /* 获取本地图片成功后，生成自定义海报图 */
          wx.getImageInfo({
            src: tempFilePaths,
            success(res) {
              // 根据传进来的参数类型，绘制不同版的海报
              console.log(res);
              that.eventDraw(that.data.posterType, reqParams);
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


    /**
     * 获取分销员信息
     * 返回头像image，用户名text
     */
    getSellerDetail() {
      
    },

    /**
     * 获取商品图信息
     * 返回商品图image，商品价格text，原价格text
     */
    getGoodsDetail() {

    },

    /**
     * 绘制小程序码
     * 返回图片临时链接image
     */
    getQrCode() {

    },

    // 绘制海报  传进来的参数不定项，因为海报类型不一致
    // params参数拼接{width:,height:,img:[{url:'',desc:''}],text:[]}
    changePosterImgUrl(poster, params){
      //  需要动态更改的图片，像背景bg，头像边框avatarBorder的话可以直接写到url中
      let imgDescList = ['avatar', 'mainPic','qrCode'];
      for(let i in imgDescList){
        let targetImg = this.getItemByKey(poster['views'], imgDescList[i]);
        let newImg = this.getItemByKey(params['img'], imgDescList[i]);
        targetImg.url = newImg.url;
      }
    },

    eventDraw(posterType,...params) {
      let posterTypeObj = this.data.posterTypeObj;
      let poster=posterTypeObj[posterType];
      
      // 更改海报对应类型需要改的图片
      this.changePosterImgUrl(poster,params);
      
      wx.showLoading({
        title: '绘制分享图片中',
        mask: true
      })
      // 先判断是否有这个类型的数据(不为空)，如果没有的话 posterType 默认为 'default'
      posterType = posterTypeObj[posterType] ? posterType : 'default';
      this.setData({
        painting: posterTypeObj[posterType]
      })
    },

    // 保存图片，没有处理如果用户不授权的情况
    eventSave() {
      wx.saveImageToPhotosAlbum({
        filePath: this.data.shareImage,
        success(res) {
          wx.showToast({
            title: '保存图片成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    },

    // 画报触发事件，返回海报image临时链接
    eventGetImage(event) {
      console.log(event)
      wx.hideLoading()
      const {
        tempFilePath,
        errMsg
      } = event.detail
      if (errMsg === 'canvasdrawer:ok') {
        this.setData({
          shareImage: tempFilePath
        })
      }
    },

    // 在数组中获取到键desc的值为某一个值的对象，
    // 注意：需确保键值只能唯一，否则匹配到一个最后一个匹配到的项，即后面的会覆盖前面的
    getItemByKey(arr,keyValue){
      let targetItem=null;
      arr.forEach(item=>{
        if (item['desc'] == keyValue){
          targetItem=item;
        }
      });
      return targetItem;
    }
  }
})