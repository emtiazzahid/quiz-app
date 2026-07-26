<template>
  <v-container fluid class="pa-6">
    <div class="d-flex align-center justify-space-between flex-wrap mb-6" style="gap:12px">
      <div>
        <h1 class="qa-display" style="font-size:1.6rem">Test Attempts</h1>
        <p class="qa-muted mb-0">Review your past quiz attempts and scores.</p>
      </div>
    </div>

    <table-loader v-if="loading"></table-loader>
    <template>
      <v-card rounded="xl" class="pa-0" style="overflow:hidden">
        <template v-if="list.data && list.data.length > 0">
          <v-table hover>
            <thead>
            <tr>
              <th>ID</th>
              <th>Quiz</th>
              <th>Time Limit</th>
              <th>Score</th>
              <th>Created at</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="attempt in list.data" :key="attempt.id">
              <td>
                <router-link class="text-primary font-weight-medium text-decoration-none" :to="{name: 'TestResult', params: { id: attempt.id }}">#{{ attempt.id }}</router-link>
              </td>
              <template v-if="attempt.quiz">
                <td>{{ attempt.quiz.title }}</td>
                <td>
                  {{ moment.utc(moment.duration(attempt.quiz.time_limit,'seconds').as('milliseconds')).format('HH:mm:ss') }}
                </td>
              </template>
              <td colspan="2" v-else>Unknown <small class="text-error">Could be deleted</small></td>
              <td>
                <span class="qa-chip"><v-icon size="14" icon="mdi-star-outline"/> {{ attempt.score + '%' }}</span>
              </td>
              <td class="qa-muted">{{moment(attempt.created_at).format('YYYY-MM-DD')}}</td>
            </tr>
            </tbody>
          </v-table>
        </template>
        <template v-else>
          <div class="text-center py-16">
            <v-avatar size="80" color="surface-variant" class="mb-4"><v-icon size="40" icon="mdi-history" class="qa-muted"/></v-avatar>
            <h3 class="qa-display mb-1">No attempts yet</h3>
            <p class="qa-muted">Your completed quiz attempts will appear here.</p>
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
                @input="index(pagination.current,filtersUrl())"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import ApiService from "@/common/api.service"
import TableLoader from "@/components/base/TableLoader.vue"
export default {
  name: "QuizAttempts",
  components: {
    TableLoader
  },
  data: () => ({
    loading: false,
    list: {},
    filters: {},
    pagination: {
      per_page: 20,
      current: 1,
      total: 0
    },
  }),
  methods: {
    index(page) {
      this.loading = true;
      if (!page) {
        page = this.pagination.current;
      }
      ApiService.setHeader()
      ApiService.get(`/pub/attempts?page=${page}&limit=${this.pagination.per_page}`).then(res => {
        this.list = res.data;
        this.pagination.current = res.data.meta.current_page;
        this.pagination.total = res.data.meta.last_page;
        this.loading = false;
      }).catch(err => {
        if (err.response.status !== 401) {
          this.$toastr.e("Failed to load data!" + err);
          this.loading = false;
        }else{
          this.$toastr.e(err.response.data.status)
        }
      })
    },
    filtersUrl() {
      var str = "";
      for (var key in this.filters) {
        if (str != "") {
          str += "&";
        }
        str += key + "=" + encodeURIComponent(this.filters[key]);
      }
      return str;
    },
    clearFilter() {
      this.filters = {};
      this.index();
    },
    search() {
      this.index(1, this.filtersUrl());
    },
  },
  mounted() {
    this.index();
  }
}
</script>
