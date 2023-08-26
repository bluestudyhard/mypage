<script setup>
import { ref, reactive, watch, computed, onMounted, watchEffect } from 'vue';
import { useWindowScroll } from '@vueuse/core';
import { useWindowSize } from '@vueuse/core';
const { width, height } = useWindowSize();
const { x, y } = useWindowScroll();
import myclock from '../components/myclock.vue';
import todolist from '../components/MyToDoList.vue';
import next from '../components/PageNext.vue';
import star from '../components/star.vue';
import search from '../components/search.vue';
import backimg1 from '@/assets/images/page8.webp';
import backimg2 from '@/assets/images/page2.webp';
import backimg3 from '@/assets/images/page12.webp';
const isHide = ref(false);
const searchFocus = ref(false);
const scrolled = ref(0);

const onSearch = computed(() => ({
  transform: 'scale(1.1)',
  filter: 'blur(3px)',
  transition: 'all 1.1s ease-in-out'
}));

// 接受子组件的searchFocus事件

/**
 * scrolled表示滚动条的滚动区间，[0,0.25] (0.25,0.5] (0.5,0.75] (0.75,1] 分别有不同的效果
 *
 */
// scroll event
const handleScroll = e => {
  let scrollTop = y.value; // 滚动条滚动的距离
  let scrollHeight = document.documentElement.scrollHeight; // 滚动页面的总高度
  let clientHeight = height.value; // 可视区域的高度 ==height.value

  scrolled.value = scrollTop / (scrollHeight - clientHeight); // [0,1)
  // if (scrolled.value > 0.8) {
  //   setTimeout(() => {
  //     router.push("/canvas");
  //   }, 2000);
  // }
  // console.log(scrolled.value);
  // console.log('scrollHeight: '+ scrollHeight, 'clientHeight: '+ clientHeight, 'scrollTop: '+ scrollTop);
};

const getImageUrl = scroll => {
  if (scroll <= 0.25) {
    return `url(${backimg1})`;
  } else if (scroll <= 0.5 && scroll > 0.25) {
    return `url(${backimg2})`;
  } else {
    return `url(${backimg3})`;
  }
};

const changeBackGround = computed(() => ({
  backgroundImage: `${getImageUrl(scrolled.value)}`,
  transition: 'all 1.1s '
}));
/**滚动改变透明度以及移动函数 */
const generateScrollStyle = (opacityRange, marginTopValue) => {
  let opacity = opacityRange[1] * 0.8;
  return computed(() => ({
    opacity:
      scrolled.value >= opacityRange[0] && scrolled.value <= opacityRange[1]
        ? (opacity - scrolled.value) / 0.1
        : 0,
    marginTop:
      scrolled.value > opacityRange[0] && scrolled.value <= opacityRange[1]
        ? scrolled.value * -marginTopValue * 500 + 'px'
        : scrolled.value * marginTopValue * 500 + 'px',
    transition: 'all 0.8s ease-in-out'
  }));
};

const scrollTextList = computed(() => [
  {
    text: "welcome to blue's new page",
    style: generateScrollStyle([0, 0.25], 1.2).value
  },
  {
    text: 'Here i will show something about me...',
    style: generateScrollStyle([0.25, 0.5], 0.5).value
  },
  {
    text: 'ready? go!',
    style: generateScrollStyle([0.5, 0.75], 0.25).value
  }
]);
const scrollNotice = generateScrollStyle([0, 0.25], 0);
const scrollSerach = generateScrollStyle([0, 0.25], 0);
const scrollStar = computed(() => ({
  opacity: scrolled.value > 0.75 ? 1 : 0,
  transition: 'all 0.8s ease-in-out'
}));

/**监听区 */

watchEffect(() => {
  isHide.value = scrolled.value > 0.25 ? false : true;
  // console.log(width.value, height.value, x.value, y.value);
  // console.log(scrolled.value);
  // console.log(generateScrollStyle([0, 0.25], 1.2).value);
});

/**预先加载背景图片 */
const preloadImages = () => {
  const images = [backimg1, backimg2, backimg3];
  for (let i = 0; i < images.length; i++) {
    new Image().src = images[i];
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  preloadImages();
});
// 接收子组件，监听搜索框的focus事件
const handleFocusChange = isfocus => {
  searchFocus.value = isfocus;
  console.log(searchFocus.value);
};
const handleFocusblur = isfocus => {
  searchFocus.value = isfocus;
  console.log(searchFocus.value);
};
</script>

<template>
  <div class="home">
    <div class="mask">
      <div :style="searchFocus ? onSearch : changeBackGround" draggable="false" class="bg"></div>
      <star class="star" :style="scrollStar" />
      <div class="pageText" v-for="text in scrollTextList" :key="text">
        <h1 class="page-text" :style="text.style">
          {{ text.text }}
        </h1>
      </div>
      <myclock class="myclock" v-if="isHide" />
      <search
        class="page-search"
        :style="scrollSerach"
        @changeFoucus="handleFocusChange"
        @missFocus="handleFocusblur"
      />
      <div class="notice"><next :style="scrollNotice" /></div>
    </div>
    <div class="myToDoList" v-if="isHide">
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
  width: 100%;
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 0;
  /* 保持宽高比 */
  object-fit: cover;
  background-image: url('/public/page8.webp');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.star {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 10;
  opacity: 0;
}

.mask {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  top: 0;
  position: sticky;
}
.pageText {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-text {
  position: absolute;
  top: 50%;
  color: rgb(36, 33, 33);
  font-family: Helvetica;
  letter-spacing: 1px;
  font-size: 30px;
  opacity: 1;
  margin-top: 0px;
}

.myclock {
  position: fixed;
  top: 0;
  left: 0;
}

/** todolist */
.myToDoList {
  position: fixed;
  right: 1%;
  top: 3%;
}

.notice {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 20;
  bottom: 18%;
}

.page-search {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: 0 auto;
  text-align: center;
  line-height: 50px;
  margin-top: 5%;
  position: fixed;
  top: 20%;
  z-index: 20;
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
}
</style>
