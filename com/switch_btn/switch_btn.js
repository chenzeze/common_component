// pages/component/switch/switch.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Boolean,
      value: false
    },
    name: {
      type: String,
      value: ''
    },
    onText: {
      type: String,
      value: '打开'
    }, 
    offText: {
      type: String,
      value: '关闭'
    }
  },
  options: {
    // 在组件定义时的选项中启用多slot支持
    multipleSlots: true
  },

  attached(){
    // 动态计算switch框宽度
    let onLen=this.data.onText.length;
    let offLen=this.data.offText.length;
    let wordLen=Math.max(onLen,offLen);
    this.setData({
      switchBtnWidth: 72 + wordLen * 24, // 切换按钮的宽度，根据较大字数来决定
      switchBtnOnLeft: wordLen == 0 ? 25 : 50 + (wordLen - 1) * 25 // 切换按钮文字距左边距离
    });
  },

  /**
   * 组件的初始数据
   */
  data: {
    switchBtnWidth: 120,
    switchBtnOnLeft: 98,
    switchBtnOffLeft: 2,
    useSwitchIcon: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggle() {
      const data = this.data;
      const value = data.value ? false : true;
      this.triggerEvent('change', {
        value: value
      })
    }
  }
})
