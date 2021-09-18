<template>
  <vue-content-loading :width="300" :height="100">
    <rect x="0" y="5" rx="4" ry="4" width="300" height="5" />
    <rect x="0" y="15" rx="4" ry="4" width="300" height="5" />
    <rect x="0" y="30" rx="4" ry="4" width="300" height="5" />
    <rect x="0" y="45" rx="4" ry="4" width="300" height="5" />
    <rect x="0" y="60" rx="4" ry="4" width="300" height="5" />
    <rect x="0" y="75" rx="4" ry="4" width="300" height="5" />
    <rect x="0" y="90" rx="4" ry="4" width="300" height="5" />
    <rect x="0" y="105" rx="4" ry="4" width="300" height="5" />
    <rect x="0" y="120" rx="4" ry="4" width="300" height="5" />
  </vue-content-loading>
</template>
<script>
import { VueContentLoading } from 'vue-content-loading';
export default {
  name: "TableLoader",
  components: {
    VueContentLoading
  },
  data: () => ({})
}
</script>
