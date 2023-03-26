const mapboxgl = require("mapbox-gl");
import * as turf from "@turf/turf";
const initData = {
  clickMeasurePointsFunction: null,
  mapClickFunction: null,
  mapMousemoveFunction: null,
  mapDblClickFunction: null,
  map: null,
  isMeasure: true,
  jsonPoint: { type: "FeatureCollection", features: [] },
  jsonLine: { type: "FeatureCollection", features: [] },
  points: [],
};
let before = null;
let after = null;

/**
 * 测距
 * @param mapObject
 */
export function measureLineLength(mapObject) {
  const currentMapContainerId = mapObject._container.getAttribute("id");
  currentMapContainerId.indexOf("-after") !== -1
    ? (after = JSON.parse(JSON.stringify(initData)))
    : (before = JSON.parse(JSON.stringify(initData)));
  const resultData = getBeforeOrAfterDataByMapContainerIdHandler(mapObject);
  resultData.isMeasure = true;
  resultData.map = mapObject;
  resultData.map.doubleClickZoom.disable(); // 禁止双击缩放
  resultData.map.getCanvas().style.cursor = "default";
  clearMeasureLine(mapObject);
  resultData.jsonPoint = { type: "FeatureCollection", features: [] };
  resultData.jsonLine = { type: "FeatureCollection", features: [] };
  resultData.points = [];
  const { mouseLabel, ele } = createMeasurLineLabelMarkerHandler(mapObject);
  createMeasureLinePLLHandler(
    resultData.jsonPoint,
    resultData.jsonLine,
    mapObject
  );

  let timer = null;
  function mapClickHandler(_e) {
    timer = setTimeout(() => {
      clearTimeout(timer);
      if (resultData.isMeasure) {
        const coords = [_e.lngLat.lng, _e.lngLat.lat];
        addMeasureLineRes(
          resultData.points,
          resultData.jsonPoint,
          coords,
          mapObject
        );
        addMeasureLinePoint(
          resultData.jsonPoint,
          resultData.jsonLine,
          coords,
          mapObject
        );
        resultData.points.push(coords);
      }
    }, 100);
  }
  resultData.mapClickFunction = mapClickHandler;
  resultData.map.off("click", mapClickHandler);
  resultData.map.on("click", mapClickHandler);
  function mousemoveHandler(_e) {
    if (resultData.isMeasure) {
      const coords = [_e.lngLat.lng, _e.lngLat.lat];
      if (resultData.jsonPoint.features.length > 0) {
        const prev =
          resultData.jsonPoint.features[
            resultData.jsonPoint.features.length - 1
          ];
        const json = {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [prev.geometry.coordinates, coords],
          },
        };
        resultData.map.getSource("measure-line-move").setData(json);
        let resultText = "起点";
        if (resultData.points.length !== 0) {
          const prev =
            resultData.jsonPoint.features[
              resultData.jsonPoint.features.length - 1
            ];
          const prevCoordinates = prev ? prev.geometry.coordinates : "";
          const resultAngle = prevCoordinates
            ? getAngleHandle(
                prevCoordinates[0],
                prevCoordinates[1],
                coords[0],
                coords[1]
              ).toFixed(1) + "°"
            : "";
          resultText = `<span>${getMeasureLineLength(
            resultData.points,
            coords
          )} / ${resultAngle}</span><span>单击确定地点，双击结束</span>`;
        }
        ele.innerHTML = resultText;
      } else {
        ele.style.display = "block";
        ele.innerHTML = "点击地图开始测量";
      }
      mouseLabel.setLngLat(coords);
    }
  }
  resultData.mapMousemoveFunction = mousemoveHandler;
  resultData.map.off("mousemove", mousemoveHandler);
  resultData.map.on("mousemove", mousemoveHandler);
  function dblclickHandler(_e) {
    if (timer) {
      clearTimeout(timer);
    }
    if (resultData.isMeasure) {
      const coords = [_e.lngLat.lng, _e.lngLat.lat];
      addMeasureLinePoint(
        resultData.jsonPoint,
        resultData.jsonLine,
        coords,
        mapObject
      );
      resultData.isMeasure = false;
      resultData.map.getCanvas().style.cursor = "";
      mouseLabel.remove();
      // 当前已关闭点击测距，所以清除move的线段
      resultData.map
        .getSource("measure-line-move")
        .setData({ type: "FeatureCollection", features: [] });
      // 鼠标移入当前测距的点位，动态显示tips提示语
      resultData.map.on("mouseover", "measure-line-points", (event) => {
        if (resultData.isMeasure) {
          return;
        }
        resultData.map.getCanvas().style.cursor = "pointer";
        const tipsCoords = [event.lngLat.lng, event.lngLat.lat];
        const tipsEle = document.createElement("div");
        tipsEle.setAttribute("class", "measure-line-result delete-tips");
        tipsEle.innerHTML = "单击可删除此点";
        const tipsOption = {
          element: tipsEle,
          anchor: "left",
          offset: [10, 20],
        };
        // eslint-disable-next-line no-undef
        new mapboxgl.Marker(tipsOption)
          .setLngLat(tipsCoords)
          .addTo(resultData.map);
      });
      // 鼠标移出当前测距的点位，移除tips提示语
      resultData.map.on("mouseout", "measure-line-points", () => {
        if (resultData.isMeasure) {
          resultData.map.getCanvas().style.cursor = "default";
        } else {
          resultData.map.getCanvas().style.cursor = "";
        }
        const deleteTips =
          resultData.map._container.querySelector(".delete-tips");
        if (deleteTips) {
          deleteTips.remove();
        }
      });
      /**
       * 点击测距点位触发
       * @param event
       * */
      // eslint-disable-next-line no-undef,no-inner-declarations
      function clickMeasurePointsHandler(event) {
        if (resultData.jsonPoint.features.length > 2) {
          const features = resultData.map.queryRenderedFeatures(event.point);
          if (features.length > 0) {
            const measureResult = resultData.map._container.querySelectorAll(
              ".measure-line-result"
            );
            if (measureResult && measureResult.length > 0) {
              Array.from(measureResult).forEach((m) => {
                m.remove();
              });
            }
            const { index } = features[0].properties;
            resultData.jsonPoint.features =
              resultData.jsonPoint.features.filter(
                (feature) => feature.properties.index !== index
              );
            resultData.jsonLine.features = [];
            const featuresArr = [...resultData.jsonPoint.features];
            const resultPoints = [];
            featuresArr.forEach((feature, index) => {
              const nextIndex = index + 1;
              if (featuresArr[nextIndex]) {
                const current = featuresArr[index];
                const next = featuresArr[nextIndex];
                resultData.jsonLine.features.push({
                  type: "Feature",
                  geometry: {
                    type: "LineString",
                    coordinates: [
                      current.geometry.coordinates,
                      next.geometry.coordinates,
                    ],
                  },
                });
              }
              resultPoints.push(feature.geometry.coordinates);
              const ele = document.createElement("div");
              ele.setAttribute("class", "measure-line-result");
              if (index === 0) {
                ele.innerHTML = "起点";
              } else {
                const prevIndex = index - 1;
                const prevCoordinates =
                  featuresArr[prevIndex].geometry.coordinates;
                const currentCoordinates = feature.geometry.coordinates;
                const resultAngle = prevCoordinates
                  ? getAngleHandle(
                      prevCoordinates[0],
                      prevCoordinates[1],
                      currentCoordinates[0],
                      currentCoordinates[1]
                    ).toFixed(1) + "°"
                  : "";
                ele.innerHTML = `${getMetersHandler(
                  resultPoints,
                  currentCoordinates
                )} / ${resultAngle}`;
              }
              if (nextIndex === featuresArr.length) {
                // 终点需要再加一个marker
                // 添加关闭按钮
                createCloseMarkerHandler(
                  clickMeasurePointsHandler,
                  feature.geometry.coordinates,
                  mapObject
                );
              }
              const left =
                window.document.documentElement.clientWidth > 7000 ? 20 : 8;
              const option = {
                element: ele,
                anchor: "left",
                offset: [left, 0],
              };
              // eslint-disable-next-line no-undef
              new mapboxgl.Marker(option)
                .setLngLat(feature.geometry.coordinates)
                .addTo(resultData.map);
            });
            resultData.map
              .getSource("measure-line-points")
              .setData(resultData.jsonPoint);
            resultData.map
              .getSource("measure-line")
              .setData(resultData.jsonLine);
            resultData.map
              .getSource("measure-line-move")
              .setData({ type: "FeatureCollection", features: [] });
          }
        } else {
          closeMeasureLine(mapObject);
        }
      }
      resultData.clickMeasurePointsFunction = clickMeasurePointsHandler;
      resultData.map.off(
        "click",
        "measure-line-points",
        clickMeasurePointsHandler
      );
      resultData.map.on(
        "click",
        "measure-line-points",
        clickMeasurePointsHandler
      );
      // 添加关闭按钮
      createCloseMarkerHandler(clickMeasurePointsHandler, coords, mapObject);
    }
  }
  resultData.mapDblClickFunction = dblclickHandler;
  resultData.map.off("dblclick", dblclickHandler);
  resultData.map.on("dblclick", dblclickHandler);
}

