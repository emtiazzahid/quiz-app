<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

    <dashboard-core-settings />
  </v-app>
</template>

<script>
export default {
  name: 'DashboardIndex',

  components: {
    DashboardCoreAppBar: () => import('@/views/dashboard/components/core/AppBar'),
    DashboardCoreDrawer: () => import('@/views/dashboard/components/core/Drawer'),
    DashboardCoreSettings: () => import('@/views/dashboard/components/core/Settings'),
    DashboardCoreView: () => import('@/views/dashboard/components/core/View'),
  },

  data: () => ({
    expandOnHover: false,
  }),
}
</script>
