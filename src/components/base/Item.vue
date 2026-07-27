<template>
  <v-list-item
    :href="href"
    :rel="href && href !== '#' ? 'noopener' : undefined"
    :target="href && href !== '#' ? '_blank' : undefined"
    :to="item.to"
    :active="isActive"
    rounded="lg"
    color="primary"
    class="qa-nav-item mb-1"
  >
    <template
      v-if="text || item.icon"
      #prepend
    >
      <div
        v-if="text"
        class="v-list-item__icon--text"
        v-text="computedText"
      />

      <v-icon
        v-else-if="item.icon"
        :icon="item.icon"
      />
    </template>

    <template v-if="item.title || item.subtitle">
      <v-list-item-title v-text="item.title" />

      <v-list-item-subtitle v-text="item.subtitle" />
    </template>
  </v-list-item>
</template>

<script>
  export default {
    name: 'Item',

    props: {
      item: {
        type: Object,
        default: () => ({
          href: undefined,
          icon: undefined,
          subtitle: undefined,
          title: undefined,
          to: undefined,
        }),
      },
      text: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      isActive () {
        const to = this.item && this.item.to
        if (!to) return false
        const p = this.$route.path
        if (to === '/dashboard') return p === '/dashboard'
        return p === to || p.indexOf(to + '/') === 0
      },
      isDark () {
        return this.$vuetify.theme.global.name === 'dark'
      },
      computedText () {
        if (!this.item || !this.item.title) return ''

        let text = ''

        this.item.title.split(' ').forEach(val => {
          text += val.substring(0, 1)
        })

        return text
      },
      href () {
        return this.item.href || (!this.item.to ? '#' : undefined)
      },
    },
  }
</script>
