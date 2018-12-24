// pages/lifeindex/lifeindex/index.js 
var app = getApp(); 
Page({ 
  data: {}, 
  onLoad: function (options) {//程序启动时执行onLoad 
    wx.setNavigationBarTitle({//设置标题 
      title: '生活指数' 
    }) 
    let lifeindex = wx.getStorageSync('life');//取出标签为life的数据 
    console.log(lifeindex); 
    this.setData({//渲染到wxml 
      lifeindex: lifeindex 
    }) 
  }, /** * 用户点击右上角分享 */ 
  onShareAppMessage: function () { 
    return {
      path: "/pages/lifeindex/index",
      success: function () {
        wx.showToast({
          title: '分享成功',
          icon: "success",
          duration: 2000
        })
      }
    }
  } 
  
    })