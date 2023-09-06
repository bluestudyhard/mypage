<script setup lang="ts">
import type { ItemType } from '../types/listype'

defineProps<{
  todo: ItemType
  index: number
}>()

defineEmits(['removeList', 'isdone'])
</script>

<template>
  <div class="myList">
    <div class="listItem">
      <li>
        <span class="title">
          <input
            :value="todo.done"
            type="checkbox"
            :class="{ chekboxDone: todo.done }"
            @click="$emit('isdone', todo.id)"
          >
          {{ todo.time }}
        </span>
        <span class="content" :class="{ done: todo.done }">
          {{ index + 1 }}.{{ todo.text }}
        </span>
      </li>
      <div @click="$emit('removeList', index, todo.id)">
        x
      </div>
    </div>
  </div>
</template>

<style scoped>
.myList {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.listItem {
  display: flex;
  align-items: center;
}

/** todolist列表主体 */
.myList li {
  display: grid;

  /** 定义表格宽度 */
  grid-template-rows: 1fr 1fr;
  width: 200px;

  /** background: linear-gradient(-225deg, #ff057c80 0%, #7257d8 48%, #4cc3ff9e 100%) */
  height: 64px;
  padding: 3px 0 6px 10px;
  margin: 5px;
  overflow: auto;
  font-size: 10px;
  color: #fff;
  text-align: left;
  letter-spacing: 0.5px;
  list-style: none;

  /* background: #fe2e43a8; */
  background: linear-gradient(to left, #54e7eca8, #86a8e7b5, #7f7fd5db);
  backdrop-filter: blur(0);
  border-radius: 12px;
  box-shadow: 0 0 0 1px #908a8a26;
  transition: all 1.5s ease;
}

.myList li:focus {
  backdrop-filter: blur(15px);
  transition: all 1.5s ease;
}

.myList .title {
  display: flex;
  font-size: 15px;
  font-weight: bolder;
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

.listItem input[type='checkbox'] {
  height: 0;
  opacity: 0.6;
}

.listItem input[type='checkbox']::before {
  position: relative;
  top: 5px;
  display: inline-block;
  width: 8px;
  height: 8px;
  content: '';
  background: #1fea4be5;
  border: 1px solid #999;
  border-radius: 50%;
}
</style>
