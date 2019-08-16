

import Utils from '../../utils/common_util.js';

// 本地图片
const LOCAL_IMAGE = {
  LOGO: {
    url: '/images/poster/logo.png',
  },
  LOGOVERTICAL: {
    url: '/images/poster/logo_vertical.png',
  },
  DECORATION: {
    LEFTTOP: {
      url: '/images/poster/detail_left_top.png',
    },
    RIGHTTOP: {
      url: '/images/poster/detail_right_top.png',
    },
    RIGHTBOTTOM: {
      url: '/images/poster/detail_right_bottom.png',
    },
  }
}
// 存放各个海报类型数据
const posterTypeObj = {
  'index': {
    width: 496,
    height: 744,
    clear: true,
    // views后面的会覆盖在前面画布之上，注意顺序
    // image ， circle（圆形头像），text，rect

    /**
     * 标题（样式，位置）
     * 商品缩率图
     * 
     */
    views: [
      {
        type: 'rect',
        background: '#fff',
        top: 0,
        left: 0,
        width: 496,
        height: 744
      },
      {
        type: 'image',
        desc: 'mainPic',
        // 中心图
        url: '../../../images/poster/posterImg/关怀-新用户.png',
        top: 0,
        left: 0,
        width: 496,
        height: 640
      },
      {
        type: 'image',
        desc: 'qrCode',
        // 小程序码
        url: 'url',
        top: 648,
        left: 392,
        width: 80,
        height: 80
      },
      {
        type: 'image',
        desc: 'avatarUrl',
        // 头像
        url: 'url',
        top: 660,
        left: 16,
        width: 60,
        height: 60,
        drawCicle: true,
      },
      {
        type: 'text',
        desc: 'bottom',
        content: '长按识别 二维码进入',
        fontSize: 18,
        textAlign: 'justify',
        top: 666,
        left: 294,
        lineHeight: 26,
        MaxLineNumber: 2,
        breakWord: true,
        width: 90 ,
        height: 52,
        color: '#666666',
        letterSpacing: 0,            
      },
      {
        type: 'text',
        desc: 'name',
        content: 'xx的微店',
        MaxLineNumber: 1,
        breakWord: true,
        top: 656,
        left: 92,
        fontSize: 20,
        width: 180,
        color: '#000000',
        letterSpacing: 0,
        lineHeight: 36
      },
      {
        type: 'text',
        desc: 'storeName',
        content: 'storeName',
        MaxLineNumber: 1,
        breakWord: true,
        top: 692,
        left: 92,
        width: 180,
        fontSize: 18,
        color: '#999999',
        letterSpacing: 0,
        lineHeight: 32
      }
    ]
  },
  
  '0': {
    width: 496,
    height: 792,
    views:[
      {
        type: 'rect',
        top: 0,
        left: 0,
        width: 496,
        height: 792,
        background: '#fff'
      },
      {
        type: 'image',
        url: LOCAL_IMAGE.DECORATION.LEFTTOP.url,
        top: 140,
        left: 44,
        width: 12,
        height: 208
      },
      {
        type: 'image',
        url: LOCAL_IMAGE.DECORATION.RIGHTTOP.url,
        top: 140,
        left: 442,
        width: 10,
        height: 132
      },
      {
        type: 'image',
        url: LOCAL_IMAGE.LOGOVERTICAL.url,
        top: 288.6,
        left: 435.4,
        width: 21,
        height: 200
      },
      {
        type: 'image',
        url: LOCAL_IMAGE.DECORATION.RIGHTBOTTOM.url,
        top: 504,
        left: 442,
        width: 10,
        height: 132
      },
      {
        type: 'text',
        desc: 'title',
        content: '换季大作战|4种“仙女色”帮你轻松玩转人间时尚',
        fontSize: 24,
        color: '#000',
        textAlign: 'left',
        top: 42,
        left: 44,
        lineHeight: 34,
        breakWord:true,
        width: 354
      },
      {
        type: 'image',
        desc: 'mainPic',
        // 中心图
        url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385366950.jpeg',
        top: 140,
        left: 84,
        width: 330,
        height: 496
      },
      {
        type: 'image',
        desc: 'qrCode',
        // 小程序码
        url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385433625.jpeg',
        top: 710,
        left: 152,
        width: 70,
        height: 70
      },
      {
        type: 'image',
        desc: 'avatarUrl',
        drawCicle: true,
        // 头像
        url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385433625.jpeg',
        top: 648,
        left: 82,
        width: 52,
        height: 52
      },
      {
        type: 'text',
        desc: 'sellerName',
        content: '梅小花超级的微店',
        fontSize: 22, // *2
        color: '#000000',
        textAlign: 'left',
        top: 646,
        left: 150,
        breakWord: true,
        width: 208,
        MaxLineNumber: 1
      },
      {
        type: 'text',
        desc: 'shopName',
        content: 'MissSixty正佳广场',
        fontSize: 20,
        color: '#666',
        textAlign: 'left',
        top: 676,
        left: 150,
        lineHeight: 24,
        breakWord: true,
        width: 208,
        MaxLineNumber: 1
      },
      {
        type: 'text',
        desc: 'bottom',
        content: '长按识别二维码进入',
        fontSize: 20,
        color: '#666',
        textAlign: 'left',
        top: 714,
        left: 234,
        lineHeight: 28,
        MaxLineNumber: 2,
        breakWord: true,
        width: 100
      }
    ]
  },

  'default': {
    width: 496,
    height: 792,
    views:[
      {
        type: 'rect',
        top: 0,
        left: 0,
        width: 496,
        height: 792,
        background: '#fff'
      },
      {
        type: 'image',
        desc: 'mainPic',
        // 中心图
        url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385366950.jpeg',
        top: 0,
        left: 0,
        width: 496,
        height: 792
      },
      {
        type: 'image',
        desc: 'qrCode',
        // 小程序码
        url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385433625.jpeg',
        top: 696,
        left: 396,
        width: 100,
        height: 96
      }
    ]
  }
}

