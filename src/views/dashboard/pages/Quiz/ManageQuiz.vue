<template>
  <v-container fluid class="pa-6">
    <v-breadcrumbs v-if="breadcrumbs" :items="breadcrumbs" divider="-" class="px-0 qa-muted"></v-breadcrumbs>
    <div class="mb-6">
      <h1 class="qa-display" style="font-size:1.6rem">{{ id ? 'Edit' : 'Add' }} Quiz</h1>
      <p class="qa-muted mb-0">{{ id ? 'Update your quiz details.' : 'Create a new quiz.' }}</p>
    </div>

    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card rounded="xl" class="pa-6">
          <v-form>
            <v-row>
              <v-col cols="12">
                <label class="qa-label">Title</label>
                <v-text-field
                    hide-details="auto"
                    v-model="form.title"
                    :error-messages="errors.title"
                />
              </v-col>

              <v-col cols="12">
                <label class="qa-label">Description</label>
                <v-textarea
                    hide-details="auto"
                    v-model="form.description"
                    :error-messages="errors.description"
                />
              </v-col>

              <v-col cols="12" md="6">
                <label class="qa-label">Time limit (Sec.)</label>
                <v-text-field
                    hide-details="auto"
                    v-model="form.time_limit"
                    :error-messages="errors.time_limit"
                />
              </v-col>

              <v-col cols="12" class="d-flex justify-end ga-2">
                <v-btn class="qa-btn-gradient px-6" rounded="lg" @click="update" v-if="id">
                  Update
                </v-btn>
                <v-btn class="qa-btn-gradient px-6" rounded="lg" @click="store" v-else>
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ApiService from "@/common/api.service"

  export default {
    name: "ManageQuiz",
    data: () => ({
      loader: false,
      form: {},
      errors:{},
      id: null
    }),
    methods: {
      emptyForm() {
        return {
          id: null,
          title: '',
          description: '',
          time_limit: '1800',
        }
      },
      store() {
        this.loader = true
        ApiService.post("/quiz", this.form)
        .then((resp) => {
          this.loading = false;
          this.form = this.emptyForm();
          this.$toastr.s(resp.data.message);
          this.errors = {};
        }).catch((err) => {
          if (err.response.status === 422) {
            this.errors = err.response.data.errors;
          }
          this.loading = false;
        });
      },
      edit() {
        this.id = this.$route.params['id'];
        this.loader = true
        ApiService.get(`/quiz/${this.id}`)
            .then((resp) => {
              this.loading = false;
              let data = resp.data.data;
              this.form = {
                id: data.id,
                title: data.title,
                description: data.description,
                time_limit: data.time_limit,
              };
              this.errors = {};
            }).catch((err) => {
              this.$toastr.e(err);
              this.loading = false;
            });
      },
      update() {
        this.loader = true
        ApiService.put(`/quiz/${this.id}`, this.form)
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
            text: 'Quizzes',
            disabled: false,
            href: '/quizzes',
          },
          {
            text: this.id ? 'Edit' : 'Add new',
            disabled: true,
            href: this.id ? `/quizzes/:${this.id}/edit`: '/quizzes/add',
          }
        ]
      }
    },
  }
</script>
