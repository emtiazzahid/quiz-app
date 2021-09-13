<template>
  <v-container id="add-quiz" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card title="MCQ">
          <v-container v-if="form.mcqs && form.mcqs.length > 0">
            <v-row align="center" v-for="mcq in form.mcqs" :key="mcq.id">
              <v-card width="100%" :name="mcq.id">
              <v-col cols="12" md="12">
                <h3>{{ mcq.question }}</h3>
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
            <v-col cols="12">
              <v-btn depressed class="text-right" color="primary">
                Save
              </v-btn>
            </v-col>
          </v-container>
          <v-container class="pa-0" fluid  v-else>
            <h3>
              No MCQ Found
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
    name: "RunningQuiz",
    data: () => ({
      loader: false,
      data: {},
      form: {
        mcqs: []
      },
    }),
    methods: {
      get() {
        this.loader = true
        ApiService.get(`/quiz/${this.$route.params.id}/mcq`)
        .then((resp) => {
          this.loading = false;
          this.data = resp.data;
          this.form.mcqs = resp.data.mcqs;
          // this.prepareForm();
        })
        .catch((err) => {
          this.$toastr.e(err);
          this.loading = false;
        });
      },
      prepareForm() {
        this.data.mcqs.forEach(mcq => {
          this.form.current_answer.push({
            mcq_id: mcq.id,
            answer: null
          })
        });
      }
    },
    created() {
      this.get();
    }
  }
</script>
