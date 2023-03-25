<template>
  <div>
    <div class="infowindowContent" style="height: 434px;width: 600px;">
      <div class="infowindowClose" @click="closeInfoWindow"></div>
      <div class="contentDiv">
        <div class="infotitle">
          <div class="itemicon itemInfoicon"></div>
          <div class="titlespan">
            <span>{{data.entprName}}</span>
          </div>
        </div>
        <div class="type-text">({{data.indusTypeSmall?data.indusTypeSmall.split('|')[1]:''}})</div>
        <div class="infocontent">
          <div class="infocontent1">法定代表人:</div>
          <div class="infocontent2">{{data.legalPerson}}</div>
        </div>
        <div class="infocontent">
          <div class="infocontent1">注册地址:</div>
          <div class="infocontent2">{{data.regAddr}}</div>
        </div>
        <div class="divider"></div>
        <div class="item-container">
          <div class="item">
            <img class="icon" src="@/assets/info-window-icon1.png" />
            <div class="detail-container">
              <div class="text">重大危险源</div>
              <div class="num red">{{map.majorhazardCount}}</div>
            </div>
          </div>
          <div class="item">
            <img class="icon" src="@/assets/info-window-icon2.png" />
            <div class="detail-container">
              <div class="text">重点工艺</div>
              <div class="num blue">{{map.keyprocessCount}}</div>
            </div>
          </div>
          <div class="item">
            <img class="icon" src="@/assets/info-window-icon3.png" />
            <div class="detail-container">
              <div class="text">重点监管化学品</div>
              <div class="num blue">{{map.chemicalCount}}</div>
            </div>
          </div>
          <div class="item">
            <img class="icon" src="@/assets/info-window-icon4.png" />
            <div class="detail-container">
              <div class="text">风险点</div>
              <div class="num red">{{map.pointCount}}</div>
            </div>
          </div>
          <div class="item">
            <img class="icon" src="@/assets/info-window-icon5.png" />
            <div class="detail-container">
              <div class="text">当月隐患</div>
              <div class="num yellow">{{map.perilCount}}</div>
            </div>
          </div>
          <div class="item">
            <img class="icon" src="@/assets/info-window-icon6.png" />
            <div class="detail-container">
              <div class="text">当月特殊作业</div>
              <div class="num yellow">{{map.workheadtableinfoCount}}</div>
            </div>
          </div>
        </div>
        <div class="button-container">
          <div class="info-button" @click="showTable(1)">基础档案</div>
          <div class="info-button" @click="showTable(3)">两重点一重大</div>
          <div class="info-button" @click="showTable(2)">安全类监管档案</div>
          <div class="info-button" @click="showTable(4)">应急类监管档案</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { enterpriseInfo } from '../../../api/index'
