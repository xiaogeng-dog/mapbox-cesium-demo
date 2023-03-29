/**
 *
 * add():Array<string>
 */

// New MapboxDraw ()返回一个具有以下 API 的 Draw 实例:
// add(geojson: Object) => Array<string>

// 这个方法接受 GeoJSON Feature、 FeatureCollection 或 Ge幾并将其添加到画图。
// 它返回一个 id 数组，用于与添加的特性进行交互。
// 如果一个特性没有自己的 id，就会自动生成一个 id。
// 支持 GeoJSON 特性类型: Point、 LineString、 Polygon、 MultiPoint、 MultiLineString 和 MultiPolygon。
// 如果您添加()一个具有已经在使用的 id 的特性，那么现有的特性将被更新，而不会添加新的特性。

//没有指定特性 id 的示例:
var feature = { type: "Point", coordinates: [0, 0] };
var featureIds = draw.add(feature);
console.log(featureIds);
//=> ['some-random-string']
// 具有指定特性 id 的示例:
var feature1 = {
  id: "unique-id",
  type: "Feature",
  properties: {},
  geometry: { type: "Point", coordinates: [0, 0] },
};
var featureIds1 = draw.add(feature1);
console.log(featureIds1);
//=> ['unique-id']
/**
 * getAll(): FeatureCollection
 * 返回所有特性的 FeatureCollection。
 *
 */
draw.add({ type: "Point", coordinates: [0, 0] });
draw.add({ type: "Point", coordinates: [1, 1] });
draw.add({ type: "Point", coordinates: [2, 2] });
console.log(draw.getAll());
// {
//   type: 'FeatureCollection',
//   features: [
//     {
//       id: 'random-0'
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [0, 0]
//       }
//     },
//     {
//       id: 'random-1'
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [1, 1]
//       }
//     },
//     {
//       id: 'random-2'
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [2, 2]
//       }
//     }
//   ]
// }

/**
 *
 * deleteAll(): draw
 * 移除所有特性。返回用于链接的绘制实例。
 */
draw.add({ type: "Point", coordinates: [0, 0] });
draw.deleteAll().getAll();
// { type: 'FeatureCollection', features: [] }

/**
 *
 */
