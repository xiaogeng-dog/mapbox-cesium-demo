/* 
	creat by lsq in 2020/09/08
 */


/* 坐标转换 */
const translat84 = function(x,y){
 let zuo = gcj02towgs84(x, y)
  return zuo
}
const translatgcj02 = function(x,y){
	let zuo = wgstogcj02(x, y)
  return zuo
}
/**
 * GCJ02 转换为 WGS84
 * @param lng
 * @param lat
 */
var x_PI = 3.14159265358979324 * 3000.0 / 180.0
var PI = 3.1415926535897932384626
var a = 6378245.0
var ee = 0.00669342162296594323

function gcj02towgs84 (lng, lat) {
  var dlat = transformlat(lng - 105.0, lat - 35.0)
  var dlng = transformlng(lng - 105.0, lat - 35.0)
  var radlat = lat / 180.0 * PI
  var magic = Math.sin(radlat)
  magic = 1 - ee * magic * magic
  var sqrtmagic = Math.sqrt(magic)
  dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI)
  dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI)
  var mglat = lat + dlat
  var mglng = lng + dlng
  return [lng * 2 - mglng, lat * 2 - mglat]
}

function wgstogcj02(lat, lng) {
	var out = new Array();
	var gg_lat,  gg_lon;
    var dlat = transformlat(lng - 105.0, lat - 35.0);
    var dlng = transformlng(lng - 105.0, lat - 35.0);
    var radlat = lat / 180.0 * PI;
    var magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
    dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
    gg_lat = lat + dlat;
    gg_lon = lng + dlng;
    out[0]=gg_lat;
    out[1]=gg_lon;
    return out;
}

function transformlat (lng, lat) {
  var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng))
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0
  ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0
  return ret
}

function transformlng (lng, lat) {
  var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0
  ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0
  return ret
}

function bdToGaoDe (lat, lon) {
  var gd_lat_lon
  var PI = 3.14159265358979324 * 3000.0 / 180.0
  var x = lon - 0.0065; var y = lat - 0.006
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * PI)
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * PI)
  gd_lat_lon[0] = z * Math.cos(theta)
  gd_lat_lon[1] = z * Math.sin(theta)
  return gd_lat_lon
}

const localtion  = function(){//获取当前点位坐标
	return new Promise((resolve) => {
			uni.getLocation({
				type: 'gcj02',
				success: function (response) {
					let res = response
					resolve(res);
				}
			})
	});
}

const adress = function(x,y) {//根据坐标解析地址
	let url = 'http://api.map.baidu.com/reverse_geocoding/v3/?ak=CbbsWruOgh6Kjd0knRRPHmrZ8RX0TzvE&output=json&coordtype=gcj02ll&poi_types=门址|房地产&radius=500&extensions_poi=1&location=' + y +
		',' + x + '';
	return new Promise((resolve) => {
			uni.request({url:url,success:(res) =>
				{
					let pois = res.data.result.pois;
					let adress = pois[0].name;
					resolve(adress)
				}
			})
	});
}

export default {
  translat84,
  translatgcj02,
	localtion,
	adress
}