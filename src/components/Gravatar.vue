<template>
  <img :src="url" :alt="alt" class="v-gravatar" />
</template>

<script>
// Drop-in replacement for the old <v-gravatar> component (vue-gravatar, Vue 2).
import { md5 } from 'js-md5'

export default {
  name: 'VGravatar',
  props: {
    email: { type: String, default: '' },
    size: { type: Number, default: 80 },
    defaultImg: { type: String, default: 'identicon' },
    alt: { type: String, default: 'Avatar' },
  },
  computed: {
    url() {
      const hash = md5((this.email || '').trim().toLowerCase())
      return `https://www.gravatar.com/avatar/${hash}?s=${this.size}&d=${this.defaultImg}`
    },
  },
}
</script>
