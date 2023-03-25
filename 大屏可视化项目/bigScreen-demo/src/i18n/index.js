import iviewLangs from './config/iview.lang.config'
import zhLang from './config/zh-CN'
import enLang from './config/en-US'
import jaLang from './config/ja-JP'
import koLang from './config/ko-KR'
import twLang from './config/zh-TW'

const messages = {
  zh_CN: Object.assign(zhLang, iviewLangs['zh']),
  en_US: Object.assign(enLang, iviewLangs['en']),
  ja_JP: Object.assign(jaLang, iviewLangs['ja']),
  ko_KR: Object.assign(koLang, iviewLangs['ko']),
  tw_CN: Object.assign(twLang, iviewLangs['tw'])
}

const localeI18n = {
  locale: 'zh_CN', // set locale
  fallbackLocale: 'zh_CN',
  messages, // set locale messages
  silentTranslationWarn: true
}

export default localeI18n
