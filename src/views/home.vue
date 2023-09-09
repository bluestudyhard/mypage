<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { generateScrollStyle, useScrolled } from '../utils/scroll'
import myclock from '../components/myclock.vue'
import todolist from '../components/MyToDoList.vue'
import next from '../components/PageNext.vue'
import star from '../components/star.vue'
import search from '../components/search.vue'

const isHide = ref(false)
const searchFocus = ref(false)
const scrolled = ref(0)

/**
 * scrolled表示滚动条的滚动区间，[0,0.25] (0.25,0.5] (0.5,0.75] (0.75,1] 分别有不同的效果
 *
 */
// 动态import 图片

async function importImages(imgNum) {
  const tempLists = []
  for (let i = 1; i <= imgNum; i++) {
    const imgPath = await import(`@/assets/images/page${i}.webp`)
    tempLists.push(imgPath.default)
  }
  return tempLists
}
const imgLists = ref([])

/** 预先加载背景图片 */
function preloadImages() {
  importImages(3).then((res) => {
    imgLists.value = res
  })
  const images = imgLists.value
  for (let i = 0; i < images.length; i++)
    new Image().src = images[i]
}

function getImageUrl(scroll, imgLists) {
  const scrollRanges = [
    { range: [0, 0.25], imgIndex: 0 },
    { range: [0.25, 0.5], imgIndex: 1 },
    { range: [0.5, 1], imgIndex: 2 },
  ]

  const { imgIndex } = scrollRanges.find(({ range }) => scroll >= range[0] && scroll <= range[1])
  return imgLists[imgIndex]
}

const changeBackGround = computed(() => {
  const imageUrl = getImageUrl(scrolled.value, imgLists.value)
  return `${imageUrl}`
})

const scrollTextList = computed(() => [
  {
    text: 'welcome to blue\'s new page',
    style: generateScrollStyle(scrolled, [0, 0.25], 1.2).value,
  },
  {
    text: 'Here i will show something about me...',
    style: generateScrollStyle(scrolled, [0.25, 0.5], 0.5).value,
  },
  {
    text: 'ready? go!',
    style: generateScrollStyle(scrolled, [0.5, 0.75], 0.25).value,
  },
])
const scrollNotice = generateScrollStyle(scrolled, [0, 0.25], 0)
const scrollSerach = generateScrollStyle(scrolled, [0, 0.25], 0)
const scrollStar = computed(() => ({
  opacity: scrolled.value > 0.75 ? 1 : 0,
  transition: 'all 0.8s ease-in-out',
}))

/** 监听区 */
// 懒得改了
watchEffect(() => {
  isHide.value = !scrolled.value > 0.25
  // console.log(imgLists.value)
  // console.log('scrooled', scrolled.value)
  // console.log(generateScrollStyle(scrolled, [0, 0.25], 0).value)
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = useScrolled().value
  })

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
const onSearch = computed(() => ({
  transform: ' scale(1.1)',
  filter: 'blur(3px)',
}))
</script>

<template>
  <div class="home">
    <div class="mask">
      <!-- <div :style="searchFocus ? onSearch : changeBackGround" draggable="false" class="bg" /> -->
      <img :src="changeBackGround" class="bg" draggable="false" :style="searchFocus ? onSearch : ''">
      <search
        class="page-search"
        :style="scrollSerach"
        @changeFoucus="handleFocusChange"
        @missFocus="handleFocusblur"
      />
      <star class="star" :style="scrollStar" />
      <div v-for="text in scrollTextList" :key="text" class="pageText">
        <h1 class="page-text" :style="text.style">
          {{ text.text }}
        </h1>
      </div>
      <myclock v-if="isHide" class="myclock" />
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

  /* background-image: url('/public/page8.webp');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover; */
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
  width: 100vh;
  height: 100vh;

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
  top: 10%;
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
