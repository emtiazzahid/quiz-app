<template>
  <v-container fluid class="pa-6">
    <div class="d-flex align-center justify-space-between flex-wrap mb-6" style="gap:12px">
      <div>
        <h1 class="qa-display" style="font-size:1.6rem">My Quizzes</h1>
        <p class="qa-muted mb-0">Create, manage and share your quizzes.</p>
      </div>
      <div class="d-flex ga-2">
        <v-btn class="qa-btn-gradient px-6" rounded="lg" prepend-icon="mdi-plus" :to="{name: 'AddQuiz'}">
          Add Quiz
        </v-btn>
      </div>
    </div>

    <table-loader v-if="loading"></table-loader>
    <template v-else>
      <v-card rounded="xl" class="pa-0" style="overflow:hidden">
        <template v-if="list.data && list.data.length > 0">
          <v-table hover>
            <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Time Limit (H:M:S)</th>
              <th>Created at</th>
              <th>Daily Digest Notification</th>
              <th class="text-right">Action</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="quiz in list.data" :key="quiz.id">
              <td class="qa-muted">{{ quiz.id }}</td>
              <td>
                <router-link class="text-primary font-weight-medium text-decoration-none" :to="{name: 'Quiz', params: { id: quiz.id }}">{{ quiz.title }}</router-link>
              </td>
              <td>
                {{ moment.utc(moment.duration(quiz.time_limit,'seconds').as('milliseconds')).format('HH:mm:ss') }}
              </td>
              <td class="qa-muted">{{moment(quiz.created_at).format('YYYY-MM-DD')}}</td>
              <td>
                <v-switch
                    color="primary"
                    hide-details
                    density="compact"
                    :loading="digestEmailSwitching"
                    @change="updateDigestEmailSettings(quiz.id,quiz.digest_email)"
                    v-model="quiz.digest_email"
                    :label="quiz.digest_email ? 'On' : 'Off'"
                ></v-switch>
              </td>
              <td class="text-right">
                <v-btn class="mx-1" icon="mdi-pencil-outline" variant="text" size="small" color="primary" @click="edit(quiz.id)" />
                <v-btn class="mx-1" icon="mdi-delete-outline" variant="text" size="small" color="error" @click="openDialog(quiz.id)" />
              </td>
            </tr>
            </tbody>
          </v-table>
        </template>
        <template v-else>
          <div class="text-center py-16">
            <v-avatar size="80" color="surface-variant" class="mb-4"><v-icon size="40" icon="mdi-clipboard-text-outline" class="qa-muted"/></v-avatar>
            <h3 class="qa-display mb-1">No quizzes yet</h3>
            <p class="qa-muted">Create your first quiz to get started.</p>
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
    <Confirmation ref="confirmation" @confirmed="destroy($event)"></Confirmation>
  </v-container>
</template>

<script>
import ApiService from "@/common/api.service"
import TableLoader from "@/components/base/TableLoader.vue"
import Confirmation from "@/components/base/Confirmation.vue"
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
