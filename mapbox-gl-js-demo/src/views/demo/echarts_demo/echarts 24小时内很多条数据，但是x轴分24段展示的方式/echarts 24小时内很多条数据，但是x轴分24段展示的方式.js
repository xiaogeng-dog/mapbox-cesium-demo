/**
 *
 * 以下代码可copy至echarts示例中直接查看效果
 */

var mytime24 = [];
var i = 0;
var now_data = new Date();
var year_now = now_data.getFullYear(),
  month_now = now_data.getMonth() + 1,
  day_now = now_data.getDate();
var time_pre = `${year_now}/${month_now}/${day_now} 00:00:00`;
var ttt = new Date(time_pre).getTime();
for (var i = 0; i < 25; i++) {
  mytime24.push([ttt, ""]); //传入value的值为空则该值点不会显示在图表中
  ttt = ttt + 3600000;
}
var data = [
  [1619625600000, "100"],
  [1619629800000, "120"],
  [1619630160000, "130"],
  [1619630520000, "160"],
  [1619652120000, "10"],
  [1619652120000, "120"],
];
option = {
  xAxis: {
    type: "time",
    splitNumber: 24,
    splitLine: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: "#ccc",
      },
    },
    axisLabel: {
      // 格式化数据只显示时间的小时
      formatter: function (value, index) {
        var data = new Date(value);
        var hours = data.getHours() + "";
        return hours;
      },
    },
    data: [],
  },
  yAxis: {
    min: 0,
    max: 1000,
  },
  series: [
    {
      name: "",
      type: "line",
      data: mytime24, //空数据
    },
    {
      name: "",
      type: "line",
      data: data, //原数据
    },
  ],
};
