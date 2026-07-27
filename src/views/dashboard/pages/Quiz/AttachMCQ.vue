<template>
  <v-container fluid class="pa-6">
    <v-breadcrumbs v-if="breadcrumbs" :items="breadcrumbs" divider="-" class="px-0 qa-muted"></v-breadcrumbs>
    <div class="d-flex align-center justify-space-between flex-wrap mb-6" style="gap:12px">
      <div>
        <h1 class="qa-display" style="font-size:1.6rem">Attach MCQs</h1>
        <p class="qa-muted mb-0">Quiz: {{ data.title }} — select the questions to attach.</p>
      </div>
      <div class="d-flex ga-2">
        <v-btn class="qa-btn-gradient px-6" rounded="lg" prepend-icon="mdi-content-save-outline" @click="saveMCQAttachOnQuiz">
          Update
        </v-btn>
      </div>
    </div>

    <v-card rounded="xl" class="pa-0" style="overflow:hidden">
      <template v-if="mcq_list.data && mcq_list.data.length > 0">
        <v-table hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Current Answer</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="mcq in mcq_list.data" :key="mcq.id">
            <td>
              <v-checkbox
                  color="primary"
                  hide-details="auto"
                  density="compact"
                  v-model="mcq_ids"
                  :label="'#'+mcq.id"
                  :value="mcq.id"
                  :error-messages="errors.mcq_ids"
              ></v-checkbox>
            </td>
            <td>{{ mcq.question }}</td>
            <td class="qa-muted">{{ mcq.correct_answer }}</td>
          </tr>
          </tbody>
        </v-table>
      </template>
      <template v-else>
        <div class="text-center py-16">
          <v-avatar size="80" color="surface-variant" class="mb-4"><v-icon size="40" icon="mdi-help-box-outline" class="qa-muted"/></v-avatar>
          <h3 class="qa-display mb-1">No MCQs available</h3>
          <p class="qa-muted">There are no questions to attach yet.</p>
        </div>
      </template>
    </v-card>

    <v-row justify="center">
      <v-col cols="8">
        <v-container class="max-width">
          <v-pagination
              v-model="pagination.current"
              :length="pagination.total"
              class="my-4"
              rounded="lg"
              active-color="primary"
              :total-visible="7"
              @input="getAllMCQ(pagination.current)"
          ></v-pagination>
        </v-container>
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
            title: 'Quizzes',
            disabled: false,
            href: '/quizzes',
          },
          {
            title: this.id,
            disabled: false,
            href: '/quizzes/'+this.id,
          },
          {
            title: 'Attach',
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
