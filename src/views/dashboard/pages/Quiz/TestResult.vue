<template>
  <v-container fluid class="pa-6">
    <div class="mb-6">
      <h1 class="qa-display" style="font-size:1.6rem">Test Result</h1>
      <p class="qa-muted mb-0">Your performance summary for this attempt.</p>
    </div>

    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card rounded="xl" class="pa-6">
          <table-loader v-if="loading"></table-loader>
          <template v-else>
            <v-row align="center" v-if="data.quiz">
              <v-col cols="4"><span class="qa-muted">Title</span></v-col>
              <v-col cols="8"><h3 class="font-weight-medium">{{ data.quiz.title }}</h3></v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="4"><span class="qa-muted">Total MCQ</span></v-col>
              <v-col cols="8"><h3 class="font-weight-medium">{{ data.total_mcq }}</h3></v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="4"><span class="qa-muted">Total Answered MCQ</span></v-col>
              <v-col cols="8"><h3 class="font-weight-medium">{{ data.total_answered_mcq }}</h3></v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="4"><span class="qa-muted">Total Correct Answer</span></v-col>
              <v-col cols="8"><h3 class="font-weight-medium">{{ data.total_correct_answer }}</h3></v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="4"><span class="qa-muted">Score</span></v-col>
              <v-col cols="8">
                <v-progress-linear color="primary" rounded :value="(Math.round(data.score * 100) / 100).toFixed(2)" height="25">
                  <strong>{{ (Math.round(data.score * 100) / 100).toFixed(2) }}%</strong>
                </v-progress-linear>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="4"><span class="qa-muted">High Score</span></v-col>
              <v-col cols="8">
                <v-progress-linear color="success" rounded :value="data.high_score ? (Math.round(data.high_score * 100) / 100).toFixed(2) : 0" height="25">
                  <strong>{{ data.high_score ? (Math.round(data.high_score * 100) / 100).toFixed(2) : 0 }}%</strong>
                </v-progress-linear>
              </v-col>
            </v-row>

            <v-divider class="my-6"></v-divider>

            <v-row align="center" justify="center">
              <v-col cols="12" md="6">
                <pie-chart ref="resultChart"
                           :style="chartStyle"
                           :chart-data="chartData"
                           :options="chartData.options">

                </pie-chart>
              </v-col>
            </v-row>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import PieChart from '@/plugins/PieChart'
  import ApiService from "@/common/api.service"
  import TableLoader from "@/components/base/TableLoader.vue"
  export default {
    components: {
      PieChart,
      TableLoader
    },
    name: "TestResult",
    data: () => ({
      chartStyle: {
        position: 'relative',
      },
      chartData: {
        labels: ['Total MCQ', 'Correct Answer', 'Wrong Answer'],
        datasets: [
          {
            backgroundColor: ['#00d6fc', '#45f348', '#f3454f'],
            data: []
          }
        ],
        options: {
          height: 100,
          responsive: true,
          maintainAspectRatio: false
        }
      },
      loading: false,
      data: {},
    }),
    methods: {
      get() {
        this.loading = true
        ApiService.get(`/pub/attempts/${this.$route.params.id}`)
        .then((resp) => {
          this.loading = false;
          this.data = resp.data;
          this.chartData.datasets[0].data = [
            resp.data.total_mcq,
            resp.data.total_correct_answer,
            (resp.data.total_mcq - resp.data.total_correct_answer)
          ];
          this.$refs['resultChart'].renderChart(this.chartData);
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