export default class Poster{
  constructor(){
    this.posterType = 'default';
    this.reqParam = {};
    this.poster =  null;
  }

  /**
   * 动态改变海报模板的参数
   * 拼接示例：{width:, height:, desc:value}
   */
  changePosterParams() {
    let descList = Object.keys(this.reqParam);
    descList.forEach(desc=>{
        let newTarget = this.reqParam[desc];
        if(desc == 'width'){
            this.poster['width'] = newTarget;
        }else if(desc == 'height'){
            this.poster['height'] = newTarget;
        }else{
            let target = this.getItemByKey(this.poster['views'], desc);
            if(target && target.url){
                target.url = newTarget;
            }
            else if(target && target.content){
                target.content = newTarget;
            }
        }
    })
  }
  
  /**
   * 在数组中获取到键desc的值为某一个值的对象
   * 注意：需确保键值只能唯一，否则匹配到一个最后一个匹配到的项，即后面的会覆盖前面的
   * @param {Array} arr 
   * @param {String} keyValue 
   */
  getItemByKey(arr,keyValue){
    let targetItem=null;
    arr.forEach(item=>{
        if (item['desc'] == keyValue){
          targetItem=item;
        }
    });
    return targetItem;
  }

  // 保存图片
  saveImg(imgUrl) {
    wx.saveImageToPhotosAlbum({
      filePath: imgUrl,
      success(res) {
        wx.showToast({
          title: '保存图片成功',
          image: '/images/common/icon_toast_success.jpg',
          duration: 2000
        })
      },
      fail(err){
        console.log(err)
        wx.showToast({
          title: '未开启保存权限',
          image: '/images/common/err_tip_icon.png',
          duration: 2000
        })
      }
    })
  }
}

/**
 * 根据海报模板及动态参数拼接完整的海报参数
 * 即根据不同的海报类型，传入默认的参数，再根据传进去的的具体主图和描述进行修改
 * 注意：默认海报模板无法改变
 */
Poster.prototype.getPosterParams =function(reqPosterType, reqParam){
  // console.log('接收的值', this.reqParam);
  this.posterType = reqPosterType;
  this.reqParam = reqParam;
  
  // 先判断是否有这个类型的数据(不为空)，如果没有的话 posterType 默认为 'default'
  let posterType = this.posterType && posterTypeObj[this.posterType] ? this.posterType : 'default';
  this.poster = posterTypeObj[posterType];
  
  // 更改海报对应类型需要改的图片
  if (this.reqParam && JSON.stringify(this.reqParam) != "{}"){
      this.changePosterParams();
  }

  console.log("绘制的海报参数为", this.poster)
  return this.poster;
}

// 保存图片，有处理如果用户不授权的情况
Poster.prototype.trySaveImg = function(imgUrl, successCallback) {
  const _this = this;
  wx.getSetting({
    success(res){
      console.log("用户当前开启的权限情况", res.authSetting);
      // 拒绝过授权,则打开设置页面（设置界面只会出现小程序已经向用户请求过的权限,所以需先向用户请求一次）
      if(res.authSetting['scope.writePhotosAlbum'] === false){
        wx.openSetting({
          success(res){
            // 如果还是没有授权的话
            if(!res.authSetting['scope.writePhotosAlbum']){
              wx.showToast({
                title: '未开启保存权限',
                image: '/images/common/err_tip_icon.png',
                duration: 2000
              })
            }
          }
        });
      }
      // 没有请求过授权或者已授权
      else{
        if(successCallback){
          successCallback(imgUrl);
        }else{
          _this.saveImg(imgUrl);
        }
      }
    }
  })
}

/**
 * 获取小程序码
 * 返回图片临时链接imageUrl
 */
Poster.prototype.getQrCode = function (type, sku, articleId, articleCode, groupId, storeId, userId){
  let isSeller = wx.getStorageSync('M60_IS_SELLER');
  let sellerInfo=wx.getStorageSync('M60_SELLER_INFO');
  let path = ''
  let scene = ''

  if (isSeller) {
    scene = `${sellerInfo.sellerUserId}`;
  }

  // 分享链接（传参方式： 参数+'-'+参数【前端页面接收参数：.split('-')】）
  if (type == 'article') { // a、文章详情
    path = 'pages/article/article';
    scene = `${scene}-${articleId}-${articleCode}`;
  } else if (type == 'goodsDetail') { // b、商品详情
    path = 'pages/goods_detail/goods_detail';
    scene = `${scene}-${sku}`;
  } else if (type == 'groupDetail' || type == 'newGroupDetail') { // c、组货详情
    path = 'pages/sales/groupProduct/groupProductDetail/groupProductDetail';
    scene = `${scene}-${groupId}-${storeId}-${userId}`;
  } else { // d、首页
    path = 'pages/index/index';
  }

  return new Promise((resolve, reject) => {
    Utils.getQrCode(path, scene, 'buffer').then(buffer => {
      // 建立本地临时链接 
      Utils.localQrImageUrl(buffer).then(filePath => {
        resolve(filePath)
      }).catch(err => {
        reject(err)
      })
    }).catch(err => {
      reject(err)
    })
  })
}
