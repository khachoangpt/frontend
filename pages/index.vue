<template>
  <div class="dashboard">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="box-card__header-text">Thông tin</span>
      </div>
      <Line />
    </el-card>
    <el-card class="box-card box-card__attendance">
      <div slot="header" class="clearfix">
        <span class="box-card__header-text">Dữ liệu giờ làm</span>
      </div>
      <div class="box-card__attendance-body">
        <p>Giờ làm trong tháng: 60</p>
        <p>Giờ làm còn thiếu: 100</p>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="box-card__header-text">Ngày nghỉ của công ty</span>
      </div>
      <el-calendar :first-day-of-week="0">
        <template slot="dateCell" slot-scope="{ date, data }">
          <p
            :class="
              date.getDay() === 0 || date.getDay() === 6 ? 'is-weekend' : ''
            "
          >
            {{ data.day.split('-').slice(2).join('-') }}
          </p>
        </template>
      </el-calendar>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  layout: 'main',
  middleware: ['auth'],
  data() {
    return {
      value: new Date(),
    }
  },
}
</script>

<style>
.dashboard {
  display: flex;
}

.box-card {
  width: 300px;
  margin-right: 10%;
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

.box-card__attendance {
  height: 200px;
}
</style>
