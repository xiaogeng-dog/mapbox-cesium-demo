
/**
 * 倾斜摄影偏移
 * @param  {Object} tileset 倾斜摄影对象
 * @param  {String} longitude 中心点经度
 * @param  {String} latitude 中心点纬度
 * @param  {Number} offsetHeight 模型贴地高度设置
*/
    function adjust3Dtileset(tileset, longitude, latitude, offsetHeight) {
    // var transform = new window.Cesium.Kq3dTransform(); // 模型的变换 平移和旋转
    var boundingSphere = tileset.boundingSphere;
    var cartographic = window.Cesium.Cartographic.fromCartesian(boundingSphere.center);
    longitude = longitude || cartographic.longitude;
    latitude = latitude || cartographic.latitude;
    console.log(cartographic);
    var surface = window.Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        cartographic.height
    );
    //带高程的新笛卡尔坐标
    var offset = window.Cesium.Cartesian3.fromRadians(
        longitude,
        latitude,
        offsetHeight
    );
    //得到变换矩阵
    var translate = window.Cesium.Cartesian3.subtract(
        offset,
        surface,
        new window.Cesium.Cartesian3()
    ); 
    tileset.modelMatrix = window.Cesium.Matrix4.fromTranslation(translate);
    }