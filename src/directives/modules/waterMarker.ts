import type { Directive, DirectiveBinding } from 'vue'

const addWaterMarker: Directive = (data: any, parentNode: any, font: any, textColor: string) => {
  // 水印文字，父元素，字体，文字颜色
  let can: HTMLCanvasElement = document.createElement('canvas')
  parentNode.appendChild(can)
  can.width = 340
  can.height = 150
  can.style.display = 'none'
  let cans = can.getContext('2d') as CanvasRenderingContext2D
  cans.rotate((-20 * Math.PI) / 180)
  cans.font = font || '13px Microsoft JhengHei'
  cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
  cans.textAlign = 'center'
  cans.textBaseline = 'Middle' as CanvasTextBaseline
  Object.keys(data).forEach((key, index) => {
    if (data[key]) {
      cans.fillText(data[key], can.width / 10, can.height / (index + 2))
    }
  })
  parentNode.style.backgroundImage = `url(${can.toDataURL('image/png')})`
}

const waterMarker = {
  mounted(el: DirectiveBinding, binding: DirectiveBinding) {
    addWaterMarker(binding.value.data, el, binding.value.font, binding.value.textColor)
  },
}

export default waterMarker
