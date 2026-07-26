<template>
  <v-dialog v-model="dialog" persistent max-width="420">
    <v-card rounded="xl" class="pa-6 text-center">
      <v-avatar size="72" color="surface-variant" class="mb-4 mx-auto">
        <v-icon size="36" color="error" icon="mdi-alert-outline" />
      </v-avatar>
      <v-card-title class="qa-display" style="font-size:1.35rem">
        Confirm delete?
      </v-card-title>
      <v-card-text class="qa-muted">Are you sure you want to delete this data? This action cannot be undone.</v-card-text>
      <v-card-actions class="justify-center pt-2">
        <v-btn
            variant="text"
            class="qa-muted"
            rounded="lg"
            @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
            class="qa-btn-gradient px-6"
            rounded="lg"
            @click="confirm"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      id: null,
    }
  },
  methods: {
    confirm() {
      this.$emit('confirmed', this.id)
      this.dialog = false;
    }
  },
  watch: {
    id: function(a, b) {
      console.log(a);
      console.log(b);
    }
  }
}
</script>
