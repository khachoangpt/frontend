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
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Doughnut from '~/components/chart/Doughnut.vue'
export default {
  name: 'HomePage',
  components: { Doughnut },
  layout: 'main',
  middleware: ['auth'],
  data() {
    return {
      value: new Date(),
      latestTickId: 0,
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

.box-card {
  width: 300px;
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

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
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
</style>
