const icon = require("./abc.png");
const arrow =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAnElEQVQ4T63TsQ0CMQyF4f/NgMQQ0CBR0FIx190cFIiWhhFoKdgEiRUeSoF0gO8cjkub+Evs2OLPpc9422dgBRwlNZn/BtjeApdOUJsh0QuuwKYWiYAFcAKWHaSR1EbpfAHlkO0ICdMJgV+QXmAAmUu6v9IZA8wkPVKgtg7TF7H25t4UbN+A9ahGmqqVD8AO2GdzUF45+I3ZJJb9JxbwRhEhB66xAAAAAElFTkSuQmCC";

import * as turf from "@turf/turf";
class AnimationRoute {
  constructor(map, json, play = true) {
    this._map = map;
    this._json = json;
    this._play = play;
    this.init();
  }

  init() {
    const that = this;
    that._index = 0;
    that._count = 1500;
    that._step = turf.length(that._json) / that._count;
    that._flag = 0;
    that._playId = "play-" + Date.now();

    // 添加路径图层
    that._map.addSource(that._playId, {
      type: "geojson",
      data: that._json,
    });
    that._map.addLayer({
      id: that._playId,
      type: "line",
      source: that._playId,
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#aaaaaa",
        "line-width": 10,
      },
    });
    // 添加已播放路径
    that._map.addSource(that._playId + "-played", {
      type: "geojson",
      data: that._json,
    });
    that._map.addLayer({
      id: that._playId + "-played",
      type: "line",
      source: that._playId + "-played",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#09801a",
        "line-width": 10,
      },
    });

    // 添加路径上的箭头
    that._map.loadImage(arrow, function (error, image) {
      if (error) throw error;
      that._map.addImage(that._playId + "-arrow", image);
      that._map.addLayer({
        id: that._playId + "-arrow",
        source: that._playId,
        type: "symbol",
        layout: {
          "symbol-placement": "line",
          "symbol-spacing": 50,
          "icon-image": that._playId + "-arrow",
          "icon-size": 0.6,
          "icon-allow-overlap": true,
        },
      });
    });

    // 添加动态图标
    that._map.loadImage(icon, function (error, image) {
      if (error) throw error;
      that._map.addImage(that._playId + "-icon", image);
      that._map.addSource(that._playId + "-point", {
        type: "geojson",
        data: that._getDataByCoords(),
      });
      that._map.addLayer({
        id: that._playId + "-point",
        source: that._playId + "-point",
        type: "symbol",
        layout: {
          "icon-image": that._playId + "-icon",
          "icon-size": 0.75,
          "icon-allow-overlap": true,
          "icon-rotation-alignment": "map",
          "icon-pitch-alignment": "map",
          "icon-rotate": 50,
        },
      });
      that._animatePath();
    });
  }

  _animatePath() {
    if (this._index > this._count) {
      window.cancelAnimationFrame(this._flag);
    } else {
      const coords = turf.along(this._json, this._step * this._index).geometry
        .coordinates;
      // 已播放的线
      const start = turf.along(this._json, 0).geometry.coordinates;
      this._map
        .getSource(this._playId + "-played")
        .setData(turf.lineSlice(start, coords, this._json));

      // 车的图标位置
      this._map
        .getSource(this._playId + "-point")
        .setData(this._getDataByCoords(coords));
      // 计算旋转角度
      const nextIndex =
        this._index === this._count ? this._count - 1 : this._index + 1;
      const coordsNext = turf.along(this._json, this._step * nextIndex).geometry
        .coordinates;
      let angle = turf.bearing(turf.point(coords), turf.point(coordsNext)) - 90;
      if (this._index === this._count) angle += 180;
      this._map.setLayoutProperty(
        this._playId + "-point",
        "icon-rotate",
        angle
      );

      this._index++;
      if (this._play)
        this._flag = requestAnimationFrame(() => {
          console.log(111);
          this._animatePath();
        });
    }
  }

  _getDataByCoords(coords) {
    if (!coords || coords.length !== 2) return null;
    return turf.point(coords, {
      label: this._formatDistance(this._step * this._index),
    });
  }

  _formatDistance(dis) {
    if (dis < 1) {
      dis = dis * 1000;
      return dis.toFixed(0) + "米";
    } else {
      return dis.toFixed(2) + "千米";
    }
  }

  destory() {
    window.cancelAnimationFrame(this._flag);
    if (this._map.getSource(this._playId + "-point")) {
      this._map.removeLayer(this._playId + "-point");
      // this._map.removeLayer(this._playId + '-label')
      this._map.removeSource(this._playId + "-point");
    }
    if (this._map.getSource(this._playId)) {
      this._map.removeLayer(this._playId);
      this._map.removeSource(this._playId);
    }
  }
}

let AnimationRoutes = null;
export default function (map, json) {
  return AnimationRoutes || (AnimationRoutes = new AnimationRoute(map, json));
}
