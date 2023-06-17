<template>
  <div class="myTodoList">
    <div class="avator">
      <p class="list-title">Todo List</p>
    </div>
    <div class="listHeader">
      <transition name="addText">
        <input
          type="text"
          v-if="showinput"
          @keyup.enter="addList"
          v-model="inputValue"
        />
      </transition>

      <button @click="addList" @mouseover="showAdd" class="addlist">+</button>
    </div>

    <draggable :list="todolists" animation="300" tag="transition-group">
      <template #item="{ element, index }">
        <div class="myList">
          <div class="listItem">
            <li>
              <span class="title"
                ><input
                  type="checkbox"
                  v-model="element.done"
                  @click="isdone(element)"
                  :class="{ chekboxDone: element.done }"
                />
                title
              </span>
              <span class="content" :class="{ done: element.done }"
                >{{ index + 1 }}.{{ element.text }}</span
              >
            </li>
            <div @click="removeList(index, element.id)">x</div>
          </div>
        </div>
      </template>
    </draggable>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      "
    >
      <button @click="compeleted = !compeleted" class="complete">
        {{ compeleted ? "showall" : "HideCompleted" }}
      </button>
    </div>
  </div>

  <!-- <draggable :list="lists" animation="300" tag="transition-group">
    <template #item="{ element, index }">
      <div class="myList">
        <div class="listItem">
          <li>
            <span class="title"
              ><input
                type="checkbox"
                v-model="element.done"
                @click="isdone(element)"
                :class="{ chekboxDone: element.done }"
              />
              title
            </span>
            <span class="content" :class="{ done: element.done }"
              >{{ index + 1 }}.{{ element.text }}</span
            >
          </li>
        </div>
      </div>
    </template>
  </draggable> -->
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import draggable from "vuedraggable";
import axios from "axios";
const inputValue = ref("");
const lists = ref([]);
const id = ref(1);
const showinput = ref(false);
let compeleted = ref(true);

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

// 鼠标经过触发增加框
const showAdd = () => {
  showinput.value = !showinput.value;
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
.avator {
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
}
.list-title {
  font-size: 22px;
  background: linear-gradient(
    to right,
    #ffffff,
    #fff0bf
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 550;
}

.myTodoList {
  width: 240px;
  background: #ffffff00;
  border-radius: 15px;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  box-shadow: inset 0px 0px 3px 0px rgba(155, 154, 154, 0.34),
    0px 2px 2px 0px rgb(255 255 255 / 22%);
}

.myList {
  display: flex;
  flex-direction: column;
  align-items: center;

}
.listHeader {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
}
.listHeader input {
  width: 123px;
  min-height: 15px;
  padding: 2px;
  border-radius: 5px;
  font-size: 12px;
  transition: all 0.5s ease;
  position: absolute;
  outline: none;
  left: 24%;
  border-style: none;
  border-bottom: 1px solid white;
  color: rgb(86, 85, 85);
  font-family: "Noto Serif SC", serif;
  font-weight: 600;
  /**只给底部边框加阴影 */
  box-shadow: 0 2px 0 #999;
}
/**addText 动画效果 */
.addText-enter-active {
  transition: all 0.3s ease-out;
}

.addText-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.addText-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
.addText-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
/* .addText-leave-active,
.addText-leave-from {
  transition: all 0.8s ease;
  transform: translateY(-20px);
  opacity: 0;
} */
/* .listHeader input:focus {
  width: 150px;
  outline: none;
  border: 0;
  box-shadow: 0px 0px 3px 0px rgba(227, 227, 227, 0.5);
} */

.listItem {
  display: flex;
  align-items: center;
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

/**todolist列表主体 */
.myList li {
  margin: 5px;
  list-style: none;
  box-shadow: 0px 0px 0px 1px rgb(144 138 138 / 15%);
  border-radius: 12px;
  /* background: #fe2e43a8; */
  background: linear-gradient(to left, #54e7eca8, #86a8e7b5, #7f7fd5db);
  /**background: linear-gradient(-225deg, #ff057c80 0%, #7257d8 48%, #4cc3ff9e 100%) */
  height: 64px;
  width: 200px;
  display: grid;
  /**定义表格宽度 */
  grid-template-rows: 1fr 1fr;
  overflow: auto;
  color: rgb(255, 255, 255);
  font-size: 10px;
  padding: 3px 0px 6px 10px;
  transition: all 1.5s ease;
  text-align: left;
  letter-spacing: 0.5px;
  backdrop-filter: blur(0px);
}

.myList li:focus {
  backdrop-filter: blur(15px);
  transition: all 1.5s ease;
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

.myTodoList:hover {
  cursor: pointer;
  backdrop-filter: blur(5px);
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
.complete {
  border-radius: 10px;
  padding: 7px;
  color: white;
  background: #d57eeb;
  border: none;
  box-shadow: 2px 2px 0px 1px rgba(233, 233, 238, 0.16);
  transition: all 1.5s ease;
}
.complete:hover {
  background: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);
  transform: translateX(1px);
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
