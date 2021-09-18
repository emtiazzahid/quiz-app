<template>
  <v-container id="add-quiz" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card title="Test Result">
          <table-loader v-if="loading"></table-loader>
          <v-container class="pa-0" fluid v-else>
            <br>
            <v-row align="center" v-if="data.quiz">
              <v-col cols="4"><h4>Title</h4></v-col>
              <v-col cols="8"><h3>{{ data.quiz.title }}</h3></v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="4"><h4>Total MCQ</h4></v-col>
              <v-col cols="8"><h3>{{ data.total_mcq }}</h3></v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="4"><h4>Total Answered MCQ</h4></v-col>
              <v-col cols="8"><h3>{{ data.total_answered_mcq }}</h3></v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="4"><h4>Total Correct Answer</h4></v-col>
              <v-col cols="8"><h3>{{ data.total_correct_answer }}</h3></v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="4"><h4>Score</h4></v-col>
              <v-col cols="8">
                <v-progress-linear :value="data.score" height="25">
                  <strong>{{ data.score }}%</strong>
                </v-progress-linear>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="4"><h4>High Score</h4></v-col>
              <v-col cols="8"><h3>
                <v-progress-linear :value="data.high_score ? data.high_score : 0" height="25">
                  <strong>{{ data.high_score ? data.high_score : 0 }}%</strong>
                </v-progress-linear>
              </h3></v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row align="center" >
              <v-col cols="6" style="height: 400px">
                <pie-chart ref="resultChart"
                           :style="chartStyle"
                           :chart-data="chartData"
                           :options="chartData.options">

                </pie-chart>
              </v-col>
            </v-row>
          </v-container>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import PieChart from '@/plugins/PieChart'
  import ApiService from "@/common/api.service"
  import TableLoader from "@/components/base/TableLoader"
  export default {
    components: {
      PieChart,
      TableLoader
    },
    name: "TestResult",
    data: () => ({
      chartStyle: {
        height: '100px',
        width: '100%',
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
