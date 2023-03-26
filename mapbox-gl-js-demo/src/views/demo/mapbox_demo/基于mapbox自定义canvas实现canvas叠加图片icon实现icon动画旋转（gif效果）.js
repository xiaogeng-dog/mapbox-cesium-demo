//TODO 基于mapbox自定义canvas实现canvas叠加图片icon实现icon动画旋转（gif效果）
const gifImage = {
  width: 40,
  height: 40,
  data: new Uint8Array(size * size * 4),
  onAdd: function () {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext("2d");
  },
  render: function () {
    const context = this.context;
    context.clearRect(0, 0, this.width, this.height);
    const img = new Image();
    img.src = require("../img.png"); // 图片路径
    context.drawImage(img, 0, 0);
    img.onload = function () {
      context.clearRect(0, 0, 40, 40);
      context.translate(20, 20);
      context.rotate(Math.PI / 45);
      context.translate(-20, -20);
      context.drawImage(img, 0, 0);
    };
    this.data = context.getImageData(0, 0, this.width, this.height).data;
    mapObject.triggerRepaint();
    return true;
  },
};
mapObject.addImage("gifImage", gifImage); // 可作为icon-image使用
