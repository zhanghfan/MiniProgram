//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },

  onLoad: function () {
  wx.setNavigationBarTitle({
    title: '天气预报',
  })
  var that=this
  that.getLocation();
  },
  getLocation:function(){
    var that=this
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: function(res) {
        var latitude=res.latitude
        var longtitude=res.longitude
        that.locationCorrect(latitude,longtitude);
      }
    })
  },
  locationCorrect:function(latitude,longitude){
    var that=this
    var url="https://api.map.baidu.com/geoconv/v1/"
    var params={
      from:1,
      to:5,
      coords:longitude+","+latitude,
      ak:"12vsqaG3j5G1CgRfDk7ZArttGE4rjff1"
    }
    wx.request({
      url: url,
      data:params,
      success:function(res){
        var badulat=res.data.result[0].y;
        var badulon=res.data.result[0].x;
        that.getCity(badulat,badulon);
      },
      fail:function(res){ },
      complete:function(res){ },
    })
  },
  getCity:function(latitude,longtitude){
    var that=this
    var url="https://api.map.baidu.com/geocoder/v2/";
    var params={
      ak:"12vsqaG3j5G1CgRfDk7ZArttGE4rjff1",
      output:"json",
      location:latitude+","+longtitude
    }
    wx.request({
      url: url,
      data:params,
      success:function(res){
        var city=res.data.result.addressComponent.city;
        var district=res.data.result.addressComponent.district;
        var street=res.data.result.addressComponent.street;
        that.setData({
          city:city,
          district:district,
          street:street,
        })
        var descCity=city.substring(0,city.length-1);
        that.getWeather(descCity);
      },
      fail:function(res){ },
      complete:function(res){ },
    })
  },
  getWeather:function(city){
    var that=this
    var url="https://api.map.baidu.com/telematics/v3/weather"
    var params={
      location:city,
      output:"json",
      ak:"IcT1DyLbrtGHG2U435ISorMUrgUBuW8y"
    }
    wx.request({
      url: url,
      data:params,
      success:function(res){
        console.log(res);
        var tmp=res.data.results[0].weather_data[0].temperature;
        var weather=res.data.results[0].weather_data[0].weather;
        var date=res.data.date;
        var curdata=res.data.results[0].weather_data[0].date;
        var curdate=curdata.substring(0,curdata.indexOf('('));
        var curtmp=curdata.substring(curdata.indexOf('：')+1,curdata.length-1);
        var pm25=res.data.results[0].pm25;
        var wind=res.data.results[0].weather_data[0].wind;
        var pic1=res.data.results[0].weather_data[0].dayPictureUrl;
        var pic2 = res.data.results[0].weather_data[0].nightPictureUrl;//天气图片 
        var lifeindex = res.data.results[0].index;//生活指数 
        var cast = res.data.results[0].weather_data;//近几天天气预报 
        var forecast = cast.slice(1, cast.length);//
        that.setData({
          date:date,
          tmp:tmp,
          weather: weather, 
          curdata: curdata, 
          curtmp: curtmp, 
          curdate: curdate, 
          pm25: pm25, 
          wind: wind, 
          pic1: pic1,//变量pic内存储的是图片url 
          pic2: pic2, 
          lifeindex: lifeindex, 
          forecast: forecast
        })
        wx.setStorage({
          key: 'life',
          data: lifeindex,
        })
      },
      fail:function(res){ },
      complete:function(res){ },
    })
  },
  onShareAppMessage: function () {
    return {
      path: "/pages/index/index",
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