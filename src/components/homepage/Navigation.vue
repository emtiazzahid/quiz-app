<template>
  <div>
    <v-navigation-drawer v-model="drawer"
      temporary dark
      src="@/assets/img/bgDrawer.webp"
    >
      <v-list>
        <v-list-item>
          <v-list-item-title class="text-h6">Quiz</v-list-item-title>
          <v-list-item-subtitle>App</v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list density="compact">
        <v-list-item
          v-for="([icon, text, link], i) in items"
          :key="i"
          link
          @click="$vuetify.goTo(link)"
        >
          <template #prepend>
            <v-icon>{{ icon }}</v-icon>
          </template>
          <v-list-item-title class="subtitile-1">{{
            text
          }}</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name: 'Login'}">
          <template #prepend>
            <v-icon>mdi-email-outline</v-icon>
          </template>
          <v-list-item-title class="subtitile-1">Login</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :color="color"
      :flat="flat"
      dark
      class="px-15"
      :class="{ expand: flat }"
    >
      <v-spacer />
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-4"
        v-if="isXs"
      />
      <div v-else>
        <v-btn variant="text" :to="{name: 'Homepage'}">
          <span class="mr-2">Home</span>
        </v-btn>
        <v-btn variant="text" @click="$vuetify.goTo('#quizes')">
          <span class="mr-2">Quiz's</span>
        </v-btn>
        <template v-if="authenticated">
          <v-btn rounded variant="outlined" :to="{name: 'Dashboard'}">
            <span class="mr-2">Dashboard</span>
          </v-btn>
          <v-btn rounded variant="outlined" @click="logout">
            <span class="mr-2">Logout</span>
          </v-btn>
        </template>
        <v-btn rounded variant="outlined" :to="{name: 'Login'}" v-else>
          <span class="mr-2">Login</span>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<style scoped>
.v-toolbar {
  transition: 0.6s;
}

.expand {
  height: 80px !important;
  padding-top: 10px;
}
</style>

<script>
import { LOGOUT } from "@/store/actions/type";
export default {
  data: () => ({
    authenticated: false,
    drawer: null,
    isXs: false,
    items: [
      ["mdi-home-outline", "Home", "#hero"],
      ["mdi-information-outline", "Quiz's", "#quizes"]
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
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.authenticated = false;
        this.$router.push('/');
      });
    }
  },

  watch: {
    isXs(value) {
      if (!value) {
        if (this.drawer) {
          this.drawer = false;
        }
      }
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
    this.authenticated = this.$store.state.auth.isAuthenticated;
  },
};
</script>
