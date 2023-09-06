<script setup>
</script>

<template>
  <nav>
    <!-- <router-link to="/">Home</router-link>
    <router-link to="/canvas">画板</router-link>
    <router-link to="/testcaos">test</router-link> -->
    <!-- <router-link to="/search">search</router-link> -->
  </nav>
  <router-view />
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: transparent;
}

nav a {
  margin: 0 10px 0 0;
  font-size: 15px;
}
</style>
