<script setup>
import { ref, reactive, watch, computed } from "vue";
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/canvas">画板</router-link>
  </nav>
  <router-view />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: transparent;
  position: fixed;
  top: 0;

}
nav a {
  margin: 0 10px 0px 0px;
  font-size: 15px;
}
</style>
