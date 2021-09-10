<template>
  <div>
    <h1>User Form</h1>

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
            <form-select
                :options="['go', 'python', 'rust', 'javascript']"
                :default="'go'"
                class="select"
                @input="alert(displayToKey($event))"
            >
            </form-select>
        </div>

        <button class="btn btn-primary btn-block btn-sm">Submit</button>
    </form>
  </div>
</template>

<script>
import { REGISTER } from "@/store/actions/type";
import FormInput from "@/components/inputs/FormInput";
import FormSelect from "@/components/inputs/FormSelect";
import * as Yup from 'yup';

const signUpFormSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
})

export default {
    name: 'user-form',
    components: {
        "form-input": FormInput,
        "form-select": FormSelect
    },
    data: () => ({
        form: {
            name: "",
            email: "",
            password: "",
        },
        errors: {
            name: "",
            email: "",
            password: "",
        }
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

<style>

</style>
