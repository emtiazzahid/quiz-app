<template>
  <v-container fluid class="pa-6">
    <v-breadcrumbs v-if="breadcrumbs" :items="breadcrumbs" divider="-" class="px-0 qa-muted"></v-breadcrumbs>
    <div class="d-flex align-center justify-space-between flex-wrap mb-6" style="gap:12px">
      <div>
        <h1 class="qa-display" style="font-size:1.6rem">Quiz Details</h1>
        <p class="qa-muted mb-0">Overview of this quiz and its attached questions.</p>
      </div>
      <div class="d-flex ga-2">
        <v-btn class="qa-btn-gradient px-6" rounded="lg" prepend-icon="mdi-playlist-edit" :to="{name: 'AttachMCQ'}">
          Update MCQ List
        </v-btn>
      </div>
    </div>

    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card rounded="xl" class="pa-6 mb-6">
          <h2 class="qa-display mb-4" style="font-size:1.15rem">Details</h2>
          <v-row align="center">
            <v-col cols="4"><span class="qa-muted">Title</span></v-col>
            <v-col cols="8"><h3 class="font-weight-medium">{{ data.title }}</h3></v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="4"><span class="qa-muted">Description</span></v-col>
            <v-col cols="8"><h3 class="font-weight-medium">{{ data.description }}</h3></v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="4"><span class="qa-muted">Time Limit (Hour:minute:second)</span></v-col>
            <v-col cols="8">
              <span class="qa-chip"><v-icon size="14" icon="mdi-clock-outline"/>
                {{ moment.utc(moment.duration(data.time_limit,'seconds').as('milliseconds')).format('HH:mm:ss') }}
              </span>
            </v-col>
          </v-row>
        </v-card>

        <v-card rounded="xl" class="pa-6">
          <h2 class="qa-display mb-4" style="font-size:1.15rem">MCQ</h2>
          <template v-if="data.mcqs && data.mcqs.length > 0">
            <v-row align="center" v-for="mcq in data.mcqs" :key="mcq.id">
              <v-col cols="4"><span class="qa-muted">#{{ mcq.id }}</span></v-col>
              <v-col cols="8"><h3 class="font-weight-medium">{{ mcq.question }}</h3></v-col>
            </v-row>
          </template>
          <div class="text-center py-16" v-else>
            <v-avatar size="80" color="surface-variant" class="mb-4"><v-icon size="40" icon="mdi-help-box-outline" class="qa-muted"/></v-avatar>
            <h3 class="qa-display mb-1">No MCQ attached yet</h3>
            <p class="qa-muted mb-4">Attach questions to build out this quiz.</p>
            <v-btn variant="outlined" color="primary" rounded="lg" prepend-icon="mdi-plus" :to="{name: 'AttachMCQ'}">Attach MCQ</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ApiService from "@/common/api.service"

  export default {
    name: "Quiz",
    data: () => ({
      loader: false,
      data: {},
      id: null
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
            disabled: true,
            href: '/quizzes/'+this.id,
          },
        ]
      }
    },
    methods: {
      get() {
        this.loader = true
        ApiService.setHeader()
        ApiService.get(`/quiz/${this.$route.params.id}/mcq`)
        .then((resp) => {
          this.loading = false;
          this.data = resp.data;
        })
        .catch((err) => {
          this.$toastr.e(err);
          this.loading = false;
        });
      }
    },
    created() {
      this.get();
      this.id = this.$route.params.id;
    }
  }
</script>
