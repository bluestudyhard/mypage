<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import myclock from '../components/myclock.vue'
import todolist from '../components/MyToDoList.vue'
import next from '../components/PageNext.vue'
import star from '../components/star.vue'
import search from '../components/search.vue'
import backimg1 from '@/assets/images/page8.webp'
import backimg2 from '@/assets/images/page2.webp'
import backimg3 from '@/assets/images/page12.webp'

const { width, height } = useWindowSize()
const { x, y } = useWindowScroll()

const isHide = ref(false)
const searchFocus = ref(false)
const scrolled = ref(0)

const onSearch = computed(() => ({
  transform: ' scale(1.1)',
  filter: 'blur(3px)',
}))

// 接受子组件的searchFocus事件

/**
 * scrolled表示滚动条的滚动区间，[0,0.25] (0.25,0.5] (0.5,0.75] (0.75,1] 分别有不同的效果
 *
 */
// scroll event
function handleScroll(e) {
  const scrollTop = y.value // 滚动条滚动的距离
  const scrollHeight = document.documentElement.scrollHeight // 滚动页面的总高度
  const clientHeight = height.value // 可视区域的高度 ==height.value

  scrolled.value = scrollTop / (scrollHeight - clientHeight) // [0,1)
  // if (scrolled.value > 0.8) {
  //   setTimeout(() => {
  //     router.push("/canvas");
  //   }, 2000);
  // }
  // console.log(scrolled.value);
  // console.log('scrollHeight: '+ scrollHeight, 'clientHeight: '+ clientHeight, 'scrollTop: '+ scrollTop);
}

function getImageUrl(scroll) {
  if (scroll <= 0.25)
    return `url(${backimg1})`
  else if (scroll <= 0.5 && scroll > 0.25)
    return `url(${backimg2})`
  else
    return `url(${backimg3})`
}

const changeBackGround = computed(() => ({
  backgroundImage: `${getImageUrl(scrolled.value)}`,
}))
/** 滚动改变透明度以及移动函数 */
function generateScrollStyle(opacityRange, marginTopValue) {
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

const scrollTextList = computed(() => [
  {
    text: 'welcome to blue\'s new page',
    style: generateScrollStyle([0, 0.25], 1.2).value,
  },
  {
    text: 'Here i will show something about me...',
    style: generateScrollStyle([0.25, 0.5], 0.5).value,
  },
  {
    text: 'ready? go!',
    style: generateScrollStyle([0.5, 0.75], 0.25).value,
  },
])
const scrollNotice = generateScrollStyle([0, 0.25], 0)
const scrollSerach = generateScrollStyle([0, 0.25], 0)
const scrollStar = computed(() => ({
  opacity: scrolled.value > 0.75 ? 1 : 0,
  transition: 'all 0.8s ease-in-out',
}))

/** 监听区 */

watchEffect(() => {
  isHide.value = !(scrolled.value > 0.25)
  // console.log(width.value, height.value, x.value, y.value);
  // console.log(scrolled.value);
  // console.log(generateScrollStyle([0, 0.25], 1.2).value);
})

/** 预先加载背景图片 */
function preloadImages() {
  const images = [backimg1, backimg2, backimg3]
  for (let i = 0; i < images.length; i++)
    new Image().src = images[i]
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  preloadImages()
})
// 接收子组件，监听搜索框的focus事件
function handleFocusChange(isfocus) {
  searchFocus.value = isfocus
  console.log(searchFocus.value)
}
function handleFocusblur(isfocus) {
  searchFocus.value = isfocus
  console.log(searchFocus.value)
}
</script>

<template>
  <div class="home">
    <div class="mask">
      <div :style="searchFocus ? onSearch : changeBackGround" draggable="false" class="bg" />
      <star class="star" :style="scrollStar" />
      <div v-for="text in scrollTextList" :key="text" class="pageText">
        <h1 class="page-text" :style="text.style">
          {{ text.text }}
        </h1>
      </div>
      <myclock v-if="isHide" class="myclock" />
      <search
        class="page-search"
        :style="scrollSerach"
        @changeFoucus="handleFocusChange"
        @missFocus="handleFocusblur"
      />
      <div class="notice">
        <next :style="scrollNotice" />
      </div>
    </div>
    <div v-if="isHide" class="myToDoList">
      <todolist />
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 3000px;
  user-select: none;
}

.bg {
  position: fixed;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 100vh;
  background-image: url('/public/page8.webp');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  transition: transform 1.1s, filter 1.1s ease-in-out;

  /* 保持宽高比 */
  object-fit: cover;
  backface-visibility: hidden;
}

.star {
  position: absolute;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
  opacity: 0;
}

.mask {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.pageText {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.page-text {
  position: absolute;
  top: 50%;
  margin-top: 0;
  font-family: Helvetica;
  font-size: 30px;
  color: rgb(36, 33, 33);
  letter-spacing: 1px;
  opacity: 1;
}

.myclock {
  position: fixed;
  top: 0;
  left: 0;
}

/** todolist */
.myToDoList {
  position: fixed;
  top: 3%;
  right: 1%;
}

.notice {
  position: fixed;
  bottom: 18%;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-search {
  position: fixed;
  top: 20%;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: 0 auto;
  margin-top: 5%;
  line-height: 50px;
  text-align: center;
}

@media (max-width: 768px) {
  .myToDoList {
    position: fixed;
    display: none;
  }

  .page-text {
    font-size: 24px;
  }

  .myclock {
    display: none;
  }

  .bg {
    background-size: cover;
    transition: none;
  }
}
</style>
