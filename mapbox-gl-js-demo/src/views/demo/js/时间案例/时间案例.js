

// 在下面的数组中，判断 2019年11月1日 00时，返回在24小时以内的时间，你会咋写

// 2019年11月1日 00时
// 2019.11.1 05时
// 2019.11.1 20时
// 2019.11.2 10时
// 2019.11.2 18时
// 2019.11.3 23时

// 比如2019年11月1日 00时，它的24小时是 2019年11月2日 00时。所以只返回  2019.11.1 05时
// 2019.11.1 20时  这两个

// 获取2019年11月1日 00时的时间戳，然后呢？怎么算是不是在24小时内，
import moment from 'moment'
/**
 * 方法一
 */
const rawArr = ['2019-10-31 00:00:00', '2019-11-01 05:00:00', '2019-11-01 20:00:00', '2019-11-02 10:00:00', '2019-11-02 18:00:00', '2019-11-03 23:00:00']
const compareDate = '2019-11-01 02:00:00'


let newArr = rawArr.filter(ele => {
  let flag = moment(compareDate).diff(moment(ele), 'hours')
  return flag <= 24 && flag >= -24
})
console.log(newArr);

/**
 * 方法二
 */
const rawArr1 = ['2019-10-31 00:00:00', '2019-11-01 05:00:00', '2019-11-01 20:00:00', '2019-11-02 10:00:00', '2019-11-02 18:00:00', '2019-11-03 23:00:00']
const compareDate1 = '2019-11-01 01:00:00'

let newArr1 = rawArr1.filter(ele => {

  return new Date(compareDate1).valueOf() >= new Date(ele).valueOf() - 86400000 && new Date(compareDate1).valueOf() <= new Date(ele).valueOf() + 86400000

})
console.log(newArr1);





// =======================================================================================================================================================
// 获取2020-10-01 01:00  到  2020-10-02 04:00 之间每每隔半小时的数据
// 需要拿到 2020-10-01 01:30  2020-10-01 02:00  2020-10-01 02:30 ....  一直到        2020-10-02 04:00
// console.log(moment('2020-10-01 01:30:00').add(30,'m'));
// moment('2020-10-01 01:30:00') > moment('2020-10-02 04:00:00')
// console.log(moment('2020-10-01 01:30:00') < moment('2020-10-02 04:00:00'));

function formatDaysHalfHours (startDate, endDate) {
  var dateList = [];
  while (moment(endDate) > moment(startDate)) {
    startDate = moment(startDate).add(30, 'm')
    dateList.push(moment(startDate).format('YYYY-MM-DD hh:mm:ss'))
  }
  return dateList
}
console.log(formatDaysHalfHours('2020-10-01 01:30:00', '2020-10-02 04:00:00'));

 