<template>
  <div>
    <div class="time-keeping__header">
      <div class="time-keeping__header-text">Dữ liệu giờ làm</div>
      <div>
        <el-date-picker
          v-model="monthSearch"
          type="month"
          placeholder="Tìm kiếm"
          format="MMM - yyyy"
          :clearable="false"
          @change="onChangeMonth"
        >
        </el-date-picker>
        <el-button
          :disabled="employeeList <= 0"
          class="time-keeping__export"
          type="success"
          @click="exportTimekeeping"
        >
          Export
        </el-button>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="20">
        <el-card>
          <vue-good-table
            ref="my-table"
            :columns="columns"
            :rows="allTimeKeeping"
            :select-options="{ enabled: true }"
            :pagination-options="{
              enabled: true,
            }"
            @on-selected-rows-change="onSelectedRowsChange"
          >
            <template slot="pagination-bottom" slot-scope="props">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="props.total"
                @current-change="currentChange"
              >
              </el-pagination>
            </template>
          </vue-good-table>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="time-keeping__filter">
          <h3>Văn phòng</h3>
          <el-checkbox
            v-for="(office, index) in listOffice"
            :key="index"
            class="time-keeping__filter-check-box"
            @change="onChangeCheckboxOffice(office.name)"
            >{{ office.name }}</el-checkbox
          >
        </el-card>
        <el-card class="time-keeping__filter">
          <h3>Lĩnh vực</h3>
          <el-checkbox
            v-for="(area, index) in listArea"
            :key="index"
            class="time-keeping__filter-check-box"
            @change="onChangeCheckboxArea(area.name)"
            >{{ area.name }}</el-checkbox
          >
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'WorkingData',
  layout: 'main',
  middleware: ['auth', 'admin'],
  data() {
    return {
      monthSearch: new Date(),
      columns: [
        {
          label: 'Nhân viên',
          field: 'full_name',
          width: '150px',
        },
        {
          label: 'mã',
          field: 'employee_id',
          width: '50px',
        },
      ],
      employeeList: [],
      filterOffice: [],
      filterArea: [],
    }
  },

  computed: {
    ...mapGetters('timekeeping', [
      'allTimeKeeping',
      'selectedTimeRange',
      'listOfficeFilter',
      'listAreaFilter',
    ]),
    ...mapGetters('user', ['listOffice', 'listArea']),
  },

  async mounted() {
    await this.getDaysInMonth(
      this.monthSearch.getMonth() + 1,
      this.monthSearch.getFullYear()
    )
    await this.getAllTimeKeeping(this.selectedTimeRange)
    await this.getListOffice()
    await this.getListArea()
  },

  methods: {
    ...mapActions('timekeeping', [
      'exportTimekeeping',
      'getAllTimeKeeping',
      'getListOffice',
      'getListArea',
    ]),
    ...mapMutations('timekeeping', [
      'setSelectedTimeRange',
      'setListEmployeeId',
      'setListOfficeFilter',
      'setListAreaFilter',
    ]),
    getDaysInMonth(month, year) {
      this.columns = [
        {
          label: 'Nhân viên',
          field: 'full_name',
          width: '150px',
        },
        {
          label: 'mã',
          field: 'employee_id',
          width: '50px',
        },
      ]
      const date = new Date(year, month - 1, 1)
      const days = []
      while (date.getMonth() === month - 1) {
        days.push(new Date(date))
        const day = {
          label: date.getDate() + '/' + (date.getMonth() + 1),
          field: date.getDate().toString(),
          width: '50px',
          sortable: false,
          thClass: 'table-header-center',
          tdClass: 'day-status',
          html: true,
        }
        this.columns.push(day)
        date.setDate(date.getDate() + 1)
      }
      return days
    },

    async onChangeMonth() {
      this.getDaysInMonth(
        this.monthSearch.getMonth() + 1,
        this.monthSearch.getFullYear()
      )
      const timeRange = {
        startDate: Date.parse(
          new Date(
            this.monthSearch.getFullYear(),
            this.monthSearch.getMonth(),
            1
          )
        ),
        endDate: Date.parse(
          new Date(
            this.monthSearch.getFullYear(),
            this.monthSearch.getMonth() + 1,
            0
          )
        ),
      }
      await this.setSelectedTimeRange(timeRange)
      await this.getAllTimeKeeping(this.selectedTimeRange)
    },

    currentChange(page) {},

    onSelectedRowsChange() {
      const employeeIdSelectedList = []
      this.employeeList = this.$refs['my-table'].selectedRows
      for (let i = 0; i < this.employeeList.length; i++) {
        employeeIdSelectedList.push(this.employeeList[i].employee_id)
      }
      this.setListEmployeeId(employeeIdSelectedList)
    },

    async onChangeCheckboxOffice(data) {
      const parsedobj = JSON.parse(JSON.stringify(this.listOfficeFilter))
      if (parsedobj.includes(data) === false) {
        await parsedobj.push(data)
        await this.setListOfficeFilter(parsedobj)
        await this.getAllTimeKeeping(this.selectedTimeRange)
      } else {
        const index = parsedobj.indexOf(data)
        await parsedobj.splice(index, 1)
        await this.setListOfficeFilter(parsedobj)
        await this.getAllTimeKeeping(this.selectedTimeRange)
      }
    },

    async onChangeCheckboxArea(data) {
      const parsedobj = JSON.parse(JSON.stringify(this.listAreaFilter))
      if (parsedobj.includes(data) === false) {
        await parsedobj.push(data)
        await this.setListAreaFilter(parsedobj)
        await this.getAllTimeKeeping(this.selectedTimeRange)
      } else {
        const index = parsedobj.indexOf(data)
        await parsedobj.splice(index, 1)
        await this.setListAreaFilter(parsedobj)
        await this.getAllTimeKeeping(this.selectedTimeRange)
      }
    },
  },
}
</script>

<style>
.vgt-left-align {
  text-align: center;
}

.checkin-color {
  color: #67c23a;
}

.checkout-color {
  color: #f56c6c;
}

.time-keeping__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  display: flex;
}

.time-keeping__header-text {
  font-weight: 600;
  font-size: 20px;
}

.vgt-table th {
  padding: 0.75em 1.5em 0.75em 1.75em;
}

.time-keeping__export {
  margin-left: 16px;
}

.time-keeping__filter {
  margin-bottom: 16px;
}

.time-keeping__filter-check-box {
  margin-bottom: 8px;
  display: block;
}

.el-pagination {
  margin-top: 16px;
  text-align: center;
  padding-bottom: 16px;
}
</style>
