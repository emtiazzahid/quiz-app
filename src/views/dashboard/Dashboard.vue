<template>
  <v-container id="dashboard" fluid tag="section" class="pa-6">
    <!-- Header -->
    <div class="d-flex align-center justify-space-between flex-wrap mb-6" style="gap:12px">
      <div>
        <h1 class="qa-display" style="font-size:1.7rem">Welcome back 👋</h1>
        <p class="qa-muted mb-0">Here's what's happening across your quizzes.</p>
      </div>
      <div class="d-flex ga-2">
        <v-btn variant="outlined" color="primary" rounded="lg" prepend-icon="mdi-plus" :to="{ name: 'AddQuiz' }">New quiz</v-btn>
        <v-btn icon variant="tonal" color="primary" :loading="loading" @click="getSummary(true)">
          <v-icon icon="mdi-refresh" />
          <v-tooltip activator="parent" location="bottom">Refresh</v-tooltip>
        </v-btn>
      </div>
    </div>

    <!-- Stats -->
    <v-row>
      <v-col v-for="card in cards" :key="card.key" cols="12" sm="6" lg="3">
        <v-card class="pa-5 qa-hover" rounded="xl" style="height:100%">
          <div class="d-flex align-center justify-space-between mb-5">
            <div class="qa-stat-icon" :style="{ background: card.bg, color: card.color }">
              <v-icon :icon="card.icon" size="24" />
            </div>
            <span class="qa-chip" style="background:#ecfdf5;color:#059669">
              <v-icon size="13" icon="mdi-trending-up" /> live
            </span>
          </div>
          <div class="text-h4 font-weight-bold" style="letter-spacing:-.02em">{{ data[card.key] }}</div>
          <div class="qa-muted text-body-2 mt-1">{{ card.title }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Lower panels -->
    <v-row class="mt-2">
      <v-col cols="12" md="8">
        <v-card class="pa-6 h-100" rounded="xl">
          <div class="d-flex align-center justify-space-between mb-4">
            <h3 class="qa-display" style="font-size:1.2rem">Quick actions</h3>
          </div>
          <v-row>
            <v-col v-for="a in actions" :key="a.title" cols="12" sm="6">
              <v-card
                :to="a.to"
                flat
                rounded="lg"
                class="qa-action pa-4 d-flex align-center ga-3"
                variant="outlined"
              >
                <div class="qa-stat-icon" :style="{ background: a.bg, color: a.color }">
                  <v-icon :icon="a.icon" />
                </div>
                <div>
                  <div class="text-subtitle-2 font-weight-bold">{{ a.title }}</div>
                  <div class="text-caption qa-muted">{{ a.subtitle }}</div>
                </div>
                <v-spacer />
                <v-icon icon="mdi-chevron-right" class="qa-muted" />
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-6 h-100 d-flex flex-column qa-bg-soft" rounded="xl" flat>
          <div class="qa-stat-icon mb-4" style="background:#fff;color:#6366f1">
            <v-icon icon="mdi-lightbulb-on-outline" />
          </div>
          <h3 class="qa-display mb-2" style="font-size:1.2rem">Tip of the day</h3>
          <p class="qa-muted mb-4">Build a bank of MCQs first, then attach them to quizzes to reuse questions across tests.</p>
          <v-spacer />
          <v-btn variant="tonal" color="primary" rounded="lg" :to="{ name: 'AddMCQ' }" prepend-icon="mdi-plus">Add MCQ</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ApiService from "@/common/api.service"

  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        loading: false,
        data: {
          total_quiz: '0',
          total_mcq: '0',
          total_attendant: '0',
          total_running_exams: '0',
        },
        cards: [
          { key: 'total_quiz', title: 'Total Quizzes', icon: 'mdi-note-text-outline', color: '#6366f1', bg: '#eef2ff' },
          { key: 'total_mcq', title: 'Total MCQs', icon: 'mdi-clipboard-list-outline', color: '#8b5cf6', bg: '#f5f3ff' },
          { key: 'total_attendant', title: 'Total Attendants', icon: 'mdi-account-group-outline', color: '#10b981', bg: '#ecfdf5' },
          { key: 'total_running_exams', title: 'Running Exams', icon: 'mdi-timer-sand', color: '#f59e0b', bg: '#fffbeb' },
        ],
        actions: [
          { title: 'Create a quiz', subtitle: 'Build a new quiz', icon: 'mdi-note-plus-outline', to: { name: 'AddQuiz' }, color: '#6366f1', bg: '#eef2ff' },
          { title: 'Add MCQ', subtitle: 'Add a question', icon: 'mdi-clipboard-plus-outline', to: { name: 'AddMCQ' }, color: '#8b5cf6', bg: '#f5f3ff' },
          { title: 'View quizzes', subtitle: 'Manage your quizzes', icon: 'mdi-format-list-bulleted', to: { name: "Quiz's" }, color: '#10b981', bg: '#ecfdf5' },
          { title: 'Test attempts', subtitle: 'See results', icon: 'mdi-history', to: { name: 'TestAttempts' }, color: '#f59e0b', bg: '#fffbeb' },
        ],
      }
    },

    methods: {
      getSummary(refresh = false) {
        this.loading = true
        ApiService.setHeader()
        ApiService.get(`/dashboard-summary?refresh=${refresh}`)
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
      setTimeout(() => {
        this.getSummary();
      }, 500);
    }
  }
</script>

<style scoped>
.qa-stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
}
.qa-action { transition: border-color .2s ease, transform .2s ease; }
.qa-action:hover { border-color: #6366f1 !important; transform: translateY(-2px); }
</style>
