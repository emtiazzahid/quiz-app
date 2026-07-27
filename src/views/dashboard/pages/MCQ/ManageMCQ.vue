<template>
  <v-container fluid class="pa-6">
    <v-breadcrumbs v-if="breadcrumbs" :items="breadcrumbs" divider="-" class="px-0 pb-4 qa-muted"></v-breadcrumbs>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div class="mb-6">
          <h1 class="qa-display" style="font-size:1.6rem">{{ id ? 'Edit' : 'Add' }} MCQ</h1>
          <p class="qa-muted mb-0">{{ id ? 'Update this question and its options.' : 'Create a new multiple-choice question.' }}</p>
        </div>

        <v-card rounded="xl" class="pa-6">
          <v-form>
            <label class="qa-label">Question</label>
            <v-textarea
                v-model="form.question"
                :error-messages="errors.question"
                placeholder="Type your question here"
                hide-details="auto"
                class="mb-6"
            />

            <div class="qa-chip mb-4"><v-icon size="14" icon="mdi-information-outline"/> Minimum two options is required for each question</div>

            <label class="qa-label">Option 1</label>
            <v-text-field
                v-model="form.option_1"
                :error-messages="errors.option_1"
                hide-details="auto"
                class="mb-4"
            />
            <label class="qa-label">Option 2</label>
            <v-text-field
                v-model="form.option_2"
                :error-messages="errors.option_2"
                hide-details="auto"
                class="mb-4"
            />
            <label class="qa-label">Option 3</label>
            <v-text-field
                v-model="form.option_3"
                :error-messages="errors.option_3"
                hide-details="auto"
                class="mb-4"
            />
            <label class="qa-label">Option 4</label>
            <v-text-field
                v-model="form.option_4"
                :error-messages="errors.option_4"
                hide-details="auto"
                class="mb-4"
            />
            <label class="qa-label">Option 5</label>
            <v-text-field
                v-model="form.option_5"
                :error-messages="errors.option_5"
                hide-details="auto"
                class="mb-6"
            />

            <label class="qa-label">Correct Answer Number (Example: 2)</label>
            <v-text-field
                type="number" min="1" max="5"
                v-model="form.correct_answer_no"
                :error-messages="errors.correct_answer_no"
                prepend-inner-icon="mdi-check-circle-outline"
                hide-details="auto"
                class="mb-6"
            />

            <div class="d-flex justify-end ga-2">
              <v-btn variant="text" class="qa-muted" to="/mcq">Cancel</v-btn>
              <v-btn class="qa-btn-gradient px-6" rounded="lg" @click="update" v-if="id">
                Update
              </v-btn>
              <v-btn class="qa-btn-gradient px-6" rounded="lg" @click="store" v-else>
                Save
              </v-btn>
            </div>
          </v-form>
        </v-card>
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
          title: 'MCQs',
          disabled: false,
          href: '/mcq',
        },
        {
          title: this.id ? 'Edit' : 'Add new',
          disabled: true,
          href: this.id ? `/mcq/:${this.id}/edit`: '/mcq/add',
        }
      ]
    }
  },
}
</script>

