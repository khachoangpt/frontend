<template>
  <div class="container">
    <h1 class="title">Tổng hợp biểu đồ quản lý nhân viên phòng ban</h1>
    <el-row :gutter="20">
      <el-col class="dashboard__col" :span="8">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text"
                >Tổng số nhân viên phòng ban</span
              >
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
      <el-col class="dashboard__col" :span="24">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Lịch sử thôi việc</span>
              <el-date-picker
                v-model="leaveCompanyReasonChartOption"
                type="year"
                placeholder="Ngày"
                :default-value="new Date()"
              >
              </el-date-picker>
            </div>
            <multiple-column-chart :values="leaveCompanyReasonChart" />
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
              <el-select
                v-if="!roles.includes('user')"
                v-model="paidLeaveReasonChartEmployeeId"
                placeholder="Mã nhân viên"
              >
                <el-option
                  v-for="item in employeeByIdOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
              <el-date-picker
                v-model="paidLeaveReasonChartOption"
                type="year"
                placeholder="Ngày"
                :default-value="new Date()"
              >
              </el-date-picker>
            </div>
            <multiple-column-chart :values="paidLeaveReasonChart" />
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import BarChart from '~/components/chart/BarChart.vue'
import DoughnutChart from '~/components/chart/DoughnutChart.vue'
import MultipleColumnChart from '~/components/chart/MultipleColumnChart.vue'
export default {
  name: 'SyntheticPage',
  components: {
    BarChart,
    DoughnutChart,
    MultipleColumnChart,
  },
  layout: 'main',
  data() {
    return {
      ageColor: ['#64a340', '#348c75', '#348c75', '#05ffd1'],
      workTimeColor: ['#328fa8', '#ffde05', '#64a340'],
      leaveCompanyReasonChartOption: new Date(),
      paidLeaveReasonChartOption: new Date(),
      paidLeaveReasonChartEmployeeId: '',
    }
  },
  computed: {
    ...mapGetters('synthetic', [
      'generalDataChart',
      'leaveCompanyReasonChart',
      'paidLeaveReasonChart',
    ]),
    ...mapGetters('salary', ['employeeById']),
    ...mapGetters('auth', ['roles', 'id', 'fullName']),
    employeeByIdOptions() {
      return [
        { value: this.id, label: `${this.fullName} - ${this.id} (me)` },
        ...this.employeeById.map(({ employeeID, name }) => ({
          value: employeeID,
          label: `${name} - ${employeeID}`,
        })),
      ]
    },
    employeeNumber() {
      return [
        { label: 'Nam', value: this.generalDataChart.totalMaleEmployee },
        { label: 'Nữ', value: this.generalDataChart.totalFemaleEmployee },
      ]
    },
    ageNumber() {
      return this.generalDataChart.ageList
    },
    workTimeNumber() {
      return this.generalDataChart.workingTypeList
    },
    seniorityNumber() {
      return this.generalDataChart.seniorityList
    },
  },
  watch: {
    leaveCompanyReasonChartOption(year) {
      this.getLeaveCompanyReasonChart(year)
    },
    paidLeaveReasonChartOption(year) {
      this.getPaidLeaveReasonChart({
        year: year.getFullYear(),
        employeeId: this.paidLeaveReasonChartEmployeeId,
      })
    },
    paidLeaveReasonChartEmployeeId() {
      this.getPaidLeaveReasonChart({
        year: this.paidLeaveReasonChartOption.getFullYear(),
        employeeId: this.paidLeaveReasonChartEmployeeId,
      })
    },
  },
  async mounted() {
    await this.getEmployeeById()
    this.paidLeaveReasonChartEmployeeId = this.id
    await this.getLeaveCompanyReasonChart(
      this.leaveCompanyReasonChartOption.getFullYear()
    )
    await this.getPaidLeaveReasonChart({
      year: new Date().getFullYear(),
      employeeId: this.paidLeaveReasonChartEmployeeId,
    })
    await this.getGeneralDataChart()
  },
  methods: {
    ...mapActions('synthetic', [
      'getGeneralDataChart',
      'getLeaveCompanyReasonChart',
      'getPaidLeaveReasonChart',
    ]),
    ...mapActions('salary', ['getEmployeeById']),
  },
}
</script>
<style scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
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
