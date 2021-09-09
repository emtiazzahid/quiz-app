<template>
  <div id="wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style scoped>
  #wrapper {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #ccc;
  }
</style>