<script setup>
import { ref, reactive, watch, computed } from "vue";

import todolist from "../components/MyToDoList.vue";
const count = ref(1);
const images = reactive([]);
import backgroundImage from "@/assets/images/page8.webp";
const backgroundStyle = computed(() => ({
  // backgroundImage: `url("/src/assets/images/page8.webp")`,
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
}));

const addCount = () => {
  count.value = (count.value % 24) + 1;
};
</script>

<template>
  <div class="home" :style="backgroundStyle">
    <div class="page-search">
      <form method="get" action="https://www.bing.com/search" target="_blank">
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
    <button @click="addCount">{{ count }}</button>
    <div class="myToDoList">
      <todolist />
    </div>
  </div>
</template>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
/** todolist */
.myToDoList {
  position: fixed;
  right: 1%;
  top: 3%;
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
}
.serachbody {
  width: 300px;
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
  width: 400px;
  border: 0;
}

.serachbody:hover {
  width: 400px;
  box-shadow: 3px 4px 3.1px 0.5px rgba(213, 211, 211, 0.866);
}

.searchbutton {
  display: none;
}
</style>
