<template>
    <h1>Dashboard Page</h1>
    <button @click="logout" class="btn btn-outline-danger">
        click here to logout.
    </button>

    
</template>

<script>
    import { LOGOUT } from "@/store/actions/type";
    export default {
        name: 'dashboard',
        methods: {
            logout() {
                this.$store.dispatch(LOGOUT).then(() => {
                    this.$router.push('/');
                });
            }
        },
        created(){
            // this.$store.dispatch(CHECK_AUTH).then((resp) => {
            //     console.log(resp, 'resp')
            // });
        }
    }
</script>

<style>

</style>