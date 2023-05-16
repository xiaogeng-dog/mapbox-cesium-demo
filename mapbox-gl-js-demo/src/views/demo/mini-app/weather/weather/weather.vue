<template>
  <view>
    <view
      class="radius-32 padding margin-sm flex flex-direction justify-between"
      :style="weatherBg(weather.weathers_now.icon)"
      style="width: 706upx; height: 986rpx; border-radius: 36upx"
    >
      <view class="flex justify-between align-start">
        <view class="flex align-center">
          <image
            src="/static/location.png"
            style="width: 40rpx; height: 40rpx"
            mode="aspectFit"
          ></image>
          <text class="text-39">{{ weather.cityinfo.city }}</text>
        </view>
        <view class="flex flex-direction align-end">
          <text class="text-xl">{{
            new Date(weather.weathers_now.obsTime).formatCode("yyyy-MM-dd")
          }}</text>
          <text class="text-xl">{{
            format(new Date(weather.weathers_now.obsTime).getDate())
          }}</text>
        </view>
      </view>
      <view class="flex flex-direction align-center titleColor">
        <view class="flex align-center">
          <view class="flex flex-direction justify-end padding-top-xl">
            <image
              :src="'/static/icon/' + weather.weathers_now.icon + '.png'"
              style="width: 188rpx; height: 188rpx"
              mode="aspectFit"
            ></image>
          </view>
          <view class="flex flex-direction">
            <view class="flex text-bold" style="font-size: 108rpx"
              >{{ weather.weathers_now.temp }}°</view
            >
            <view
              class="flex"
              style="font-size: 46rpx; margin-left: 16rpx; margin-top: -20rpx"
              >{{ weather.weathers_now.text }}</view
            >
          </view>
        </view>
        <view class="flex text-center padding-lr text-xl margin-top-sm">
          {{ format_indices(3) }}
        </view>
      </view>
      <view
        class="flex titleColor justify-between align-center padding-lr-lg text-39"
        style="
          width: 656upx;
          height: 181rpx;
          background: #eaeef8;
          border-radius: 22rpx;
        "
      >
        <view class="flex flex-direction">
          <text>{{ weather.weathers_now.windScale }}级</text>
          <text>{{ weather.weathers_now.windDir }}</text>
        </view>
        <view class="flex flex-direction">
          <text>{{ weather.weathers_now.humidity }}%</text>
          <text>相对湿度</text>
        </view>
        <view class="flex flex-direction">
          <text>{{ format_indices(weather.weathers_indices.type) }}</text>
          <text>紫外线</text>
        </view>
      </view>
    </view>
    <view class="bg-white radius-32 padding margin-sm flex justify-between">
      <view class="flex flex-direction align-center">
        <text class="text-42">今天</text>
        <image
          :src="'/static/icon/' + weather.weathers_now.icon + '.png'"
          style="width: 50rpx; height: 50rpx; margin-top: 10rpx"
          mode=""
        ></image>
      </view>
      <view class="flex">
        <view class="flex flex-direction align-center">
          <text class="text-42"
            >{{ weather.weathers_7d[0].tempMax }}/{{
              weather.weathers_7d[0].tempMin
            }}°</text
          >
          <text class="text-42">{{ weather.weathers_7d[0].textDay }}</text>
        </view>
        <view
          style="
            width: 1rpx;
            height: 83rpx;
            background: #ececec;
            border-radius: 10rpx;
          "
          class="margin-lr-lg"
        ></view>

        <view class="flex flex-direction align-center">
          <text class="text-42">明天</text>
          <image
            :src="'/static/icon/' + weather.weathers_7d[1].iconDay + '.png'"
            style="width: 50rpx; height: 50rpx; margin-top: 10rpx"
            mode=""
          ></image>
        </view>
      </view>
      <view class="flex justify-between">
        <view class="flex flex-direction align-center">
          <text class="text-42"
            >{{ weather.weathers_7d[1].tempMax }}/{{
              weather.weathers_7d[1].tempMin
            }}°</text
          >
          <text class="text-42">{{ weather.weathers_7d[1].textDay }}</text>
        </view>
      </view>
    </view>

    <view class="bg-white radius-32 padding margin-sm">
      <view
        class="titleColor flex align-center justify-center text-bold text-xl margin-bottom"
      >
        24小时天气预报
      </view>
      <scroll-view scroll-x="true">
        <view class="flex" style="width: 2928rpx">
          <view
            class="flex flex-direction align-center padding-tb"
            :class="index == 0 ? 'weather_24bg' : ''"
            style="width: 122rpx"
            v-for="(item, index) in weather.weathers_24h"
            :key="index"
          >
            <text style="color: #949494" class="text-39"
              >{{ formatTime(item.fxTime) }}点</text
            >
            <text class="titleColor text-39 margin-top-xs">{{
              item.text
            }}</text>
            <image
              src="/static/icon/101.png"
              class="margin-tb-sm"
              style="width: 50rpx; height: 50rpx"
              mode=""
            ></image>
            <text class="titleColor text-xl">{{ item.temp }}°</text>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="bg-white radius-32 padding-tb padding-lr-sm margin-sm">
      <view
        class="titleColor flex align-center justify-center text-bold text-xl margin-bottom"
      >
        未来一周天气预报
      </view>
      <mckou-weather
        :weatherData="weather.weathers_7d"
        ref="mckouWeather"
      ></mckou-weather>
    </view>

    <view class="bg-white radius-32 padding margin-sm">
      <view
        class="titleColor flex align-center justify-center text-bold text-xl margin-bottom"
      >
        空气质量
      </view>
      <view class="flex">
        <view class="tui-progress-box">
          <canvas style="position: relative" canvas-id="myCanvas">
            <view class="tui-progress-text">
              <view class="tui-progress-num">{{
                weather.weathers_air.aqi
              }}</view>
            </view>
            <view class="tui-progress-text text-df text-bold">
              <view style="margin-top: 110px">{{
                weather.weathers_air.category
              }}</view>
            </view>
          </canvas>
        </view>
        <view
          class="margin-right flex flex-direction justify-around margin-left-lg"
        >
          <view class="flex flex-direction text-center">
            <view class="titleColor text-xl">{{
              weather.weathers_air.pm2p5
            }}</view>
            <view>
              <progress
                stroke-width="4"
                border-radius="10"
                style="width: 100rpx"
                :active-color="formatColorpm2p5(weather.weathers_air.pm2p5)"
                :percent="weather.weathers_air.pm2p5 * 0.4"
              ></progress>
            </view>
            <view class="textcolor text-sm">PM2.5</view>
          </view>
          <view class="flex flex-direction text-center">
            <view class="titleColor text-xl">{{
              weather.weathers_air.co
            }}</view>
            <view>
              <progress
                stroke-width="4"
                border-radius="10"
                style="width: 100rpx"
                :active-color="formatColorco(weather.weathers_air.co)"
                :percent="weather.weathers_air.co * 0.238"
              ></progress>
            </view>
            <view class="textcolor text-sm">CO</view>
          </view>
        </view>
        <view class="flex flex-direction justify-around">
          <view class="flex flex-direction text-center">
            <view class="titleColor text-xl">{{
              weather.weathers_air.pm10
            }}</view>
            <view>
              <progress
                stroke-width="4"
                border-radius="10"
                style="width: 100rpx"
                :active-color="formatColorpm10(weather.weathers_air.pm10)"
                :percent="weather.weathers_air.pm10 * 0.177"
              ></progress>
            </view>
            <view class="textcolor text-sm">PM10</view>
          </view>
          <view class="flex flex-direction text-center">
            <view class="titleColor text-xl">{{
              weather.weathers_air.so2
            }}</view>
            <view>
              <progress
                stroke-width="4"
                border-radius="10"
                style="width: 100rpx"
                :active-color="formatColorso2(weather.weathers_air.so2)"
                :percent="weather.weathers_air.so2 * 0.0625"
              ></progress>
            </view>
            <view class="textcolor text-sm">SO3</view>
          </view>
        </view>
        <view class="margin-lr flex flex-direction justify-around">
          <view class="flex flex-direction text-center">
            <view class="titleColor text-xl">{{
              weather.weathers_air.o3
            }}</view>
            <view>
              <progress
                stroke-width="4"
                border-radius="10"
                style="width: 100rpx"
                :active-color="formatColoro3(weather.weathers_air.o3)"
                :percent="weather.weathers_air.o3 * 0.125"
              ></progress>
            </view>
            <view class="textcolor text-sm">O3</view>
          </view>
          <view class="flex flex-direction text-center">
            <view class="titleColor text-xl">{{
              weather.weathers_air.no2
            }}</view>
            <view>
              <progress
                stroke-width="4"
                border-radius="10"
                style="width: 100rpx"
                :active-color="formatColorno2(weather.weathers_air.no2)"
                :percent="weather.weathers_air.no2 * 0.178"
              ></progress>
            </view>
            <view class="textcolor text-sm">NO2</view>
          </view>
        </view>
      </view>
    </view>
    <view class="bg-white radius-32 padding margin-sm">
      <view
        class="titleColor flex align-center justify-center text-bold text-xl margin-bottom"
      >
        生活指数
      </view>
      <view class="flex justify-between margin-bottom" style="font-weight: 500">
        <view class="flex">
          <image
            src="/static/8.png"
            style="width: 100rpx; height: 100rpx"
            mode=""
          ></image>
          <view class="flex flex-direction margin-left-sm">
            <text class="text-xl">{{ format_indices1(8) }}</text>
            <text class="textcolor text-sm">舒适度指数</text>
          </view>
        </view>
        <view class="flex" style="width: 300rpx">
          <image
            src="/static/2.png"
            style="width: 100rpx; height: 100rpx"
            mode=""
          ></image>
          <view class="flex flex-direction margin-left-sm">
            <text class="text-xl">{{ format_indices1(2) }}</text>
            <text class="textcolor text-sm">洗车指数</text>
          </view>
        </view>
      </view>
      <view class="flex justify-between margin-bottom" style="font-weight: 500">
        <view class="flex">
          <image
            src="/static/3.png"
            style="width: 100rpx; height: 100rpx"
            mode=""
          ></image>
          <view class="flex flex-direction margin-left-sm">
            <text class="text-xl">{{ format_indices1(3) }}</text>
            <text class="textcolor text-sm">穿衣指数</text>
          </view>
        </view>
        <view class="flex" style="width: 300rpx">
          <image
            src="/static/9.png"
            style="width: 100rpx; height: 100rpx"
            mode=""
          ></image>
          <view class="flex flex-direction margin-left-sm">
            <text class="text-xl">{{ format_indices1(9) }}</text>
            <text class="textcolor text-sm">感冒指数</text>
          </view>
        </view>
      </view>
      <view class="flex justify-between margin-bottom" style="font-weight: 500">
        <view class="flex">
          <image
            src="/static/1.png"
            style="width: 100rpx; height: 100rpx"
            mode=""
          ></image>
          <view class="flex flex-direction margin-left-sm">
            <text class="text-xl">{{ format_indices1(1) }}</text>
            <text class="textcolor text-sm">运动指数</text>
          </view>
        </view>
        <view class="flex" style="width: 300rpx">
          <image
            src="/static/6.png"
            style="width: 100rpx; height: 100rpx"
            mode=""
          ></image>
          <view class="flex flex-direction margin-left-sm">
            <text class="text-xl">{{ format_indices1(6) }}</text>
            <text class="textcolor text-sm">旅游指数</text>
          </view>
        </view>
      </view>
      <view class="flex justify-between margin-bottom" style="font-weight: 500">
        <view class="flex">
          <image
            src="/static/5.png"
            style="width: 100rpx; height: 100rpx"
            mode=""
          ></image>
          <view class="flex flex-direction margin-left-sm">
            <text class="text-xl">{{ format_indices1(5) }}</text>
            <text class="textcolor text-sm">紫外线指数</text>
          </view>
        </view>
        <view class="flex" style="width: 300rpx">
          <image
            src="/static/10.png"
            style="width: 100rpx; height: 100rpx"
            mode=""
          ></image>
          <view class="flex flex-direction margin-left-sm">
            <text class="text-xl">{{ format_indices1(10) }}</text>
            <text class="textcolor text-sm">空气污染指数</text>
          </view>
        </view>
      </view>
    </view>

    <view style="height: 100rpx; width: 100%"></view>
  </view>
