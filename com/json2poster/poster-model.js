import Utils from "../../utils/common_util.js";

// 存放各个海报类型数据
const posterTypeObj = {
  "0": {
    width: 496,
    height: 744,
    clear: true,
    // views后面的会覆盖在前面画布之上，注意顺序
    // image ， drawCicle（圆形头像），text，rect

    /**
     * 标题（样式，位置）
     * 商品缩率图
     *
     */
    views: [
      {
        type: "rect",
        background: "#fff",
        top: 0,
        left: 0,
        width: 496,
        height: 744
      },
      {
        type: "image",
        desc: "mainPic",
        // 中心图
        url:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567611837150&di=13d54fcc863c7759cbcae09321fe323f&imgtype=0&src=http%3A%2F%2Fimg.kongzhong.com%2Fmil%2Fnews%2F2014%2F01%2F21%2Fcb7fe5ab091390294983.jpg",
        top: 0,
        left: 0,
        width: 496,
        height: 640
      },
      {
        type: "image",
        desc: "qrCode",
        // 小程序码
        url:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567619592532&di=cf62e7a5d9d6aa7fe61bdece730a108f&imgtype=0&src=http%3A%2F%2Fpic3.58cdn.com.cn%2Fbizmp%2Fn_v23026aec8f74549e08882e80d237190a5.jpg",
        top: 648,
        left: 392,
        width: 80,
        height: 80
      },
      {
        type: "image",
        desc: "avatarUrl",
        // 头像
        url:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567611837149&di=82dd46cab1ace35605e989cacc47f633&imgtype=0&src=http%3A%2F%2Fwww.globaltimes.cn%2Fportals%2F0%2Fattachment%2F2011%2F95f5441c-650b-49a8-af1f-b6ff4930140c.jpg",
        top: 660,
        left: 16,
        width: 60,
        height: 60,
        drawCicle: true
      },
      {
        type: "text",
        desc: "bottom",
        content: "长按识别 二维码进入",
        fontSize: 18,
        textAlign: "justify",
        top: 666,
        left: 294,
        lineHeight: 26,
        MaxLineNumber: 2,
        breakWord: true,
        width: 90,
        height: 52,
        color: "#666666",
        letterSpacing: 0
      },
      {
        type: "text",
        desc: "name",
        content: "zoe的自定义组件库",
        MaxLineNumber: 1,
        breakWord: true,
        top: 656,
        left: 92,
        fontSize: 20,
        width: 180,
        color: "#000000",
        letterSpacing: 0,
        lineHeight: 36
      },
      {
        type: "text",
        desc: "storeName",
        content: "bat后备人才库",
        MaxLineNumber: 1,
        breakWord: true,
        top: 692,
        left: 92,
        width: 180,
        fontSize: 18,
        color: "#999999",
        letterSpacing: 0,
        lineHeight: 32
      }
    ]
  },
  // 素材中心海报
  "1": {
    width: 496,
    height: 792,
    views: [
      {
        type: "rect",
        top: 0,
        left: 0,
        width: 496,
        height: 792,
        background: "#fff"
      },
      {
        type: "image",
        desc: "mainPic",
        // 中心图
        url:
          "https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385366950.jpeg",
        top: 0,
        left: 0,
        width: 496,
        height: 792
      },
      {
        type: "image",
        desc: "qrCode",
        // 小程序码
        url:
          "https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385433625.jpeg",
        top: 696,
        left: 396,
        width: 100,
        height: 96
      }
    ]
  },
  index: {
    width: 496,
    height: 744,
    clear: true,
    // views后面的会覆盖在前面画布之上，注意顺序
    // image ， drawCicle（圆形头像），text，rect

    /**
     * 标题（样式，位置）
     * 商品缩率图
     *
     */
    views: [
      {
        type: "rect",
        background: "#fff",
        top: 0,
        left: 0,
        width: 496,
        height: 744
      },
      {
        type: "image",
        desc: "mainPic",
        // 中心图
        url: "/images/clothes.jpg",
        top: 0,
        left: 0,
        width: 496,
        height: 640
      },
      {
        type: "image",
        desc: "qrCode",
        // 小程序码
        url: "/images/qrcode.jpg",
        top: 648,
        left: 392,
        width: 80,
        height: 80
      },
      {
        type: "image",
        desc: "avatarUrl",
        // 头像
        url: "/images/avatarUrl.jpg",
        top: 660,
        left: 16,
        width: 60,
        height: 60,
        drawCicle: true
      },
      {
        type: "text",
        desc: "bottom",
        content: "长按识别 二维码进入",
        fontSize: 18,
        textAlign: "justify",
        top: 666,
        left: 294,
        lineHeight: 26,
        MaxLineNumber: 2,
        breakWord: true,
        width: 90,
        height: 52,
        color: "#666666",
        letterSpacing: 0
      },
      {
        type: "text",
        desc: "name",
        content: "zoe的自定义组件库",
        MaxLineNumber: 1,
        breakWord: true,
        top: 656,
        left: 92,
        fontSize: 20,
        width: 180,
        color: "#000000",
        letterSpacing: 0,
        lineHeight: 36
      },
      {
        type: "text",
        desc: "storeName",
        content: "bat后备人才库",
        MaxLineNumber: 1,
        breakWord: true,
        top: 692,
        left: 92,
        width: 180,
        fontSize: 18,
        color: "#999999",
        letterSpacing: 0,
        lineHeight: 32
      }
    ]
  },

  // 以aspectFill模式裁剪图片
  aspectFill: {
    width: 496,
    height: 744,
    clear: true,
    views: [
      {
        type: "rect",
        background: "#fff",
        top: 0,
        left: 0,
        width: 496,
        height: 744
      },
      {
        type: "image",
        desc: "mainPic",
        // 中心图
        url: "/images/clothes.jpg",
        top: 0,
        left: 0,
        width: 496,
        height: 640
      }
    ]
  }
};

