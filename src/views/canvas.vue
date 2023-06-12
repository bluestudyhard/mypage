<template>
  <div>
    <canvas ref="canvasRef" width="400" height="400"></canvas>
  </div>
</template>
<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";

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
