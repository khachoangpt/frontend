<template>
  <Bar
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
import { Bar } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'MultipleChart',
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: 'multiple-chart',
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
      default: () => [],
    },
  },
  data() {
    return {
      color: ['#4287f5', '#dd42f5', '#f5427e', '#f54242', '#f5d442'],
      chartData: {
        labels: ['#798c34', `#8c5d34`, `#8c7634`],
        datasets: [],
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
          },
        },
        scales: {
          x: {
            grid: {
              display: true,
            },
          },
          y: {
            grid: {
              display: false,
            },
            min: 0,
            ticks: {
              stepSize: 1,
              maxTicksLimit: 3,
            },
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
      this.chartData.labels = this.values.map(({ label }) => label)
      const resons = this.values
        .flatMap(({ value }) => value)
        .reduce((acc, current) => {
          if (acc[current.reason]) {
            return {
              ...acc,
              [current.reason]: [...acc[current.reason], current.value],
            }
          }
          return { ...acc, [current.reason]: [current.value] }
        }, {})
      this.chartData.datasets = Object.keys(resons).reduce(
        (acc, current, index) => {
          return [
            ...acc,
            {
              label: current,
              data: [...resons[current]],
              backgroundColor: this.color[index],
            },
          ]
        },
        []
      )
    },
  },
}
</script>
