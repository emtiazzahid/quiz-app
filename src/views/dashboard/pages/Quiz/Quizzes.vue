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
      <table-loader v-if="loading"></table-loader>
      <template v-else>
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
              Time Limit (H:M:S)
            </th>
            <th class="primary--text">
              Created at
            </th>
            <th class="primary--text">
              Daily Digest Notification
            </th>
            <th class="primary--text">
              Action
            </th>
          </tr>
          </thead>

          <tbody>
          <template v-if="list.data && list.data.length > 0">
            <tr v-for="quiz in list.data" :key="quiz.id">
              <td>{{ quiz.id }}</td>
              <td>
                <router-link :to="{name: 'Quiz', params: { id: quiz.id }}">{{ quiz.title }}</router-link>
              </td>
              <td>
                {{ moment.utc(moment.duration(quiz.time_limit,'seconds').as('milliseconds')).format('HH:mm:ss') }}
              </td>
              <td>{{moment(quiz.created_at).format('YYYY-MM-DD')}}</td>
              <td class="text-right">
                <v-switch
                    :loading="digestEmailSwitching"
                    @change="updateDigestEmailSettings(quiz.id,quiz.digest_email)"
                    v-model="quiz.digest_email"
                    :label="quiz.digest_email ? 'On' : 'Off'"
                ></v-switch>
              </td>
              <td>
                <v-btn class="mx-2" fab dark x-small color="cyan" @click="edit(quiz.id)">
                  <v-icon dark>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn class="mx-2" fab dark x-small color="error" @click="openDialog(quiz.id)">
                  <v-icon dark>
                    mdi-delete
                  </v-icon>
                </v-btn>
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
    <Confirmation ref="confirmation" @confirmed="destroy($event)"></Confirmation>
  </v-container>
</template>

<script>
import ApiService from "@/common/api.service"
import TableLoader from "@/components/base/TableLoader"
import Confirmation from "@/components/base/Confirmation"
export default {
  components:{
    TableLoader,
    Confirmation
  },
  name: "Quizzes",
  data: () => ({
    digest_notification: false,
    loading: false,
    digestEmailSwitching: false,
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
        page = this.pagination.current;
      }
      if(searchQuery) {
        searchQuery = `&${searchQuery}`;
      }
      ApiService.setHeader()
      ApiService.get(`/quiz?page=${page}${searchQuery}&limit=${this.pagination.per_page}`).then(res => {
        this.list = res.data;
        this.pagination.current = res.data.meta.current_page;
        this.pagination.total = res.data.meta.last_page;
        this.loading = false;
      }).catch(err => {
        if (!err.response || err.response.status !== 401) {
          this.$toastr.e("Failed to load data!" + err);
          this.loading = false;
        }else{
          this.$toastr.e(err.response.data.status)
        }
      })
    },
    updateDigestEmailSettings(id, status) {
      this.digestEmailSwitching = true;
      ApiService.setHeader()
      ApiService.put(`/quiz/${id}/diggest-email`, {
        status: status
      }).then(res => {
        this.$toastr.s(res.data.message);
        this.digestEmailSwitching = false;
      }).catch(err => {
          this.$toastr.e(err);
        this.digestEmailSwitching = false;
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
    edit(id) {
      this.$router.push({name: 'EditQuiz', params: {id: id}});
    },
    openDialog(id) {
      this.$refs['confirmation'].dialog = true;
      this.$refs['confirmation'].id = id;
    },
    destroy(id) {
      ApiService.setHeader()
      ApiService.delete(`/quiz/${id}`).then(res => {
        this.$toastr.s(res.data.message);
        this.index();
      }).catch(err => {
        this.$toastr.e(err);
      })
    }
  },
  mounted() {
    this.index();
  }
}
</script>