export default {
  props: {
    markerData: {
      type: Object
    }
  },
  data () {
    return {
      // 企业信息
      data: {},
      // 统计
      map: {
        chemicalCount: 0,
        keyprocessCount: 0,
        majorhazardCount: 0,
        perilCount: 0,
        pointCount: 0,
        workheadtableinfoCount: 0
      }
    }
  },
  mounted () {},
  methods: {
    init () {
      this.data = JSON.parse(JSON.stringify(this.markerData))
      enterpriseInfo({
        enterpriseId: this.data.id,
        type: 'count'
      }).then((res) => {
        if (res.data.datas) {
          this.map = res.data.datas
        }
      })
    },
    closeInfoWindow () {
      this.$emit('close')
    },
    showTable (index) {
      this.$emit('openTable', { id: this.data.id, index: index })
    }
  },
  watch: {
    markerData () {
      this.init()
    }
  }
}
</script>
<style lang="less">
/*-----------------弹出框样式-star-----------------------*/
.infowindowContent {
  // height: 288px;
  width: 420px;
  padding-bottom: 20px;
  background: rgba(9, 25, 56, 0.9);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  border: 1px solid #1385f4;
  border-radius: 10px;
}
.infowindowContentNew {
  width: 420px;
  background: rgba(9, 25, 56, 0.9);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  border: 1px solid #1385f4;
  border-radius: 10px;
}
.contentDiv {
  /* height: 100%; */
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
}
.chartDiv {
  display: flex;
  color: #fff;
}
.chr {
  width: 25%;
  margin: auto;
}
.chrTiele {
  font-size: 0.8vw;
}
.chrContent {
  font-size: 2.2vw;
  color: #ffc118;
}
.chrContent1 {
  font-size: 1.1vw;
  color: #ffc118;
}
.chrContent.yl {
  color: #21e4b8;
}
.pmDiv {
  display: flex;
  color: #fff;
  flex-wrap: wrap;
  justify-content: space-around;
}
.pmDiv .item {
  width: 30%;
  display: flex;
  justify-content: center;
  margin-bottom: 2vh;
}
.itemTiele {
  text-align: center;
}
.itemTiele .name {
  font-size: 1.7vh;
}
.itemContent {
  font-size: 2.8vh;
  color: #00d6f7;
}
.tips {
  border-radius: 2vh;
  padding: 0 0.8vh;
  line-height: 2.3vh;
  height: 2.5vh;
  color: #fff;
  margin-right: 0.3vw;
}
.tip1 {
  border: 1px solid #ff4141;
  color: #ff4141;
  background: rgba(51, 8, 8, 0.5);
}
.tip2 {
  border: 1px solid #fa6400;
  color: #fa6400;
  background: rgba(51, 8, 8, 0.5);
}
.tip3 {
  border: 1px solid #f7b500;
  color: #f7b500;
  background: rgba(51, 8, 8, 0.5);
}
.tip4 {
  border: 1px solid #5ee9ff;
  color: #5ee9ff;
  background: rgba(51, 8, 8, 0.5);
}
#page ::-webkit-scrollbar {
  width: 0.2vw !important;
}
#page ::-webkit-scrollbar-thumb {
  background-color: #dcdde5 !important;
}
/*关闭按钮*/
.infowindowClose {
  position: absolute;
  top: 0;
  right: 0;
  background: url("../../../../../assets/bigscreen/BTn-CLOSE.png") center center /
    100% 100% no-repeat;
  width: 40px;
  height: 30px;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
}
/*弹出框标题*/
.infoTitle {
  display: flex;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.5rem;
  font-weight: 500;
  color: #f8f8ff;
}
.infotitle {
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 17px;
}
/*弹出框副标题*/
.infoTitle1 {
  display: flex;
  width: 100%;
  height: 35px;
  line-height: 35px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 400;
  color: #f7d500;
  justify-content: flex-start;
}
.titleitem {
  margin-right: 0.5rem;
}
.row {
  display: flex;
}
.col {
  width: 50%;
}

.class{
  color:#fff;
  border-radius: 5px;
  padding: 0 2px;
  margin-left: 4px;
}

.class1{
   background-color:#14A6EF44;
   border:1px solid #14A6EF;
}
.class2{
   background-color:#00e40044;
   border:1px solid #00e400;
}
.class3{
  background-color:#ffff0044;
  border:1px solid #ffff00;
}
.class4{
  background-color:#ff7e0044;
  border:1px solid #ff7e00;
}
.class5{
  background-color:#ff000044;
  border:1px solid #ff0000;
}
.class6{
  background-color:#7e002344;
  border:1px solid #7e0023;
}

/*弹出框内容*/
.infocontent {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(248, 248, 255, 0.9);
  font-size: 16px;
  /* padding-left: 1vw; */
  margin-bottom: 2px;
}
.infocontent-new {
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(248, 248, 255, 0.9);
  font-size: 16px;
  /* padding-left: 1vw; */
  margin-bottom: 2px;
}
.infocontent1 {
  width: 152px;
  text-align: end;
}
.infocontent3 {
  width: 8vw;
  text-align: end;
}
.infocontent2 {
  width: 264px;
  word-wrap: break-word;
  word-break: normal;
  height: auto;
  margin-left: 10px;
  color: #fff;
}

