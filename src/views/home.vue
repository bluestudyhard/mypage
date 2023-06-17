<script setup>
import { ref, reactive, watch, computed, onMounted, watchEffect } from "vue";
import myclock from "../components/myclock.vue";
import todolist from "../components/MyToDoList.vue";
import next from "../components/PageNext.vue";
import star from "../components/star.vue";
import backimg from "@/assets/images/page8.webp";
const count = ref(1);
const images = reactive([]);

import { useRouter } from "vue-router";
const router = useRouter();
const scrolled = ref(0);

// scroll event

const handleScroll = (e) => {
  let scrollTop = document.documentElement.scrollTop; // 滚动条滚动的距离
  let scrollHeight = document.documentElement.scrollHeight; // 滚动页面的总高度
  let clientHeight = document.documentElement.clientHeight; // 可视区域的高度

  scrolled.value = scrollTop / (scrollHeight - clientHeight); // [0,1)
  // if (scrolled.value > 0.8) {
  //   setTimeout(() => {
  //     router.push("/canvas");
  //   }, 2000);
  // }
  // console.log(scrolled.value);
};

const getImageUrl = (scroll) => {
  if (scroll <= 0.2) {
    return `url('src/assets/images/page8.webp')`;
  } else if (scroll <= 0.4 && scroll > 0.2) {
    return "url('src/assets/images/page2.webp')";
  } else {
    return "url('src/assets/images/page12.webp')";
  }
};

const changeBackGround = computed(() => ({
  // opacity:
  //   scrolled.value <= 0.2
  //     ? (0.1 - scrolled.value) / 0.1
  //     : scrolled.value <= 0.4 && scrolled.value > 0.2
  //     ? (0.31 - scrolled.value) / 0.1
  //     : scrolled.value <= 0.6 && scrolled.value > 0.4
  //     ? (0.49 - scrolled.value) / 0.1
  //     : 1,

  backgroundImage: `${getImageUrl(scrolled.value)}`,
  transition: "all 1.1s ",
}));

const scrollStar = computed(() => ({
  opacity: scrolled.value > 0.6 ? (1 - scrolled.value) / 0.1 : 0,
  transition: "all 0.8s ease-in-out",
}));

const scrollSerach = computed(() => ({
  opacity: scrolled.value <= 0.2 ? (0.1 - scrolled.value) / 0.1 : 0,
  transition: "all 0.8s ease-in-out",
}));

const scrollText = computed(() => ({
  opacity: scrolled.value <= 0.2 ? (0.1 - scrolled.value) / 0.1 : 0,
  marginTop:
    scrolled.value <= 0.2 && scrolled.value > 0
      ? scrolled.value * -1.2 * 500 + "px"
      : scrolled.value * 1.2 * 500 + "px",
  transition: "all 0.8s ",
}));

const scrollTextSecond = computed(() => ({
  opacity:
    scrolled.value <= 0.4 && scrolled.value > 0.2
      ? Math.abs(0.1 - scrolled.value) / 0.1
      : 0,
  marginTop:
    scrolled.value <= 0.4 && scrolled.value > 0.2
      ? scrolled.value * -0.5 * 500 + "px"
      : scrolled.value * 0.5 * 500 + "px",
  transition: "all 0.8s ease-in-out",
}));

const scrollTextThird = computed(() => ({
  opacity:
    scrolled.value <= 0.6 && scrolled.value > 0.4
      ? Math.abs(0.1 - scrolled.value) / 0.1
      : 0,
  marginTop:
    scrolled.value <= 0.6 && scrolled.value > 0.4
      ? scrolled.value * -0.25 * 400 + "px"
      : scrolled.value * 0.25 * 400 + "px",
  transition: "all 0.8s ease-in-out",
}));

const scrollNotice = computed(() => ({
  opacity: scrolled.value <= 0.2 ? (0.1 - scrolled.value) / 0.1 : 0,
  transition: "all 0.8s ease-in-out",
}));

// watchEffect(() => {
//   console.log("opacity: " + changeBackGround.value.opacity);
// });

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="home">
    <div class="mask">
      <div class="bg" :style="changeBackGround" draggable="false"></div>
      <star class="star" :style="scrollStar" />
      <h1 class="page-text" :style="scrollText">welcome to blue's new page</h1>
      <h1 class="page-text" :style="scrollTextSecond">
        Here i will show something about me...
      </h1>
      <h1 class="page-text" :style="scrollTextThird">ready? go!</h1>
      <myclock class="myclock" />
      <div class="page-search">
        <form
          method="get"
          action="https://www.bing.com/search"
          target="_blank"
          :style="scrollSerach"
        >
          <input
            type="text"
            class="serachbody"
            placeholder="请输入内容"
            name="q"
            autocomplete="off"
          />
          <input type="submit" value="搜索" class="searchbutton" />
        </form>
      </div>
      <next class="notice" :style="scrollNotice" />
    </div>
  </div>

  <div class="myToDoList">
    <todolist />
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
  background-image: url("/public/page8.webp");
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

.page-text {
  position: absolute;
  top: 50%;
  color: rgb(36, 33, 33);
  font-family: Helvetica;
  letter-spacing: 1px;
  font-size: 36px;
  opacity: 1;
  margin-top: 0px;
}
.page-text-second {
  position: absolute;
  top: 50%;
  color: rgb(36, 33, 33);
  font-family: Helvetica;
  letter-spacing: 1px;
  font-size: 36px;
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
  position: fixed;
  bottom: 15%;
  left: 48;
  z-index: 20;
}
.page-search {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100px;
  margin: 0 auto;
  text-align: center;
  line-height: 50px;
  margin-top: 5%;
  position: fixed;
  top: 10%;
  z-index: 20;
}
@media (max-width: 768px) {
  .page-search {
    width: 10rem;
  }
  .serachbody {
    width: 10rem;
  }
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
  .notice {
    left: 30%;
  }
}
.serachbody {
  width: 20rem;
  height: 36px;
  border-radius: 15px;
  transition: 0.5s ease-in-out;
  background-color: rgba(251, 250, 250, 0.466);
  color: rgb(0, 0, 0);
  border: 0px;
  box-shadow: 1px 2px 3.1px 0.5px rgba(213, 211, 211, 0.866);
  padding: 10px;
}
.serachbody:focus {
  outline: none;
  width: 25rem;
  border: 0;
}

.serachbody:hover {
  width: 25rem;
  box-shadow: 3px 4px 3.1px 0.5px rgba(213, 211, 211, 0.866);
}

.searchbutton {
  display: none;
}
</style>
