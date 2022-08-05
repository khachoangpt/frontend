<template>
  <Doughnut
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="[ChartDataLabels]"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Doughnut } from 'vue-chartjs/legacy'
import ChartDataLabels from 'chartjs-plugin-datalabels'

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
  name: 'DoughnutChart',
  components: {
    Doughnut,
  },
  props: {
    chartId: {
      type: String,
      default: 'doughnut-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 200,
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
    backgroundColor: {
      type: Array,
      default: () => ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
    },
    values: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      ChartDataLabels,
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              boxWidth: 6,
            },
            position: 'left',
          },
          datalabels: {
            formatter: (value, ctx) => {
              if (value === 0) {
                return ''
              }
              const dataArr = ctx.chart.data.datasets[0].data
              const sum = dataArr.reduce((acc, data) => {
                return acc + data
              }, 0)

              const percentage = ((value * 100) / sum).toFixed(2) + '%'

              return percentage
            },
            color: '#fff',
          },
        },
      },
    }
  },
  watch: {
    values() {
      this.formatData()
    },
  },
  mounted() {
    this.formatData()
  },
  methods: {
    formatData() {
      const objData = this.values.reduce((acc, { label, value }) => {
        return { ...acc, [label]: (acc[label] ? acc[label] : 0) + value }
      }, {})
      this.chartData.datasets[0].data = Object.values(objData)
      this.chartData.labels = Object.keys(objData).map((item, index) => {
        return `${item} ( ${this.chartData.datasets[0].data[index]} )`
      })
      this.chartData.datasets[0].backgroundColor = this.backgroundColor
    },
  },
}
</script>
