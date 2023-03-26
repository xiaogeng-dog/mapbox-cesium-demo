const mapboxgl = require("mapbox-gl");
import * as turf from "@turf/turf";

let isMeasure = true; // 测面的状态
let points = [];
let jsonPoint = {
  type: "FeatureCollection",
  features: [],
};
let jsonLine = {
  type: "FeatureCollection",
  features: [],
};
let measureAreaEle = null;
let tooltip = null;

// 测面
export function measureArea(map) {
  isMeasure = true;
  // 禁止双击缩放
  map.doubleClickZoom.disable();
  map.getCanvas().style.cursor = "default";
  measureAreaEle = document.createElement("div");
  measureAreaEle.setAttribute("class", "measure-area-result");
  const option = {
    element: measureAreaEle,
    anchor: "left",
    offset: [8, 0],
  };
  tooltip = new mapboxgl.Marker(option).setLngLat([0, 0]).addTo(map);
  const source = map.getSource("measure-area-points");
  if (source) {
    map.getSource("measure-area-points").setData(jsonPoint);
    map.getSource("measure-area-line").setData(jsonLine);
  } else {
    map.addSource("measure-area-points", {
      type: "geojson",
      data: jsonPoint,
    });
    map.addSource("measure-area-line", {
      type: "geojson",
      data: jsonLine,
    });
    map.addLayer({
      id: "measure-area-line",
      type: "fill",
      source: "measure-area-line",
      paint: {
        "fill-color": "#0000ff",
        "fill-opacity": 0.1,
      },
    });
    map.addLayer({
      id: "line-area-stroke",
      type: "line",
      source: "measure-area-line",
      paint: {
        "line-color": "#0000ff",
        "line-width": 2,
        "line-opacity": 0.65,
      },
    });
    map.addLayer({
      id: "measure-area-points",
      type: "circle",
      source: "measure-area-points",
      paint: {
        "circle-color": "#ffffff",
        "circle-radius": 3,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#0000ff",
      },
    });
  }

  map.on("click", drawPointHandler);

  map.on("dblclick", drawResultHandler);

  map.on("mousemove", drawMoveHandler);
}

// 获取面积
function getArea(coords) {
  let pts = points.concat([coords]);
  pts = pts.concat([points[0]]);
  const polygon = turf.polygon([pts]);
  let area = turf.area(polygon);
  if (area < 1000) {
    area = Math.round(area) + "m²" + ", 双击结束绘制";
  } else {
    area = (area / 1000000).toFixed(4) + "km²" + ", 双击结束绘制";
  }
  return area;
}

// 绘制测面的点位
function drawPointHandler(e) {
  if (isMeasure) {
    const coords = [e.lngLat.lng, e.lngLat.lat];
    const map = e.target;
    points.push(coords);
    jsonPoint.features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: coords,
      },
    });
    map.getSource("measure-area-points").setData(jsonPoint);
  }
}

// 绘制显示结果
function drawResultHandler(e) {
  if (isMeasure) {
    const coords = [e.lngLat.lng, e.lngLat.lat];
    const map = e.target;
    points.push(coords);
    isMeasure = false;
    measureAreaEle.innerHTML = getArea(coords).split(",")[0];
    tooltip.setLngLat(coords);
    // 添加关闭按钮
    const _ele = document.createElement("div");
    _ele.setAttribute("class", "measure-area-result close");
    const option = {
      element: _ele,
      anchor: "bottom-left",
      offset: [-5, -10],
    };
    _ele.innerHTML = "×";
    new mapboxgl.Marker(option).setLngLat(coords).addTo(map);
    _ele.onclick = function (__e) {
      __e.stopPropagation();
      map.doubleClickZoom.enable();
      clearMeasure(map);
      _ele.remove();
    };
  }
}

// 绘制鼠标跟随时的相关内容
function drawMoveHandler(e) {
  if (isMeasure) {
    const coords = [e.lngLat.lng, e.lngLat.lat];
    const map = e.target;
    const len = jsonPoint.features.length;
    if (len === 0) {
      measureAreaEle.innerHTML = "点击地图开始测量";
    } else if (len === 1) {
      measureAreaEle.innerHTML = "点击地图继续绘制";
    } else {
      let pts = points.concat([coords]);
      pts = pts.concat([points[0]]);
      const json = {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [pts],
        },
      };
      map.getSource("measure-area-line").setData(json);
      measureAreaEle.innerHTML = getArea(coords);
    }
    tooltip.setLngLat(coords);
  }
}

// 清除
function clearMeasure(map) {
  const measureResult = map._container.querySelectorAll(".measure-area-result");
  if (measureResult && measureResult.length > 0) {
    Array.from(measureResult).forEach((m) => {
      m.remove();
    });
  }
  const json = {
    type: "FeatureCollection",
    features: [],
  };
  const sourceArea = map.getSource("measure-area-points");
  if (sourceArea) {
    map.getSource("measure-area-points").setData(json);
    map.getSource("measure-area-line").setData(json);
  }
  isMeasure = true;
  points = [];
  jsonPoint = {
    type: "FeatureCollection",
    features: [],
  };
  jsonLine = {
    type: "FeatureCollection",
    features: [],
  };
  measureAreaEle = null;
  tooltip = null;
  map.off("click", drawPointHandler);

  map.off("dblclick", drawResultHandler);

  map.off("mousemove", drawMoveHandler);
}

// 关闭测面
export function closeMeasureArea(map) {
  if (!map) return;
  map.doubleClickZoom.enable();
  clearMeasure(map);
}
