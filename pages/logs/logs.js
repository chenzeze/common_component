//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    navbarData: {
      title: '查看启动日志'
    },
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