.info-content {
  display: flex;
  flex-wrap: wrap;
}
.infocontent4 {
  word-wrap: break-word;
  word-break: normal;
  margin-left: 10px;
  color: #fff;
}
.infocontent5{
    width: 164px;
  word-wrap: break-word;
  word-break: normal;
  height: auto;
  margin-left: 10px;
  color: #c4fffa;
}
.infocontent2.y {
  color: #ffee2e;
}
.infocontent2.b {
  color: #59caff;
}
/*弹出框按钮样式*/
.infoBtns {
  margin-top:1vh;
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  bottom: 20px;
}
.infoBtnsNew {
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
.infoBtn {
  width: 140px;
  height: 100%;
  background: #123f77;
  box-shadow: inset 0px 0px 20px 0px rgba(49, 197, 255, 0.3);
  border: 1px solid #23abcb;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  align-items: center;
  font-family: PingFangSC-Medium, PingFang SC;
  margin: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-evenly;
  &:hover {
    background: #28baff;
    border: 1px solid #28baff;
  }
}
.infoBtn1 {
  width: 140px;
  height: 100%;
  background: #28baff;
  border: 1px solid #28baff;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  align-items: center;
  font-family: PingFangSC-Medium, PingFang SC;
  margin: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-evenly;
}

.itemicon {
  width: 24px;
  height: 24px;
}
.itemInfoHistory {
  background: url("../../../../../assets/bigscreen/icon-btn2.png") center center /
    100% 100% no-repeat;
}
.itemInfodetail {
  background: url("../../../../../assets/bigscreen/icon-btn1.png") center center /
    100% 100% no-repeat;
}
.itemInfoVideo {
  background: url("../../../../../assets/bigscreen/icon-btn3.png") center center /
    100% 100% no-repeat;
}

.titlespan {
  margin-left: 0.2vw;
  font-size: 1vw;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}

.contentTable0 {
  height: 160px;
  width: 90%;
  margin: 1vh auto;
  overflow-y: auto;
}
.contentTable {
  color: #fff;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.contentTable thead {
  background: #0e487a;
  height: 40px;
  line-height: 40px;
}
.contentTable tbody tr {
  background: rgba(177, 216, 255, 0.1);
  height: 40px;
  line-height: 40px;
}
.contentTable tbody tr:nth-child(even) {
  background: rgba(53, 153, 254, 0.16);
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 5px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: rgba(0, 0, 0, 0);
  border-radius: 5px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #294066;
  -webkit-box-shadow: rgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-thumb:window-inactive {
  background: #294066;
}
/*-----------------弹出框样式-end-----------------------*/
.seamless-warp {
  overflow: hidden;
}

.infowindowContent {
  .contentDiv {
    .infotitle {
      .itemInfoicon {
        border-right: 4px solid rgba(46, 124, 230, 1);
      }
      .itemicon {
        height: 12px;
      }
    }
    .type-text {
      margin-left: 28px;
      font-size: 18px;
      color: yellow;
      margin-bottom: 22px;
    }
    .infocontent {
      .infocontent1 {
      }
      .infocontent2 {
        color: rgba(196, 255, 250, 1);
      }
    }
    .divider {
      border-top: 1px dashed rgba(255, 255, 255, 0.4);
      margin: 20px;
    }
    .item-container {
      display: flex;
      flex-wrap: wrap;
      padding: 0 20px;
      .item {
        width: 180px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .detail-container {
          .text {
            color: rgba(255, 255, 255, 1);
            font-size: 16px;
          }
          .num {
            font-size: 24px;
            font-weight: bold;
          }
          .red {
            color: rgba(255, 62, 62, 1);
          }
          .blue {
            color: rgba(71, 169, 255, 1);
          }
          .yellow {
            color: rgba(237, 156, 33, 1);
          }
        }
      }
    }
    .button-container {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      .info-button {
        color: rgba(255, 255, 255, 1);
        background: rgba(18, 63, 119, 1);
        border: 1px solid rgba(35, 171, 203, 1);
        box-shadow: inset 0px 0px 20px 0px rgba(49, 197, 255, 0.3);
        border-radius: 3px;
        font-size: 14px;
        padding: 5px 17px;
        cursor: pointer;
        &:hover {
          background: rgba(40, 186, 255, 1);
        }
      }
    }
  }
}
</style>
