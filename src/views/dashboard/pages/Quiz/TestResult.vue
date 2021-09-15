<template>
  <v-container id="add-quiz" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card title="Test Result">
          <v-container class="pa-0" fluid>
            <v-row align="center">
              <v-col cols="1" md="3">
                <h4>Title</h4>
              </v-col>
              <v-col cols="8">
                <h3>{{ data.quiz.title }}</h3>
              </v-col>
            </v-row>
          </v-container>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ApiService from "@/common/api.service"

  export default {
    name: "TestResult",
    data: () => ({
      loader: false,
      data: {},
    }),
    methods: {
      get() {
        this.loader = true
        ApiService.get(`/pub/attempts/${this.$route.params.id}`)
        .then((resp) => {
          this.loading = false;
          this.data = resp.data;
        })
        .catch((err) => {
          this.$toastr.e(err);
          this.loading = false;
        });
      }
    },
    created() {
      this.get();
    }
  }
</script>
