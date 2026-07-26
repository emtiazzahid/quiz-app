<template>
  <v-app-bar
    id="app-bar"
    absolute
    color="transparent"
    flat
    height="75"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      icon
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />

    <div class="mx-3" />

    <v-btn
      class="ml-2"
      min-width="0"
      variant="text"
      :to="{name: 'Homepage'}"
    >
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn
      class="ml-2"
      min-width="0"
      variant="text"
      @click="logout"
    >
      <v-icon>mdi-logout</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
  // Components
  import { h } from 'vue'
  import { VHover, VListItem } from 'vuetify/components'

  // Utilities
  import { mapState, mapMutations } from 'vuex'
  import { LOGOUT } from "@/store/actions/type";
  export default {
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        inheritAttrs: false,
        render () {
          return h(VHover, null, {
            default: ({ isHovering, props }) =>
              h(VListItem, {
                ...props,
                ...this.$attrs,
                link: true,
                activeClass: '',
                class: {
                  'text-black': !isHovering,
                  'text-white bg-secondary elevation-12': isHovering,
                },
              }, { default: () => (this.$slots.default ? this.$slots.default() : []) }),
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({

    }),

    computed: {
      ...mapState(['drawer']),
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      logout() {
        this.$store.dispatch(LOGOUT).then(() => {
          this.$router.push('/');
        });
      }
    },
  }
</script>
