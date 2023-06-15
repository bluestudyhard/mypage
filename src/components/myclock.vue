<script setup>
import { ref, reactive, computed, watch, onMounted, watchEffect } from "vue";
/* 获取当前时间 年月日几点*/

const weekly = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Auguest",
  "September",
  "October",
  "November",
  "December",
];
const current = ref(new Date());
const current1 = ref(new Date()); // 时分
const currentTime = ref("");
const year = current.value.getFullYear();
const month = months[current.value.getMonth()];
const day = weekly[current.value.getDay()];
const monDay = current.value.getDate();
const isAM = ref(false);
const hours = ref(0);
const minutes = ref(0);
// 每秒更新seconds
const setAM = () => {
  if (current.value.getHours() < 12) {
    isAM.value = true;
  } else {
    isAM.value = false;
  }
};
const rotateHour = ref(0);
const rotateMinute = ref(0);
watchEffect(() => {
  rotateHour.value = (hours.value % 12) * 30 + minutes.value / 2;
  rotateMinute.value = minutes.value * 6;
});

onMounted(() => {
  setAM();
  setInterval(() => {
    current1.value = new Date().toLocaleString();

    currentTime.value = current1.value.substring(10, 15);
  }, 1000);
  setInterval(() => {
    hours.value = current.value.getHours();
    minutes.value = current.value.getMinutes();
  }, 1000);
});
</script>

<template>
  <div class="container">
    <div class="clock">
      <div class="clock_circle">
        <div class="clock_circle_rounder"></div>
        <div
          class="clock_circle_hour"
          :style="`transform: rotate(${rotateHour}deg)`"
        ></div>
        <div
          class="clock_circle_minute"
          :style="`transform: rotate(${rotateMinute}deg)`"
        ></div>
      </div>

      <div class="clock_time">
        <span class="week">{{ day }}</span>
        <div class="clock_mdy">
          <span class="clock_mounth">{{ month }} </span>
          <span class="clock_day">{{ monDay }},</span>
          <span class="clock_year">{{ year }}</span>
        </div>
        <span class="clock_hour">{{ currentTime }}</span>
        <span class="clock_am">{{ isAM ? "AM" : "PM" }}</span>
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
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
  font-weight: 550;
  column-gap: 1em;
  background: #d9dacc;
  border-radius: 40px;
  box-shadow: 6px 6px 0px 0px rgb(179, 179, 179),
    12px 12px 0px 0px rgba(37, 37, 37, 0.329),
    inset 6px 6px 0px 0px rgba(179, 179, 179, 0.5),
    inset 7px 7px 0px 0px rgba(37, 37, 37, 0.067);
  border: 1px solid rgba(72, 72, 72, 0.663);
}
.clock_circle {
  border: 1px solid;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #1a1a1a;
  box-shadow: inset 3px 3px 0px 0px rgba(179, 179, 179, 0.785);
}
.clock_circle_rounder {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #f80707;
}
.clock_circle_minute {
  width: 1.5px;
  height: 18px;
  border-radius: 5px;
  position: absolute;
  background: #f40303;
  transform: rotate(70deg);
  transform-origin: bottom;
  bottom: 50%;
  box-shadow: 2px 1px 2px 1px rgba(165, 163, 163, 0.368);
}
.clock_circle_hour {
  width: 1.5px;
  height: 10px;
  border-radius: 5px;
  background: #fa0303;
  position: absolute;
  transform-origin: bottom;
  bottom: 50%;
  box-shadow: 2px 1px 2px 1px rgba(165, 163, 163, 0.333);
}
.clock_time {
  .week {
    font-size: 0.8rem;
    font-weight: normal;
  }
  .clock_am {
    font-size: 0.4rem;
    font-weight: normal;
    margin-left: 4px;
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
}
</style>
