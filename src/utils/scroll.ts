import type { Ref } from 'vue'
import { computed } from 'vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'

export function useScrolled() {
  const { y } = useWindowScroll()
  const { height } = useWindowSize()// 可视区域的高度
  const scrollHeight = document.documentElement.scrollHeight // 滚动页面的总高度

  // watchEffect(() => {
  //     console.log('y.value', y.value)
  //     console.log('height.value', height.value)
  //     console.log('scrollHeight', scrollHeight)
  // })
  return computed(() => y.value / (scrollHeight - height.value))
}

export function generateScrollStyle(
  scrolled: Ref<number>,
  opacityRange: [number, number],
  marginTopValue: number,
) {
  const opacity = opacityRange[1] * 0.8
  return computed(() => ({
    opacity:
            scrolled.value >= opacityRange[0] && scrolled.value <= opacityRange[1]
              ? (opacity - scrolled.value) / 0.1
              : 0,
    marginTop:
            scrolled.value > opacityRange[0] && scrolled.value <= opacityRange[1]
              ? `${scrolled.value * -marginTopValue * 500}px`
              : `${scrolled.value * marginTopValue * 500}px`,
    transition: 'all 0.8s ease-in-out',
  }))
}
