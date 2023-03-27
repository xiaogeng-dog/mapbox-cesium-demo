const ws = require("nodejs-websocket");
const createServer = () => {
  let server = ws.createServer((connection) => {
    connection.on("text", function (result) {
      console.log("发送消息", result);
    });
    connection.on("connect", function (code) {
      console.log("开启连接", code);
    });
    connection.on("close", function (code) {
      console.log("关闭连接", code);
    });
    connection.on("error", function (code) {
      console.log("异常关闭", code);
    });
  });
  return server;
};

module.exports = createServer();

// app.js
// 导入nodejs-websocket模块
const io = require("nodejs-websocket");
let connection = null;
let gps = {};

for (let i = 0; i < 200; i++) {
  gps["gps" + i] = {
    offset: randomNum(-0.2, 0.2),
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
  const [xmin, ymin, xmax, ymax] = [36.6324, 8.04789, 171.6324, 57.96];
  let data = [];
  for (let k in gps) {
    const d = gps[k];
    let lon, lat;
    if (!d.lon) {
      lon = randomNum(xmin, xmax);
      lat = randomNum(ymin, ymax);
    } else {
      lon = d.lon + d.offset;
      lat = d.lat + d.offset;
    }
    gps[k] = {
      lon: lon,
      lat: lat,
      offset: d.offset,
    };
    data.push({ code: k, coords: [lon, lat] });
  }
  return JSON.stringify(data);
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}
