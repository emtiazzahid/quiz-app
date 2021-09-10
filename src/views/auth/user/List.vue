<template>
  <div>
    <h1>User Lists</h1>

    <router-link :to="{ name: 'UserForm' }">
    New User
    </router-link>
  </div>
</template>

<script>
    export default {
        name: 'user-lists'
    }
</script>

<style>

</style>
