// 查看是否第一次打开大屏
export function checkFirst() {
  return !sessionStorage.getItem('isFirst')
}

// 如果是第一次打开,则调用此方法
export function setFirst() {
  return sessionStorage.setItem('isFirst', false)
}
