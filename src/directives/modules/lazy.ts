import { useIntersectionObserver } from '@vueuse/core'
import type { Directive } from 'vue'

interface ElType extends HTMLElement {
  src: string
}

const lazy: Directive = {
  mounted(el: ElType, binding: { value: any }) {
    const { value } = binding
    const { stop } = useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          el.src = value
          stop()
        }
      },
      { rootMargin: '100px' },
    )
  },
}
export default lazy
