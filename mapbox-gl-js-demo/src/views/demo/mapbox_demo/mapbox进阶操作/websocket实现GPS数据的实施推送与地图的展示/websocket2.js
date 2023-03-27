const io = require("nodejs-websocket");
let connection = null;
let gps = {};

for (let i = 0; i < 20; i++) {
  gps["gps" + i] = {
    offsetX: randomNum(-0.0001, 0.0001),
    offsetY: randomNum(-0.0001, 0.0001),
    accuracy: randomNum(50, 200),
  };
}

// 执行websocket处理连接方法
io.createServer((con) => {
  console.log("new connection...");
  connection = con;
  sendData();
  //处理客户端发送过来的消息
  // connection.on("text",function(data){
  //     console.log("接收到的客户端消息:" + data);
  // })
  //监听关闭
  connection.on("close", function (code, reason) {
    console.log("Connection closed");
  });
  //监听异常
  connection.on("error", () => {
    console.log("服务异常关闭...");
  });
}).listen(3000);

function sendData() {
  connection.sendText(getGpsPositions());
  setTimeout(sendData, 1000);
}

function getGpsPositions() {
  const [xmin, ymin, xmax, ymax] = [113.9875, 22.51947, 114.1066, 22.5711];
  let data = [];
  for (let k in gps) {
    const d = gps[k];
    let { lon, lat } = d;
    if (!d.lon) {
      d.lon = randomNum(xmin, xmax);
      d.lat = randomNum(ymin, ymax);
      d.rotate = 0;
    } else {
      d.lon = d.lon + d.offsetX;
      d.lat = d.lat + d.offsetY;
      const angle = Math.atan2(lat - d.lat, d.lon - lon);
      d.rotate = angle * (180 / Math.PI);
    }
    data.push({
      code: k,
      coords: [d.lon, d.lat],
      accuracy: d.accuracy + randomNum(-0.5, 0.5),
      rotate: d.rotate,
    });
  }
  return JSON.stringify(data);
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}