</template>

<script>
Date.prototype.formatCode = function (formatStr = "yyyy-MM-DD HH:mm:ss") {
  const paddingZero = (num) => (num >= 10 ? num : "0" + num);
  let str = formatStr;
  str = str.replace(/yyyy|YYYY/, this.getFullYear());
  str = str.replace(/MM/, paddingZero(this.getMonth() + 1));
  str = str.replace(/dd|DD/, paddingZero(this.getDate()));
  str = str.replace(/hh|HH/, paddingZero(this.getHours()));
  str = str.replace(/mm/, paddingZero(this.getMinutes()));
  str = str.replace(/ss/, paddingZero(this.getSeconds()));
  str = str.replace(/SS/, paddingZero(this.getMilliseconds()));
  return str;
};
import mckouWeather from "@/components/mckou-weather/mckouWeather.vue";
let canvas = {
  width: 100,
  height: 100,
};
let ctx;
// 定义圆圈的半径和位置
const circleRadius = 50;
const circleCenterX = canvas.width / 2;
const circleCenterY = canvas.height / 2;
// 定义圆点的半径和颜色
const dotRadius = 5;
const dotColor = "#E74D4D";
const dotRadius2 = 8;
const dotColor2 = "#FFFFFF";
// 定义圆点在圆圈上的初始位置
let angle = 0;
var that;
export default {
  data() {
    return {
      sAngle: -Math.PI,
      progress2: 0,
      percent: 0,
      weather: {
        cityinfo: {
          status: "1",
          info: "OK",
          infocode: "10000",
          province: "北京市",
          city: "北京市",
          adcode: 110111,
          district: "房山区",
        },
        weathers_now: {
          obsTime: "2023-04-19T16:56+08:00",
          temp: "24",
          feelsLike: "19",
          icon: "101",
          text: "多云",
          wind360: "172",
          windDir: "南风",
          windScale: "4",
          windSpeed: "24",
          humidity: "41",
          precip: "0.0",
          pressure: "996",
          vis: "13",
          cloud: "91",
          dew: "10",
        },
        weathers_7d: [
          {
            fxDate: "2023-04-19",
            sunrise: "05:32",
            sunset: "18:56",
            moonrise: "05:05",
            moonset: "17:59",
            moonPhase: "残月",
            moonPhaseIcon: "807",
            tempMax: "27",
            tempMin: "14",
            iconDay: "101",
            textDay: "多云",
            iconNight: "151",
            textNight: "多云",
            wind360Day: "180",
            windDirDay: "南风",
            windScaleDay: "3-4",
            windSpeedDay: "16",
            wind360Night: "0",
            windDirNight: "北风",
            windScaleNight: "3-4",
            windSpeedNight: "16",
            humidity: "34",
            precip: "0.0",
            pressure: "1005",
            vis: "25",
            cloud: "25",
            uvIndex: "8",
          },
          {
            fxDate: "2023-04-20",
            sunrise: "05:30",
            sunset: "18:57",
            moonrise: "05:30",
            moonset: "19:11",
            moonPhase: "新月",
            moonPhaseIcon: "800",
            tempMax: "20",
            tempMin: "12",
            iconDay: "101",
            textDay: "多云",
            iconNight: "151",
            textNight: "多云",
            wind360Day: "45",
            windDirDay: "东北风",
            windScaleDay: "3-4",
            windSpeedDay: "16",
            wind360Night: "0",
            windDirNight: "北风",
            windScaleNight: "1-2",
            windSpeedNight: "3",
            humidity: "59",
            precip: "0.0",
            pressure: "1019",
            vis: "24",
            cloud: "25",
            uvIndex: "3",
          },
          {
            fxDate: "2023-04-21",
            sunrise: "05:29",
            sunset: "18:58",
            moonrise: "05:57",
            moonset: "20:21",
            moonPhase: "峨眉月",
            moonPhaseIcon: "801",
            tempMax: "15",
            tempMin: "8",
            iconDay: "101",
            textDay: "多云",
            iconNight: "151",
            textNight: "多云",
            wind360Day: "225",
            windDirDay: "西南风",
            windScaleDay: "3-4",
            windSpeedDay: "16",
            wind360Night: "225",
            windDirNight: "西南风",
            windScaleNight: "1-2",
            windSpeedNight: "3",
            humidity: "75",
            precip: "0.0",
            pressure: "1018",
            vis: "24",
            cloud: "25",
            uvIndex: "3",
          },
          {
            fxDate: "2023-04-22",
            sunrise: "05:28",
            sunset: "18:59",
            moonrise: "06:26",
            moonset: "21:32",
            moonPhase: "峨眉月",
            moonPhaseIcon: "801",
            tempMax: "18",
            tempMin: "7",
            iconDay: "101",
            textDay: "多云",
            iconNight: "150",
            textNight: "晴",
            wind360Day: "90",
            windDirDay: "东风",
            windScaleDay: "1-2",
            windSpeedDay: "3",
            wind360Night: "225",
            windDirNight: "西南风",
            windScaleNight: "1-2",
            windSpeedNight: "3",
            humidity: "59",
            precip: "0.0",
            pressure: "1021",
            vis: "25",
            cloud: "25",
            uvIndex: "3",
          },
          {
            fxDate: "2023-04-23",
            sunrise: "05:26",
            sunset: "19:00",
            moonrise: "07:02",
            moonset: "22:39",
            moonPhase: "峨眉月",
            moonPhaseIcon: "801",
            tempMax: "20",
            tempMin: "10",
            iconDay: "101",
            textDay: "多云",
            iconNight: "151",
            textNight: "多云",
            wind360Day: "225",
            windDirDay: "西南风",
            windScaleDay: "1-2",
            windSpeedDay: "3",
            wind360Night: "225",
            windDirNight: "西南风",
            windScaleNight: "1-2",
            windSpeedNight: "3",
            humidity: "43",
            precip: "0.0",
            pressure: "1020",
            vis: "25",
            cloud: "25",
            uvIndex: "3",
          },
          {
            fxDate: "2023-04-24",
            sunrise: "05:25",
            sunset: "19:01",
            moonrise: "07:43",
            moonset: "23:41",
            moonPhase: "峨眉月",
            moonPhaseIcon: "801",
            tempMax: "16",
            tempMin: "6",
            iconDay: "101",
            textDay: "多云",
            iconNight: "151",
            textNight: "多云",
            wind360Day: "270",
            windDirDay: "西风",
            windScaleDay: "1-2",
            windSpeedDay: "3",
            wind360Night: "0",
            windDirNight: "北风",
            windScaleNight: "1-2",
            windSpeedNight: "3",
            humidity: "80",
            precip: "0.0",
            pressure: "1009",
            vis: "18",
            cloud: "25",
            uvIndex: "2",
          },
          {
            fxDate: "2023-04-25",
            sunrise: "05:23",
            sunset: "19:02",
            moonrise: "08:31",
            moonset: "00:34",
            moonPhase: "峨眉月",
            moonPhaseIcon: "801",
            tempMax: "21",
            tempMin: "10",
            iconDay: "100",
            textDay: "晴",
            iconNight: "150",
            textNight: "晴",
            wind360Day: "180",
            windDirDay: "南风",
            windScaleDay: "1-2",
            windSpeedDay: "3",
            wind360Night: "180",
            windDirNight: "南风",
            windScaleNight: "1-2",
            windSpeedNight: "3",
            humidity: "75",
            precip: "0.0",
            pressure: "1012",
            vis: "24",
            cloud: "25",
            uvIndex: "8",
          },
        ],
        weathers_24h: [
          {
            fxTime: "2023-04-19T18:00+08:00",
            temp: "25",
            icon: "101",
            text: "多云",
            wind360: "241",
            windDir: "西南风",
            windScale: "3-4",
            windSpeed: "18",
            humidity: "40",
            pop: "7",
            precip: "0.0",
            pressure: "992",
            cloud: "51",
            dew: "11",
          },
          {
            fxTime: "2023-04-19T19:00+08:00",
            temp: "23",
            icon: "151",
            text: "多云",
            wind360: "268",
            windDir: "西风",
            windScale: "3-4",
            windSpeed: "24",
            humidity: "47",
            pop: "7",
            precip: "0.0",
            pressure: "993",
            cloud: "75",
            dew: "11",
          },
          {
            fxTime: "2023-04-19T20:00+08:00",
            temp: "21",
            icon: "151",
            text: "多云",
            wind360: "287",
            windDir: "西北风",
            windScale: "3-4",
            windSpeed: "18",
            humidity: "54",
            pop: "7",
            precip: "0.0",
            pressure: "995",
            cloud: "100",
            dew: "12",
          },
          {
            fxTime: "2023-04-19T21:00+08:00",
            temp: "19",
            icon: "151",
            text: "多云",
            wind360: "307",
            windDir: "西北风",
            windScale: "3-4",
            windSpeed: "16",
            humidity: "62",
            pop: "7",
            precip: "0.0",
            pressure: "996",
            cloud: "100",
            dew: "12",
          },
          {
            fxTime: "2023-04-19T22:00+08:00",
            temp: "18",
            icon: "151",
            text: "多云",
            wind360: "334",
            windDir: "西北风",
            windScale: "3-4",
            windSpeed: "16",
            humidity: "67",
            pop: "7",
            precip: "0.0",
            pressure: "997",
            cloud: "100",
            dew: "12",
          },
          {
            fxTime: "2023-04-19T23:00+08:00",
            temp: "18",
            icon: "151",
            text: "多云",
            wind360: "3",
            windDir: "北风",
            windScale: "3-4",
            windSpeed: "14",
            humidity: "69",
            pop: "7",
            precip: "0.0",
            pressure: "999",
            cloud: "100",
            dew: "12",
          },
          {
            fxTime: "2023-04-20T00:00+08:00",
            temp: "18",
            icon: "151",
            text: "多云",
            wind360: "26",
            windDir: "东北风",
            windScale: "3-4",
            windSpeed: "16",
            humidity: "68",
            pop: "7",
            precip: "0.0",
            pressure: "1000",
            cloud: "98",
            dew: "12",
          },
          {
            fxTime: "2023-04-20T01:00+08:00",
            temp: "17",
            icon: "151",
            text: "多云",
            wind360: "45",
            windDir: "东北风",
            windScale: "3-4",
            windSpeed: "16",
            humidity: "66",
            pop: "7",
            precip: "0.0",
            pressure: "1002",
            cloud: "96",
            dew: "11",
          },
          {
            fxTime: "2023-04-20T02:00+08:00",
            temp: "17",
            icon: "151",
            text: "多云",
            wind360: "57",
            windDir: "东北风",
            windScale: "3-4",
            windSpeed: "16",
            humidity: "63",
            pop: "7",
            precip: "0.0",
            pressure: "1003",
            cloud: "94",
            dew: "10",
          },
          {
            fxTime: "2023-04-20T03:00+08:00",
            temp: "16",
            icon: "151",
            text: "多云",
            wind360: "60",
            windDir: "东北风",
            windScale: "3-4",
            windSpeed: "20",
            humidity: "59",
            pop: "7",
            precip: "0.0",
            pressure: "1003",
            cloud: "96",
            dew: "8",
          },
          {
            fxTime: "2023-04-20T04:00+08:00",
            temp: "15",
            icon: "151",
            text: "多云",
            wind360: "60",
            windDir: "东北风",
            windScale: "4-5",
            windSpeed: "25",
            humidity: "55",
            pop: "7",
            precip: "0.0",
            pressure: "1004",
            cloud: "98",
            dew: "6",
          },
          {
            fxTime: "2023-04-20T05:00+08:00",
            temp: "14",
            icon: "151",
            text: "多云",
            wind360: "61",
            windDir: "东北风",
            windScale: "4-5",
            windSpeed: "27",
            humidity: "50",
            pop: "7",
            precip: "0.0",
            pressure: "1003",
            cloud: "100",
            dew: "4",
          },
          {
            fxTime: "2023-04-20T06:00+08:00",
            temp: "13",
            icon: "101",
            text: "多云",
            wind360: "64",
            windDir: "东北风",
            windScale: "4-5",
            windSpeed: "29",
            humidity: "49",
            pop: "7",
            precip: "0.0",
            pressure: "1003",
            cloud: "100",
            dew: "2",
          },
          {
            fxTime: "2023-04-20T07:00+08:00",
            temp: "14",
            icon: "101",
            text: "多云",
            wind360: "24",
            windDir: "东北风",
            windScale: "3-4",
            windSpeed: "20",
            humidity: "41",
            pop: "7",
            precip: "0.0",
            pressure: "1003",
            cloud: "100",
            dew: "1",
          },
          {
            fxTime: "2023-04-20T08:00+08:00",
            temp: "15",
            icon: "101",
            text: "多云",
            wind360: "27",
            windDir: "东北风",
            windScale: "3-4",
            windSpeed: "20",
            humidity: "33",
            pop: "7",
            precip: "0.0",
            pressure: "1003",
            cloud: "100",
            dew: "0",
          },
          {
            fxTime: "2023-04-20T09:00+08:00",
            temp: "17",
            icon: "101",
            text: "多云",
            wind360: "30",
            windDir: "东北风",
            windScale: "3-4",
            windSpeed: "20",
            humidity: "29",
            pop: "7",
            precip: "0.0",
            pressure: "1003",
            cloud: "100",
            dew: "-1",
          },
          {
            fxTime: "2023-04-20T10:00+08:00",
            temp: "17",
            icon: "101",
            text: "多云",
            wind360: "34",
            windDir: "东北风",
            windScale: "3-4",
            windSpeed: "20",
            humidity: "26",
            pop: "7",
            precip: "0.0",
            pressure: "1004",
            cloud: "100",
            dew: "-2",
          },
          {
            fxTime: "2023-04-20T11:00+08:00",
            temp: "17",
            icon: "101",
            text: "多云",
            wind360: "36",
            windDir: "东北风",
            windScale: "3-4",
            windSpeed: "20",
            humidity: "23",
            pop: "7",
            precip: "0.0",
            pressure: "1005",
            cloud: "100",
            dew: "-3",
          },
          {
            fxTime: "2023-04-20T12:00+08:00",
            temp: "18",
            icon: "101",
            text: "多云",
            wind360: "38",
            windDir: "东北风",
            windScale: "3-4",
            windSpeed: "22",
            humidity: "20",
            pop: "7",
            precip: "0.0",
            pressure: "1006",
            cloud: "100",
            dew: "-4",
          },
          {
            fxTime: "2023-04-20T13:00+08:00",
            temp: "20",
            icon: "101",
            text: "多云",
            wind360: "38",
            windDir: "东北风",
            windScale: "3-4",
            windSpeed: "22",
            humidity: "16",
            pop: "6",
            precip: "0.0",
            pressure: "1008",
            cloud: "100",
            dew: "-6",
          },
          {
            fxTime: "2023-04-20T14:00+08:00",
            temp: "19",
            icon: "101",
            text: "多云",
            wind360: "38",
            windDir: "东北风",
            windScale: "3-4",
            windSpeed: "20",
            humidity: "15",
            pop: "6",
            precip: "0.0",
            pressure: "1008",
            cloud: "100",
            dew: "-8",
          },
          {
            fxTime: "2023-04-20T15:00+08:00",
            temp: "19",
            icon: "101",
            text: "多云",
            wind360: "42",
            windDir: "东北风",
            windScale: "3-4",
            windSpeed: "20",
            humidity: "15",
            pop: "6",
            precip: "0.0",
            pressure: "1009",
            cloud: "100",
            dew: "-8",
          },
          {
            fxTime: "2023-04-20T16:00+08:00",
            temp: "19",
            icon: "101",
            text: "多云",
            wind360: "48",
            windDir: "东北风",
            windScale: "3-4",
            windSpeed: "18",
            humidity: "16",
            pop: "6",
            precip: "0.0",
            pressure: "1010",
            cloud: "100",
            dew: "-6",
          },
          {
            fxTime: "2023-04-20T17:00+08:00",
            temp: "18",
            icon: "101",
            text: "多云",
            wind360: "52",
            windDir: "东北风",
            windScale: "3-4",
            windSpeed: "18",
            humidity: "18",
            pop: "6",
            precip: "0.0",
            pressure: "1009",
            cloud: "100",
            dew: "-6",
          },
        ],
        weathers_indices: [
          {
            date: "2023-04-19",
            type: "1",
            name: "运动指数",
            level: "2",
            category: "较适宜",
            text: "天气较好，但因风力稍强，户外可选择对风力要求不高的运动，推荐您进行室内运动。",
          },
          {
            date: "2023-04-19",
            type: "2",
            name: "洗车指数",
            level: "2",
            category: "较适宜",
            text: "较适宜洗车，未来一天无雨，风力较小，擦洗一新的汽车至少能保持一天。",
          },
          {
            date: "2023-04-19",
            type: "3",
            name: "穿衣指数",
            level: "5",
            category: "舒适",
            text: "建议着长袖T恤、衬衫加单裤等服装。年老体弱者宜着针织长袖衬衫、马甲和长裤。",
          },
          {
            date: "2023-04-19",
            type: "4",
            name: "钓鱼指数",
            level: "2",
            category: "较适宜",
            text: "较适合垂钓，但风力稍大，会对垂钓产生一定的影响。",
          },
          {
            date: "2023-04-19",
            type: "5",
            name: "紫外线指数",
            level: "4",
            category: "强",
            text: "紫外线辐射强，建议涂擦SPF20左右、PA++的防晒护肤品。避免在10点至14点暴露于日光下。",
          },
          {
            date: "2023-04-19",
            type: "6",
            name: "旅游指数",
            level: "1",
            category: "适宜",
            text: "天气较好，温度适宜，但风稍微有点大。这样的天气适宜旅游，您可以尽情地享受大自然的无限风光。",
          },
          {
            date: "2023-04-19",
            type: "7",
            name: "过敏指数",
            level: "5",
            category: "极易发",
            text: "天气条件极易诱发过敏，易过敏人群尽量减少外出，外出宜穿长衣长裤并佩戴好眼镜和口罩，外出归来时及时清洁手和口鼻。",
          },
          {
            date: "2023-04-19",
            type: "8",
            name: "舒适度指数",
            level: "1",
            category: "舒适",
            text: "白天不太热也不太冷，风力不大，相信您在这样的天气条件下，应会感到比较清爽和舒适。",
          },
          {
            date: "2023-04-19",
            type: "9",
            name: "感冒指数",
            level: "1",
            category: "少发",
            text: "各项气象条件适宜，无明显降温过程，发生感冒机率较低。",
          },
          {
            date: "2023-04-19",
            type: "10",
            name: "空气污染扩散条件指数",
            level: "2",
            category: "良",
            text: "气象条件有利于空气污染物稀释、扩散和清除，可在室外正常活动。",
          },
          {
            date: "2023-04-19",
            type: "11",
            name: "空调开启指数",
            level: "3",
            category: "较少开启",
            text: "您将感到很舒适，一般不需要开启空调。",
          },
          {
            date: "2023-04-19",
            type: "12",
            name: "太阳镜指数",
            level: "3",
            category: "必要",
            text: "白天太阳辐射较强，建议佩戴透射比1级且标注UV380-UV400的浅色太阳镜",
          },
          {
            date: "2023-04-19",
            type: "13",
            name: "化妆指数",
            level: "5",
            category: "去油",
            text: "天气较热，建议用露质面霜打底，水质无油粉底霜，透明粉饼，粉质胭脂。",
          },
          {
            date: "2023-04-19",
            type: "14",
            name: "晾晒指数",
            level: "2",
            category: "适宜",
            text: "天气不错，较适宜晾晒,赶紧把久未见阳光的衣物搬出来吸收一下太阳的味道吧！",
          },
          {
            date: "2023-04-19",
            type: "15",
            name: "交通指数",
            level: "1",
            category: "良好",
            text: "天气较好，路面干燥，交通气象条件良好，车辆可以正常行驶。",
          },
          {
            date: "2023-04-19",
            type: "16",
            name: "防晒指数",
            level: "2",
            category: "较弱",
            text: "紫外线强度较弱，建议涂擦SPF在12-15之间，PA+的防晒护肤品。",
          },
        ],
        weathers_air: {
          pubTime: "2023-04-19T16:00+08:00",
          aqi: "82",
          level: "2",
          category: "良",
          primary: "O3",
          pm10: "104",
          pm2p5: "34",
          no2: "10",
          so2: "3",
          co: "0.4",
          o3: "185",
        },
      },
      pm25List: [0, 35, 75, 115, 150, 250],
      pm10List: [0, 50, 150, 250, 350, 420],
      no2List: [0, 40, 80, 180, 280, 565],
      o3List: [0, 160, 200, 300, 400, 800],
      coList: [0, 5, 10, 35, 60, 90],
      so2List: [0, 150, 500, 650, 800, 1600],
      colorList: [
        "#70D695",
        "#F9C11E",
        "#EC7F17",
        "#E94033",
        "#7D58EB",
        "#A92E09",
      ],
    };
  },
  components: { mckouWeather },
  onLoad() {
    ctx = uni.createCanvasContext("myCanvas", this);
    that = this;
    that.$nextTick(() => {
      that.$refs.mckouWeather.init();
      this.draw();
    });
  },
  methods: {
    weatherBg(icon) {
      console.log(icon);
      if (icon > 99 && icon <= 153) {
        return "background: linear-gradient(235deg, #FFF1E3 0%, #F3F7FF 45%, #DDE4FB 100%);";
      }
      if (icon >= 300 && icon <= 351) {
        return "background: linear-gradient(235deg, #ECF4FF 0%, #E0EBFB 46%, #CBD6E5 100%);";
      }
      if (icon >= 399 && icon <= 499) {
        return "background: linear-gradient(229deg, rgba(225,243,251,0.99) 0%, #DCF5FE 43%, #DBF0F1 100%);";
      }
      if (icon >= 500 && icon <= 515) {
        return "background: linear-gradient(235deg, #D1C3B4 0%, #E1D9D3 38%, #EEEAE7 100%);";
      }
      return "background: linear-gradient(235deg, #EEF5FF 0%, #D6DDEE 100%);";
    },
    formatTime(time) {
      return new Date(time).getHours();
    },
    initData() {
      uniCloud.callFunction({
        name: "mini_weather",
        data: {
          path: "/getWeathers",
        },
        success: (res) => {
          this.weather = res.result;
          this.draw();
          that.$nextTick(() => {
            that.$refs.mckouWeather.init();
          });
          uni.setStorageSync("time", new Date().getTime());
          uni.setStorageSync("weather", JSON.stringify(this.weather));
          console.log(res.result);
        },
      });
    },
    draw() {
      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 120, 0);

      gradient.addColorStop("0", "#70D695");
      gradient.addColorStop("0.2", "#F9C11E");
      gradient.addColorStop("0.4", "#EC7F17");
      gradient.addColorStop("0.6", "#E94033");
      gradient.addColorStop("0.8", "#7D58EB");
      gradient.addColorStop("1", "#A92E09");
      // 绘制圆圈
      ctx.beginPath();
      console.log(Math.PI * 2);
      ctx.arc(
        circleCenterX + 10,
        circleCenterY + 10,
        circleRadius,
        2.2,
        Math.PI * 2.3,
        false
      );
      // ctx.arc(circleCenterX+10, circleCenterY+10, circleRadius, 2.2, Math.PI * 2.3,false);
      ctx.setLineWidth(8);
      ctx.setLineCap("round");
      ctx.setStrokeStyle(gradient);
      ctx.stroke();

      if (this.weather.weathers_air.aqi <= 50) {
        angle = 3;
      }
      if (
        this.weather.weathers_air.aqi > 50 &&
        this.weather.weathers_air.aqi <= 100
      ) {
        angle = 3.5;
      }
      if (
        this.weather.weathers_air.aqi > 101 &&
        this.weather.weathers_air.aqi <= 150
      ) {
        angle = 4.5;
      }
      if (
        this.weather.weathers_air.aqi > 151 &&
        this.weather.weathers_air.aqi <= 200
      ) {
        angle = 5;
      }
      if (
        this.weather.weathers_air.aqi > 201 &&
        this.weather.weathers_air.aqi <= 300
      ) {
        angle = 5.5;
      }
      if (this.weather.weathers_air.aqi > 300) {
        angle = 6;
      }
      // 计算圆点的坐标
      const x = circleCenterX + circleRadius * Math.cos(angle);
      const y = circleCenterY + circleRadius * Math.sin(angle);

      // 绘制圆点
      ctx.beginPath();
      ctx.arc(x + 10, y + 10, dotRadius2, 0, Math.PI * 2);
      ctx.fillStyle = dotColor2;
      ctx.fill();

      // 绘制圆点
      ctx.beginPath();
      ctx.arc(x + 10, y + 10, dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();

      // 更新角度，实现旋转
      console.log(this.weather.weathers_air.aqi);

      if (angle > Math.PI * 2) {
        angle -= Math.PI * 2;
        console.log("angle", angle);
      }
      console.log("--------------------");
      ctx.draw();
      // 循环绘制
      // requestAnimationFrame(this.draw());
    },
    setProgress() {
      let num = this.progress + 20;
      if (num > 100) return;
      this.progress = num;
    },
    change(e) {
      console.log(e);
      //半圆 进度 * 2
      if (e.percentage > 100) return;
      this.progress2 = e.percentage * 20;
    },
    switchChange(type, e) {
      this.$set(this.status, type - 1, e.detail.value);
    },
    format(index) {
      var b = "";
      switch (index) {
        case 0:
          b = "星期日";
          break;
        case 1:
          b = "星期一";
          break;
        case 2:
          b = "星期二";
          break;
        case 3:
          b = "星期三";
          break;
        case 4:
          b = "星期四";
          break;
        case 5:
          b = "星期五";
          break;
        default:
          b = "星期六";
      }
      return b;
    },
    format_indices1(index) {
      for (var i = 0; i < this.weather.weathers_indices.length; i++) {
        if (this.weather.weathers_indices[i].type == index) {
          return this.weather.weathers_indices[i].category;
        }
      }
    },
    format_indices(index) {
      for (var i = 0; i < this.weather.weathers_indices.length; i++) {
        if (this.weather.weathers_indices[i].type == "5") {
          return this.weather.weathers_indices[i].category;
          break;
        }
        if (this.weather.weathers_indices[i].type == index) {
          return this.weather.weathers_indices[i].text;
          break;
        }
      }
    },
    formatColorpm2p5(value) {
      if (value >= this.pm25List[0] && value < this.pm25List[1]) {
        return this.colorList[0];
      }
      if (value >= this.pm25List[1] && value < this.pm25List[2]) {
        return this.colorList[1];
      }
      if (value >= this.pm25List[2] && value < this.pm25List[3]) {
        return this.colorList[2];
      }
      if (value >= this.pm25List[3] && value < this.pm25List[4]) {
        return this.colorList[3];
      }
      if (value >= this.pm25List[4] && value < this.pm25List[5]) {
        return this.colorList[4];
      }
      if (value >= this.pm25List[5]) {
        return this.colorList[5];
      }
    },
    formatColorco(value) {
      if (value >= this.coList[0] && value < this.coList[1]) {
        return this.colorList[0];
      }
      if (value >= this.coList[1] && value < this.coList[2]) {
        return this.colorList[1];
      }
      if (value >= this.coList[2] && value < this.coList[3]) {
        return this.colorList[2];
      }
      if (value >= this.coList[3] && value < this.coList[4]) {
        return this.colorList[3];
      }
      if (value >= this.coList[4] && value < this.coList[5]) {
        return this.colorList[4];
      }
      if (value >= this.coList[5]) {
        return this.colorList[5];
      }
    },
    formatColorpm10(value) {
      if (value >= this.pm10List[0] && value < this.pm10List[1]) {
        return this.colorList[0];
      }
      if (value >= this.pm10List[1] && value < this.pm10List[2]) {
        return this.colorList[1];
      }
      if (value >= this.pm10List[2] && value < this.pm10List[3]) {
        return this.colorList[2];
      }
      if (value >= this.pm10List[3] && value < this.pm10List[4]) {
        return this.colorList[3];
      }
      if (value >= this.pm10List[4] && value < this.pm10List[5]) {
        return this.colorList[4];
      }
      if (value >= this.pm10List[5]) {
        return this.colorList[5];
      }
    },
    formatColorso2(value) {
      if (value >= this.so2List[0] && value < this.so2List[1]) {
        return this.colorList[0];
      }
      if (value >= this.so2List[1] && value < this.so2List[2]) {
        return this.colorList[1];
      }
      if (value >= this.so2List[2] && value < this.so2List[3]) {
        return this.colorList[2];
      }
      if (value >= this.so2List[3] && value < this.so2List[4]) {
        return this.colorList[3];
      }
      if (value >= this.so2List[4] && value < this.so2List[5]) {
        return this.colorList[4];
      }
      if (value >= this.so2List[5]) {
        return this.colorList[5];
      }
    },
    formatColoro3(value) {
      if (value >= this.o3List[0] && value < this.o3List[1]) {
        return this.colorList[0];
      }
      if (value >= this.o3List[1] && value < this.o3List[2]) {
        return this.colorList[1];
      }
      if (value >= this.o3List[2] && value < this.o3List[3]) {
        return this.colorList[2];
      }
      if (value >= this.o3List[3] && value < this.o3List[4]) {
        return this.colorList[3];
      }
      if (value >= this.o3List[4] && value < this.o3List[5]) {
        return this.colorList[4];
      }
      if (value >= this.o3List[5]) {
        return this.colorList[5];
      }
    },
    formatColorno2(value) {
      if (value >= this.no2List[0] && value < this.no2List[1]) {
        return this.colorList[0];
      }
      if (value >= this.no2List[1] && value < this.no2List[2]) {
        return this.colorList[1];
      }
      if (value >= this.no2List[2] && value < this.no2List[3]) {
        return this.colorList[2];
      }
      if (value >= this.no2List[3] && value < this.no2List[4]) {
        return this.colorList[3];
      }
      if (value >= this.no2List[4] && value < this.no2List[5]) {
        return this.colorList[4];
      }
      if (value >= this.no2List[5]) {
        return this.colorList[5];
      }
    },
  },
};
</script>

