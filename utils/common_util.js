
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function randomValue(n) {
  var chars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]
  var res = ''
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 35)
    res += chars[id]
  }
  return res
}

/* 排序(对象数组，根据对象的某属性进行排序) */
const objectArraySort =  (keyName) => {
  return (objectN, objectM) => {
    let valueN = objectN[keyName];
    let valueM = objectM[keyName];
    if (valueN < valueM) {
      return 1;
    } else if (valueN > valueM) {
      return -1;
    } else {
      return 0;
    }
  }
}

/**
* obj：要排序的对象
* key：对象中子对象obj[i]的属性
* desSort: 降序排列(true: 降序； false：升序)
*/
function sortObjKey(obj, key, desSort) {
  var desSort = desSort ? -1 : 1;
  var arr = [];
  for(var i in obj) {
    arr.push([obj[i], i]); // obj[i]:键值的值； i：键值
  };
  arr.sort(function(a,b) {
    let a1 = a[0][key],
        b1 = b[0][key];
    return desSort * (a1 - b1); // a1-b1是从小到大，如果是从大到小 return b1 -a1
  });
  var len = arr.length,
      obj = {};
  for(var i = 0; i < len; i++) {
    obj['t_' + arr[i][1]] = arr[i][0]; //【注意】当对象键值为数字，会被自动排序；当对象键值为数字为非数字时，按创建时排序。所以键值拼接字符，修改为非数字型键值
  }

  return obj;
}
  
/** 替换emoji表情 */
const filterEmoji = (name) => {
  var str = '';
  if (name){
    str = name.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, "");
  }
  return str;
}

/* 替换空格键 */
const filterSpace = (name) => {
  var str = name.replace(/\s+/g, '');
  return str;
}

/* 获取云开发的小程序码 */
const getQrCode = (path, scene, dataType) => {
  return new Promise((resolve, reject) => {
    let param = {
      page: path,
      scene: scene || '',
      width: 350
    }
    if (!path) {
      reject('must have path')
      return
    }
    if (scene && scene.length > 32) {
      reject('scene\' length must less than 32')
      return
    }

    console.log('小程序码～云参数：', param)
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'getNewQrCode',
      data: param
    }).then(res => {
      let data
      if (res.result.errCode == 0) {
        if (dataType == 'base64') {
          data = `data:image/jpeg;base64,${wx.arrayBufferToBase64(res.result.buffer)}`
        }
        if (dataType == 'buffer') {
          data = res.result.buffer
        }
        if (data) {
          resolve(data)
        } else {
          reject('unknow data type')
        }
      } else {
        reject(res.result.errMsg)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

/* 图片临时缓存 */
const localQrImageUrl = (buffer) => {
  return new Promise((resolve, reject) => {
    // 同一路径的图片会覆盖
    const TMP_IMG_NAME = 'TMP_QR_CODE'
    const filePath = `${wx.env.USER_DATA_PATH}/${TMP_IMG_NAME}.jpg`;
    // console.log('临时存储路径：', filePath)
    wx.getFileSystemManager().writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success() {
        // console.log('临时存储路径保存好了：', filePath)
        resolve(filePath)
      },
      fail() {
        // console.log('临时存储路径保存错了')
        reject(new Error('ERROR_BASE64SRC_WRITE'))
      }
    })
  })
}

/**
 * @returns 返回对象数组按特定键排序的方法，将字符转换为数字排序
 */
function sortBy(field, rev){
  rev = rev ? -1: 1;
  return function(a,b){
    a = parseInt(a[field]);
    b = parseInt(b[field]);
    if(a < b){
      return rev * -1;
    }else{
      return rev * 1;
    }
  }
}


module.exports = {
    formatTime: formatTime,
    randomValue: randomValue,
    objectArraySort: objectArraySort,
    sortObjKey: sortObjKey,
    filterEmoji: filterEmoji,
    filterSpace: filterSpace,
    getQrCode: getQrCode,
    localQrImageUrl: localQrImageUrl,
    sortBy
}
