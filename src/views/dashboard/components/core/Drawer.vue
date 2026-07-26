<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :expand-on-hover="expandOnHover"
    width="272"
    color="surface"
    class="qa-drawer"
    v-bind="$attrs"
  >
    <div class="pa-5 d-flex align-center">
      <div class="qa-logo-badge mr-3">Q</div>
      <div>
        <div class="text-subtitle-1 font-weight-bold" style="line-height:1.1">Quiz App</div>
        <div class="text-caption qa-muted">Dashboard</div>
      </div>
    </div>

    <v-divider />

    <v-list nav class="px-3 py-4">
      <div class="text-overline qa-muted px-3 mb-1">Menu</div>
      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        />
        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>
    </v-list>

    <template #append>
      <div class="pa-4">
        <v-card class="qa-bg-soft pa-4" rounded="lg" flat>
          <div class="text-subtitle-2 font-weight-bold mb-1">Need help?</div>
          <div class="text-caption qa-muted mb-3">Browse the docs or reach out to support.</div>
          <v-btn size="small" block variant="tonal" color="primary" rounded="lg" href="#">View docs</v-btn>
        </v-card>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        { icon: 'mdi-view-dashboard-outline', title: 'Dashboard', to: '/dashboard' },
        { icon: 'mdi-note-text-outline', title: 'Quizzes', to: '/quizzes' },
        { icon: 'mdi-clipboard-list-outline', title: 'MCQs', to: '/mcq' },
        { icon: 'mdi-history', title: 'Test Attempts', to: '/attempts' },
      ],
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.map(this.mapItem)
      },
    },

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: item.title,
        }
      },
    },
  }
</script>

<style scoped>
.qa-drawer {
  border-right: 1px solid var(--qa-line);
}
</style>
