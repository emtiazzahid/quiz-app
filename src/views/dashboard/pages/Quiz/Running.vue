<template>
  <v-container id="add-quiz" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card title="MCQ">
          <v-container v-if="form.mcqs && form.mcqs.length > 0">
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
<!--        <v-btn dark small color="indigo">--> //TODO::AUTSAVE NOTICE
<!--          Note: Answer's are get autosaved-->
<!--        </v-btn>-->
      </v-speed-dial>
      <v-chip class="ma-2 large" color="secondary" style="position: fixed; top: 100px;">
         <h1>{{ moment.utc(moment.duration(timerCount,'seconds').as('milliseconds')).format('HH:mm:ss') }}
         </h1>
        <v-icon right>
          mdi-clock
        </v-icon>
      </v-chip>
  </v-container>
</template>

<script>
  import ApiService from "@/common/api.service"

  export default {
    name: "RunningQuiz",
    data: () => ({
      timerCount: 0,
      loader: false,
      form: {
        mcqs: []
      },
    }),
    methods: {
      get() {
        this.loader = true
        ApiService.get(`/pub/quiz/${this.$route.params.id}/mcq`)
        .then((resp) => {
          this.loading = false;
          this.timerCount = resp.data.data.time_limit;
          this.form.mcqs = resp.data.data.mcqs;
        })
        .catch((err) => {
          this.$toastr.e(err);
          this.loading = false;
        });
      },
      // autoSave() { //TODO:: AUTOSAVE FEATURE
      //   ApiService.post(`/pub/quiz/${this.$route.params.id}/save`)
      //   .then((resp) => {
      //     this.loading = false;
      //   })
      //   .catch((err) => {
      //     this.$toastr.e(err);
      //     this.loading = false;
      //   });
      // },
      complete() {
        ApiService.post(`/pub/quiz/${this.$route.params.id}/complete`, this.form)
            .then((resp) => {
              this.loading = false;
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
