import type { App } from 'vue'

import debounce from './modules/debounce'
import throttle from './modules/throttle'
import lazy from './modules/lazy'
import waterMarker from './modules/waterMarker'

const directivesList: any = {
  // Custom directives
  debounce,
  throttle,
  lazy,
  waterMarker,
}

const directives = {
  install(app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key])
    })
  },
}
export default directives
