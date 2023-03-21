export default {
  methods: {
    formatDate (date) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const d = date.getDate()
      const h = date.getHours()
      const m = date.getMinutes()
      const s = date.getSeconds()
      return `${year}-${month > 9 ? month : `0${month}`}-${d > 9 ? d : `0${d}`} ${h > 9 ? h : `0${h}`}:${m > 9 ? m : `0${m}`}:${s > 9 ? s : `0${s}`}`
    }
  }
}
