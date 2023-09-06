<script setup lang="ts">
import { ref, watchEffect } from 'vue'

// import { ListType } from '../types/listype';
// import { getLists } from '../../services/getTodo';
// const lists = ref<ListType[]>([]);
// getLists().then(res => {
//   lists.value = res;
//   console.log(lists.value);
// });
const size = ref<'default' | 'large' | 'small'>('small')

const value1 = ref('')
const value2 = ref('')

const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]
watchEffect(() => {
  value2.value = value2.value.replace(/-/g, '.')
  console.log(value2.value)
})
function disabledDate(time: Date) {
  return time.getTime() > Date.now()
}
</script>

<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <el-date-picker v-model="value1" type="date" placeholder="Pick a day" :size="size" />
    </div>
    <div class="block">
      <span class="demonstration">Picker with quick options</span>
      <el-date-picker
        v-model="value2"
        type="date"
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
        :size="size"
        class="calendear"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </div>
  </div>
</template>

<style>
.calendear {
  width: 10rem !important;
  border: none;
  outline: none;
}
</style>

<style scoped>
.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}

.demo-date-picker .block {
  flex: 1;
  padding: 10px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
</style>
