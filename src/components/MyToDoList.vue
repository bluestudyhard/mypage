<template>
  <div class="myTodoList">
    <div class="listHeader">
      <h3>{{ current }}</h3>
      <input type="text" v-model="inputValue" />
      <button @click="addList">添加</button>
    </div>

    <TransitionGroup name="toDoList" class="myList" tag="ul">
      <li v-for="(list, index) in todolists" :key="index" @click="isdone(list)">
        <input type="checkbox" v-model="list.done" value="list.done" />
        <span :class="{ done: list.done }">{{ index + 1 }}.{{ list.text }}</span
        ><button @click="removeList(index, list.id)">x</button>
      </li>
    </TransitionGroup>
    <button @click="compeleted = !compeleted">
      {{ compeleted ? "showall" : "HideCompleted" }}
    </button>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import axios from "axios";
const inputValue = ref("");
const lists = ref([]);
const id = ref(1);
let compeleted = ref(false);

// 使用axios 访问服务器
const showLists = async () => {
  const res = await axios.get("http://localhost:3000/todos");
  // lists.value = res.data.map((list, index) => {
  //   list.id = index + 1;
  //   return list;
  // });
  lists.value = res.data;
  // console.log(lists.value);
};

// 添加list
const addList = async () => {
  if (inputValue.value.trim() === "") {
    alert("请输入内容");
    return;
  }
  // axios 自动转换为json
  const response = await axios.post("http://localhost:3000/todos", {
    text: inputValue.value,
    done: false,
  });
  console.log(response.data);
  const list = response.data;
  lists.value.push(list);
  inputValue.value = "";
  showLists();
};
// 删除list
async function removeList(index, listID) {
  if (confirm("确定删除改项吗？") === false) return;
  else {
    lists.value.splice(index, 1);
    console.log(listID);
    const response = await axios.delete(
      `http://localhost:3000/todos/${listID}`
    );
    console.log(response.data);
    showLists();
  }
}
// 隐藏完成事项
const todolists = computed(() => {
  return compeleted.value
    ? lists.value.filter((list) => !list.done)
    : lists.value;
});

const isdone = async (list) => {
  list.done = !list.done;
  const response = await axios.put(`http://localhost:3000/todos/${list.id}`, {
    done: list.done,
  });
  console.log(response.data);
};

/* 获取当前时间 年月日几点*/
const current = ref(new Date());
current.value = new Date().toLocaleString();
// 设置定时器的方法
setInterval(() => {
  current.value = new Date().toLocaleString();
}, 1000);

/**使用axios 访问服务器 */
const getData = async () => {
  const res = await axios.get("http://localhost:3000/");
  console.log(res.data);
};

getData();

onMounted(() => {
  showLists();
});
</script>

<style scope>
.myTodoList {
  width: 400px;
  height: 400px;
  background: #f9f9f977;
  border-radius: 15px;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
}
/**自定义滚动条 */
::-webkit-scrollbar {
  width: 6px; /* 宽度 */
}
::-webkit-scrollbar-thumb {
  background-color: #64636388; /* 滚动条颜色 */
  border-radius: 12px; /* 滚动条圆角 */
}
::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* 滚动条背景色 */
}
.myList {
  display: flex;
  flex-direction: column;
}
.myList li {
  margin: 5px;
  list-style: none;
  border: 1px solid #e4e4e42f;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.584);
  height: 50px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.done {
  text-decoration: line-through;
}

/**transition-group */
.toDoList-enter-active,
.toDoList-leave-active {
  transition: all 0.5s ease;
}
.toDoList-enter-from,
.toDoList-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
