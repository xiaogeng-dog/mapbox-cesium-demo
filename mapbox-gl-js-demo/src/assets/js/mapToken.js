const mapboxToken =
  "pk.eyJ1IjoieGlhb2dlbmciLCJhIjoiY2xmY2hwazU2MGJpOTN5bGxjancyYWQ0MyJ9.kobS8uu_eYtfNiEvwL_Xbw";
const cesiumToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjM2M1YWM2My1kOGQyLTRlZDMtODg1OS00YTg4YjdlYzIxYzkiLCJpZCI6MTI5MzU0LCJpYXQiOjE2NzkyMzM0Mjh9.0Qbw5zRJd0TC8sd5QvY40t2mtEeSroN0M4Jqfc3_7mE";
const TDT_token = "a42a5cc72ceffa83582cc329ed0d156f";
const GD_WebService_key = "891ffee5b74be82478ee777664f8657a";
// 投影类型 （c:4490的2000坐标系，w:3857墨卡托投影坐标系）mapbox只支持墨卡托投影坐标系
const TDT_ProjectionType = "w";
/**
 * 天地图底图类型
 */
// 矢量底图和矢量注记
// const TDT_TYPE = ["vec", "cva"];
// 影像底图底图和影像注记
// const TDT_TYPE = ["img", "cia"];
// 地形底图底图和地形注记
const TDT_TYPE = ["ter", "cta"];
// 边界线
// const TDT_TYPE = ["ibo", "cta"];

/**
 * 底图
 */
// 矢量底图
// export const TDT_Underlay = `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${TDT_token}`;
// 卫星底图
let TDT_Underlay = [];
for (let i = 0; i <= 7; i++) {
  TDT_Underlay.push(
    `http://t${i}.tianditu.gov.cn/${TDT_TYPE[0]}_${TDT_ProjectionType}/wmts?tk=${TDT_token}&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${TDT_TYPE[0]}&STYLE=default&TILEMATRIXSET=${TDT_ProjectionType}&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles`
  );
}
/**
 * 注记
 */
// 矢量注记
// export const TDT_Note = `http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${TDT_token}`;
// 卫星影像注记
let TDT_Note = [];
for (let i = 0; i <= 7; i++) {
  TDT_Note.push(
    `http://t${i}.tianditu.gov.cn/${TDT_TYPE[1]}_${TDT_ProjectionType}/wmts?tk=${TDT_token}&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${TDT_TYPE[1]}&STYLE=default&TILEMATRIXSET=${TDT_ProjectionType}&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles`
  );
}
// =============================================================================================================================================================================================
/**
 * 高德地图底图类型
 *
 */
// 矢量底图
// http://wprd04.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=7
// 卫星底图
// http://wprd04.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=6
let GD_Underlay = [
  "http://wprd04.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=7",
];

// bingmap 矢量地图
// http://ak.dynamic.t0.tiles.virtualearth.net/comp/ch/{quadkey}?mkt=zh-CN&it=G,L&shading=hill&og=819&n=z
// bingmap 卫星影像
// http://ak.dynamic.t0.tiles.virtualearth.net/comp/ch/{quadkey}?mkt=zh-CN&it=A,G,L&og=819&n=z
//mapbox卫星底图
// https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?sku=101wZp4uNMRnl&access_token=pk.eyJ1IjoieGlhb2dlbmciLCJhIjoiY2xmY2hwazU2MGJpOTN5bGxjancyYWQ0MyJ9.kobS8uu_eYtfNiEvwL_Xbw
/**
 *修改引用底图类型
 */
const UNDERLAY = GD_Underlay;
const NOTE = TDT_Note;

export { UNDERLAY, NOTE, cesiumToken, mapboxToken, GD_WebService_key };
