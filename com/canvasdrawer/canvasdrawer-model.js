
let cache = wx.getStorageSync('canvasdrawer_pic_cache') || {};

export default class Canvasdrawer{
  constructor(painting, _this, canvasId){
    this.painting = painting;  // 海报json参数
    this._this = _this; // 使用海报的父级自定义组件
    this.canvasId = canvasId; // canvas标签id
    this.ctx = wx.createCanvasContext(canvasId, this._this);
    this.tempFileList= []; // 图片临时路径
    this.resolve = null; // 存放绘制结果
    this.reject = null;
  }
  // 获取图片列表
  getImagesInfo() {
    console.log(this.painting)
    const {
        views
    } = this.painting
    // 1.将获取到的每张图片信息推送到imagelist中
    const imageList = []
    for (let i = 0; i < views.length; i++) {
      if (views[i].type === 'image') {
        imageList.push(this.getImageInfo(views[i].url))
      }
    }

    // 2.临时图片下载，分成多个8张，使用promise.all(每8张) 异步下载
    const loadTask = []
    for (let i = 0; i < Math.ceil(imageList.length / 8); i++) {
      loadTask.push(new Promise((resolve, reject) => {
        Promise.all(imageList.splice(i * 8, 8)).then(res => {
          resolve(res)
        }).catch(res => {
          reject(res)
        })
      }))
    }

    // promise.all返回的res为一个数组，有所有的task返回
    Promise.all(loadTask).then(res => {
      this.tempFileList = []
      for (let i = 0; i < res.length; i++) {
        this.tempFileList = this.tempFileList.concat(res[i])
      }
      this.startPainting()
    })
  }

  // 开始绘制
  startPainting() {
    const {
        views
    } = this.painting
    console.log(this.tempFileList)
    for (let i = 0, imageIndex = 0; i < views.length; i++) {
      if (views[i].type === 'image') { // 绘制图片，每张图片对应一个下载地址
        this.drawImage({
          ...views[i],
          url: this.tempFileList[imageIndex]
        })
        imageIndex++
      } else if (views[i].type === 'text') { // 绘制文本
        if (!this.ctx.measureText) {
          wx.showModal({
            title: '提示',
            content: '当前微信版本过低，无法使用 measureText 功能，请升级到最新微信版本后重试。'
          })
          return
        } else {
          this.drawText(views[i])
        }
      } else if (views[i].type === 'rect') {
        this.drawRect(views[i])
      }
    }
    this.ctx.draw(false, () => {
      wx.setStorageSync('canvasdrawer_pic_cache', cache)
      const system = wx.getSystemInfoSync().system
      if (/ios/i.test(system)) {
        this.saveImageToLocal()
      } else {
        // 延迟保存图片，解决安卓生成图片错位bug。
        setTimeout(() => {
            this.saveImageToLocal()
        }, 800)
      }
    })
  }

