<template>
  <v-container fluid class="pa-6">
    <v-breadcrumbs v-if="breadcrumbs" :items="breadcrumbs" divider="-" class="px-0 pb-4 qa-muted"></v-breadcrumbs>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div class="mb-6">
          <h1 class="qa-display" style="font-size:1.6rem">MCQ Details</h1>
          <p class="qa-muted mb-0">Review the question and its answer options.</p>
        </div>

        <v-card rounded="xl" class="pa-6">
          <span class="qa-chip mb-3"><v-icon size="14" icon="mdi-help-circle-outline"/> Question</span>
          <h3 class="qa-display mb-6" style="font-size:1.25rem">{{ data.question }}</h3>

          <div v-for="n in 5" :key="n" class="mb-3">
            <template v-if="n === data.correct_answer_no">
              <v-alert density="comfortable" variant="tonal" color="success" icon="mdi-check-circle-outline">
                <div class="text-caption font-weight-bold text-uppercase mb-1">Option {{ n }} · Correct answer</div>
                {{ data['option_'+n] }}
              </v-alert>
            </template>
            <template v-else>
              <div class="qa-option d-flex align-center pa-4 rounded-lg">
                <span class="qa-option__badge mr-3">{{ n }}</span>
                <span>{{ data['option_'+n] }}</span>
              </div>
            </template>
          </div>
        </v-card>
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
            title: 'MCQs',
            disabled: false,
            href: '/mcq',
          },
          {
            title: this.id,
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

<style scoped>
.qa-option {
  background: #f8fafc;
  border: 1px solid #eef2f7;
}
.qa-option__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: #eef2ff;
  color: #4f46e5;
  font-weight: 700;
  font-size: .8rem;
  flex-shrink: 0;
}
</style>