export default class Poster {
  constructor() {
    this.posterType = "default";
    this.reqParam = {};
    this.poster = null;
  }

  /**
   * 动态改变海报模板的参数
   * 拼接示例：{width:, height:, desc:value}
   */
  changePosterParams() {
    let descList = Object.keys(this.reqParam);
    descList.forEach(desc => {
      let newTarget = this.reqParam[desc];
      if (desc == "width") {
        this.poster["width"] = newTarget;
      } else if (desc == "height") {
        this.poster["height"] = newTarget;
      } else {
        let target = this.getItemByKey(this.poster["views"], desc);
        if (target && target.url) {
          target.url = newTarget;
        } else if (target && target.content) {
          target.content = newTarget;
        }
      }
    });
  }

  /**
   * 在数组中获取到键desc的值为某一个值的对象
   * 注意：需确保键值只能唯一，否则匹配到一个最后一个匹配到的项，即后面的会覆盖前面的
   * @param {Array} arr
   * @param {String} keyValue
   */
  getItemByKey(arr, keyValue) {
    let targetItem = null;
    arr.forEach(item => {
      if (item["desc"] == keyValue) {
        targetItem = item;
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
          title: "保存图片成功",
          image: "/images/icon_toast_success.jpg",
          duration: 2000
        });
      },
      fail(err) {
        console.log(err);
        wx.showToast({
          title: "未开启保存权限",
          image: "/images/err_tip_icon.png",
          duration: 2000
        });
      }
    });
  }
}

/**
 * 根据海报模板及动态参数拼接完整的海报参数
 * 即根据不同的海报类型，传入默认的参数，再根据传进去的的具体主图和描述进行修改
 * 注意：默认海报模板无法改变
 */
Poster.prototype.getPosterParams = function(reqPosterType, reqParam) {
  // console.log('接收的值', this.reqParam);
  this.posterType = reqPosterType;
  this.reqParam = reqParam;

  // 先判断是否有这个类型的数据(不为空)，如果没有的话 posterType 默认为 'default'
  let posterType =
    this.posterType && posterTypeObj[this.posterType]
      ? this.posterType
      : "default";
  let poster = posterTypeObj[posterType];
  // 深度复制
  this.poster = JSON.parse(JSON.stringify(poster));
  // 更改海报对应类型需要改的图片
  if (this.reqParam && JSON.stringify(this.reqParam) != "{}") {
    this.changePosterParams();
  }

  console.log("绘制的海报参数为", this.poster);
  return this.poster;
};

// 保存图片，有处理如果用户不授权的情况
Poster.prototype.trySaveImg = function(imgUrl, successCallback) {
  const _this = this;
  wx.getSetting({
    success(res) {
      console.log("用户当前开启的权限情况", res.authSetting);
      // 拒绝过授权,则打开设置页面（设置界面只会出现小程序已经向用户请求过的权限,所以需先向用户请求一次）
      if (res.authSetting["scope.writePhotosAlbum"] === false) {
        wx.openSetting({
          success(res) {
            // 如果还是没有授权的话
            if (!res.authSetting["scope.writePhotosAlbum"]) {
              wx.showToast({
                title: "未开启保存权限",
                image: "/images/err_tip_icon.png",
                duration: 2000
              });
            }
          }
        });
      }
      // 没有请求过授权或者已授权
      else {
        if (successCallback) {
          successCallback(imgUrl);
          _this.poster = null;
        } else {
          _this.saveImg(imgUrl);
        }
      }
    }
  });
};

/**
 * 获取小程序码
 * 返回图片临时链接imageUrl
 */
Poster.prototype.getQrCode = function(
  type,
  sku,
  articleId,
  articleCode,
  groupId,
  storeId,
  userId
) {
  let isSeller = wx.getStorageSync("M60_IS_SELLER");
  let sellerInfo = wx.getStorageSync("M60_SELLER_INFO");
  let path = "";
  let scene = "";

  if (isSeller) {
    scene = `${sellerInfo.sellerUserId}`;
  }

  // 分享链接（传参方式： 参数+'-'+参数【前端页面接收参数：.split('-')】）
  if (type == "article") {
    // a、文章详情
    path = "pages/article/article";
    scene = `${scene}-${articleId}-${articleCode}`;
  } else if (type == "goodsDetail") {
    // b、商品详情
    path = "pages/goods_detail/goods_detail";
    scene = `${scene}-${sku}`;
  } else if (type == "groupDetail" || type == "newGroupDetail") {
    // c、组货详情
    path = "pages/sales/groupProduct/groupProductDetail/groupProductDetail";
    scene = `${scene}-${groupId}-${storeId}-${userId}`;
  } else {
    // d、首页
    path = "pages/index/index";
    scene = "123";
  }

  return new Promise((resolve, reject) => {
    Utils.getQrCode(path, scene, "buffer")
      .then(buffer => {
        // 建立本地临时链接
        Utils.localQrImageUrl(buffer)
          .then(filePath => {
            resolve(filePath);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};
