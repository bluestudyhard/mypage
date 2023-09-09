<script setup lang="ts">
import type { toDoListItemType } from '../types/listype'

defineProps<{
  todo: toDoListItemType
  index: number
}>()

defineEmits([
  'isdone',
  'removeList',
])
</script>

<template>
  <div class="myList">
    <div class="listItem">
      <li>
        <span class="title">
          <input :value="todo.done" type="checkbox" @click="$emit('isdone', todo)">
          {{ todo.time }}
          <span class="removeItem" @click="$emit('removeList', index + 1, todo.id)">x</span>
        </span>
        <div class="contentBody">
          <span class="content" :class="{ done: todo.done }">
            {{ index + 1 }}.{{ todo.text }}
          </span>
        </div>
      </li>
    </div>
  </div>
</template>

<style scoped>
.listItem {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/** todolist列表主体 */
.listItem li {
  display: grid;

  /** 定义表格宽度 */
  grid-template-rows: 0.5fr 1fr;
  width: 12rem;
  height: 4.4rem;
  padding: 4px 4px 0 8px;
  margin: 5px;
  overflow: auto;
  font-family: "PingFang SC", sans-serif;
  color: #fff;
  text-align: left;
  letter-spacing: 0.2px;
  list-style: none;

  /* background: #fe2e43a8; */
  background: linear-gradient(to left, #54e7eca8, #86a8e7b5, #7f7fd5db);
  border-radius: 12px;
  box-shadow: 0 0 0 1px #908a8a26;
  transition: all 1.5s ease;
}

.myList .title {
  display: flex;
  font-size: 14px;
  font-weight: bolder;
}

.contentBody {
  display: flex;
}

.content {
  font-size: 12.5px;
}

.done {
  text-decoration: line-through;
}

.listItem input[type='checkbox'] {
  height: 0;
  opacity: 0.6;
}

.listItem input[type='checkbox']::before {
  position: relative;
  top: 2.5px;
  display: inline-block;
  width: 8px;
  height: 8px;
  content: '';
  background: #1fea4be5;
  border: 1px solid #999;
  border-radius: 50%;
}

.listItem input[type='checkbox']:hover::before {
  background: #f45151;
}

.removeItem {
  position: absolute;
  left: 84%;
  font-size: 3px;

}

.removeItem:hover {
  color: #efb0b0;
  cursor: pointer;
}
</style>
