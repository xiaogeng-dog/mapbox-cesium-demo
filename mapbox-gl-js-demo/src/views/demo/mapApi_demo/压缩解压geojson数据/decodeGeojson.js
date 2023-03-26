// 对压缩后的geojson进行解码
export function decodeGeojson(json) {
  let features = json.features;
  if (!features) return;
  features.forEach(function (feature) {
    let encodeOffsets = feature.geometry.encodeOffsets;
    delete feature.geometry.encodeOffsets;
    let coordinates = feature.geometry.coordinates;
    if (feature.geometry.type === "Polygon") {
      coordinates.forEach(function (coordinate, idx) {
        coordinates[idx] = decodePolygon(coordinate, encodeOffsets[idx]);
      });
    } else if (feature.geometry.type === "MultiPolygon") {
      coordinates.forEach(function (polygon, idx1) {
        polygon.forEach(function (coordinate, idx2) {
          coordinates[idx1][idx2] = decodePolygon(
            coordinate,
            encodeOffsets[idx1][idx2]
          );
        });
      });
    } else if (feature.geometry.type === "MultiLineString") {
      coordinates.forEach(function (coordinate, idx) {
        if (encodeOffsets && encodeOffsets[idx]) {
          coordinates[idx] &&
            (coordinates[idx] = decodePolygon(coordinate, encodeOffsets[idx]));
        }
      });
    }
  });
  return json;
}

// 解码核心代码
function decodePolygon(coordinate, encodeOffsets) {
  if (!encodeOffsets) return;
  let result = [];
  let prevX = encodeOffsets[0];
  let prevY = encodeOffsets[1];

  for (let i = 0; i < coordinate.length; i += 2) {
    let x = coordinate.charCodeAt(i) - 64;
    let y = coordinate.charCodeAt(i + 1) - 64;
    x = (x >> 1) ^ -(x & 1);
    y = (y >> 1) ^ -(y & 1);
    x += prevX;
    y += prevY;

    prevX = x;
    prevY = y;
    result.push([x / 1024, y / 1024]);
  }
  return result;
}