/**
 * 清除测距相关
 */
function clearMeasureLine(mapObject) {
  const resultData = getBeforeOrAfterDataByMapContainerIdHandler(mapObject);
  const measureResult = resultData.map._container.querySelectorAll(
    ".measure-line-result"
  );
  if (measureResult && measureResult.length > 0) {
    Array.from(measureResult).forEach((m) => {
      m.remove();
    });
  }
  const source = resultData.map.getSource("measure-line-points");
  const json = {
    type: "FeatureCollection",
    features: [],
  };
  if (source) {
    resultData.map.getSource("measure-line-points").setData(json);
    resultData.map.getSource("measure-line-move").setData(json);
    resultData.map.getSource("measure-line").setData(json);
  }
}

/**
 * 创建label marker
 * @returns {*} 返回marker对象
 */
function createMeasurLineLabelMarkerHandler(mapObject) {
  const resultData = getBeforeOrAfterDataByMapContainerIdHandler(mapObject);
  const ele = document.createElement("div");
  ele.style.display = "none";
  ele.setAttribute("class", "measure-line-result");
  const windowW = document.documentElement.clientWidth;
  const top = windowW > 7000 ? 120 : 44;
  const left = window.document.documentElement.clientWidth > 7000 ? 20 : 8;
  const option = {
    element: ele,
    anchor: "left",
    offset: [left, top],
  };
  // eslint-disable-next-line no-undef
  const mouseLabel = new mapboxgl.Marker(option)
    .setLngLat([0, 0])
    .addTo(resultData.map);
  return {
    mouseLabel,
    ele,
  };
}

