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
                <h4>Time Limit (Hour:minute:second)</h4>
              </v-col>
              <v-col cols="8">
                <h3>
                  {{ moment.utc(moment.duration(data.time_limit,'seconds').as('milliseconds')).format('HH:mm:ss') }}
                </h3>
              </v-col>
            </v-row>
          </v-container>
        </base-material-card>
        <base-material-card title="MCQ">
          <v-container class="pa-0" fluid v-if="data.mcqs && data.mcqs.length > 0">
            <v-row align="center" v-for="mcq in data.mcqs" :key="mcq.id">
              <v-col cols="1" md="3">
                <h4>#{{ mcq.id }}</h4>
              </v-col>
              <v-col cols="8">
                <h3>{{ mcq.question }}</h3>
              </v-col>
            </v-row>
          </v-container>
          <v-container class="pa-0" fluid  v-else>
            <h3>
              No MCQ Attached Yet
              <router-link :to="{name: 'AttachMCQ'}">Attach MCQ</router-link>
            </h3>
          </v-container>
        </base-material-card>
      </v-col>
      <v-col cols="1" md="1">
        <v-btn depressed color="primary" :to="{name: 'AttachMCQ'}">
          Update MCQ List
        </v-btn>
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
