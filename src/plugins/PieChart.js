// vue-chartjs 5 + chart.js 4 wrapper.
// Keeps the old API used by TestResult.vue: a `chart-data` prop plus a
// `renderChart(data)` instance method (called via $refs).
import { h } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

export default {
  name: 'PieChart',
  props: {
    chartData: { type: Object, default: () => ({ labels: [], datasets: [] }) },
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      localData: this.chartData,
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.localData = { ...val }
      },
    },
  },
  methods: {
    // Back-compat: old code called this.$refs.chart.renderChart(data)
    renderChart(data) {
      if (data) this.localData = { ...data }
    },
  },
  render() {
    const { labels = [], datasets = [] } = this.localData || {}
    return h(Pie, {
      data: { labels, datasets },
      options: this.options,
    })
  },
}
