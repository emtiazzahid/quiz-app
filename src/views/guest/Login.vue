<template>
    <h1>Login Page</h1>
  
    <form class="login-form" @submit.prevent="loginUser">
        <div class="mb-3">
             <form-input
                label="Email Address"
                v-model:value="form.email"
                type="email"
                @validate="validate('email')"
                name="email"
                :error="errors.email"
            ></form-input>
        </div>
        <div class="mb-3">
            <form-input
                label="Password"
                v-model:value="form.password"
                type="password"
                @validate="validate('password')"
                name="password"
                :error="errors.password"
            ></form-input>
        </div>
        <button class="btn btn-primary btn-block btn-sm">Login</button>
        <router-link :to="{ name: 'SignUp' }" class="btn btn-primary btn-block btn-sm ms-2">Signup</router-link>
    </form>
</template>

<script>
    import { LOGIN } from "@/store/actions/type";
    import FormInput from "@/components/inputs/FormInput";
    import * as Yup from 'yup';

    const loginFormSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required(),        
    })

    export default {
        name: 'Login-Form',
        components: {
            "form-input": FormInput
        },
        data: () => ({
            form: {
                email: '',
                password: ''
            },
            errors: {
                email: "",
                password: "",
            },
        }),
        watch: {
            "formErrors.errors": function(newQuestion) {
                if (newQuestion.message) {
                    this.errors.name = newQuestion.name ? newQuestion.name[0] : "";
                    this.errors.email = newQuestion.email
                        ? newQuestion.email[0]
                        : "";
                    this.errors.password = newQuestion.password
                        ? newQuestion.password[0]
                        : "";
                    this.errors.passwordConfirmation = newQuestion.passwordConfirmation
                        ? newQuestion.passwordConfirmation[0]
                        : "";
                    this.$toast.error(newQuestion.message[0]);
                    this.loading = false;
                }
            }
        },
        computed: {
            formErrors() {
                return this.$store.getters.formErrors;
            }
        },
        methods: {
            loginUser() {
                this.loading = true
                
                loginFormSchema
                    .validate(this.form, { abortEarly: false })
                    .then(() => {
                        this.loading = true
                        
                        this.$store.dispatch(LOGIN, this.form)
                            .then((resp) => {
                                this.$toast.success(resp.message);

                                // if(!resp.user.configured){
                                //     this.$router.push({ name: 'UserConfig' })
                                // } else {
                                //     this.$router.push({ name: 'Dashboard' })
                                // }
                                this.$router.push({ name: 'Dashboard' })
                                
                            })
                            .catch(err => this.$toast.error(err))
                    })
                    .catch(err => {
                        err.inner.forEach(error => {
                            this.errors = { ...this.errors, [error.path]: error.message };
                        });
                    });
            },
            validate(field) {
                loginFormSchema
                    .validateAt(field, this.form)
                    .then(() => {
                        this.errors[field] = "";
                    })
                    .catch(err => {
                        this.errors[err.path] = err.message;
                    });
            }
        },
    }
</script>

<style scoped>
    .login-form {
        max-width: 400px;
        width: 100%;
    }
</style>