<template>
  <div
    v-loading.fullscreen.lock="loadingSynthetic"
    element-loading-background="rgba(0, 0, 0, 0.2)"
    type="primary"
    class="container"
  >
    <div class="synthetic__header">
      <div class="synthetic__header-text">
        {{ $i18n.t('synthetic.syntheticHeader') }}
      </div>
    </div>
    <el-row :gutter="20">
      <el-col class="dashboard__col" :span="8">
        <div class="grid-content">
          <el-card class="box-card dashboard-column__height">
            <div slot="header" class="clearfix-synthetic">
              <span class="box-card__header-text">
                {{ $i18n.t('synthetic.totalEmployee') }}
              </span>
            </div>
            <doughnut-chart :values="employeeNumber" />
          </el-card>
        </div>
      </el-col>
      <el-col class="dashboard__col" :span="8">
        <div class="grid-content">
          <el-card class="box-card dashboard-column__height">
            <div slot="header" class="clearfix-synthetic">
              <span class="box-card__header-text">{{
                $i18n.t('synthetic.age')
              }}</span>
            </div>
            <doughnut-chart :values="ageNumber" :background-color="ageColor" />
          </el-card>
        </div>
      </el-col>
      <el-col class="dashboard__col" :span="8">
        <div class="grid-content">
          <el-card class="box-card dashboard-column__height">
            <div slot="header" class="clearfix-synthetic">
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
            <div slot="header" class="clearfix-synthetic">
              <span class="box-card__header-text">{{
                $i18n.t('synthetic.seniority')
              }}</span>
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
            <div slot="header" class="clearfix-synthetic">
              <span class="box-card__header-text">{{
                $i18n.t('synthetic.reasonLeave')
              }}</span>
              <el-date-picker
                v-model="leaveCompanyReasonChartOption"
                type="year"
                :clearable="false"
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
            <div slot="header" class="clearfix-synthetic">
              <span class="box-card__header-text">{{
                $i18n.t('synthetic.reasonOnLeave')
              }}</span>
              <el-select
                v-if="!roles.includes('user')"
                v-model="paidLeaveReasonChartEmployeeId"
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
                :clearable="false"
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
      ageColor: ['#4287f5', '#dd42f5', '#f5427e', '#f54242', '#f5d442'],
      workTimeColor: ['#328fa8', '#ffde05', '#64a340'],
      leaveCompanyReasonChartOption: new Date(),
      paidLeaveReasonChartOption: new Date(),
      paidLeaveReasonChartEmployeeId: '',
      loadingSynthetic: true,
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
        {
          label: this.$i18n.t('synthetic.male'),
          value: this.generalDataChart.totalMaleEmployee,
        },
        {
          label: this.$i18n.t('synthetic.female'),
          value: this.generalDataChart.totalFemaleEmployee,
        },
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
      this.getLeaveCompanyReasonChart(year.getFullYear())
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
    await this.getGeneralDataChart()
    await this.getEmployeeById()
    this.paidLeaveReasonChartEmployeeId = this.id
    await this.getLeaveCompanyReasonChart(
      this.leaveCompanyReasonChartOption.getFullYear()
    )
    await this.getPaidLeaveReasonChart({
      year: new Date().getFullYear(),
      employeeId: this.paidLeaveReasonChartEmployeeId,
    })
    this.loadingSynthetic = false
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
.title {
  font-size: 2.25rem;
  font-family: 'Roboto', sans-serif;
}

.synthetic__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.synthetic__header-text {
  font-weight: 600;
  font-size: 20px;
}

.clearfix-synthetic {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard__col {
  margin-bottom: 16px;
}

.dashboard-column__height {
  height: 300px;
}
</style>
<style>
.el-card__header {
  border: none;
  padding: 18px 20px 0 20px;
}
</style>
