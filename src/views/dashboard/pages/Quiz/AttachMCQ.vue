<template>
  <v-container id="add-quiz" fluid tag="section">
    <v-breadcrumbs v-if="breadcrumbs" :items="breadcrumbs" divider="-"></v-breadcrumbs>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card :title="`Quiz: ${data.title} Mark MCQ to attach in Your Quiz`">
          <v-container class="pa-0" fluid>
            <div class="col-12 text-right">
              <v-btn depressed color="primary" @click="saveMCQAttachOnQuiz">
                Update
              </v-btn>
            </div>
          </v-container>
          <v-container class="pa-0" fluid>
            <v-row align="center">
              <v-simple-table>
                <thead>
                <tr>
                  <th class="primary--text">#</th>
                  <th class="primary--text">
                    Question
                  </th>
                  <th class="primary--text">
                    Current Answer
                  </th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="mcq in mcq_list.data" :key="mcq.id">
                  <td>
                    <v-checkbox
                        v-model="mcq_ids"
                        :label="'#'+mcq.id"
                        :value="mcq.id"
                        :error-messages="errors.mcq_ids"
                    ></v-checkbox>
                  </td>
                  <td>{{ mcq.question }}</td>
                  <td>{{ mcq.correct_answer }}</td>
                </tr>

                </tbody>
              </v-simple-table>
              <v-row justify="center">
                <v-col cols="8">
                  <v-container class="max-width">
                    <v-pagination
                        v-model="pagination.current"
                        :length="pagination.total"
                        class="my-4"
                        :total-visible="7"
                        circle
                        @input="getAllMCQ(pagination.current)"
                    ></v-pagination>
                  </v-container>
                </v-col>
              </v-row>
            </v-row>
          </v-container>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ApiService from "@/common/api.service"

  export default {
    name: "AttachMCQ",
    data: () => ({
      loader: false,
      data: {},
      mcq_list: {},
      pagination: {
        per_page: 20,
        current: 1,
        total: 0
      },
      errors:{},
      mcq_ids: []
    }),
    computed: {
      breadcrumbs() {
        return [
          {
            text: 'Quizzes',
            disabled: false,
            href: '/quizzes',
          },
          {
            text: this.id,
            disabled: false,
            href: '/quizzes/'+this.id,
          },
          {
            text: 'Attach',
            disabled: true,
            href: '/quizzes/'+this.id+'/attach',
          }
        ]
      }
    },
    methods: {
      get() {
        this.loader = true
        ApiService.get(`/quiz/${this.$route.params.id}/mcq`)
        .then((resp) => {
          this.loading = false;
          this.data = resp.data;
          this.setPreviousMCQIds();
          this.getAllMCQ(1);
        })
        .catch((err) => {
          this.$toastr.e(err);
          this.loading = false;
        });
      },
      getAllMCQ(page) {
        if (!page) {
          page = this.pagination.current;
        }
        this.loader = true;
        ApiService.setHeader()
        ApiService.get(`/mcq?page=${page}&perPage=${this.pagination.per_page}`)
            .then((resp) => {
              this.loading = false;
              this.pagination.current = resp.data.meta.current_page;
              this.pagination.total = resp.data.meta.last_page;
              this.mcq_list = resp.data;
            })
            .catch((err) => {
              this.$toastr.e(err);
              this.loading = false;
            });
      },
      saveMCQAttachOnQuiz() {
        if (this.mcq_ids.length == 0) {
          this.$toastr.e('Please select at list one question');
          return;
        }
        this.loader = true
        ApiService.setHeader()
        ApiService.put(`/quiz/${this.$route.params.id}/mcq`, {
          mcq_ids: this.mcq_ids
        })
        .then((resp) => {
          this.loading = false;
          this.errors = {};
          this.$toastr.s(resp.data.message);
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.errors = err.response.data.errors;
          }
          this.loading = false;
        });
      },
      setPreviousMCQIds() {
        this.data.mcqs.forEach(mcq => {
          this.mcq_ids.push(mcq.id);
        })
      }
    },
    created() {
      this.get();
      this.id = this.$route.params.id;
    }
  }
</script>
