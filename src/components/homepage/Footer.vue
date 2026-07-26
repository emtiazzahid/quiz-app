<template>
  <v-footer class="qa-footer pa-0">
    <div style="width:100%">
      <v-container class="py-12">
        <v-row>
          <v-col cols="12" md="5">
            <div class="d-flex align-center mb-4">
              <div class="qa-logo-badge mr-3">Q</div>
              <span class="text-h6 font-weight-bold text-white">Quiz App</span>
            </div>
            <p class="text-body-2 mb-0" style="color:#94a3b8;max-width:340px">
              Sharpen your knowledge with quizzes across topics. Learn, test, and track your progress — all in one clean place.
            </p>
          </v-col>

          <v-col cols="6" md="3">
            <div class="text-overline mb-2" style="color:#64748b">Product</div>
            <a class="qa-footer-link" @click="$vuetify.goTo('#quizes')">Browse quizzes</a>
            <router-link class="qa-footer-link" :to="{ name: 'Login' }">Login</router-link>
            <router-link class="qa-footer-link" :to="{ name: 'Register' }">Sign up</router-link>
          </v-col>

          <v-col cols="6" md="4">
            <div class="text-overline mb-2" style="color:#64748b">Follow</div>
            <div class="d-flex ga-2">
              <v-btn
                v-for="(icon, i) in icons"
                :key="i"
                :href="icon.link"
                target="_blank"
                icon
                variant="tonal"
                size="small"
                class="qa-footer-social"
              >
                <v-icon :icon="icon.text" size="20" />
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <v-divider class="my-6" style="border-color:rgba(255,255,255,.1)" />

        <div class="d-flex flex-wrap align-center justify-space-between" style="gap:8px">
          <span class="text-body-2" style="color:#94a3b8">© {{ new Date().getFullYear() }} Quiz App. All rights reserved.</span>
          <span class="text-body-2" style="color:#94a3b8">Made with <span style="color:#f43f5e">♥</span> for learners</span>
        </div>
      </v-container>
    </div>
  </v-footer>
</template>

<style scoped>
.qa-footer {
  background: #0f172a !important;
  color: #e2e8f0;
}
.qa-footer-link {
  display: block;
  color: #cbd5e1;
  text-decoration: none;
  font-size: .9rem;
  padding: 4px 0;
  cursor: pointer;
  transition: color .2s ease;
}
.qa-footer-link:hover { color: #fff; }
.qa-footer-social {
  color: #fff !important;
  background: rgba(255, 255, 255, .08) !important;
}
.qa-footer-social:hover { background: rgba(99, 102, 241, .35) !important; }
</style>

<script>
export default {
  data: () => ({
    icons: [
      { text: "mdi-facebook", link: "https://facebook.com/emtiazzahid/" },
      { text: "mdi-twitter", link: "https://twitter.com/emtiazzahid/" },
      { text: "mdi-linkedin", link: "https://linkedin.com/in/emtiazzahid/" },
      { text: "mdi-instagram", link: "https://instagram.com/emtiazzahid/" },
    ],
  }),
};
</script>
