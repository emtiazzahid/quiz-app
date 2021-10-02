<template>
  <v-container fluid tag="section">
    <v-breadcrumbs v-if="breadcrumbs" :items="breadcrumbs" divider="-"></v-breadcrumbs>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              {{ id ? 'Edit' : 'Add' }} MCQ
            </div>

            <div class="subtitle-1 font-weight-light" v-if="!id">
              Add new MCQ
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-textarea class="purple-input" label="Question"
                              v-model="form.question"
                              :error-messages="errors.question"
                  />
                </v-col>
                <v-col cols="12">
                  <p>Minimum two options is required for each question</p>
                </v-col>
                <v-col cols="12">
                  <v-text-field class="purple-input"
                                label="Option 1"
                                v-model="form.option_1"
                                :error-messages="errors.option_1"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field class="purple-input"
                                label="Option 2"
                                v-model="form.option_2"
                                :error-messages="errors.option_2"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field class="purple-input"
                                label="Option 3"
                                v-model="form.option_3"
                                :error-messages="errors.option_3"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field class="purple-input"
                                label="Option 4"
                                v-model="form.option_4"
                                :error-messages="errors.option_4"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field class="purple-input"
                                label="Option 5"
                                v-model="form.option_5"
                                :error-messages="errors.option_5"/>
                </v-col>
                <v-col cols="12">
                  <v-text-field class="purple-input" type="number" min="1" max="5"
                                label="Current Answer Number (Example: 2)"
                                v-model="form.correct_answer_no"
                                :error-messages="errors.correct_answer_no"
                  />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="success" class="mr-0" @click="update" v-if="id">
                    Update
                  </v-btn>
                  <v-btn color="success" class="mr-0" @click="store" v-else>
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import ApiService from "@/common/api.service"

export default {
  name: "ManageMCQ",
  data: () => ({
    loader: false,
    form: {},
    errors:{},
    id: null
  }),
  methods: {
    emptyForm() {
      return {
        question: '',
        option_1: '',
        option_2: '',
        option_3: '',
        option_4: '',
        option_5: '',
        correct_answer_no: '',
      }
    },
    store() {
      this.loader = true
      ApiService.post("/mcq", this.form)
          .then((resp) => {
            this.loading = false;
            this.form = this.emptyForm();
            this.$toastr.s(resp.data.message);
            this.errors = {};
          })
          .catch((err) => {
            if (err.response.status === 422) {
              this.errors = err.response.data.errors;
            }
            this.loading = false;
          });
    },
    edit() {
      this.id = this.$route.params['id'];
      this.loader = true
      ApiService.get(`/mcq/${this.id}`)
          .then((resp) => {
            this.loading = false;
            let data = resp.data;
            this.form = {
              id: data.id,
              question: data.question,
              option_1: data.option_1,
              option_2: data.option_2,
              option_3: data.option_3,
              option_4: data.option_4,
              option_5: data.option_5,
              correct_answer_no: data.correct_answer_no,
            };
            this.errors = {};
          }).catch((err) => {
            this.$toastr.e(err);
            this.loading = false;
          });
    },
    update() {
      this.loader = true
      ApiService.put(`/mcq/${this.id}`, this.form)
          .then((resp) => {
            this.loading = false;
            this.$toastr.s(resp.data.message);
            this.errors = {};
          }).catch((err) => {
        if (err.response.status === 422) {
          this.errors = err.response.data.errors;
        }
        this.loading = false;
      });
    },
  },
  created() {
    this.form = this.emptyForm();
    if (this.$route.params['id']) {
      this.edit();
    }
  },
  computed: {
    breadcrumbs() {
      return [
        {
          text: 'MCQs',
          disabled: false,
          href: '/mcq',
        },
        {
          text: this.id ? 'Edit' : 'Add new',
          disabled: true,
          href: this.id ? `/mcq/:${this.id}/edit`: '/mcq/add',
        }
      ]
    }
  },
}
</script>

