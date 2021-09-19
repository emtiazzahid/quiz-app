<template>
  <v-container fluid tag="section">
    <v-breadcrumbs v-if="breadcrumbs" :items="breadcrumbs" divider="-"></v-breadcrumbs>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card title="MCQ Details">
          <v-container class="pb-0 mt-5">
            <v-row align="center" class="pb-5">
              <v-col cols="2">
                <h3>Question</h3>
              </v-col>
              <v-col cols="10">
                <h3>{{ data.question }}</h3>
              </v-col>
            </v-row>
            <hr>
            <v-row class="pb-5"></v-row>
            <v-row align="center" v-for="n in 5" :key="n">
              <v-col cols="2">
                <h4>Option {{ n }}</h4>
              </v-col>
              <v-col cols="10">
                <template v-if="n === data.correct_answer_no">
                  <v-alert dense text color="green" >
                    {{ data['option_'+n] }}
                  </v-alert>
                </template>
                <template v-else>
                    {{ data['option_'+n] }}
                </template>
              </v-col>
            </v-row>
          </v-container>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ApiService from "@/common/api.service"

  export default {
    name: "MCQ",
    data: () => ({
      loader: false,
      data: {},
      id: null
    }),
    computed: {
      breadcrumbs() {
        return [
          {
            text: 'MCQs',
            disabled: false,
            href: '/mcq',
          },
          {
            text: this.id,
            disabled: true,
            href: '/mcq/'+this.id,
          },
        ]
      }
    },
    methods: {
      get() {
        this.loader = true
        ApiService.setHeader()
        ApiService.get(`/mcq/${this.$route.params.id}`)
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
