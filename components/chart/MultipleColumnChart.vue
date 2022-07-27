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
      chartData: {
        labels: ['2020', '2021', '2022'],
        datasets: [
          {
            label: 'Tìm kiếm công việc mới',
            backgroundColor: '#798c34',
            data: [3, 7, 4],
          },
          {
            label: 'Môi trường không phù hợp',
            backgroundColor: `#8c5d34`,
            data: [4, 3, 5],
          },
          {
            label: 'Đồng nghiệp không hoà đồng',
            backgroundColor: `#8c7634`,
            data: [7, 2, 6],
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
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    }
  },
  mounted() {
    // this.formatData()
    // this.randomColor()
  },
  methods: {
    formatData() {
      const yearToValue = this.values.reduce(
        (acc, { reason, label, value }) => {
          if (acc[label]) {
            return { ...acc, [label]: [...acc[label], { reason, value }] }
          }
          return { ...acc, [label]: [{ reason, value }] }
        },
        {}
      )
      //   const a = Object.values(yearToValue)
      //     .flat()
      //     .reduce(
      //       (result, item) => ([
      //         ...result,
      //         [item.reason]: [...(result[item.reason] || []), item.value],
      //       ]),
      //       []
      //     )
      console.log(Object.values(yearToValue).flat())
      //   this.chartData.labels = Object.keys(yearToValue)
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
