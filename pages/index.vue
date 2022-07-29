<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col class="dashboard__col" :span="8">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Tổng số nhân viên</span>
            </div>
            <doughnut-chart :values="employeeNumber" />
          </el-card>
        </div>
      </el-col>
      <el-col class="dashboard__col" :span="8">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Mức tuổi</span>
            </div>
            <doughnut-chart :values="ageNumber" :background-color="ageColor" />
          </el-card>
        </div>
      </el-col>
      <el-col class="dashboard__col" :span="8">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Full time/Part time</span>
            </div>
            <doughnut-chart
              :values="workTimeNumber"
              :background-color="workTimeColor"
            />
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        class="dashboard__col"
        :offset="2"
        :lg="6"
        :md="12"
        :sm="12"
        :xs="24"
      >
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Ngày nghỉ của công ty</span>
            </div>
            <v-calendar
              :attributes="attributes"
              is-expanded
              :locale="$i18n.locale"
              :first-day-of-week="1"
            />
          </el-card>
        </div>
      </el-col>
      <el-col
        class="dashboard__col"
        :offset="4"
        :lg="10"
        :md="12"
        :sm="12"
        :xs="24"
      >
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Cơ cấu lương</span>
              <el-select v-model="option" size="small" placeholder="Tháng">
                <el-option
                  v-for="item in selects"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </div>
            <doughnut-chart />
          </el-card>
        </div>
      </el-col>
      <el-col class="dashboard__col" :lg="24" :md="24" :sm="24" :xs="24">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Lịch sử lương</span>
              <el-select v-model="option" size="small" placeholder="Năm">
                <el-option
                  v-for="item in selects"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </div>
            <line-chart />
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col class="dashboard__col" :span="24">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Lịch sử thôi việc</span>
              <el-select v-model="option" placeholder="Thời gian">
                <el-option
                  v-for="item in selects"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </div>
            <bar-chart :values="reasonType" />
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col class="dashboard__col" :span="24">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Lịch sử nghỉ phép</span>
              <el-select v-model="option" placeholder="Loại nghỉ phép">
                <el-option
                  v-for="item in selects"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </div>
            <multiple-column-chart />
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col class="dashboard__col" :span="24">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Thâm niên</span>
            </div>
            <bar-chart :values="seniorityNumber" />
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col class="dashboard__col" :lg="8" :md="12" :sm="12" :xs="24">
        <div class="grid-content">
          <el-card class="box-card box-card__attendance">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Dữ liệu giờ làm</span>
            </div>
            <doughnut />
          </el-card>
        </div>
      </el-col>
      <el-col class="dashboard__col" :lg="8" :md="12" :sm="24" :xs="24">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Cơ cấu tổ chức</span>
              <el-select v-model="option" placeholder="Khu vực">
                <el-option
                  v-for="item in selects"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </div>
            <tree-chart />
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Doughnut from '~/components/chart/Doughnut.vue'
import LineChart from '~/components/chart/LineChart.vue'
import DoughnutChart from '~/components/chart/DoughnutChart.vue'
import TreeChart from '~/components/chart/TreeChart.vue'
import BarChart from '~/components/chart/BarChart.vue'
import MultipleColumnChart from '~/components/chart/MultipleColumnChart.vue'
export default {
  name: 'HomePage',
  components: {
    Doughnut,
    LineChart,
    TreeChart,
    DoughnutChart,
    BarChart,
    MultipleColumnChart,
  },
  layout: 'main',
  middleware: ['auth'],
  data() {
    return {
      value: new Date(),
      latestTickId: 0,
      selects: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
          disabled: true,
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
      option: '',
      attributes: [
        {
          key: 'today',
          highlight: 'red',
          dates: {
            start: new Date(2022, 0, 1), // Jan 1st, 2018
            end: new Date(2023, 0, 1), // Jan 1st, 2019
            weekdays: [1, 7], // ...on Sundays and Saturdays
          },
        },
      ],

      ageColor: ['#64a340', '#348c75', '#348c75', '#05ffd1'],
      workTimeColor: ['#328fa8', '#ffde05'],
      seniorityNumber: [
        {
          key: 1,
          label: '10 Năm',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 2,
          label: '20 Năm',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 3,
          label: '30 Năm',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 4,
          label: '40 Năm',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 5,
          label: '50 Năm',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 6,
          label: '60 Năm',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 7,
          label: '70 Năm',
          value: Math.floor(Math.random() * 11),
        },
      ],
      options: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
          disabled: true,
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
      reasonType: [
        {
          key: 1,
          label: 'Ghét sếp',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 2,
          label: 'Đánh nhau với đồng nghiệp',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 3,
          label: 'Lương thấp',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 4,
          label: 'Buồn',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 5,
          label: 'Vui',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 6,
          label: 'Hơi buồn',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 7,
          label: 'Hơi vui',
          value: Math.floor(Math.random() * 11),
        },
      ],
      workTimeNumber: [
        {
          key: 1,
          label: 'Full time',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 2,
          label: 'Full time',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 3,
          label: 'Full time',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 4,
          label: 'Full time',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 5,
          label: 'Full time',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 6,
          label: 'Part time',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 7,
          label: 'Part time',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 8,
          label: 'Part time',
          value: Math.floor(Math.random() * 11),
        },
      ],
      ageNumber: [
        {
          key: 1,
          label: 'Tuổi 18-20',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 2,
          label: 'Tuổi 18-20',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 3,
          label: 'Tuổi 18-20',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 4,
          label: 'Tuổi 20-30',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 5,
          label: 'Tuổi 20-30',
          value: Math.floor(Math.random() * 11),
        },
      ],
      employeeNumber: [
        {
          key: 1,
          label: 'Nam',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 2,
          label: 'Nam',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 3,
          label: 'Nam',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 4,
          label: 'Nữ',
          value: 1,
        },
        {
          key: 5,
          label: 'Nữ',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 6,
          label: 'Nữ',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 7,
          label: 'Nữ',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 8,
          label: 'Nữ',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 9,
          label: 'Nữ',
          value: Math.floor(Math.random() * 11),
        },
      ],
    }
  },

  methods: {
    ...mapActions('user', ['getPersonnelList']),
  },
}
</script>

<style>
.dashboard {
  width: 100%;
}

.dashboard__col {
  margin-bottom: 20px;
}

.el-calendar__header {
  display: none;
}

.el-calendar__body {
  padding: 0;
}

.el-calendar-table .el-calendar-day {
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
}

/* .clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
} */

.box-card {
  height: 360px !important;
}

.box-card__header-text {
  font-weight: 600;
  font-size: 16px;
  color: #1e90ff;
}

.is-weekend {
  background-color: #1e90ff;
  padding: 8px 8px;
}

.el-card {
  border-radius: 10px;
}

.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vc-container {
  border: none;
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 10px;
}

.grid-content {
  border-radius: 10px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.box-card__header-text {
  font-weight: 600;
  font-size: 16px;
  color: #1e90ff;
}
.clearfix {
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 2.25rem;
  font-family: 'Roboto', sans-serif;
}
</style>
