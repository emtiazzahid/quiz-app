<template>
  <v-app-bar
    id="app-bar"
    flat
    height="72"
    color="surface"
    class="qa-appbar px-2"
  >
    <v-btn icon variant="text" class="ml-1" @click="setDrawer(!drawer)">
      <v-icon icon="mdi-menu" />
    </v-btn>

    <v-toolbar-title class="text-h6 font-weight-bold ml-1">
      {{ $route.name }}
    </v-toolbar-title>

    <v-spacer />

    <v-btn icon variant="text" :to="{ name: 'Homepage' }" class="qa-muted">
      <v-icon icon="mdi-home-outline" />
    </v-btn>

    <v-menu location="bottom end" transition="scale-transition">
      <template #activator="{ props }">
        <v-btn icon v-bind="props" class="ml-1">
          <v-avatar size="38" class="qa-quiz-avatar">{{ userInitial }}</v-avatar>
        </v-btn>
      </template>
      <v-list min-width="200" rounded="lg" class="pa-2">
        <div class="px-3 py-2">
          <div class="text-subtitle-2 font-weight-bold">{{ userName }}</div>
          <div class="text-caption qa-muted">{{ userEmail }}</div>
        </div>
        <v-divider class="mb-1" />
        <v-list-item rounded="lg" prepend-icon="mdi-home-outline" :to="{ name: 'Homepage' }" title="Home page" />
        <v-list-item rounded="lg" prepend-icon="mdi-logout" title="Logout" base-color="error" @click="logout" />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { LOGOUT } from "@/store/actions/type";

  export default {
    name: 'DashboardCoreAppBar',

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      ...mapState(['drawer']),
      user () {
        return this.$store.state.auth.user || {}
      },
      userName () {
        return this.user.name || 'Quiz User'
      },
      userEmail () {
        return this.user.email || 'welcome@quizapp.io'
      },
      userInitial () {
        return (this.userName || 'U').charAt(0).toUpperCase()
      },
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      logout() {
        this.$store.dispatch(LOGOUT).then(() => {
          this.$router.push('/');
        });
      }
    },
  }
</script>

<style scoped>
.qa-appbar {
  border-bottom: 1px solid var(--qa-line);
  background: rgba(255, 255, 255, .82) !important;
  backdrop-filter: saturate(180%) blur(10px);
}
</style>
