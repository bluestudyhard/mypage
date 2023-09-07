<script setup>
import { onMounted, ref, watchEffect } from 'vue'

/* 获取当前时间 年月日几点 */

const weekly = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Auguest',
  'September',
  'October',
  'November',
  'December',
]
const current = ref(new Date())
const current1 = ref(new Date()) // 时分
const currentTime = ref('')
const year = current.value.getFullYear()
const month = months[current.value.getMonth()]
const day = weekly[current.value.getDay()]
const monDay = current.value.getDate()
const isAM = ref(false)
const hours = ref(0)
const minutes = ref(0)
// 每秒更新seconds
function setAM() {
  if (current.value.getHours() < 12)
    isAM.value = true
  else
    isAM.value = false
}
const rotateHour = ref(0)
const rotateMinute = ref(0)
watchEffect(() => {
  rotateHour.value = (hours.value % 12) * 30 + minutes.value / 2
  rotateMinute.value = minutes.value * 6
})

onMounted(() => {
  setAM()
  setInterval(() => {
    current1.value = new Date().toLocaleString()
    currentTime.value = current1.value.substring(9, 15)
    hours.value = current.value.getHours()
    minutes.value = current.value.getMinutes()
  }, 1000)
  console.log(currentTime.value)
})
</script>

<template>
  <div class="container">
    <div class="clock">
      <div class="clock_circle">
        <div class="clock_circle_rounder" />
        <div class="clock_circle_hour" :style="`transform: rotate(${rotateHour}deg)`" />
        <div class="clock_circle_minute" :style="`transform: rotate(${rotateMinute}deg)`" />
      </div>

      <div class="clock_time">
        <span class="week">{{ day }}</span>
        <div class="clock_mdy">
          <span class="clock_mounth">{{ month }}</span>
          <span class="clock_day">{{ monDay }},</span>
          <span class="clock_year">{{ year }}</span>
        </div>
        <span class="clock_hour">{{ currentTime }}</span>
        <span class="clock_am">{{ isAM ? 'AM' : 'PM' }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  width: 15rem;
  user-select: none;
}

.clock {
  display: flex;
  column-gap: 1em;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  font-family: Montserrat, sans-serif;
  font-weight: 550;
  background: #d9dacc;
  border: 1px solid rgba(72, 72, 72, 0.663);
  border-radius: 40px;
  box-shadow: 6px 6px 0 0 rgb(179, 179, 179), 12px 12px 0 0 rgba(37, 37, 37, 0.329),
    inset 6px 6px 0 0 rgba(179, 179, 179, 0.5), inset 7px 7px 0 0 rgba(37, 37, 37, 0.067);
}

.clock_circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border: 1px solid;
  border: 3px solid #1a1a1a;
  border-radius: 50%;
  box-shadow: inset 3px 3px 0 0 rgba(179, 179, 179, 0.785);
}

.clock_circle_rounder {
  width: 3px;
  height: 3px;
  background: #f80707;
  border-radius: 50%;
}

.clock_circle_minute {
  position: absolute;
  bottom: 50%;
  width: 1.5px;
  height: 18px;
  background: #f40303;
  border-radius: 5px;
  box-shadow: 2px 1px 2px 1px rgba(165, 163, 163, 0.368);
  transform: rotate(70deg);
  transform-origin: bottom;
}

.clock_circle_hour {
  position: absolute;
  bottom: 50%;
  width: 1.5px;
  height: 10px;
  background: #fa0303;
  border-radius: 5px;
  box-shadow: 2px 1px 2px 1px rgba(165, 163, 163, 0.333);
  transform-origin: bottom;
}

.clock_time {
  .week {
    font-size: 0.8rem;
    font-weight: normal;
  }

  .clock_am {
    margin-left: 4px;
    font-size: 0.4rem;
    font-weight: normal;
  }

  .clock_hour {
    font-size: 0.8rem;
    font-weight: bold;
  }

  .clock_mdy {
    position: relative;
    bottom: 4px;
    border-bottom: 0.1px solid #93919171;
  }

  .clock_mounth {
    padding-right: 0.3rem;
  }
}
</style>
