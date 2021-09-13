<template>
  <v-container id="add-quiz" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card title="MCQ">
          <v-container class="pa-0" fluid v-if="data.mcqs && data.mcqs.length > 0">
            <v-row align="center" v-for="mcq in data.mcqs" :key="mcq.id">
              <v-col cols="1" md="3">
                <h4>#{{ mcq.id }}</h4>
              </v-col>
              <v-col cols="8">
                <h3>{{ mcq.question }}</h3>
              </v-col>
            </v-row>
          </v-container>
          <v-container class="pa-0" fluid  v-else>
            <h3>
              No MCQ Attached Yet
              <router-link :to="{name: 'AttachMCQ'}">Attach MCQ</router-link>
            </h3>
          </v-container>
          <v-container>
            <v-list two-line>
              <v-list-item-group
                  v-model="selected"
                  active-class="pink--text"
                  multiple
              >
                <template v-for="(item, index) in items">
                  <v-list-item :key="item.title">
                    <template v-slot:default="{ active }">
                      <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>

                        <v-list-item-subtitle
                            class="text--primary"
                            v-text="item.headline"
                        ></v-list-item-subtitle>

                        <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                        <v-icon
                            v-if="!active"
                            color="grey lighten-1"
                        >
                          mdi-star-outline
                        </v-icon>

                        <v-icon
                            v-else
                            color="yellow darken-3"
                        >
                          mdi-star
                        </v-icon>
                      </v-list-item-action>
                    </template>
                  </v-list-item>

                  <v-divider
                      v-if="index < items.length - 1"
                      :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </v-container>
        </base-material-card>
      </v-col>
      <v-col cols="1" md="1">
        <v-btn depressed color="primary" :to="{name: 'AttachMCQ'}">
          Update MCQ List
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ApiService from "@/common/api.service"

  export default {
    name: "RunningQuiz",
    data: () => ({
      loader: false,
      data: {},
      selected: [2],
      items: [
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: 'Ali Connors',
        },
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          subtitle: `Wish I could come, but I'm out of town this weekend.`,
          title: 'me, Scrott, Jennifer',
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
          title: 'Sandra Adams',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
          title: 'Trevor Hansen',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          title: 'Britta Holt',
        },
      ],
    }),
    methods: {
      get() {
        this.loader = true
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
    }
  }
</script>
