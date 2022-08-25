<template>
  <div
    v-loading.fullscreen.lock="loadingDashboard"
    element-loading-background="rgba(0, 0, 0, 0.2)"
    type="primary"
    class="dashboard"
  >
    <el-row :gutter="16">
      <el-col class="dashboard__col" :lg="6" :md="8" :sm="24" :xs="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card dashboard-column__height">
            <div slot="header" class="clearfix-dashboard">
              <span class="box-card__header-text">{{
                $i18n.t('dashboard.holidayCompany')
              }}</span>
              <el-switch
                v-if="roles.find((role) => role.authority === 'ROLE_ADMIN')"
                v-model="isEditCalendar"
                @change="onChangeEditCalendar"
              >
              </el-switch>
            </div>
            <Calendar />
          </el-card>
        </div>
      </el-col>
      <el-col
        v-if="!roles.find((role) => role.authority === 'ROLE_ADMIN')"
        class="dashboard__col"
        :lg="18"
        :md="16"
        :sm="24"
        :xs="24"
      >
        <div class="grid-content bg-purple">
          <el-card class="box-card dashboard-column__height">
            <div slot="header" class="clearfix-dashboard">
              <span class="box-card__header-text">{{
                $i18n.t('dashboard.salaryHistory')
              }}</span>
              <el-autocomplete
                v-if="!roles.find((role) => role.authority === 'ROLE_USER')"
                class="salary-history__search-employee"
                :clearable="true"
                :value="employeeNameSalaryHistory"
                size="small"
                :fetch-suggestions="querySearch"
                @input="updateEmployeeNameSalaryHistory"
                @select="handleSelectEmployeeSalaryHistory"
              ></el-autocomplete>
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
                :clearable="false"
                type="year"
                size="small"
                class="salary-history__search-input"
                placeholder="Ngày"
                :disabled="historySalaryOption.type !== 'monthly'"
                :picker-options="pickerOptions"
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
                <el-autocomplete
                  v-if="!roles.find((role) => role.authority === 'ROLE_USER')"
                  :clearable="true"
                  :value="employeeNameSalaryStructure"
                  size="small"
                  :fetch-suggestions="querySearch"
                  @input="updateEmployeeNameSalaryStructure"
                  @select="handleSelectEmployeeSalaryStructure"
                ></el-autocomplete>
                <el-date-picker
                  v-model="salaryStructureDate"
                  :clearable="false"
                  class="salary-structure__search-text"
                  size="small"
                  type="month"
                  placeholder="Ngày"
                  :picker-options="pickerOptions"
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
            <div slot="header" class="clearfix-dashboard">
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
import { Message } from 'element-ui'
import { mapActions, mapGetters, mapMutations } from 'vuex'
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
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() >=
            new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          )
        },
      },
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
      salaryStructureDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        1
      ),
      salaryStructureEmployeeById: '',
      isEditCalendar: false,
    }
  },

  computed: {
    ...mapGetters('auth', ['roles', 'id', 'fullName']),
    ...mapGetters('user', [
      'employeeNameSalaryHistory',
      'employeeNameSalaryStructure',
      'enableEditCalendar',
    ]),
    ...mapGetters('salary', [
      'historySalary',
      'salaryStructure',
      'employeeById',
    ]),
    employeeByIdOptions() {
      return [
        { label: this.id, value: `${this.fullName} - ${this.id} (me)` },
        ...this.employeeById.map(({ employeeID, name }) => ({
          label: employeeID,
          value: `${name} - ${employeeID}`,
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
      await this.updateEmployeeNameSalaryHistory(
        this.employeeByIdOptions[0].value
      )
      await this.updateEmployeeNameSalaryStructure(
        this.employeeByIdOptions[0].value
      )
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
    ...mapMutations('user', [
      'updateEmployeeNameSalaryHistory',
      'updateEmployeeNameSalaryStructure',
      'setEnableEditCalendar',
    ]),

    querySearch(queryString, cb) {
      const results = queryString
        ? this.employeeByIdOptions.filter(this.createFilter(queryString))
        : this.employeeByIdOptions
      cb(results)
    },
    createFilter(queryString) {
      return (link) => {
        return (
          this.removeMark(link.value.toLowerCase()).includes(
            this.removeMark(queryString.toLowerCase())
          ) === true
        )
      }
    },

    removeMark(str) {
      str = str.replace(/\s+/g, ' ')
      str = str.trim()
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      str = str.replace(/đ/g, 'd')
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
      str = str.replace(/Đ/g, 'D')
      return str
    },

    handleSelectEmployeeSalaryHistory(data) {
      this.historySalaryOption.employeeById = data.label
    },

    handleSelectEmployeeSalaryStructure(data) {
      this.salaryStructureEmployeeById = data.label
    },

    onChangeEditCalendar() {
      this.setEnableEditCalendar(!this.enableEditCalendar)
      if (this.enableEditCalendar === true) {
        Message.success('Opened edit calendar')
      } else {
        Message.success('Closed edit calendar')
      }
    },
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

/* .clearfix-dashboard:before,
.clearfix-dashboard:after {
  display: table;
  content: '';
}
.clearfix-dashboard:after {
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

.clearfix-dashboard {
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
}

.salary-history__search-input {
  width: 100px !important;
}
</style>
