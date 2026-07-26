<template>
  <v-main>
    <router-view />

    <dashboard-core-footer />
  </v-main>
</template>

<script>
  import { defineAsyncComponent } from 'vue'

  export default {
    name: 'DashboardCoreView',

    components: {
      DashboardCoreFooter: defineAsyncComponent(() => import('./Footer.vue')),
    },
  }
</script>
