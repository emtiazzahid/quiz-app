<template>
  <v-app>
    <v-main class="login-background">
      <div class="d-flex align-center flex-column justify-center px-1 login-background-2">
        <v-card width="500px">
          <div class="card-header">
            <div class="d-flex align-center flex-column">
              <v-subheader class="display-1 mt-3">
                <v-icon large color="#2BA5B6">mdi-lock-open-outline</v-icon>Login
              </v-subheader>
              <v-card-title>Please enter your credentials to login.</v-card-title>
            </div>
          </div>
          <v-divider></v-divider>
          <v-card-text>
            <div class="logo-wrapper d-flex flex-column align-center pb-3">
              <v-subheader class="headline font-weight-bold">Quiz App</v-subheader>
            </div>
            <v-divider></v-divider>
            <v-form ref="loginForm" v-model="valid" lazy-validation >
              <v-row no-gutters class="px-3">
                <v-col cols="12">
                  <v-subheader class="subtitle-2 px-0">Email</v-subheader>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      dense
                      outlined
                      prepend-inner-icon="mdi-email-outline"
                      hide-details
                      v-model="loginEmail"
                      :rules="loginEmailRules"
                      @keypress.enter="validate"
                      required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-subheader class="subtitle-2 px-0">Password</v-subheader>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      dense
                      outlined
                      prepend-inner-icon="mdi-key-variant"
                      hide-details
                      v-model="loginPassword"
                      :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      hint="At least 6 characters"
                      counter
                      @click:append="show1 = !show1"
                      @keypress.enter="validate"
                  >
                  </v-text-field>
                </v-col>
                <v-col class="12">
                  <v-checkbox
                      label="Keep me signed in"
                      hide-details
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-end px-7 pb-5">
            <v-btn
                color="primary"
                class="px-5"
                :to="{name: 'Homepage'}"
            >Home</v-btn>
            <v-btn
                color="primary"
                class="px-5"
                :disabled="!valid"
                :loading="loader"
                @click="validate"
            >Login</v-btn>
            <!-- <input type="text"  v-on:keyup.enter="onEnter()"> -->
          </v-card-actions>
        </v-card>
        <div class="bottom-text d-flex align-center flex-column mt-5">
          <p class="mb-0">Don't have an account? <span class="color-secondary font-weight-bold">
            <router-link :to="{name: 'Register'}">Sign Up</router-link>
          </span></p>
        </div>
        <h4>Copyright &copy; <span class="color-secondary">Quiz App</span></h4>

      </div>

    </v-main>
  </v-app>
</template>

<script>
import { LOGIN } from "@/store/actions/type";

export default {
  components: {  },
  name: "Login",
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" }
    ],
    valid: true,
    loader: false,
    loginPassword: "password",
    loginEmail: "user_1@mail.com",
    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    emailRules: [
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
    validate() {
      this.loader = true
      if (this.$refs.loginForm.validate()) {
        this.loading = true

        this.$store.dispatch(LOGIN, {
          email: this.loginEmail, password: this.loginPassword
        }).then((resp) => {
              if (this.$route.query['redirect']) {
                window.location.href = window.location.origin + this.$route.query['redirect'];
              } else {
                this.$router.push({ name: 'Dashboard' })
              }

        }).catch((err) =>{
          this.$toastr.e('Wrong email or password!');
          this.loader = false
        })
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  }
};
</script>

<style scoped>
.login-background {
  height: 90%;
  width: 100vw;
  background-color: #f9f9f9;
  background-repeat: repeat;
}
.login-background-2 {
  height: 100%;
  width: 100vw;
}
.color-secondary {
  color: #2BA5B6
}
</style>
