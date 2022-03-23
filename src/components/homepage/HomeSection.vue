<template>
  <section id="hero">
    <v-parallax dark src="@/assets/img/bgHero.webp" height="350">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" xl="8">
              <h1 class="display-2 font-weight-bold mb-4">Quiz App</h1>
              <h1 class="font-weight-light">
                Find a quiz that you want to test your skill with it<br>
              </h1>
              <v-btn rounded outlined large dark
                @click="$vuetify.goTo('#quizes')"
                class="mt-5"
              >
                Quiz's
                <v-icon class="ml-2">mdi-arrow-down</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down"> </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="svg-border-waves text-white">
        <v-img src="@/assets/img/borderWaves.svg" />
      </div>
    </v-parallax>
    <v-container fluid id="quizes" class="mt-2">
      <v-row align="center" justify="center" v-if="quizView">
          <QuizView :quiz="quiz"/>
      </v-row>
      <v-row align="center" justify="center" v-else>
        <v-col cols="10" v-if="loading">
          <vue-content-loading :width="300" :height="150">
            <template v-for="i in [0,1]">
              <rect :x="100*n" :y="60*i" rx="2" ry="2" width="80" height="50" v-for="n in [0,1,2]"/>
            </template>
          </vue-content-loading>
        </v-col>
        <v-col cols="10" v-else>
          <v-container>
          <v-row>
            <v-col cols="8">
              <v-text-field
                  :value="query"
                  :error-messages="errors.query"
                  label="Search by author name or quiz title"
                  @input="lazyCaller($event)"
                  autofocus
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-btn @click="index(1, 'title=' + query)" depressed color="indigo">
                Search
              </v-btn>
            </v-col>
          </v-row>
          </v-container>
          <template v-if="quizzes.data && quizzes.data.length > 0">
            <v-row align="center" justify="space-around">
              <v-col cols="12" sm="4" class="text-center" v-for="(quiz, i) in quizzes.data" :key="'quiz-'+i">
                <v-hover>
                  <v-card class="mx-auto" max-width="344" outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="text-overline mb-4 highlightable" v-html="quiz.author"></div>
                        <v-list-item-title class="text-h5 mb-1" v-html="quiz.title"></v-list-item-title>
                        <v-list-item-subtitle v-if="quiz.description" v-html="quiz.description.substring(0,200)">
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-avatar
                          tile
                          size="80"
                          color="grey"
                          v-if="quiz.author_email"
                      >
                        <v-gravatar :email="quiz.author_email" />
                      </v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn rounded @click="getQuiz(quiz.id)" depressed color="indigo">
                        View
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
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
          <template v-else>
            <v-alert
                border="right"
                color="blue-grey"
                dark
            >
              Sorry no quiz found
            </v-alert>
          </template>
        </v-col>
      </v-row>
    </v-container>
    <div class="svg-border-waves">
      <img src="~@/assets/img/wave2.svg" />
    </div>
  </section>
</template>


<script>
import ApiService from "@/common/api.service"
import QuizView from "@/components/homepage/QuizView"
import { VueContentLoading } from 'vue-content-loading';

export default {
  name: "HomeSection",
  components: {
    QuizView,
    VueContentLoading
  },
  data: () => ({
    timeout: null,
    quizView: false,
    loading: false,
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
        console.log(err);
        if (err.response.status === 422) {
          this.errors = err.response.data.errors;
        }
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
    let id = this.$route.params.id;
    if (id) {
      this.getQuiz(id);
    } else {
      this.index();
    }
  }
}
</script>

<style lang="scss">
.circle {
  stroke: white;
  stroke-dasharray: 650;
  stroke-dashoffset: 650;
  -webkit-transition: all 0.5s ease-in-out;
  opacity: 0.3;
}

</style>

<style>
.btn-play {
  transition: 0.2s;
}

.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}

#hero {
  z-index: 0;
}
.svg-border-waves img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: -2px;
  z-index: -1;
}

.card {
  min-height: 300px;
  padding: 10px;
  transition: 0.5s ease-out;
}

.card .v-image {
  margin-bottom: 15px;
  transition: 0.75s;
}

.card h1 {
  margin-bottom: 10px;
}

.zoom-efect {
  transform: scale(1.1);
}

.up {
  transform: translateY(-20px);
  transition: 0.5s ease-out;
}
</style>

<style>
section {
  position: relative;
}

.highlight {
  background-color: yellow;
}

</style>
