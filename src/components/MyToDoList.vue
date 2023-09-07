<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import type { ListType } from '../types/listype'
import { addList, deleteList, getLists, updateList } from '../../services/getTodo'
import calendar from '../components/calendar.vue'
import TodoItem from './TodoItem.vue'

const inputValue = ref('')
const lists = ref<ListType[]>(Array.from({ length: 5 }, (_, i) => ({
  id: i,
  text: `item ${i}`,
  time: Date.now().toLocaleString(),
  done: true,
})))
const showinput = ref(false)
const compeleted = ref(true)
const time = ref('')

async function showLists() {
  lists.value = await getLists()
  lists.value = lists.value.filter(list => list.time === time.value)
}

// 添加list
async function addItem() {
  if (inputValue.value.trim() === '') {
    alert('请输入内容')
    return
  }

  // 如果里面的月份，天数是个位数，就在前面加0
  // axios 自动转换为json
  const item: ListType = {
    text: inputValue.value,
    time: time.value,
    done: false,
  }
  const res = await addList(item)
  const list: any = res
  lists.value.push(list)
  inputValue.value = ''
  showLists()
}

// 鼠标经过触发增加框
function showAdd() {
  showinput.value = !showinput.value
}

// 删除list
async function removeList(index, listID) {
  if (confirm('确定删除改项吗？') === false)
    return

  lists.value.splice(index, 1)
  console.log(listID)
  const res = await deleteList(listID)
  console.log(res)
  showLists()
}
// 隐藏完成事项
const todolists = computed(() => {
  return compeleted.value ? lists.value.filter(list => !list.done) : lists.value
})

async function isdone(list) {
  list.done = !list.done
  const res = await updateList(list)
  console.log(res)
}
const handleDateUpdated: any = (val: any) => {
  if (val === null)
    return
  time.value = val
  showLists()
}

useSortable('#todo-lists', lists)

onMounted(() => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  time.value = `${year}.${String(month).padStart(2, '0')}.${day}`

  showLists()
  console.log(time.value)
})
</script>

<template>
  <div class="myTodoList">
    <div class="avator">
      <p class="list-title">
        Todo List
      </p>
    </div>

    <div class="listHeader">
      <transition name="addText">
        <input v-if="showinput" v-model="inputValue" type="text" @keydown.enter="addItem">
      </transition>

      <button class="addlist" @click="showAdd">
        +
      </button>
    </div>

    <ul id="todo-lists">
      <TodoItem
        v-for="(list, index) in todolists"
        :key="list.id"
        :todo="list"
        :index="index"
        @isdone="isdone"
        @removeList="removeList"
      />
    </ul>

    <div style="display: flex; align-items: center; justify-content: center; margin-top: 20px">
      <button class="complete" @click="compeleted = !compeleted">
        {{ compeleted ? 'showall' : 'HideCompleted' }}
      </button>
      <calendar class="calendar" @handleDateChange="handleDateUpdated" />
    </div>
  </div>
</template>

<style scope>
.avator {
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
}

.list-title {
  font-size: 20px;
  font-weight: 550;
  background: linear-gradient(to right, #fff, #fff0bf);

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.myTodoList {
  width: 240px;
  max-height: 600px;
  overflow: auto;
  overflow-x: hidden;
  background: #fff0;
  border-radius: 15px;
  box-shadow: inset 0 0 3px 0 #9b9a9a57,
    0 2px 2px 0 #ffffff38;
  scrollbar-width: none;
}

.listHeader {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.listHeader input {
  position: absolute;
  left: 24%;
  width: 7.9rem;
  min-height: 15px;
  padding: 1px 1px 1px 3px;
  font-family: "pingfang SC", "PingFang SC", "Microsoft YaHei", "Helvetica Neue";
  font-size: 12px;
  font-weight: 500;
  color: rgb(86, 85, 85);
  border-style: none;
  border-bottom: 1px solid white;
  border-radius: 5px;
  outline: none;

  /** 只给底部边框加阴影 */
  box-shadow: 0 2px 0 #999;
  transition: all 0.5s ease;
}

/** addText 动画效果 */
.addText-enter-active {
  transition: all 0.3s ease-out;
}

.addText-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.addText-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.addText-leave-to {
  opacity: 0;
  transform: translateY(20px);
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

.addlist {
  position: relative;
  left: 80%;
  width: 25px;
  height: 25px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.767);
  text-align: center;
  background: #f8384bce;
  border: none;
  border-radius: 6px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease;
}

.addlist:hover {
  cursor: pointer;
  background: #f8384b;
}

.complete {
  padding: 7px;
  color: white;
  background: #d57eeb;
  border: none;
  border-radius: 10px;
  box-shadow: 2px 2px 0 1px #e9e9ee29;
  transition: all 1.5s ease;
}

.complete:hover {
  background: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);
  transform: translateX(1px);
}

/** 自定义滚动条 */
::-webkit-scrollbar {
  width: 0;

  /* 宽度 */
  height: auto;
}

::-webkit-scrollbar-thumb {
  background-color: #64636388;

  /* 滚动条颜色 */
  border-radius: 12px;

  /* 滚动条圆角 */
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;

  /* 滚动条背景色 */
}

/** transition-group */
.toDoList-enter-active,
.toDoList-leave-active {
  transition: all 0.5s ease;
}

.toDoList-enter-from,
.toDoList-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.calendar {
  position: absolute;
  right: 3rem;
}
</style>
