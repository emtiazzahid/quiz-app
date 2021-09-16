<template>
  <v-app>
    <v-main class="login-background">
      <div class="d-flex align-center flex-column justify-center px-1 login-background-2">
        <v-card width="500px">
          <div class="card-header">
            <div class="d-flex align-center flex-column">
              <v-subheader class="display-1 mt-3">
                <v-icon large color="#2BA5B6">mdi-lock-open-outline</v-icon>Register
              </v-subheader>
              <v-card-title>Please enter your info to register new account.</v-card-title>
            </div>
          </div>
          <v-divider></v-divider>
          <v-card-text>
            <div class="logo-wrapper d-flex flex-column align-center pb-3">
              <v-subheader class="headline font-weight-bold">Quiz App</v-subheader>
            </div>
            <v-divider></v-divider>
            <v-form ref="form" v-model="valid" lazy-validation >
              <v-row no-gutters class="px-3">
                <v-col cols="12">
                  <v-subheader class="subtitle-2 px-0">Name</v-subheader>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      dense
                      outlined
                      hide-details
                      v-model="form.name"
                      required
                      :error-messages="errors.name"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-subheader class="subtitle-2 px-0">Email</v-subheader>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      type="email"
                      dense
                      outlined
                      prepend-inner-icon="mdi-email-outline"
                      hide-details
                      v-model="form.email"
                      :rules="emailRules"
                      required
                      :error-messages="errors.email"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-subheader class="subtitle-2 px-0">Password</v-subheader>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      dense outlinedprepend-inner-icon="mdi-key-variant" hide-details
                      v-model="form.password"
                      :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'" name="input-10-1"
                      hint="At least 6 characters"
                      counter @click:append="show1 = !show1"
                      :error-messages="errors.password"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-subheader class="subtitle-2 px-0">Password Confirmation</v-subheader>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      dense outlinedprepend-inner-icon="mdi-key-variant" hide-details
                      v-model="form.password_confirmation"
                      :append-icon="show2 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                      :rules="[rules.required, rules.min]"
                      :type="show2 ? 'text' : 'password'" name="input-10-1"
                      hint="At least 6 characters"
                      counter @click:append="show2 = !show2"
                      :error-messages="errors.password_confirmation"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-end px-7 pb-5">
            <v-btn
                color="primary"
                class="px-5"
                :disabled="!valid"
                :loading="loader"
                @click="validate"
            >Register</v-btn>
          </v-card-actions>
        </v-card>
        <div class="bottom-text d-flex align-center flex-column mt-5">
          <p class="mb-0">Already have an account? <span class="color-secondary font-weight-bold">
            <router-link :to="{name: 'Login'}">Sign In</router-link>
          </span></p>
        </div>
        <h4>Copyright &copy; <span class="color-secondary">Quiz App</span></h4>

      </div>

    </v-main>
  </v-app>
</template>

<script>
import {REGISTER} from "../../store/actions/type";

export default {
  components: {  },
  name: "Login",
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
    validate() {
      this.loader = true
      if (this.$refs.form.validate()) {
        this.loading = true

        this.$store.dispatch(REGISTER, this.form)
            .then((resp) => {
              this.$toastr.s(resp)
              this.$router.push(`/login`)
            })
            .catch(err => this.$toastr.e(err))
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
