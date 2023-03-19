export const mapboxToken =
  "pk.eyJ1IjoieGlhb2dlbmciLCJhIjoiY2xmY2hwazU2MGJpOTN5bGxjancyYWQ0MyJ9.kobS8uu_eYtfNiEvwL_Xbw";
export const cesiumToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjM2M1YWM2My1kOGQyLTRlZDMtODg1OS00YTg4YjdlYzIxYzkiLCJpZCI6MTI5MzU0LCJpYXQiOjE2NzkyMzM0Mjh9.0Qbw5zRJd0TC8sd5QvY40t2mtEeSroN0M4Jqfc3_7mE";
const TDT_token = "a42a5cc72ceffa83582cc329ed0d156f";

/**
 * 底图
 */
// 矢量底图
// export const TDT_Underlay = `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${TDT_token}`;
export const TDT_Underlay = `http://t0.tianditu.gov.cn/vec_w/wmts?tk=${TDT_token}&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles`;
// 卫星底图
// export const TDT_Underlay = `http://t0.tianditu.gov.cn/img_w/wmts?tk=${TDT_token}&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles`;

/**
 * 注记
 */
// 矢量注记
// export const TDT_Note = `http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${TDT_token}`;
export const TDT_Note = `http://t0.tianditu.gov.cn/cva_w/wmts?tk=${TDT_token}&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles`;
// 卫星影像注记
// export const TDT_Note = `http://t0.tianditu.gov.cn/cia_w/wmts?tk=${TDT_token}&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles`;
//
