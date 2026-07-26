<template>
  <div class="pa-6">
    <v-breadcrumbs :items="breadcrumbs" divider="-" class="px-0 pb-4 qa-muted"></v-breadcrumbs>
    <v-card rounded="xl" class="mx-auto pa-6 qa-elevate" max-width="440">
      <div class="qa-quiz-hero mb-5 d-flex align-center justify-center">
        <v-icon size="40" color="white" icon="mdi-lightbulb-on-outline" />
      </div>

      <h1 class="qa-display text-center mb-2" style="font-size:1.6rem">{{ quiz.title }}</h1>
      <p class="qa-muted text-center mb-5">
        {{ quiz.description }}
      </p>

      <div class="d-flex align-center mb-3">
        <v-icon size="18" color="primary" icon="mdi-account-outline" class="mr-2" />
        <span class="qa-muted mr-1">Author:</span>
        <a :href="`mailto:${quiz.author_email}`" class="text-primary text-decoration-none font-weight-medium">{{ quiz.author }}</a>
      </div>

      <div class="d-flex align-center mb-3">
        <v-icon size="18" color="primary" icon="mdi-clock-outline" class="mr-2" />
        <span class="qa-muted mr-1">Time Limit:</span>
        <span class="font-weight-medium">{{ moment.utc(moment.duration(quiz.time_limit,'seconds').as('milliseconds')).format('HH:mm:ss') }}</span>
      </div>

      <div class="d-flex align-center mb-6">
        <v-icon size="18" color="primary" icon="mdi-trophy-outline" class="mr-2" />
        <span class="qa-muted mr-1">Highest Score:</span>
        <span class="font-weight-medium">{{ quiz.high_score }}</span>
      </div>

      <v-btn block size="large" class="qa-btn-gradient" rounded="lg" append-icon="mdi-arrow-right" :to="{name: 'RunningQuiz', params: {id: quiz.id}}">
        Start test
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['quiz'],
  data () {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Quiz',
          disabled: true,
          href: '/quiz-view/'+this.$route.params.id,
        },
      ],
    }
  },
  created() {
    this.$router.push({path:`/quiz-view/${this.quiz.id}`})
  }
}
</script>

<style scoped>
.qa-quiz-hero {
  height: 96px;
  border-radius: 18px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 60%, #a855f7 100%);
  box-shadow: 0 16px 32px -14px rgba(99, 102, 241, .6);
}
</style>
