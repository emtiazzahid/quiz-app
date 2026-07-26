<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

    <dashboard-core-settings />
  </v-app>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'DashboardIndex',

  components: {
    DashboardCoreAppBar: defineAsyncComponent(() => import('@/views/dashboard/components/core/AppBar.vue')),
    DashboardCoreDrawer: defineAsyncComponent(() => import('@/views/dashboard/components/core/Drawer.vue')),
    DashboardCoreSettings: defineAsyncComponent(() => import('@/views/dashboard/components/core/Settings.vue')),
    DashboardCoreView: defineAsyncComponent(() => import('@/views/dashboard/components/core/View.vue')),
  },

  data: () => ({
    expandOnHover: false,
  }),
}
</script>
