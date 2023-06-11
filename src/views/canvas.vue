<template>
  <div>
    <canvas ref="canvasRef" width="400" height="400"></canvas>
  </div>
</template>
<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
// const canvasRef = ref(null);
// const ctx = ref(null);

// const initCanvas = () => {
//   const canvas = canvasRef.value;
//   ctx.value = canvas.getContext("2d");
//   ctx.fillRect(0, 0, 1000, 1000);
//   ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
//   ctx.strokeRect(0, 0, 1, 1);
//   ctx.beginPath();
// };
// onMounted(() => {
//   initCanvas();
// });
const canvasRef = ref();
const scale = ref(1.0);

// 绘制圆形
function drawRectangle() {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  //   ctx.arc(
  //     canvas.width / 2,
  //     canvas.height / 2,
  //     100 * scale.value,
  //     0,
  //     2 * Math.PI
  //   );
  ctx.strokeRect(
    canvas.width / 2,
    canvas.height / 2,
    scale.value * 100,
    scale.value * 100
  );
  ctx.stroke();
}

// 监听鼠标滚轮事件，实现缩放
function handleMouseWheel(e) {
  const delta = e.deltaY || e.detail || e.wheelDelta;
  console.log(delta);
  if (delta < 0) {
    // 放大
    scale.value += 0.1;
  } else {
    // 缩小
    scale.value -= 0.1;
  }
  if (scale.value < 0.1) {
    scale.value = 0.1;
  }
  if (scale.value > 3.0) {
    scale.value = 3.0;
  }
  //   drawCircle();
  e.preventDefault(); // 这里禁止冒泡的原因是，会触发原本页面的滚动事件
}

const scrollEvent = (e) => {
  const delta = e.deltaY || e.deltaX || e.wheelDelta;
  console.log(delta);
  if (delta < 0) {
    scale.value += 0.1;
  } else {
    scale.value -= 0.1;
  }
  if (scale.value < 0.1) {
    scale.value = 0.1;
  }
  if (scale.value > 3.0) {
    scale.value = 3.0;
  }
  drawRectangle();
  e.preventDefault();
};

onMounted(() => {
  const canvas = canvasRef.value;
  canvas.addEventListener("wheel", scrollEvent);
  drawRectangle();
});
</script>

<style scope></style>
