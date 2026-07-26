// Vuetify 3
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@/styles/app.scss'

const light = {
  dark: false,
  colors: {
    background: '#F7F8FC',
    surface: '#FFFFFF',
    'surface-variant': '#F1F5F9',
    'on-surface-variant': '#475569',
    primary: '#6366F1',
    'primary-darken-1': '#4F46E5',
    secondary: '#8B5CF6',
    accent: '#8B5CF6',
    info: '#0EA5E9',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#F43F5E',
    'on-surface': '#0F172A',
    'on-background': '#0F172A',
  },
  variables: {
    'border-color': '#E2E8F0',
    'border-opacity': 1,
    'medium-emphasis-opacity': 0.68,
    'theme-kbd': '#1E293B',
  },
}

export default createVuetify({
  icons: { defaultSet: 'mdi', aliases, sets: { mdi } },
  theme: {
    defaultTheme: 'light',
    themes: { light },
  },
  defaults: {
    global: { ripple: true },
    VCard: { rounded: 'xl', color: 'surface' },
    VBtn: { rounded: 'lg', flat: true },
    VTextField: { variant: 'outlined', density: 'comfortable', color: 'primary', hideDetails: 'auto' },
    VTextarea: { variant: 'outlined', color: 'primary', hideDetails: 'auto' },
    VSelect: { variant: 'outlined', density: 'comfortable', color: 'primary', hideDetails: 'auto' },
    VCombobox: { variant: 'outlined', density: 'comfortable', color: 'primary' },
    VChip: { rounded: 'lg' },
    VAlert: { rounded: 'lg', variant: 'tonal' },
    VList: { rounded: 'lg' },
    VDialog: { rounded: 'xl' },
    VAvatar: { rounded: 'lg' },
    VTable: { hover: true },
  },
})
