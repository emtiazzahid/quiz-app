<template>
  <v-container id="add-quiz" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Add Quiz
            </div>

            <div class="subtitle-1 font-weight-light">
              Add new quiz
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field class="purple-input" label="Title"
                                v-model="form.title"
                                :error-messages="errors.title"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea class="purple-input" label="Description"
                              v-model="form.description"
                              :error-messages="errors.description"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field class="purple-input" label="Time limit (Sec.)"
                                v-model="form.time_limit"
                                :error-messages="errors.time_limit"
                  />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="success" class="mr-0" @click="store">
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
    name: "AddQuiz",
    data: () => ({
      loader: false,
      form: {},
      errors:{}
    }),
    methods: {
      emptyForm() {
        return {
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
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.errors = err.response.data.errors;
          }
          this.loading = false;
        });
      }
    },
    created() {
      this.form = this.emptyForm();
    }
  }
</script>
