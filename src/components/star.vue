<template>
  <div class="container">
    <div id="stars" />
    <div id="stars2" />
    <div id="stars3" />
    <h1 id="title">
      Welcome!
    </h1>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  width: 100%;
}

.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
}

// 星星运动函数
@function multiple-box-shadow($n) {
  $value: '#{random(2000)}px #{random(2000)}px #FFF';

  @for $i from 2 through $n {
    $value: '#{$value} , #{random(2000)}px #{random(2000)}px #FFF';
  }

  @return unquote($value);
}

$shadows-small: multiple-box-shadow(700);
$shadows-medium: multiple-box-shadow(200);
$shadows-big: multiple-box-shadow(100);

#stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: $shadows-small;
  animation: anim-star 50s linear infinite;

  &::after {
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    content: ' ';
    background: transparent;
    box-shadow: $shadows-small;
  }
}

#stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: $shadows-medium;
  animation: animStar 100s linear infinite;

  &::after {
    position: absolute;
    top: 2000px;
    width: 2px;
    height: 2px;
    content: ' ';
    background: transparent;
    box-shadow: $shadows-medium;
  }
}

#stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: $shadows-big;
  animation: animStar 150s linear infinite;

  &::after {
    position: absolute;
    top: 2000px;
    width: 3px;
    height: 3px;
    content: ' ';
    background: transparent;
    box-shadow: $shadows-big;
  }
}

#title {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  padding-left: 10px;
  margin-top: -60px;
  font-family: lato, sans-serif;
  font-size: 50px;
  font-weight: 300;
  color: #fff;
  text-align: center;
  letter-spacing: 10px;

  span {
    background: linear-gradient(white, #38495a);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

@keyframes anim-star {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-2000px);
  }
}
</style>
