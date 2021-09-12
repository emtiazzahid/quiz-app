<template>
  <v-container fluid tag="section">
    <base-material-card icon="mdi-clipboard-text" title="My Quiz's" class="px-5 py-3">
      <template v-slot:after-heading>
        <div class="col-12 ml-auto text-right">
          <v-btn depressed color="primary" class="text-right" :to="{name: 'AddQuiz'}">
            Add Quiz
          </v-btn>
        </div>
      </template>

      <v-simple-table>
        <button :to="{name: 'AddQuiz'}"></button>
        <thead>
          <tr>
            <th class="primary--text">
              ID
            </th>
            <th class="primary--text">
              Title
            </th>
            <th class="primary--text">
              Time Limit
            </th>
            <th class="primary--text">
              Created at
            </th>
            <th class="text-right primary--text">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="quiz in list.data" :key="quiz.id">
            <td>{{ quiz.id }}</td>
            <td>
              <router-link :to="{name: 'Quiz', params: { id: quiz.id }}">{{ quiz.title }}</router-link>
            </td>
            <td>{{ quiz.time_limit }}</td>
            <td>{{ quiz.created_at }}</td>
            <td class="text-right">
              <button>x</button>
              <button>y</button>
            </td>
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
                @input="index(pagination.current,filtersUrl())"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </base-material-card>
  </v-container>
</template>

<script>
import ApiService from "@/common/api.service"

export default {
  name: "Quizzes",
  data: () => ({
    loader: false,
    list: {},
    filters: {},
    pagination: {
      per_page: 20,
      current: 1,
      total: 0
    },
  }),
  methods: {
    index(page, searchQuery = "") {
      this.loading = true;
      if (!page) {
        var page = this.pagination.current;
      }
      if(searchQuery) {
        var searchQuery = `&${searchQuery}`;
      }
      ApiService.setHeader()
      ApiService.get(`/quiz?page=${page}${searchQuery}&limit=${this.pagination.per_page}`).then(res => {
        this.list = res.data;
        this.pagination.current = res.data.current_page;
        this.pagination.total = res.data.last_page;
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
      // this.filtering = true;
      this.index(1, this.filtersUrl());
    },
  },
  mounted() {
    this.index();
  }
}
</script>
