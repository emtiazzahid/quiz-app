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
                <h2 class="qa-display text-white mb-3" style="font-size:2rem;line-height:1.15">Join Quiz App 🚀</h2>
                <p class="mb-8" style="color:rgba(255,255,255,.85)">Create a free account to start taking quizzes and building your own.</p>
                <div class="qa-auth__feat"><v-icon icon="mdi-check-circle-outline" /> Free forever, no card required</div>
                <div class="qa-auth__feat"><v-icon icon="mdi-check-circle-outline" /> Save your quiz history</div>
                <div class="qa-auth__feat"><v-icon icon="mdi-check-circle-outline" /> Create MCQs and quizzes</div>
              </div>
            </v-col>

            <v-col cols="12" md="7">
              <div class="pa-8 pa-md-12">
                <h3 class="qa-display mb-1" style="font-size:1.6rem">Create account</h3>
                <p class="qa-muted mb-8">Enter your details to get started.</p>

                <v-form ref="form" v-model="valid">
                  <label class="qa-label">Name</label>
                  <v-text-field
                    v-model="form.name"
                    variant="outlined"
                    prepend-inner-icon="mdi-account-outline"
                    placeholder="Jane Doe"
                    :error-messages="errors.name"
                    class="mb-4"
                  />

                  <label class="qa-label">Email</label>
                  <v-text-field
                    v-model="form.email"
                    type="email"
                    variant="outlined"
                    prepend-inner-icon="mdi-email-outline"
                    placeholder="you@example.com"
                    :rules="emailRules"
                    :error-messages="errors.email"
                    class="mb-4"
                  />

                  <v-row>
                    <v-col cols="12">
                      <label class="qa-label">Password</label>
                      <v-text-field
                        v-model="form.password"
                        variant="outlined"
                        prepend-inner-icon="mdi-lock-outline"
                        :append-inner-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        placeholder="••••••••"
                        :error-messages="errors.password"
                        @click:append-inner="show1 = !show1"
                      />
                    </v-col>
                    <v-col cols="12">
                      <label class="qa-label">Confirm</label>
                      <v-text-field
                        v-model="form.password_confirmation"
                        variant="outlined"
                        prepend-inner-icon="mdi-lock-check-outline"
                        :append-inner-icon="show2 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                        :rules="[rules.required, rules.min]"
                        :type="show2 ? 'text' : 'password'"
                        placeholder="••••••••"
                        :error-messages="errors.password_confirmation"
                        @click:append-inner="show2 = !show2"
                      />
                    </v-col>
                  </v-row>

                  <v-btn block size="large" rounded="lg" class="qa-btn-gradient mt-6" :loading="loader" @click="validate">
                    Create account <v-icon end icon="mdi-arrow-right" />
                  </v-btn>
                </v-form>

                <p class="text-center qa-muted mt-8 mb-0">
                  Already have an account?
                  <router-link :to="{ name: 'Login' }" class="qa-link">Sign in</router-link>
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
import { REGISTER } from "@/store/actions/type";

export default {
  name: "Register",
  data: () => ({
    valid: true,
    loader: false,
    form: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    show1: false,
    show2: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 6) || "Min 6 characters",
    },
    errors: {}
  }),
  methods: {
    async validate() {
      this.loader = true;
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.$store.dispatch(REGISTER, this.form)
          .then((resp) => {
            this.$toastr.s(resp);
            this.$router.push(`/login`);
          })
          .catch(err => {
            this.$toastr.e(err);
            this.loader = false;
          });
      } else {
        this.loader = false;
      }
    },
  }
};
</script>
