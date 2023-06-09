<template>
  {{ current }}
  <div class="myTodoList">
    <div class="avator"></div>
    <h2 style="text-align: center; color: azure">Todo List</h2>
    <div class="listHeader">
      <input type="text" v-model="inputValue" />
      <button @click="addList" class="addlist">+</button>
    </div>

    <TransitionGroup name="toDoList" class="myList" tag="ul">
      <div class="listItem" v-for="(list, index) in todolists" :key="index">
        <li>
          <span class="title"
            ><input
              type="checkbox"
              v-model="list.done"
              @click="isdone(list)"
              :class="{ chekboxDone: list.done }"
            />
            title
          </span>
          <span class="content" :class="{ done: list.done }"
            >{{ index + 1 }}.{{ list.text }}</span
          >
        </li>

        <div @click="removeList(index, list.id)">x</div>
      </div>
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
  width: 240px;
  height: 400px;
  background: #ffffff00;
  border-radius: 15px;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  box-shadow: inset 0px 0px 3px 0px rgba(155, 154, 154, 0.34),
    0px 2px 2px 0px rgb(255 255 255 / 22%);
}
.myTodoList:hover {
  cursor: pointer;
  backdrop-filter: blur(5px);
}
/**自定义滚动条 */
::-webkit-scrollbar {
  width: 0px; /* 宽度 */
  height: auto;
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

.listItem {
  display: flex;
  align-items: center;
}

.myList li {
  margin: 5px;
  list-style: none;
  border: 1px solid #e4e4e42f;
  border-radius: 15px;
  background: #fe2e43a8;
  height: 60px;
  width: 200px;
  display: grid;
  /**定义表格宽度 */
  grid-template-rows: 1fr 1fr;
  overflow: auto;
  color: rgb(255, 255, 255);
  font-size: 10px;
  padding: 3px 0px 6px 10px;
}
.myList li:hover {
  backdrop-filter: blur(15px);
}

.myList .title {
  font-size: 15px;
  font-weight: bolder;
  display: flex;
}
.content {
  font-size: 5px;
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

.addlist {
  width: 25px;
  height: 25px;
  border-radius: 6px;
  border: none;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 255, 0.767);
  background: #f8384bce;
  font-size: 20px;
  transition: all 0.5s ease;
  text-align: center;
  left: 80%;
  position: relative;
}
.addlist:hover {
  background: #f8384b;
  cursor: pointer;
}

.listHeader {
  display: flex;
  align-items: center;
  position: relative;
}
.listHeader input {
  width: 10px;
  min-height: 10px;
  border-radius: 6px;
  border: none;
  box-decoration-break: none;
  font-size: 10px;
  transition: all 0.5s ease;
  left: 80%;
  position: absolute;
}
.listHeader input:focus {
  outline: none;
  width: 150px;

  border: 0;
  box-shadow: 0px 0px 3px 0px rgba(227, 227, 227, 0.5);
}
.listItem input[type="checkbox"] {
  opacity: 0.6;

  height: 0;
}
.listItem input[type="checkbox"]::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #1fea4be5;
  border: 1px solid #999;
  border-radius: 50%;
  position: relative;
  top: 5px;
}
</style>