<style>
.tui-progress-box {
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.tui-progress-text {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
}
.tui-progress-num {
  font-size: 60rpx;
}

canvas {
  display: block;
  height: 130px;
  position: relative;
  width: 120px;
}

page {
  background-color: #f9f9f9;
}

.titleColor {
  color: #2e2e2e;
}

.textcolor {
  color: #949494;
}

.normo {
  background: linear-gradient(235deg, #eef5ff 0%, #d6ddee 100%);
}
.snow {
  background: linear-gradient(
    229deg,
    rgba(225, 243, 251, 0.99) 0%,
    #dcf5fe 43%,
    #dbf0f1 100%
  );
}
.rain {
  background: linear-gradient(235deg, #ecf4ff 0%, #e0ebfb 46%, #cbd6e5 100%);
}
.sun {
  background: linear-gradient(235deg, #fff1e3 0%, #f3f7ff 45%, #dde4fb 100%);
}
.yangsa {
  background: linear-gradient(235deg, #d1c3b4 0%, #e1d9d3 38%, #eeeae7 100%);
}
.weather_24bg {
  border-radius: 25rpx;
  box-shadow: 0rpx 3rpx 13rpx 0rpx rgba(255, 255, 255, 0.5);
  background: linear-gradient(
    180deg,
    rgba(24, 129, 232, 0.02) 0%,
    rgba(84, 142, 229, 0.08) 49%,
    rgba(27, 129, 234, 0.02) 100%
  );
}
</style>