/**
 * 创建测距需要的layers，points、line、measure-line-move
 * @param jsonPoint
 * @param jsonLine
 * @param mapObject
 */
function createMeasureLinePLLHandler(jsonPoint, jsonLine, mapObject) {
  const resultData = getBeforeOrAfterDataByMapContainerIdHandler(mapObject);
  const source = resultData.map.getSource("measure-line-points");
  if (source) {
    resultData.map.getSource("measure-line-points").setData(jsonPoint);
    resultData.map.getSource("measure-line-move").setData(jsonLine);
    resultData.map.getSource("measure-line").setData(jsonLine);
  } else {
    resultData.map.addSource("measure-line-points", {
      type: "geojson",
      data: jsonPoint,
    });
    resultData.map.addSource("measure-line", {
      type: "geojson",
      data: jsonLine,
    });
    resultData.map.addSource("measure-line-move", {
      type: "geojson",
      data: jsonLine,
    });
    const windowW = document.documentElement.clientWidth;
    const LW = windowW > 7000 ? 6 : 2;
    const RW = windowW > 7000 ? 10.5 : 3.5;
    const CW = windowW > 7000 ? 7.5 : 2.5;
    resultData.map.addLayer({
      id: "measure-line-move",
      type: "line",
      source: "measure-line-move",
      paint: {
        "line-color": "#0000ff",
        "line-width": LW,
        "line-opacity": 0.5,
      },
    });
    resultData.map.addLayer({
      id: "measure-line",
      type: "line",
      source: "measure-line",
      paint: {
        "line-color": "#0000ff",
        "line-width": LW,
        "line-opacity": 1,
      },
    });
    resultData.map.addLayer({
      id: "measure-line-points",
      type: "circle",
      source: "measure-line-points",
      paint: {
        "circle-color": "#ffffff",
        "circle-radius": RW,
        "circle-stroke-width": CW,
        "circle-stroke-color": "#0000ff",
      },
    });
  }
  moveLayerHandler(resultData.map);
}

