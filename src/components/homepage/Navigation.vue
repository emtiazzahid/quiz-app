<template>
  <div>
    <v-navigation-drawer v-model="drawer" temporary location="right">
      <div class="pa-4 d-flex align-center">
        <div class="qa-logo-badge mr-3">Q</div>
        <div>
          <div class="text-h6 font-weight-bold" style="line-height: 1">Quiz App</div>
          <div class="text-caption qa-muted">Test your skills</div>
        </div>
      </div>
      <v-divider />
      <v-list density="comfortable" nav>
        <v-list-item
          v-for="([icon, text, link], i) in items"
          :key="i"
          rounded="lg"
          @click="$goTo(link)"
        >
          <template #prepend><v-icon :icon="icon" /></template>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
        <v-divider class="my-2" />
        <template v-if="authenticated">
          <v-list-item rounded="lg" prepend-icon="mdi-view-dashboard-outline" :to="{ name: 'Dashboard' }" title="Dashboard" />
          <v-list-item rounded="lg" prepend-icon="mdi-logout" title="Logout" @click="logout" />
        </template>
        <v-list-item v-else rounded="lg" prepend-icon="mdi-login" :to="{ name: 'Login' }" title="Login" />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :elevation="scrolled ? 2 : 0" height="72" class="qa-navbar px-4 px-md-8" :class="{ 'qa-navbar--solid': scrolled }">
      <router-link :to="{ name: 'Homepage' }" class="d-flex align-center text-decoration-none">
        <div class="qa-logo-badge mr-3">Q</div>
        <span class="text-h6 font-weight-bold qa-gradient-text">Quiz App</span>
      </router-link>

      <v-spacer />

      <v-app-bar-nav-icon v-if="isXs" @click.stop="drawer = !drawer" />
      <div v-else class="d-flex align-center ga-2">
        <v-btn variant="text" :to="{ name: 'Homepage' }" class="qa-muted">Home</v-btn>
        <v-btn variant="text" class="qa-muted" @click="$goTo('#quizes')">Quizzes</v-btn>
        <template v-if="authenticated">
          <v-btn variant="tonal" color="primary" rounded="lg" :to="{ name: 'Dashboard' }">Dashboard</v-btn>
          <v-btn variant="text" class="qa-muted" @click="logout">Logout</v-btn>
        </template>
        <v-btn v-else rounded="lg" class="qa-btn-gradient px-6" :to="{ name: 'Login' }">Login</v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<style scoped>
.qa-navbar {
  background: transparent !important;
  transition: background .3s ease, backdrop-filter .3s ease;
}
.qa-navbar--solid {
  background: rgba(255, 255, 255, .82) !important;
  backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--qa-line);
}
</style>

<script>
import { LOGOUT } from "@/store/actions/type";
export default {
  data: () => ({
    authenticated: false,
    drawer: null,
    isXs: false,
    scrolled: false,
    items: [
      ["mdi-home-outline", "Home", "#hero"],
      ["mdi-help-circle-outline", "Quizzes", "#quizes"],
    ],
  }),
  props: {
    color: String,
    flat: Boolean,
  },
  methods: {
    onResize() {
      this.isXs = window.innerWidth < 850;
    },
    onScroll() {
      this.scrolled = (window.pageYOffset || document.documentElement.scrollTop) > 24;
    },
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.authenticated = false;
        this.$router.push('/');
      });
    },
  },
  watch: {
    isXs(value) {
      if (!value && this.drawer) this.drawer = false;
    },
  },
  mounted() {
    this.onResize();
    this.onScroll();
    window.addEventListener("resize", this.onResize, { passive: true });
    window.addEventListener("scroll", this.onScroll, { passive: true });
    this.authenticated = this.$store.state.auth.isAuthenticated;
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("scroll", this.onScroll);
  },
};
</script>
