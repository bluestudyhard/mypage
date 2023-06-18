<template>
  <div class="container">
    <!-- 其他组件内容 -->

    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
    <h1 id="title">Hello, Vue!</h1>
  </div>
</template>
<script setup>
// import { ref, reactive, watch, computed, onMounted } from "vue";

// const canvasRef = ref();
// const scale = ref(1.0);

// // 绘制圆形
// function drawRectangle() {
//   const canvas = canvasRef.value;
//   const ctx = canvas.getContext("2d");
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.beginPath();

//   //   ctx.arc(
//   //     canvas.width / 2,
//   //     canvas.height / 2,
//   //     100 * scale.value,
//   //     0,
//   //     2 * Math.PI
//   //   );
//   ctx.strokeRect(
//     canvas.width / 2,
//     canvas.height / 2,
//     scale.value * 100,
//     scale.value * 100
//   );
//   ctx.stroke();
// }

// const scrollEvent = (e) => {
//   const delta = e.deltaY || e.deltaX || e.wheelDelta;
//   console.log(delta);
//   if (delta < 0) {
//     scale.value += 0.1;
//   } else {
//     scale.value -= 0.1;
//   }
//   if (scale.value < 0.1) {
//     scale.value = 0.1;
//   }
//   if (scale.value > 3.0) {
//     scale.value = 3.0;
//   }
//   drawRectangle();
//   e.preventDefault();
// };

// onMounted(() => {
//   const canvas = canvasRef.value;
//   canvas.addEventListener("wheel", scrollEvent);
//   drawRectangle();
// });
</script>

<style lang="sass" scoped>
.container
  width: 100%
  height: 100vh
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)
  overflow: hidden

// n is number of stars required
@function multiple-box-shadow ($n)
  $value: '#{random(2000)}px #{random(2000)}px #FFF'
  @for $i from 2 through $n
    $value: '#{$value} , #{random(2000)}px #{random(2000)}px #FFF'

  @return unquote($value)

$shadows-small: multiple-box-shadow(700)
$shadows-medium: multiple-box-shadow(200)
$shadows-big: multiple-box-shadow(100)

#stars
  width: 1px
  height: 1px
  background: transparent
  box-shadow: $shadows-small
  animation: animStar 50s linear infinite

  &:after
    content: " "
    position: absolute
    top: 2000px
    width: 1px
    height: 1px
    background: transparent
    box-shadow: $shadows-small

#stars2
  width: 2px
  height: 2px
  background: transparent
  box-shadow: $shadows-medium
  animation: animStar 100s linear infinite

  &:after
    content: " "
    position: absolute
    top: 2000px
    width: 2px
    height: 2px
    background: transparent
    box-shadow: $shadows-medium

#stars3
  width: 3px
  height: 3px
  background: transparent
  box-shadow: $shadows-big
  animation: animStar 150s linear infinite

  &:after
    content: " "
    position: absolute
    top: 2000px
    width: 3px
    height: 3px
    background: transparent
    box-shadow: $shadows-big

#title
  position: absolute
  top: 50%
  left: 0
  right: 0

  color: #FFF
  text-align: center
  font-family: 'lato',sans-serif
  font-weight: 300
  font-size: 50px
  letter-spacing: 10px

  margin-top: -60px
  padding-left: 10px

  span
    background: -webkit-linear-gradient(white, #38495a)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent

@keyframes animStar
  from
    transform: translateY(0px)
  to
    transform: translateY(-2000px)
</style>
