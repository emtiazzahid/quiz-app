<template>
  <v-container fluid tag="section">
    <base-material-card icon="mdi-clipboard-text" title="Test Attempts" class="px-5 py-3">
      <table-loader v-if="loading"></table-loader>
      <template>
        <v-simple-table>
          <button :to="{name: 'Homepage'}"></button>
          <thead>
          <tr>
            <th class="primary--text">
              ID
            </th>
            <th class="primary--text">
              Quiz
            </th>
            <th class="primary--text">
              Time Limit
            </th>
            <th class="primary--text">
              Score
            </th>
            <th class="primary--text">
              Created at
            </th>
          </tr>
          </thead>

          <tbody>
          <template v-if="list.data && list.data.length > 0">
            <tr v-for="attempt in list.data" :key="attempt.id">
              <td>
                <router-link :to="{name: 'TestResult', params: { id: attempt.id }}">#{{ attempt.id }}</router-link>
              </td>
              <template v-if="attempt.quiz">
                <td>{{ attempt.quiz.title }}</td>
                <td>
                  {{ moment.utc(moment.duration(attempt.quiz.time_limit,'seconds').as('milliseconds')).format('HH:mm:ss') }}
                </td>
              </template>
              <td colspan="2" v-else>Unknown <small style="color: red">Could be deleted</small></td>
              <td>
                {{ attempt.score + '%' }}
              </td>
              <td>{{moment(attempt.created_at).format('YYYY-MM-DD')}}</td>
              <td class="text-right">

              </td>
            </tr>
          </template>
          <template v-else>
            <tr><td colspan="6" class="text-center">No data found</td></tr>
          </template>
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
                  @input="index(pagination.current,filtersUrl())"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </template>
    </base-material-card>
  </v-container>
</template>

<script>
import ApiService from "@/common/api.service"
import TableLoader from "@/components/base/TableLoader"
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
