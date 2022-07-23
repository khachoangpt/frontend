<template>
  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>
<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)
export default {
  name: 'LineChart',
  components: { LineChartGenerator },
  props: {
    chartId: {
      type: String,
      default: 'line-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: 'new-class',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    values: {
      type: Array,
      default: () => [
        {
          key: 0,
          label: 'Jan 2020',
          value: 60,
        },
        {
          key: 1,
          label: 'Feb 2020',
          value: 35.5,
        },
        {
          key: 2,
          label: 'May 2020',
          value: 50,
        },
        {
          key: 3,
          label: 'June 2020',
          value: 100,
        },
        {
          key: 4,
          label: 'August 2020',
          value: 20,
        },
        {
          key: 5,
          label: 'Descember 2020',
          value: 40,
        },
      ],
    },
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            borderColor: 'rgb(0, 0, 0)',
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050',
        },
      },
    }
  },

  mounted() {
    this.formatData()
  },
  methods: {
    formatData() {
      this.chartData.labels = this.values.map(({ label }) => label)
      this.chartData.datasets[0].data = this.values.map(({ value }) => value)
    },
  },
}
</script>