/**
 * 将测距的三个图层移到最上层级
 */
function moveLayerHandler(mapObject) {
  const { map } = getBeforeOrAfterDataByMapContainerIdHandler(mapObject);
  const { layers } = map.getStyle();
  const length = layers.length;
  const lastLayerId = map.getStyle().layers[length - 1].id;
  if (lastLayerId !== "measure-line-points") {
    map.moveLayer("measure-line-points", map.getStyle().layers[length - 1].id);
    map.moveLayer("measure-line", "measure-line-points");
    map.moveLayer("measure-line-move", "measure-line");
  }
}

/**
 * 添加点位layer
 * @param jsonPoint
 * @param jsonLine
 * @param coords
 * @param mapObject
 */
function addMeasureLinePoint(jsonPoint, jsonLine, coords, mapObject) {
  const { map } = getBeforeOrAfterDataByMapContainerIdHandler(mapObject);
  if (jsonPoint.features.length > 0) {
    const prev = jsonPoint.features[jsonPoint.features.length - 1];
    jsonLine.features.push({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [prev.geometry.coordinates, coords],
      },
    });
    map.getSource("measure-line").setData(jsonLine);
  }
  jsonPoint.features.push({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: coords,
    },
    properties: {
      index: jsonPoint.features.length,
    },
  });
  // 重新整理point点位，若是重复点位则不添加
  const data = [...jsonPoint.features];
  const result = [];
  data.forEach((feature, index) => {
    if (data[index - 1]) {
      if (
        data[index - 1].geometry.coordinates[0] !==
          feature.geometry.coordinates[0] ||
        data[index - 1].geometry.coordinates[1] !==
          feature.geometry.coordinates[1]
      ) {
        result.push(feature);
      }
    } else {
      result.push(feature);
    }
  });
  jsonPoint.features = [...result];
  map.getSource("measure-line-points").setData(jsonPoint);
}

/**
 * 获取两坐标点之间的距离
 * @param points
 * @param coords
 * @returns {string}
 */
function getMeasureLineLength(points, coords) {
  const _points = points.concat([coords]);
  // eslint-disable-next-line no-undef
  const line = turf.lineString(_points);
  // eslint-disable-next-line no-undef
  let len = turf.length(line);
  if (len < 1) {
    len = Math.round(len * 1000) + "米";
  } else {
    len = len.toFixed(2) + "公里";
  }
  return len;
}

/**
 * 点击地图添加点位触发给当前点位绑定测距结果的labelMarker
 * @param points
 * @param jsonPoint
 * @param coords
 * @param mapObject
 * */
function addMeasureLineRes(points, jsonPoint, coords, mapObject) {
  const { map } = getBeforeOrAfterDataByMapContainerIdHandler(mapObject);
  const ele = document.createElement("div");
  ele.setAttribute("class", "measure-line-result");
  const left = window.document.documentElement.clientWidth > 7000 ? 20 : 8;
  const option = {
    element: ele,
    anchor: "left",
    offset: [left, 0],
  };
  let resultText = "起点";
  if (points.length !== 0) {
    const prev = jsonPoint.features[jsonPoint.features.length - 1];
    const prevCoordinates = prev ? prev.geometry.coordinates : "";
    const resultAngle = prevCoordinates
      ? getAngleHandle(
          prevCoordinates[0],
          prevCoordinates[1],
          coords[0],
          coords[1]
        ).toFixed(1) + "°"
      : "";
    resultText = `${getMeasureLineLength(points, coords)} / ${resultAngle}`;
  }
  ele.innerHTML = resultText;
  // eslint-disable-next-line no-undef
  new mapboxgl.Marker(option).setLngLat(coords).addTo(map);
}

/**
 * 点击测距点位重新触发计算两点位之间的距离
 * @param resultPoints
 * @param coords
 * @returns {string}
 */
