<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import { ListType } from '../types/listype';
import { getLists } from '../../services/getTodo';
const lists = ref<ListType[]>([]);
getLists().then(res => {
  lists.value = res;
  console.log(lists.value);
});
</script>
<template>
  <div>
    <h1>test</h1>
    <ul>
      <li v-for="list in lists" :key="list.id">
        {{ list }}
      </li>
    </ul>
  </div>
</template>