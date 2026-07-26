<template>
  <v-tabs
    v-model="internalValue"
    :active-class="`${color} ${$vuetify.theme.global.name === 'dark' ? 'black' : 'white'}--text`"
    class="v-tabs--pill"
    hide-slider
    v-bind="$attrs"
  >
    <slot />

    <slot name="items" />
  </v-tabs>
</template>

<script>
  export default {
    name: 'MaterialTabs',

    props: {
      modelValue: {
        type: null,
        default: undefined,
      },
      color: {
        type: String,
        default: 'primary',
      },
    },

    data () {
      return {
        internalValue: this.modelValue,
      }
    },

    watch: {
      internalValue (val, oldVal) {
        if (val === oldVal) return

        this.$emit('update:modelValue', val)
      },
      modelValue (val, oldVal) {
        if (val === oldVal) return

        this.internalValue = val
      },
    },
  }
</script>

<style lang="sass">
  .v-tabs--pill
    .v-tab,
    .v-tab:before
      border-radius: 24px

    &.v-tabs--icons-and-text
      .v-tab,
      .v-tab:before
        border-radius: 4px
</style>
