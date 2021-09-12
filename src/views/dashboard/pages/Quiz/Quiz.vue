<template>
  <v-container id="add-quiz" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card title="Quiz Details">
          <v-container class="pa-0" fluid>
            <v-row align="center">
              <v-col cols="1" md="3">
                <h4>Title</h4>
              </v-col>
              <v-col cols="8">
                <h3>{{ data.title }}</h3>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="1" md="3">
                <h4>Description</h4>
              </v-col>
              <v-col cols="8">
                <h3>{{ data.description }}</h3>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="1" md="3">
                <h4>Time Limit (Second)</h4>
              </v-col>
              <v-col cols="8">
                <h3>
                  {{ data.time_limit }}
                </h3>
              </v-col>
            </v-row>
          </v-container>
        </base-material-card>
        <base-material-card title="MCQ">
          <v-container class="pa-0" fluid v-if="data.mcq">
            <v-row align="center" v-for="mcq in data.mcq" :key="mcq.id">
              <v-col cols="1" md="3">
                <h4>Question</h4>
              </v-col>
              <v-col cols="8">
                <h3>{{ data.title }}</h3>
              </v-col>
            </v-row>
          </v-container>
          <v-container class="pa-0" fluid  v-else>
            <h3>
              No Question Attached Yet
              <router-link :to="{name: 'AttachMCQ'}">Attach questions</router-link>
            </h3>
          </v-container>
        </base-material-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ApiService from "@/common/api.service"

  export default {
    name: "Quiz",
    data: () => ({
      loader: false,
      data: {},
    }),
    methods: {
      get() {
        this.loader = true
        ApiService.get(`/quiz/${this.$route.params.id}/mcq`)
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
