<template>
  <div
    v-loading.fullscreen.lock="loadingDashboard"
    element-loading-background="rgba(0, 0, 0, 0.2)"
    type="primary"
    class="dashboard"
  >
    <el-row :gutter="16">
      <el-col class="dashboard__col" :lg="7" :md="12" :sm="12" :xs="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card dashboard-column__height">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">{{
                $i18n.t('dashboard.holidayCompany')
              }}</span>
            </div>
            <Calendar />
          </el-card>
        </div>
      </el-col>
      <el-col
        v-if="!roles.find((role) => role.authority === 'ROLE_ADMIN')"
        class="dashboard__col"
        :lg="17"
        :md="12"
        :sm="24"
        :xs="24"
      >
        <div class="grid-content bg-purple">
          <el-card class="box-card dashboard-column__height">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">{{
                $i18n.t('dashboard.salaryHistory')
              }}</span>
              <el-select
                v-if="!roles.find((role) => role.authority === 'ROLE_USER')"
                v-model="historySalaryOption.employeeById"
                size="small"
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
              <el-select
                v-model="historySalaryOption.type"
                class="salary-history__search-input"
                size="small"
              >
                <el-option
                  v-for="item in historySalaryOption.optionsType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
              <el-date-picker
                v-model="historySalaryOption.date"
                type="year"
                size="small"
                class="salary-history__search-input"
                placeholder="Ngày"
                :disabled="historySalaryOption.type !== 'monthly'"
              >
              </el-date-picker>
            </div>
            <line-chart :values="historySalary" />
          </el-card>
        </div>
      </el-col>
      <el-col
        v-if="!roles.find((role) => role.authority === 'ROLE_ADMIN')"
        class="dashboard__col"
        :lg="8"
        :md="12"
        :sm="24"
        :xs="24"
      >
        <div class="grid-content bg-purple">
          <el-card class="box-card salary-structure-chart">
            <div slot="header" class="salary-structure-chart__header">
              <span class="box-card__header-text">{{
                $i18n.t('dashboard.salaryStructure')
              }}</span>
              <div class="salary-structure-chart__action">
                <el-select
                  v-if="!roles.find((role) => role.authority === 'ROLE_USER')"
                  v-model="salaryStructureEmployeeById"
                  class="salary-structure__search-text"
                  size="small"
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
                  v-model="salaryStructureDate"
                  class="salary-structure__search-text"
                  size="small"
                  type="month"
                  placeholder="Ngày"
                >
                </el-date-picker>
              </div>
            </div>
            <doughnut-chart :values="salaryStructure" />
          </el-card>
        </div>
      </el-col>
      <el-col
        class="dashboard__col"
        :lg="roles.find((role) => role.authority === 'ROLE_ADMIN') ? 18 : 16"
        :md="12"
        :sm="24"
        :xs="24"
      >
        <div class="grid-content bg-purple">
          <el-card class="box-card organization-chart">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">{{
                $i18n.t('dashboard.organization')
              }}</span>
            </div>
            <tree-chart />
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Calendar from '../components/chart/Calendar.vue'
import LineChart from '~/components/chart/LineChart.vue'
import DoughnutChart from '~/components/chart/DoughnutChart.vue'
import TreeChart from '~/components/chart/TreeChart.vue'
export default {
  name: 'HomePage',
  components: { LineChart, TreeChart, DoughnutChart, Calendar },
  layout: 'main',
  middleware: ['auth'],

  data() {
    return {
      loadingDashboard: true,
      value: new Date(),
      historySalaryOption: {
        optionsType: [
          {
            value: 'yearly',
            label: this.$i18n.t('dashboard.year'),
          },
          {
            value: 'monthly',
            label: this.$i18n.t('dashboard.month'),
          },
        ],
        type: 'monthly',
        date: new Date(),
        employeeById: '',
      },
      salaryStructureDate: new Date(),
      salaryStructureEmployeeById: '',
    }
  },

  computed: {
    ...mapGetters('auth', ['roles', 'id', 'fullName']),
    ...mapGetters('salary', [
      'historySalary',
      'salaryStructure',
      'employeeById',
    ]),
    employeeByIdOptions() {
      return [
        { value: this.id, label: `${this.fullName} - ${this.id} (me)` },
        ...this.employeeById.map(({ employeeID, name }) => ({
          value: employeeID,
          label: `${name} - ${employeeID}`,
        })),
      ]
    },
  },
  watch: {
    'historySalaryOption.type'(type) {
      const { date } = this.historySalaryOption
      this.getHistorySalary({
        type,
        date,
        employeeId: this.historySalaryOption.employeeById,
      })
    },
    'historySalaryOption.date'(date) {
      const { type } = this.historySalaryOption
      this.getHistorySalary({
        type,
        date,
        employeeId: this.historySalaryOption.employeeById,
      })
    },
    'historySalaryOption.employeeById'(value) {
      const { type, date } = this.historySalaryOption
      this.getHistorySalary({ type, date, employeeId: value })
    },
    salaryStructureDate() {
      this.getSalaryStructure({
        date: this.salaryStructureDate,
        employeeId: this.salaryStructureEmployeeById,
      })
    },
    salaryStructureEmployeeById() {
      this.getSalaryStructure({
        date: this.salaryStructureDate,
        employeeId: this.salaryStructureEmployeeById,
      })
    },
  },

  async mounted() {
    if (this.roles.find((role) => role.authority === 'ROLE_MANAGER')) {
      await this.getEmployeeById()
    }
    if (!this.roles.find((role) => role.authority === 'ROLE_ADMIN')) {
      this.historySalaryOption.employeeById = this.id
      this.salaryStructureEmployeeById = this.id
      await this.getHistorySalary({
        ...this.historySalaryOption,
        employeeId: this.historySalaryOption.employeeById,
      })
      await this.getSalaryStructure({
        date: this.salaryStructureDate,
        employeeId: this.salaryStructureEmployeeById,
      })
    }
    this.loadingDashboard = false
  },

  methods: {
    ...mapActions('user', ['getPersonnelList']),
    ...mapActions('salary', [
      'getHistorySalary',
      'getSalaryStructure',
      'getEmployeeById',
    ]),
  },
}
</script>

<style>
.dashboard {
  width: 100%;
}

.dashboard__col {
  margin-bottom: 16px;
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
  align-items: center;
}

.vc-container {
  border: none;
}

.dashboard-column__height {
  height: 320px;
}

.salary-structure-chart {
  height: 360px;
}

.el-card__header {
  border: none;
  padding: 18px 20px 0 20px;
}

.salary-structure-chart__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.salary-structure-chart__action {
  display: flex;
  flex-direction: column;
}

.salary-structure__search-text {
  margin-top: 8px;
  width: 190px !important;
}

.salary-history__search-input {
  width: 100px !important;
}
</style>
