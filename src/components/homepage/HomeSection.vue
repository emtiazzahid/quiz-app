<template>
  <div>
    <!-- HERO -->
    <section id="hero" class="qa-hero">
      <div class="qa-hero__grid"></div>
      <span class="qa-blob" style="width:340px;height:340px;background:#6366f1;top:-80px;left:-60px"></span>
      <span class="qa-blob" style="width:300px;height:300px;background:#8b5cf6;bottom:-100px;right:-40px"></span>

      <v-container class="py-16" style="position:relative;z-index:1">
        <v-row justify="center" class="text-center">
          <v-col cols="12" md="10" lg="8">
            <div class="qa-chip mb-5 mx-auto" style="width:max-content">
              <v-icon size="15" icon="mdi-lightning-bolt" /> Learn faster with quizzes
            </div>
            <h1 class="qa-display mb-4" style="font-size:clamp(2.4rem,6vw,4rem);line-height:1.05">
              Test your skills with
              <span class="qa-gradient-text">Quiz&nbsp;App</span>
            </h1>
            <p class="text-h6 font-weight-regular qa-muted mb-8 mx-auto" style="max-width:620px">
              Discover quizzes across topics, challenge yourself, and track your progress — all in one clean place.
            </p>

            <div class="mx-auto" style="max-width:580px">
              <v-text-field
                :model-value="query"
                placeholder="Search quizzes by title or author…"
                prepend-inner-icon="mdi-magnify"
                variant="solo"
                rounded="lg"
                flat
                hide-details
                class="qa-elevate"
                @update:model-value="lazyCaller($event)"
                @keyup.enter="index(1, 'title=' + query)"
              />
            </div>

            <div class="d-flex justify-center ga-3 mt-6 flex-wrap">
              <v-btn size="large" rounded="lg" class="qa-btn-gradient px-8" @click="$goTo('#quizes')">
                Browse quizzes <v-icon end icon="mdi-arrow-down" />
              </v-btn>
              <v-btn size="large" rounded="lg" variant="outlined" color="primary" class="px-8" :to="{ name: 'Register' }">
                Create account
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- QUIZZES -->
    <v-container id="quizes" class="py-12">
      <template v-if="quizView">
        <QuizView :quiz="quiz" />
      </template>

      <template v-else>
        <div class="text-center mb-10">
          <h2 class="qa-display mb-2" style="font-size:clamp(1.8rem,4vw,2.4rem)">Explore quizzes</h2>
          <p class="qa-muted mb-0">Pick a quiz and put your knowledge to the test.</p>
        </div>

        <v-row v-if="loading">
          <v-col v-for="n in 6" :key="'sk-'+n" cols="12" sm="6" md="4">
            <v-skeleton-loader type="list-item-avatar, divider, paragraph, actions" class="qa-elevate" rounded="xl" />
          </v-col>
        </v-row>

        <template v-else>
          <template v-if="quizzes.data && quizzes.data.length > 0">
            <v-row>
              <v-col v-for="(quiz, i) in quizzes.data" :key="'quiz-'+i" cols="12" sm="6" md="4">
                <v-card class="qa-hover d-flex flex-column" rounded="xl" style="height:100%">
                  <div class="pa-5 d-flex align-center ga-3">
                    <v-avatar size="48" class="qa-quiz-avatar">
                      <v-gravatar v-if="quiz.author_email" :email="quiz.author_email" />
                      <span v-else>{{ (quiz.title || 'Q').charAt(0).toUpperCase() }}</span>
                    </v-avatar>
                    <div style="min-width:0">
                      <div class="text-caption qa-muted text-truncate" v-html="quiz.author"></div>
                      <div class="text-subtitle-1 font-weight-bold text-truncate" v-html="quiz.title"></div>
                    </div>
                  </div>
                  <v-divider />
                  <v-card-text class="qa-muted flex-grow-1" style="min-height:60px">
                    <span v-html="quiz.description ? quiz.description.substring(0, 120) : 'No description provided.'"></span>
                  </v-card-text>
                  <v-card-actions class="px-5 pb-5 pt-0">
                    <span class="qa-chip"><v-icon size="14" icon="mdi-help-circle-outline" /> Quiz</span>
                    <v-spacer />
                    <v-btn class="qa-btn-gradient px-5" rounded="lg" @click="getQuiz(quiz.id)">
                      Start <v-icon end icon="mdi-arrow-right" />
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>

            <div class="d-flex justify-center mt-10">
              <v-pagination
                v-model="pagination.current"
                :length="pagination.total"
                :total-visible="7"
                rounded="lg"
                active-color="primary"
                @update:model-value="index(pagination.current, filtersUrl())"
              />
            </div>
          </template>

          <div v-else class="text-center py-16">
            <v-avatar size="88" color="surface-variant" class="mb-5">
              <v-icon size="44" icon="mdi-magnify" class="qa-muted" />
            </v-avatar>
            <h3 class="qa-display mb-2">No quizzes found</h3>
            <p class="qa-muted">Try a different search, or check back soon.</p>
          </div>
        </template>
      </template>
    </v-container>
  </div>
