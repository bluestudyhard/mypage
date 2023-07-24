<template>
  <div class="container">
    <input
      type="text"
      v-model="searchTerm"
      @input="onSearchInput"
      @focus="changeFocus"
      @blur="missFocus"
      class="search-body"
      placeholder="请输入内容"
    />
    <div class="search-results">
      <div
        class="results-item"
        v-for="result in searchResults"
        :key="result.id"
        @click="navigateTo(result.url)"
      >
        {{ result.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { searchService } from '../../services/searchService';

const searchTerm = ref('');
const searchResults = ref([]);
const searchSubject = new Subject();
const cancelSearch = new Subject();
const emits = defineEmits(['changeFoucus', 'missFocus']);
const isfocus = ref(false);

const changeFocus = () => {
  isfocus.value = true;
  emits('changeFoucus', isfocus.value);
};
// 一旦点出了搜索框
const missFocus = () => {
  isfocus.value = false;
  emits('missFocus', isfocus.value);
  setTimeout(() => {
    cancleSubscribe();
  }, 300);
};

const cancleSubscribe = () => {
  cancelSearch.next(); // 发出取消订阅的信号
  searchResults.value = []; // 清空搜索结果
};
const onSearchInput = () => {
  if (searchTerm.value === '') {
    cancleSubscribe();
    return;
  }
  searchSubject
    .pipe(
      debounceTime(800), // 设置节流时间
      distinctUntilChanged(), // 直到有新的输入才会创建新的流
      switchMap(term => searchService.search(term)), // 切换到新的流
      takeUntil(cancelSearch)
    )
    .subscribe(results => {
      searchResults.value = results;
    });
  searchSubject.next(searchTerm.value);
};
const navigateTo = url => {
  window.open(url);
  cancleSubscribe();
};
</script>
<style scoped>
.container {
  width: 30rem;
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.search-body {
  width: 20rem;
  height: 36px;
  border-radius: 15px;
  transition: 0.5s all ease-in-out;
  background-color: rgba(251, 250, 250, 0.466);
  color: rgb(0, 0, 0);
  border: 0px;
  box-shadow: 1px 2px 3.1px 0.5px rgba(213, 211, 211, 0.866);
  padding: 10px;
}
.search-body:focus {
  outline: none;
  width: 25rem;
  border: 0;
}

.search-body:hover {
  width: 25rem;
  box-shadow: 3px 4px 3.1px 0.5px rgba(213, 211, 211, 0.741);
}

.search-results {
  width: 25rem;
  background-color: #ffffff58;
  z-index: 10;
  margin-top: 6px;
  border-radius: 12px;
  backdrop-filter: blur(5px);
  transition: all 0.25s;
}
.results-item {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  clear: both;
  padding-left: 1.5rem;
  font-size: 13px;
  transition: all 0.25s;
  cursor: pointer;
  color: #424242;
  font-family: pingfang sc, sans-serif;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 40px;
  white-space: nowrap;
}
.results-item:hover {
  background: rgba(255, 255, 255, 0.363);
  text-indent: 20px;
}
.results-item:first-child {
  border-top-left-radius: 10px; /* 设置第一个元素的上左圆角 */
  border-top-right-radius: 10px; /* 设置第一个元素的上右圆角 */
}

.results-item:last-child {
  border-bottom-left-radius: 10px; /* 设置最后一个元素的下左圆角 */
  border-bottom-right-radius: 10px; /* 设置最后一个元素的下右圆角 */
}
@media (max-width: 768px) {
  .search-body {
    width: 13rem;
  }
  .search-body:focus {
    outline: none;
    width: 18rem;
    border: 0;
  }

  .search-body:hover {
    width: 18rem;
    box-shadow: 3px 4px 3.1px 0.5px rgba(213, 211, 211, 0.866);
  }
  .search-results {
    width: 18rem;
  }
}
</style>
