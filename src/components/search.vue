<script setup>
import { onMounted, ref } from 'vue'
import { Subject, fromEvent } from 'rxjs'
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators'
import { searchService } from '../../services/searchService'

const emits = defineEmits(['changeFocus', 'missFocus'])

const searchTerm = ref('')
const searchResults = ref([])
const searchType = ref(HTMLInputElement)
const searchSubject = new Subject()
const cancelSearch = new Subject()
const isfocus = ref(false)

function changeFocus() {
  isfocus.value = true
  emits('changeFocus', isfocus.value)
}
// 一旦点出了搜索框
function missFocus() {
  isfocus.value = false
  emits('missFocus', isfocus.value)
}

function cancleSubscribe() {
  cancelSearch.next() // 发出取消订阅的信号
  searchResults.value = [] // 清空搜索结果
}

// 这里其实不能绑定@input事件，因为这样会导致每次输入都会触发，而我们需要的是输入完成后才触发
// 而且如果要使用dom的话要在onMounted里面使用，因为这个时候dom才会被渲染出来
onMounted(() => {
  fromEvent(searchType.value, 'input')
    .pipe(
      map(event => event.target.value),
      tap((term) => {
        if (term === '')
          cancleSubscribe()
      }),
      debounceTime(800), // 设置节流时间
      distinctUntilChanged(), // 直到有新的输入才会创建新的流
      filter(term => term !== ''), // 过滤掉空字符串
      switchMap(term => searchService.search(term)), // 切换到新的流
    )
    .subscribe((results) => {
      searchResults.value = results
    })
  // 除了点击搜索框，其他地方点击都会取消订阅
  fromEvent(document, 'click')
    .pipe(
      tap((e) => {
        if (e.target !== searchType.value)
          cancleSubscribe()
      }),
    )
    .subscribe()
})

function navigateTo(url) {
  window.open(url)
  cancleSubscribe()
}
</script>

<template>
  <div class="container">
    <form method="get" action="https://www.bing.com/search?" target="_blank">
      <input
        ref="searchType"
        v-model="searchTerm"
        type="search"
        class="search-body"
        placeholder="请输入内容"
        name="q"
        autocomplete="off"
        @focus="changeFocus"
        @blur="missFocus"
      >
    </form>
    <div class="search-results">
      <div
        v-for="result in searchResults"
        :key="result.id"
        class="results-item"
        @click="navigateTo(result.url)"
      >
        {{ result.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30rem;
  padding: 0.5rem;
}

.search-body {
  width: 20rem;
  height: 36px;
  padding: 10px;
  color: rgb(0, 0, 0);
  background-color: rgba(251, 250, 250, 0.466);
  border: 0;
  border-radius: 15px;
  box-shadow: 1px 2px 3.1px 0.5px rgba(213, 211, 211, 0.866);
  transition: 0.5s all ease-in-out;
}

.search-body:focus {
  width: 25rem;
  border: 0;
  outline: none;
}

.search-body:hover {
  width: 25rem;
  box-shadow: 3px 4px 3.1px 0.5px rgba(213, 211, 211, 0.741);
}

.search-results {
  z-index: 10;
  width: 25rem;
  margin-top: 6px;
  background-color: #ffffff58;
  backdrop-filter: blur(5px);
  border-radius: 12px;
  transition: all 0.25s;
}

.results-item {
  display: -webkit-box;
  padding-left: 1rem;
  overflow: hidden;
  clear: both;
  font-family: "pingfang sc", sans-serif;
  font-size: 13px;
  font-weight: bold;
  line-height: 40px;
  color: #424242;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.25s;
  -webkit-line-clamp: 1;
}

.results-item:hover {
  text-indent: 20px;
  background: rgba(255, 255, 255, 0.363);
}

.results-item:first-child {
  border-top-left-radius: 10px; /* 设置第一个元素的上左圆角 */
  border-top-right-radius: 10px; /* 设置第一个元素的上右圆角 */
}

.results-item:last-child {
  border-bottom-right-radius: 10px; /* 设置最后一个元素的下右圆角 */
  border-bottom-left-radius: 10px; /* 设置最后一个元素的下左圆角 */
}

@media (max-width: 768px) {
  .search-body {
    width: 13rem;
  }

  .search-body:focus {
    width: 18rem;
    border: 0;
    outline: none;
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
