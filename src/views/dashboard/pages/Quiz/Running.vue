<template>
  <v-container id="add-quiz" fluid tag="section">
    <table-loader v-if="loading"></table-loader>
    <template v-else>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <base-material-card title="MCQ">
            <v-container v-if="form.mcqs && form.mcqs.length > 0">
              <form action="">
              <v-row align="center" v-for="(mcq, index) in form.mcqs" :key="mcq.id">
                <v-card width="100%" :name="mcq.id">
                  <v-col cols="12" md="12">
                    <h3>Question No #{{index+1}}: {{ mcq.question }}</h3>
                  </v-col>
                  <v-col cols="12">
                    <div v-for="n in 5" :key="mcq.id+n">
                      <v-radio-group v-model="mcq.given_answer">
                        <v-radio :label="mcq['option_' + n]" color="primary" :value="n"></v-radio>
                      </v-radio-group>
                    </div>
                  </v-col>
                </v-card>
              </v-row>
              </form>
            </v-container>

            <v-container class="pa-0" fluid  v-else>
              <h3>
                No MCQ Found
              </h3>
            </v-container>
          </base-material-card>
        </v-col>
      </v-row>
      <v-speed-dial style="position: fixed; top: 300px; right: 100px;" open-on-hover>
        <template v-slot:activator>
          <v-btn color="blue darken-2" large dark>
            Submit
          </v-btn>
        </template>
        <v-btn dark color="green" @click="complete">
          Confirm
        </v-btn>
      </v-speed-dial>
      <v-chip class="ma-2 large" color="secondary" style="position: fixed; top: 100px; z-index: 100">
        <h1>{{ moment.utc(moment.duration(timerCount,'seconds').as('milliseconds')).format('HH:mm:ss') }}
        </h1>
        <v-icon right>
          mdi-clock
        </v-icon>
      </v-chip>
    </template>
  </v-container>
</template>

<script>
  import ApiService from "@/common/api.service"
  import TableLoader from "@/components/base/TableLoader"
  export default {
    name: "RunningQuiz",
    components: {
      TableLoader
    },
    data: () => ({
      timerCount: 0,
      loading: false,
      remaining_time: 0,
      attempt_id: '',
      data: {},
      form: {
        mcqs: []
      },
    }),
    methods: {
      get() {
        this.loading = true
        ApiService.setHeader()
        ApiService.get(`/pub/quiz/${this.$route.params.id}/mcq`)
        .then((resp) => {
          this.loading = false;
          this.form.mcqs = resp.data.data.mcqs;
          this.start();
        })
        .catch((err) => {
          this.$toastr.e(err);
          this.loading = false;
        });
      },
      complete() {
        ApiService.post(`/pub/attempts/${this.attempt_id}/complete`, this.form)
            .then(async () => {
              this.loading = false;
              await this.gotoResultSection();
            })
            .catch((err) => {
              this.$toastr.e(err);
              this.loading = false;
            });
      },
      gotoResultSection() {
        this.$router.push({path: `/attempts/${this.attempt_id}`});
      },
      start() {
        ApiService.post(`/pub/quiz/${this.$route.params.id}/start`, {
          attempt_id: this.attempt_id
        })
            .then((resp) => {
              this.loading = false;
              this.attempt_id = resp.data.attempt_id;
              if (resp.data.remaining_time == null) {
                this.gotoResultSection();
              } else {
                this.timerCount = resp.data.remaining_time;
              }
            })
            .catch((err) => {
              this.$toastr.e(err);
              this.loading = false;
            });
      },
    },
    watch: {
      timerCount: {
        handler(value) {
          if (value > 0) {
            setTimeout(() => {
              this.timerCount--;
            }, 1000);
          }
        },
        immediate: true
      }
    },
    created() {
      this.get();
    }
  }
</script>
