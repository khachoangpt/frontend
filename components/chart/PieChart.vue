<template>
  <Pie
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
import { Pie } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'PieChart',
  components: {
    Pie,
  },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 260,
    },
    height: {
      type: Number,
      default: 260,
    },
    cssClasses: {
      default: '',
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
          label: 'Lương 10-20 triệu',
          value: 60,
        },
        {
          key: 1,
          label: 'Lương 10-20 triệu',
          value: 35.5,
        },
        {
          key: 2,
          label: 'Lương 20-30 triệu',
          value: 50,
        },
        {
          key: 3,
          label: 'Lương 20-30 triệu',
          value: 100,
        },
        {
          key: 4,
          label: 'Lương 20-30 triệu',
          value: 20,
        },
        {
          key: 5,
          label: 'Lương 100-300 triệu',
          value: 40,
        },
        {
          key: 6,
          label: 'Lương 20-30 triệu',
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
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  mounted() {
    this.formatData()
    this.randomColor()
  },
  methods: {
    formatData() {
      const objData = this.values.reduce((acc, { label, value }) => {
        return { ...acc, [label]: (acc[label] ? acc[label] : 0) + value }
      }, {})
      this.chartData.labels = Object.keys(objData)
      this.chartData.datasets[0].data = Object.values(objData)
    },
    randomColor() {
      this.chartData.datasets[0].backgroundColor = this.chartData.labels.reduce(
        (acc, current) => {
          current = `#${Math.floor(Math.random() * 16777215).toString(16)}`
          return [...acc, current]
        },
        []
      )
    },
  },
}
</script>
