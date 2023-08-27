<script setup lang="ts">
import { watchEffect, ref } from 'vue';

const size = ref<'default' | 'large' | 'small'>('small');

const datevalue = ref('');

const shortcuts = [
  {
    text: 'Today',
    value: new Date()
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    }
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    }
  }
];
const emits = defineEmits(['handleDateChange']);
const handleDateChange = (val: any) => {
  emits('handleDateChange', datevalue.value);
};
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};
watchEffect(() => {
  if (datevalue.value === null) return;
  datevalue.value = datevalue.value.replace(/-/g, '.');
  console.log(datevalue.value);
});
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
  ></el-date-picker>
</template>
<style >
.calendear {
  border: none;
  outline: none;
  width: 0.2rem !important;
  background: none;
}
</style>