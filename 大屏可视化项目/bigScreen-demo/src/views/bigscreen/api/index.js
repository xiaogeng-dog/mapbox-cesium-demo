import util from '@/libs/util.js'

/**
 * 入住企业列表
 * @param {*} params
 * @returns
 */
export function enterprisePage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/enterprisePage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 园区年产值列表（之前三年）
 * @param {*} params
 * @returns
 */
export function outputValueList (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/bigScreen/outputValueList', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 园区税收列表（之前三年）
 * @param {*} params
 * @returns
 */
export function taxList (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/bigScreen/taxList', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 园区创新能力
 * @param {*} params
 * @returns
 */
export function innovationAbility (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/bigScreen/innovationAbility', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 企业专利列表
 * @param {*} params
 * @returns
 */
export function parkPatentPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/parkPatentPage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 企业获奖列表
 * @param {*} params
 * @returns
 */
export function parkAwardPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/parkAwardPage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 重大危险源列表
 * @param {*} params
 * @returns
 */
export function majorhazardPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/majorhazardPage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 隐患排查治理列表
 * @param {*} params
 * @returns
 */
export function ajHiddenPerilInfoPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/ajHiddenPerilInfoPage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 安全风险分级管控列表
 * @param {*} params
 * @returns
 */
export function safetyControlPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/safetyControlPage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 安全风险分级管控列表
 * @param {*} params
 * @returns
 */
export function realTimeMonitoringPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/realTimeMonitoringPage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 应急预案列表
 * @param {*} params
 * @returns
 */
export function emergencyPlanPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/emergencyPlanPage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 应急资源列表
 * @param {*} params
 * @returns
 */
export function emergencyResourcesPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/emergencyResourcesPage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 演练事件列表
 * @param {*} params
 * @returns
 */
export function drillEventsPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/drillEventsPage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 危险品流转量
 * @param {*} params
 * @returns
 */
export function hazardousChemicalsPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/hazardousChemicalsPage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 入园社会车辆
 * @param {*} params
 * @returns
 */
export function socialVehiclePage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/socialVehiclePage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 入园危化车辆
 * @param {*} params
 * @returns
 */
export function blockparkChemicalcarPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/blockparkChemicalcarPage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 操作人员列表
 * @param {*} params
 * @returns
 */
export function operatorsPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/operatorsPage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 人员告警列表
 * @param {*} params
 * @returns
 */
export function locationAlarmPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/locationAlarmPage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 一企一档分页
 * @param {*} params
 * @returns
 */
export function enterpriseInfo (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/enterpriseInfo', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 风险点5个tab分页
 * @param {*} params
 * @returns
 */
export function riskTabInfo (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/riskTabInfo', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 每月能耗统计（一年内）
 * @param {*} params
 * @returns
 */
export function consumptionStatistics (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/energy/consumptionStatistics', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 每月综合能耗统计
 * @param {*} params
 * @returns
 */
export function comprehensiveConsumptionCount (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/energy/comprehensiveConsumptionCount', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 所有企业数据
 * @param {*} params
 * @returns
 */
export function getEnterpriseBaseInfoList (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/energy/getEnterpriseBaseInfoList', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 园区每月总产值统计
 * @param {*} params
 * @returns
 */
export function productOutputValueCount (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/energy/productOutputValueCount', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 能源监测统计
 * @param {*} params
 * @returns
 */
export function monitoringCount (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/energy/monitoringCount', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 园区企业能耗占比
 * @param {*} params
 * @returns
 */
export function consumptionRate (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/energy/consumptionRate', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 企业综合能耗TOP5排行
 * @param {*} params
 * @returns
 */
export function consumptionTop5 (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/energy/consumptionTop5', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 每月企业单位产值综合能耗TOP5排行
 * @param {*} params
 * @returns
 */
export function consumptionTop5ByMonth (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/energy/consumptionTop5ByMonth', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 园区管网结构树
 * @param {*} params
 * @returns
 */
export function pipenetstructure (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/pipenet/pipenetstructure', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 园区管网结构树
 * @param {*} params
 * @returns
 */
export function pipenetTypeRate (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/pipenet/pipenetTypeRate', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 管网用途分类数量
 * @param {*} params
 * @returns
 */
export function pipenetTypeCount (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/pipenet/pipenetTypeCount', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 管网告警列表
 * @param {*} params
 * @returns
 */
export function pipenetAlarmList (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/pipenet/pipenetAlarmList', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}
/**
 * 获取监测站集合
 * @param {*} params
 * @returns
 */
export function getStationList (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/ecologicalenvironment/getStationList', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 年度环境质量（水环境，大气环境）
 * @param {*} params
 * @returns
 */
export function environmentQuality (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/ecologicalenvironment/environmentQuality', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 获取监测因子根据监测id
 * @param {*} params
 * @returns
 */
export function getFactorTypeList (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/ecologicalenvironment/getFactorTypeList', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 年度环境横比
 * @param {*} params
 * @returns
 */
export function environmentQualityLateralRatio (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/ecologicalenvironment/environmentQualityLateralRatio', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 废水废气分析
 * @param {*} params
 * @returns
 */
export function exhaustEmission (params) {
  return new Promise((resolve, reject) => {
    util.http.get('/ecologicalenvironment/exhaustEmission', { params }).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

// 园区基本信息
export function parkBaseinfo (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/parkBaseinfo', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

// 关联危化品
export function getMajorHazardChemicalInfoList (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/getMajorHazardChemicalInfoList', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

// 重大危险源告警数量
export function countMajorhazardAlarminfo () {
  return new Promise((resolve, reject) => {
    util.http.get('/bigScreen/countMajorhazardAlarminfo').then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

// 重大危险源告警分页
export function majorhazardAlarminfoPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/majorhazardAlarminfoPage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

// 重大事件获取
export function getAccidentreportinfoList () {
  return new Promise((resolve, reject) => {
    util.http.get('/bigScreen/getAccidentreportinfoList').then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

export function getAccidentreportinfo (reportTime) {
  return new Promise((resolve, reject) => {
    util.http.get('/bigScreen/getLastTime?reportTime=' + reportTime).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

// 岗亭出入信息
export function getVehicleInOutList (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/getVehicleInOutList', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

// 岗亭出入信息
export function vehicleInOutPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/vehicleInOutPage ', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

// 获取车辆实时位置
export function getCarLocationInfo () {
  return new Promise((resolve, reject) => {
    util.http.get('/bigScreen/getLastTime?reportTime').then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

// 生态环境
export function countEcologicalEnvironment () {
  return new Promise((resolve, reject) => {
    util.http.get('/ecologicalenvironment/countEcologicalEnvironment').then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

// 生态环境告警分页
export function ecologicalEnvironmentPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/ecologicalenvironment/ecologicalEnvironmentPage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

// 园区概览告警
export function bigScreencountEcologicalEnvironment () {
  return new Promise((resolve, reject) => {
    util.http.get('/bigScreen/countEcologicalEnvironment').then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}

// 园区概览分页
export function bigScreenecologicalEnvironmentPage (params) {
  return new Promise((resolve, reject) => {
    util.http.post('/bigScreen/ecologicalEnvironmentPage', params).then(res => {
      resolve(res)
    }).catch(e => {
      reject(e)
    })
  })
}
