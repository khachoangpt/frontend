<template>
  <div class="dashboard">
    <el-row :gutter="40">
      <el-col class="dashboard__col" :lg="8" :md="12" :sm="24" :xs="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">{{ latestTickId }}</span>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col class="dashboard__col" :lg="8" :md="12" :sm="24" :xs="24">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card box-card__attendance">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Dữ liệu giờ làm</span>
            </div>
            <doughnut />
          </el-card>
        </div>
      </el-col>
      <el-col class="dashboard__col" :lg="8" :md="12" :sm="24" :xs="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Ngày nghỉ của công ty</span>
            </div>
            <el-calendar :first-day-of-week="0">
              <template slot="dateCell" slot-scope="{ date, data }">
                <p
                  :class="
                    date.getDay() === 0 || date.getDay() === 6
                      ? 'is-weekend'
                      : ''
                  "
                >
                  {{ data.day.split('-').slice(2).join('-') }}
                </p>
              </template>
            </el-calendar>
          </el-card>
        </div>
      </el-col>
      <el-col
        class="dashboard__col -max-width"
        :lg="8"
        :md="12"
        :sm="24"
        :xs="24"
      >
        <div class="grid-content bg-purple">
          <el-card class="box-card -max-width">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Lịch sử lương</span>
              <el-select v-model="option" placeholder="Năm">
                <el-option
                  v-for="item in options"
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
      <el-col
        class="dashboard__col -max-width"
        :lg="8"
        :md="12"
        :sm="24"
        :xs="24"
      >
        <div class="grid-content bg-purple">
          <el-card class="box-card -max-width">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Cơ cấu lương</span>
              <el-select v-model="option" placeholder="Tháng">
                <el-option
                  v-for="item in options"
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
      <el-col
        class="dashboard__col -max-width"
        :lg="8"
        :md="12"
        :sm="24"
        :xs="24"
      >
        <div class="grid-content bg-purple">
          <el-card class="box-card -max-width">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Cơ cấu tổ chức</span>
              <el-select v-model="option" placeholder="Khu vực">
                <el-option
                  v-for="item in options"
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
export default {
  name: 'HomePage',
  components: { Doughnut, LineChart, TreeChart, DoughnutChart },
  layout: 'main',
  middleware: ['auth'],
  data() {
    return {
      value: new Date(),
      latestTickId: 0,
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
      option: '',
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
  margin-bottom: 24px;
}
.dashboard__col.-max-width {
  width: 100%;
}

.box-card {
  width: 300px;
}
.box-card.-max-width {
  width: 100%;
}

.el-calendar__header {
  display: none;
}

.el-calendar__body {
  padding: 0;
}

.el-calendar-table .el-calendar-day {
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* .clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
} */

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
}
</style>