function getMetersHandler(resultPoints, coords) {
  if (resultPoints.length > 1) {
    const _points = [...resultPoints];
    // eslint-disable-next-line no-undef
    const line = turf.lineString(_points);
    // eslint-disable-next-line no-undef
    let len = turf.length(line);
    if (len < 1) {
      len = Math.round(len * 1000) + "米";
    } else {
      len = len.toFixed(2) + "公里";
    }
    return len;
  }
}

/**
 * 获取两点位之间的角度
 * @param lng1
 * @param lat1
 * @param lng2
 * @param lat2
 * @returns {number}
 */
function getAngleHandle(lng1, lat1, lng2, lat2) {
  const a = ((90 - lat2) * Math.PI) / 180;
  const b = ((90 - lat1) * Math.PI) / 180;
  const AOC_BOC = ((lng2 - lng1) * Math.PI) / 180;
  const cosc =
    Math.cos(a) * Math.cos(b) + Math.sin(a) * Math.sin(b) * Math.cos(AOC_BOC);
  const sinc = Math.sqrt(1 - cosc * cosc);
  const sinA = (Math.sin(a) * Math.sin(AOC_BOC)) / sinc;
  const A = (Math.asin(sinA) * 180) / Math.PI;
  let res = 0;
  if (lng2 > lng1 && lat2 > lat1) {
    res = A;
  } else if (lng2 > lng1 && lat2 < lat1) {
    res = 180 - A;
  } else if (lng2 < lng1 && lat2 < lat1) {
    res = 180 - A;
  } else if (lng2 < lng1 && lat2 > lat1) {
    res = 360 + A;
  } else if (lng2 > lng1 && lat2 === lat1) {
    res = 90;
  } else if (lng2 < lng1 && lat2 === lat1) {
    res = 270;
  } else if (lng2 === lng1 && lat2 > lat1) {
    res = 0;
  } else if (lng2 === lng1 && lat2 < lat1) {
    res = 180;
  }
  return res;
}

/**
 * 创建关闭按钮
 * @param clickMeasurePointsHandler
 * @param coords
 * @param mapObject
 */
function createCloseMarkerHandler(
  clickMeasurePointsHandler,
  coords,
  mapObject
) {
  const resultData = getBeforeOrAfterDataByMapContainerIdHandler(mapObject);
  const ele = document.createElement("div");
  ele.setAttribute("class", "measure-line-result close");
  const left = window.document.documentElement.clientWidth > 7000 ? 20 : 8;
  const top = window.document.documentElement.clientWidth > 7000 ? -50 : -11;
  const option = {
    element: ele,
    anchor: "bottom-left",
    offset: [left, top],
  };
  ele.innerHTML = "×";
  // eslint-disable-next-line no-undef
  new mapboxgl.Marker(option).setLngLat(coords).addTo(resultData.map);
  ele.onclick = function (__e) {
    __e.stopPropagation();
    closeMeasureLine(resultData.map);
  };
}

/**
 * 关闭触发
 */
export function closeMeasureLine(mapObject) {
  if (!mapObject) return;
  const resultData = getBeforeOrAfterDataByMapContainerIdHandler(mapObject);
  if (!resultData) return;
  resultData.map.doubleClickZoom.enable();
  clearMeasureLine(resultData.map);
  resultData.map.off("click", resultData.mapClickFunction);
  resultData.map.off("mousemove", resultData.mapMousemoveFunction);
  resultData.map.off("dblclick", resultData.mapDblClickFunction);
  resultData.map.off(
    "click",
    "measure-line-points",
    resultData.clickMeasurePointsFunction
  );
  resultData.isMeasure = false;
  resultData.map.getCanvas().style.cursor = "";
  resultData.map
    .getSource("measure-line-move")
    .setData({ type: "FeatureCollection", features: [] });
  resultData.jsonPoint = { type: "FeatureCollection", features: [] };
  resultData.jsonLine = { type: "FeatureCollection", features: [] };
  resultData.points = [];
}

// 根据地图对象的id来输出当前获取对应的全局变量数据
function getBeforeOrAfterDataByMapContainerIdHandler(mapObject) {
  if (!mapObject) return;
  const currentMapContainerId = mapObject._container.getAttribute("id");
  return currentMapContainerId.indexOf("-after") !== -1 ? after : before;
}
