/**
 * wrap经纬度转换工具
说明：将不在-180到180范围内的经纬度转换成这个范围内的经纬度的工具
使用：
 */
const ll = new mapboxgl.LngLat(801.32673070615658, 25.306316157548977);
const wrapped = ll.wrap();
console.log(wrapped.lng);

/**
 * 
 * renderWorldCopies
说明：

当map.options.renderWorldCopies设置为true时，
展示多屏地图，
表现效果为可以左右无缝连续滚动。
当map.options.renderWorldCopies设置为false时，
展示从-180到180经纬度范围内的一屏地图，
表现为左右拖拽会显示白屏
 */

/**
 * 
 * setMaxBounds
说明：设置地图最大拖拽边界
使用：
 * 
 */
// 设置
const bounds = [
  [-179, -85], // Southwest coordinates
  [179, 85], // Northeast coordinates
];
map.setMaxBounds(bounds);
// 取消设置
map.setMaxBounds(null);

// 获取边界
export function getPolygonBoundingBox(feature) {
  if (typeof feature == "object") {
    feature = feature.features[0];
  }
  // bounds [xMin, yMin][xMax, yMax]
  var bounds = [[], []];
  var polygon;
  var latitude;
  var longitude;

  for (var i = 0; i < feature.geometry.coordinates.length; i++) {
    if (feature.geometry.coordinates.length === 1) {
      // Polygon coordinates[0][nodes]
      polygon = feature.geometry.coordinates[0];
    } else {
      // Polygon coordinates[poly][0][nodes]
      polygon = feature.geometry.coordinates[i][0];
    }

    for (var j = 0; j < polygon.length; j++) {
      longitude = polygon[j][0];
      latitude = polygon[j][1];

      bounds[0][0] = bounds[0][0] < longitude ? bounds[0][0] : longitude;
      bounds[1][0] = bounds[1][0] > longitude ? bounds[1][0] : longitude;
      bounds[0][1] = bounds[0][1] < latitude ? bounds[0][1] : latitude;
      bounds[1][1] = bounds[1][1] > latitude ? bounds[1][1] : latitude;
    }
  }

  return bounds;
}