  // 绘制图片,会对图片进行缩放，小的会放大，大的会缩小吗
  drawImage (params) {
  this.ctx.save()
    const {
      url,
      top = 0,
      left = 0,
      width = 0,
      height = 0,
      borderRadius = 0,
      deg = 0
    } = params
    // 是根据这个绘制成圆形的吗
    // if (borderRadius) {
    //   ctx.beginPath()
    //   ctx.arc(left + borderRadius, top + borderRadius, borderRadius, 0, 2 * Math.PI)
    //   ctx.clip()
    //   ctx.drawImage(url, left, top, width, height)
    // } else {

    // 图片旋转
    if (deg !== 0) {
      this.ctx.translate(left + width / 2, top + height / 2)
      this.ctx.rotate(deg * Math.PI / 180)
      this.ctx.drawImage(url, -width / 2, -height / 2, width, height)
    } else {
      this.ctx.drawImage(url, left, top, width, height)
    }
    // }
    this.ctx.restore()
  }
  // 绘制文本
  drawText(params) {
    this.ctx.save()
      const {
        MaxLineNumber = 2,
          breakWord = false,
          color = 'black',
          content = '',
          fontSize = 16,
          top = 0,
          left = 0,
          lineHeight = 20,
          textAlign = 'left',
          width,
          bolder = false,
          textDecoration = 'none'
      } = params

      this.ctx.beginPath()
      this.ctx.setTextBaseline('top')
      this.ctx.setTextAlign(textAlign)
      this.ctx.setFillStyle(color)
      this.ctx.setFontSize(fontSize)

      if (!breakWord) { //不需要换行
        this.ctx.fillText(content, left, top)
        this.drawTextLine(left, top, textDecoration, color, fontSize, content)
      } else {
        let fillText = '' //每一行的填充文本
        let fillTop = top
        let lineNum = 1

        // 多行文本 换行
        for (let i = 0; i < content.length; i++) {
          fillText += [content[i]]
          if (this.ctx.measureText(fillText).width > width) {
            if (lineNum === MaxLineNumber) {
              if (i !== content.length) {
                fillText = fillText.substring(0, fillText.length - 1) + '...'
                this.ctx.fillText(fillText, left, fillTop)
                this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText)
                fillText = ''
                break
              }
            }
            this.ctx.fillText(fillText, left, fillTop)
            this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText)
            fillText = ''
            fillTop += lineHeight
            lineNum++
          }
        }
        this.ctx.fillText(fillText, left, fillTop)
        this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText)
      }

      this.ctx.restore()

      if (bolder) {
        this.drawText({
          ...params,
          left: left + 0.3,
          top: top + 0.3,
          bolder: false,
          textDecoration: 'none'
        })
      }
  }

  // 绘制文本线（中划线和下划线）
  drawTextLine(left, top, textDecoration, color, fontSize, content) {
      if (textDecoration === 'underline') {
        this.drawRect({
          background: color,
          top: top + fontSize * 1.2,
          left: left - 1,
          width: this.ctx.measureText(content).width + 3,
          height: 1
        })
      } else if (textDecoration === 'line-through') {
        this.drawRect({
          background: color,
          top: top + fontSize * 0.6,
          left: left - 1,
          width: this.ctx.measureText(content).width + 3,
          height: 1
        })
      }
  }
    // 绘制矩形
  drawRect(params) {
    this.ctx.save()
      const {
        background,
        top = 0,
        left = 0,
        width = 0,
        height = 0
      } = params
      this.ctx.setFillStyle(background)
      this.ctx.fillRect(left, top, width, height)
      this.ctx.restore()
  }

    // 获取图片信息
  getImageInfo(url) {
      return new Promise((resolve, reject) => {
        // 如果图片有缓存，则从缓存中读取
        console.log("接收到的url",url)
        if (cache[url]) {
          resolve(cache[url])
        } else {
          // 匹配图片链接地址是否匹配
          const objExp = new RegExp(/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/)
          if (objExp.test(url)) {
            wx.getImageInfo({
              src: url,
              complete: res => {
                if (res.errMsg === 'getImageInfo:ok') {
                  cache[url] = res.path
                  resolve(res.path)
                } else {
                  
                  reject(new Error('getImageInfo fail'))
                }
              }
            })
          } else {
            cache[url] = url
            resolve(url)
          }
        }
      })
  }

    // 将图片保存到本地
  saveImageToLocal() {
      const {
        width,
        height
      } = this.painting
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width,
        height,
        canvasId: this.canvasId,
        complete: res => {
          console.log(this.canvasId)
          if (res.errMsg === 'canvasToTempFilePath:ok') {
            this.resolve(res.tempFilePath);
          } else {
            this.reject('canvasdrawer:fail');
          }
        }
      },this._this)
  }
}
Canvasdrawer.prototype.readyPigment=function() {
  return new  Promise((resolve, reject)=>{
    console.log(this.painting)
    this.resolve = resolve;
    this.reject = reject;
    // 设置定时器，定时 0.1s 检查是否在绘制？？
    const inter = setInterval(() => {
        if (this.ctx) {
            clearInterval(inter)
            this.ctx.clearActions()
            this.ctx.save()
            this.getImagesInfo()
        }
    }, 100)
  })
}



// 画报触发事件，返回海报image临时链接
function eventGetImage(obj) {
  wx.hideLoading()
  const {
    tempFilePath,
    errMsg
  } = obj
  if (errMsg === 'canvasdrawer:ok') {
    return obj
  }
  return obj
}


