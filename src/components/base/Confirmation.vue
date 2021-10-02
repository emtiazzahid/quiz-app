<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h2">
        Confirm delete?
      </v-card-title>
      <v-card-text>Are you sure about to delete this data? This action can not be undo</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
            color="green darken-1"
            text
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
