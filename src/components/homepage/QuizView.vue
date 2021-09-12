<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider="-"></v-breadcrumbs>
    <v-card class="mx-auto" max-width="344">
      <v-card-text>
        <h1>{{ quiz.title }}</h1>
        <p class="text-h4 text--primary">
          {{ quiz.description }}
        </p>
        <p>Author: <a :href="`mailto:${quiz.author_email}`">{{ quiz.author }}</a></p>
        <div class="text--primary">
          Time Limit: {{ moment.utc(moment.duration(quiz.time_limit,'seconds').as('milliseconds')).format('HH:mm:ss') }}
        </div>
        <p>Highest Score: {{ quiz.high_score }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4">
          Start test
        </v-btn>
      </v-card-actions>
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
          href: '/'+this.$route.params.id,
        },
      ],
    }
  },
  created() {
    this.$router.push(`/${this.quiz.id}`)
  }
}
</script>
