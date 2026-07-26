<template>
  <v-container fluid class="pa-6">
    <table-loader v-if="loading"></table-loader>
    <template v-else>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <div class="mb-6">
            <h1 class="qa-display" style="font-size:1.6rem">Quiz in progress</h1>
            <p class="qa-muted mb-0">Answer each question, then submit when you're done.</p>
          </div>

          <template v-if="form.mcqs && form.mcqs.length > 0">
            <form action="">
              <v-card
                  v-for="(mcq, index) in form.mcqs"
                  :key="mcq.id"
                  :name="mcq.id"
                  rounded="xl"
                  class="pa-6 mb-4 qa-elevate"
                  width="100%"
              >
                <div class="d-flex align-start mb-4" style="gap:10px">
                  <span class="qa-chip">Q{{ index+1 }}</span>
                  <h3 class="font-weight-medium" style="font-size:1.1rem">{{ mcq.question }}</h3>
                </div>
                <div>
                  <v-radio-group v-model="mcq.given_answer" hide-details>
                    <v-radio
                        v-for="n in 5"
                        :key="mcq.id+n"
                        :label="mcq['option_' + n]"
                        color="primary"
                        :value="n"
                        class="mb-1"
                    ></v-radio>
                  </v-radio-group>
                </div>
              </v-card>
            </form>
          </template>

          <v-card rounded="xl" class="pa-6" v-else>
            <div class="text-center py-16">
              <v-avatar size="80" color="surface-variant" class="mb-4"><v-icon size="40" icon="mdi-help-box-outline" class="qa-muted"/></v-avatar>
              <h3 class="qa-display mb-1">No MCQ found</h3>
              <p class="qa-muted">This quiz has no questions to attempt.</p>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-speed-dial style="position: fixed; top: 300px; right: 100px;" open-on-hover>
        <template v-slot:activator>
          <v-btn class="qa-btn-gradient px-6" rounded="lg" size="large">
            Submit
          </v-btn>
        </template>
        <v-btn color="success" variant="flat" rounded="lg" @click="complete">
          Confirm
        </v-btn>
      </v-speed-dial>
      <v-chip class="ma-2 qa-elevate" color="primary" size="large" label style="position: fixed; top: 100px; z-index: 100">
        <v-icon start icon="mdi-clock-outline"></v-icon>
        <span class="text-h6 font-weight-bold">{{ moment.utc(moment.duration(timerCount,'seconds').as('milliseconds')).format('HH:mm:ss') }}</span>
      </v-chip>
    </template>
  </v-container>
</template>

<script>
  import ApiService from "@/common/api.service"
  import TableLoader from "@/components/base/TableLoader.vue"
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
