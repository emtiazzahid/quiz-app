<template>
  <v-container id="dashboard" fluid tag="section">

    <v-row class="float-right">
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on">
            <v-btn :loading="loading" color="blue-grey" fab @click="getSummary(true)">
              <v-icon dark>mdi-refresh</v-icon>
            </v-btn>
        </span>
        </template>
        <span>Refresh</span>
      </v-tooltip>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="info"
          icon="mdi-note-text-outline"
          title="Total Quiz"
          :value="data.total_quiz"
          sub-icon="mdi-clock"
          sub-text="Since the beginning"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="primary"
          icon="mdi-clipboard-alert-outline"
          title="Total MCQ"
          :value="data.total_mcq"
          sub-icon="mdi-tag"
          sub-text="Since the beginning"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="success"
          icon="mdi-account-group-outline"
          title="Total Attendants"
          :value="data.total_attendant"
          sub-icon="mdi-calendar"
          sub-text="Total exam attend in your quiz"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="orange"
          icon="mdi-account-alert-outline"
          title="Total Running Exams"
          :value="data.total_running_exams"
          sub-icon="mdi-alert"
          sub-text="Total Running exam of your quiz"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ApiService from "@/common/api.service"

  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        loading: false,
        data: {
          total_quiz: '0',
          total_mcq: '0',
          total_attendant: '0',
          total_running_exams: '0',
        }
      }
    },

    methods: {
      getSummary(refresh = false) {
        this.loading = true
        ApiService.setHeader()
        ApiService.get(`/dashboard-summary?refresh=${refresh}`)
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
      setTimeout( () => {
        this.getSummary();
      }, 500);
    }
  }
</script>
