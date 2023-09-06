<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const emits = defineEmits(['handleDateChange'])

const size = ref<'default' | 'large' | 'small'>('small')

const datevalue = ref('')

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
function handleDateChange(val: any) {
  emits('handleDateChange', datevalue.value)
}
function disabledDate(time: Date) {
  return time.getTime() > Date.now()
}
watchEffect(() => {
  if (datevalue.value === null)
    return
  datevalue.value = datevalue.value.replace(/-/g, '.')
  console.log(datevalue.value)
})
</script>

<template>
  <el-date-picker
    v-model="datevalue"
    type="date"
    :disabled-date="disabledDate"
    :shortcuts="shortcuts"
    :size="size"
    class="calendear"
    format="YYYY/MM/DD"
    value-format="YYYY-MM-DD"
    @change="handleDateChange"
  />
</template>

<style>
.calendear {
  width: 0.2rem !important;
  background: none;
  border: none;
  outline: none;
}
</style>

<style scoped>
.calendear {
  width: 0.2rem !important;
  background: none;
  border: none;
  outline: none;
}
</style>
