<template>
  <v-container fluid class="pa-6">
    <div class="d-flex align-center justify-space-between flex-wrap mb-6" style="gap:12px">
      <div>
        <h1 class="qa-display" style="font-size:1.6rem">My MCQ's</h1>
        <p class="qa-muted mb-0">Manage your multiple-choice questions.</p>
      </div>
      <div class="d-flex ga-2">
        <v-btn class="qa-btn-gradient px-6" rounded="lg" prepend-icon="mdi-plus" :to="{name: 'AddMCQ'}">
          Add MCQ
        </v-btn>
      </div>
    </div>

    <table-loader v-if="loading"></table-loader>
    <template v-else>
      <v-card rounded="xl" class="pa-0" style="overflow:hidden">
        <v-table hover>
          <thead>
          <tr>
            <th>ID</th>
            <th>Question</th>
            <th>Current Answer</th>
            <th>Created at</th>
            <th class="text-right">Action</th>
          </tr>
          </thead>

          <tbody>
          <template v-if="list.data && list.data.length > 0">
            <tr v-for="mcq in list.data" :key="mcq.id">
              <td>
                <router-link :to="{name: 'MCQ', params: {id: mcq.id}}" class="text-primary font-weight-medium text-decoration-none">#{{ mcq.id }}</router-link>
              </td>
              <td>{{ mcq.question }}</td>
              <td>{{ mcq.correct_answer }}</td>
              <td class="qa-muted">
                {{moment(mcq.created_at).format('YYYY-MM-DD')}}
              </td>
              <td class="text-right">
                <v-btn icon="mdi-pencil-outline" variant="text" size="small" color="primary" @click="edit(mcq.id)" />
                <v-btn icon="mdi-delete-outline" variant="text" size="small" color="error" @click="openDialog(mcq.id)" />
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="5" class="pa-0">
                <div class="text-center py-16">
                  <v-avatar size="80" color="surface-variant" class="mb-4"><v-icon size="40" icon="mdi-clipboard-text-outline" class="qa-muted"/></v-avatar>
                  <h3 class="qa-display mb-1">No MCQs yet</h3>
                  <p class="qa-muted mb-0">Create your first question to get started.</p>
                </div>
              </td>
            </tr>
          </template>
          </tbody>
        </v-table>
      </v-card>

      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
                v-if="pagination.total > 1"
                v-model="pagination.current"
                :length="pagination.total"
                class="my-4"
                rounded="lg"
                active-color="primary"
                :total-visible="7"
                @update:model-value="index(pagination.current, filtersUrl())"
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
  name: "MCQs",
  components: {
    TableLoader,
    Confirmation
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
    index(page, searchQuery = "") {
      this.loading = true;
      if (!page) {
        page = this.pagination.current;
      }
      if(searchQuery) {
        searchQuery = `&${searchQuery}`;
      }
      ApiService.setHeader()
      ApiService.get(`/mcq?page=${page}${searchQuery}&limit=${this.pagination.per_page}`).then(res => {
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
    edit(id) {
      this.$router.push({name: 'EditMCQ', params: {id: id}});
    },
    openDialog(id) {
      this.$refs['confirmation'].dialog = true;
      this.$refs['confirmation'].id = id;
    },
    destroy(id) {
      ApiService.setHeader()
      ApiService.delete(`/mcq/${id}`).then(res => {
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
