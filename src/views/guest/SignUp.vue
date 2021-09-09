<template>
    <div class="row">
        <div class="col-12">
            <h1>Signup Form</h1>
            
            <form class="login-form" @submit.prevent="registerUser">
                <div class="mb-2">
                    <form-input
                        label="Full Name"
                        v-model:value="form.name"
                        type="text"
                        @validate="validate('name')"
                        name="name"
                        :error="errors.name"
                    ></form-input>
                </div>
                <div class="mb-2">
                    <form-input
                        label="Email Address"
                        v-model:value="form.email"
                        type="email"
                        @validate="validate('email')"
                        name="email"
                        :error="errors.email"
                    ></form-input>
                </div>
                <div class="mb-2">
                    <form-input
                        label="Password"
                        v-model:value="form.password"
                        type="password"
                        @validate="validate('password')"
                        name="password"
                        :error="errors.password"
                    ></form-input>
                </div>
                <div class="mb-2">
                    <form-input
                        label="Confirm Password"
                        v-model:value="form.passwordConfirmation"
                        type="password"
                        @validate="validate('passwordConfirmation')"
                        name="passwordConfirmation"
                        :error="errors.passwordConfirmation"
                    ></form-input>
                </div>
                <button class="btn btn-primary btn-block btn-sm">SignUp</button>
                <router-link :to="{ name: 'Login' }" class="btn btn-primary btn-block btn-sm ms-2">Login</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import { REGISTER } from "@/store/actions/type";
import FormInput from "@/components/inputs/FormInput";
import * as Yup from 'yup';

const signUpFormSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
    passwordConfirmation: Yup.string().min(8, 'confirm password must be at least 8 characters').required('confirm password is a required field').oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export default {
    name: 'Signup-Form',
    components: {
        "form-input": FormInput
    },
    data: () => ({
        form: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        },
        errors: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: ""
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
        registerUser() {
            this.loading = true
               
            signUpFormSchema
                .validate(this.form, { abortEarly: false })
                .then(() => {
                    this.loading = true

                    this.$store
                        .dispatch(REGISTER, this.form)
                        .then((resp) => {
                            this.$toast.success(resp)
                            this.$router.push(`/`)
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
            signUpFormSchema
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