</template>

<script>
import ApiService from "@/common/api.service"
import QuizView from "@/components/homepage/QuizView.vue"

export default {
  name: "HomeSection",
  components: {
    QuizView,
  },
  data: () => ({
    timeout: null,
    quizView: false,
    loading: false,
    quiz: {},
    quizzes: {},
    query: '',
    errors: {},
    filters: {},
    pagination: {
      per_page: 20,
      current: 1,
      total: 0
    },
  }),
  methods: {
    lazyCaller(query) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.query = query;
        this.index(1, 'title=' + query);
      }, 500)
    },
    highlight() {
      // Highlights will be case-sensitive
      if (!this.query) {
        return;
      }

      let vm = this;
      this.quizzes.data.forEach(function(quiz, index) {
        if(quiz.title.includes(vm.query)) {
          vm.quizzes.data[index]['title'] = quiz.title.split(vm.query).join('<span class="highlight">'+vm.query+'</span>');
        }
        if(quiz.author.includes(vm.query)) {
          vm.quizzes.data[index]['author'] = quiz.author.split(vm.query).join('<span class="highlight">'+vm.query+'</span>');
        }
        if(quiz.description.includes(vm.query)) {
          vm.quizzes.data[index]['description'] = quiz.description.split(vm.query).join('<span class="highlight">'+vm.query+'</span>');
        }
      });
    },
    getQuiz(id) {
      this.loading = true;
      ApiService.get(`/pub/quiz/${id}`).then(res => {
        this.quiz = res.data.data;
        this.quizView = true;
        this.loading = false;
      }).catch(err => {
          this.$toastr.e(err)
      })
    },
    index(page, searchQuery = "") {
      this.loading = true;
      if (!page) {
        page = this.pagination.current;
      }
      if(searchQuery) {
        searchQuery = `&${searchQuery}`;
      }
      ApiService.get(`/pub/quiz?page=${page}${searchQuery}&limit=${this.pagination.per_page}`).then(res => {
        this.quizzes = res.data;
        this.pagination.current = res.data.meta.current_page;
        this.pagination.total = res.data.meta.last_page;
        this.loading = false;
        this.errors = {};
        this.highlight();
      }).catch(err => {
        this.loading = false;
        if (err.response?.status === 422) {
          this.errors = err.response.data.errors;
        } else if (err.response && err.response.status !== 401) {
          this.$toastr.e("Failed to load data!" + err);
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
    let id = this.$route.params.id;
    if (id) {
      this.getQuiz(id);
    } else {
      this.index();
    }
  }
}
</script>

<style scoped>
:deep(.highlight) {
  background: #fde68a;
  border-radius: 3px;
  padding: 0 2px;
}
</style>
