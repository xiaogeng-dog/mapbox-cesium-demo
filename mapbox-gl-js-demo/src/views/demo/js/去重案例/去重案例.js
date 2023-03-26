let Result = []; // 去重后的item的容器
let Obj = {}; // 条件容器
for (let i = 0; i < array.length; i++) {
  if (!Obj[array[i].key]) {
    Result.push(array[i]);
    Obj[array[i].key] = true;
  }
}
console.log(Result); // 结果
//reduce数组去重
var arr = [1, 2, 3, 4, 5, 6, 6, 7, 8, 8, 213, 132, 123, 11, 11, 22, 2, 22, 23];
var newArr = arr.reduce((cur, next) => {
  cur.indexOf(next) === -1 ? cur.push(next) : "";
  return cur;
}, []);

// reduce对象数组根据某一属性 去重
var arrObj = [
  { h: "22" },
  { h: "33" },
  { h: "44" },
  { h: "33" },
  { h: 22 },
  { h: 22 },
];
let obj = {};
var newArrObj = arrObj.reduce((cur, next) => {
  Object.keys(obj).indexOf(next.h) !== -1
    ? ""
    : cur.push(next) && (obj[next.h] = true);
  return cur;
}, []);
/* 
0: {h: "22"}
1: {h: "33"}
2: {h: "44"}
3: {h: 22}
4: {h: 22}
*/
console.log(newArrObj);

//filter 数组去重
arr = [1, 2, 3, 4, 5, 6, 6, 7, 8, 8, 213, 132, 123, 11, 11, 22, 2, 22, 23];
newArr = arr.filter((element, index) => {
  return arr.indexOf(element) === index;
});

//filter 对象数组去重
arrObj = [{ h: "22" }, { h: "33" }, { h: "44" }, { h: "33" }, { h: 22 }];
obj = {};
newArrObj = arrObj.filter((element, index) => {
  if (obj[element.h]) {
    return false;
  } else {
    obj[element.h] = true;
    return true;
  }
});

/* 
0: {h: "22"}
1: {h: "33"}
2: {h: "44"}
*/
console.log(newArrObj);

/* 
  在reduce和fliter 过滤对象数组中 使用了两种判断方式， 第一个判断的是 keys数组， 第二个判断obj[xx.x] 可以看到返回结果是不一样的， 众所周知， js对象会把数字属性转换成字符串，那么为什么结果会不同？
*/
let arrrrr = ["n", "i", "o", "1", 1, "2", 2];

let heihei = {};
let hehe = {};

arrrrr.forEach((element) => {
  heihei[element] = true;
  hehe[element] = false;
});

/* 
  这里打印出来可以发现 两个对象的key都是相同的属性， 
  那么，之所以在去重时不一样， 是由于 keys返回一个字符串数组， indexOf 使用的是全等判断，
  '1' !== 1 , 所以如果使用keys判断方式，数组中对象的值是多个相同的number类型， 那么去重就会有问题。 
*/
console.log(Object.keys(heihei));
console.log(Object.keys(hehe));

//es6 set去重

let arrNum = [1, 1, 1, 1, 12, 2, 2, 2, 23, 3, 3, 3];
//[1, 12, 2, 23, 3]
console.log([...new Set(arrNum)]);
