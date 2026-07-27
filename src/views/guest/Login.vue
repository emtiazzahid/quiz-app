<template>
  <v-app>
    <v-main class="qa-auth">
      <div class="qa-auth__wrap">
        <v-card class="qa-auth__card" rounded="xl">
          <v-row no-gutters>
            <v-col cols="12" md="5" class="qa-auth__brand d-none d-md-flex">
              <div style="position:relative;z-index:1">
                <router-link :to="{ name: 'Homepage' }" class="d-flex align-center mb-10 text-decoration-none">
                  <div class="qa-logo-badge mr-3" style="background:rgba(255,255,255,.2);box-shadow:none">Q</div>
                  <span class="text-h6 font-weight-bold text-white">Quiz App</span>
                </router-link>
                <h2 class="qa-display text-white mb-3" style="font-size:2rem;line-height:1.15">Welcome back 👋</h2>
                <p class="mb-8" style="color:rgba(255,255,255,.85)">Sign in to keep testing your skills and tracking your progress.</p>
                <div class="qa-auth__feat"><v-icon icon="mdi-check-circle-outline" /> Hundreds of quizzes across topics</div>
                <div class="qa-auth__feat"><v-icon icon="mdi-check-circle-outline" /> Track attempts and results</div>
                <div class="qa-auth__feat"><v-icon icon="mdi-check-circle-outline" /> Create and share your own</div>
              </div>
            </v-col>

            <v-col cols="12" md="7">
              <div class="pa-8 pa-md-12">
                <h3 class="qa-display mb-1" style="font-size:1.6rem">Sign in</h3>
                <p class="qa-muted mb-8">Enter your credentials to access your account.</p>

                <v-form ref="loginForm" v-model="valid">
                  <label class="qa-label">Email</label>
                  <v-text-field
                    v-model="loginEmail"
                    variant="outlined"
                    prepend-inner-icon="mdi-email-outline"
                    placeholder="you@example.com"
                    :rules="loginEmailRules"
                    class="mb-4"
                    @keypress.enter="validate"
                  />

                  <label class="qa-label">Password</label>
                  <v-text-field
                    v-model="loginPassword"
                    variant="outlined"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    placeholder="••••••••"
                    @click:append-inner="show1 = !show1"
                    @keypress.enter="validate"
                  />

                  <div class="d-flex align-center justify-space-between mt-1 mb-6">
                    <v-checkbox label="Keep me signed in" density="compact" color="primary" hide-details />
                  </div>

                  <v-btn block size="large" rounded="lg" class="qa-btn-gradient" :loading="loader" @click="validate">
                    Sign in <v-icon end icon="mdi-arrow-right" />
                  </v-btn>
                </v-form>

                <p class="text-center qa-muted mt-8 mb-0">
                  Don't have an account?
                  <router-link :to="{ name: 'Register' }" class="qa-link">Sign up</router-link>
                </p>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { LOGIN } from "@/store/actions/type";

export default {
  name: "Login",
  data: () => ({
    valid: true,
    loader: false,
    loginPassword: "password",
    loginEmail: "user_1@mail.com",
    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 6) || "Min 6 characters",
    },
  }),
  methods: {
    async validate() {
      this.loader = true;
      const { valid } = await this.$refs.loginForm.validate();
      if (valid) {
        this.$store.dispatch(LOGIN, {
          email: this.loginEmail, password: this.loginPassword
        }).then(() => {
          if (this.$route.query['redirect']) {
            window.location.href = window.location.origin + this.$route.query['redirect'];
          } else {
            this.$router.push({ name: 'Dashboard' });
          }
        }).catch(() => {
          this.$toastr.e('Wrong email or password!');
          this.loader = false;
        });
      } else {
        this.loader = false;
      }
    },
  }
};
</script>
