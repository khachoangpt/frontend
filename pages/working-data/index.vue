<template>
  <div
    v-loading.fullscreen.lock="loadingWorkingData"
    element-loading-background="rgba(0, 0, 0, 0.2)"
    type="primary"
  >
    <div class="time-keeping__header">
      <div class="time-keeping__header-text">
        {{ $i18n.t('workingData.workingData') }}
      </div>
      <div>
        <el-date-picker
          :value="monthSearch"
          type="month"
          placeholder="Tìm kiếm"
          format="MMMM - yyyy"
          :clearable="false"
          @input="selectMonth"
          @change="onChangeMonth"
        >
        </el-date-picker>
        <el-dropdown
          :disabled="workingDataList <= 0"
          @command="exportTimekeeping"
        >
          <el-button class="header-actions__button" type="success">
            Export
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="excel"> Excel </el-dropdown-item>
            <el-dropdown-item command="csv"> CSV </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <working-data-table />
        </el-card>
      </el-col>
      <!-- <el-col :span="4">
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
          <h3>Phòng ban</h3>
          <el-checkbox
            v-for="(area, index) in listArea"
            :key="index"
            class="time-keeping__filter-check-box"
            @change="onChangeCheckboxArea(area.name)"
            >{{ area.name }}</el-checkbox
          >
        </el-card>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import WorkingDataTable from '~/components/table/WorkingDataTable.vue'
import { EOffice, EArea } from '~/constants/enums'
export default {
  name: 'WorkingData',
  components: { WorkingDataTable },
  layout: 'main',
  middleware: ['auth', 'manager'],
  data() {
    return {
      loadingWorkingData: true,
      filterOffice: [],
      filterArea: [],
    }
  },

  computed: {
    ...mapGetters('timekeeping', [
      'listOfficeFilter',
      'listAreaFilter',
      'workingDataList',
      'selectedTimeRange',
      'monthSearch',
    ]),
    ...mapGetters('user', ['listOffice', 'listArea']),
  },

  async mounted() {
    await this.getAllTimeKeeping([this.selectedTimeRange, 1])
    await this.getListOffice()
    await this.getListArea()
    this.loadingWorkingData = false
  },

  methods: {
    ...mapActions('timekeeping', [
      'exportTimekeeping',
      'getAllTimeKeeping',
      'getListOffice',
      'getListArea',
      'getDaysInMonth',
      'onChangeMonth',
    ]),
    ...mapMutations('timekeeping', [
      'setListOfficeFilter',
      'setListAreaFilter',
      'setMonthSearch',
    ]),

    selectMonth(e) {
      this.$emit('input', e)
      this.setMonthSearch(e)
    },

    async onChangeCheckboxOffice(data) {
      data = EOffice[data]
      const parsedObj = JSON.parse(JSON.stringify(this.listOfficeFilter))
      if (parsedObj.includes(data) === false) {
        await parsedObj.push(data)
        this.setListOfficeFilter(parsedObj)
        await this.getAllTimeKeeping([this.selectedTimeRange, 1])
      } else {
        const index = parsedObj.indexOf(data)
        await parsedObj.splice(index, 1)
        this.setListOfficeFilter(parsedObj)
        await this.getAllTimeKeeping([this.selectedTimeRange, 1])
      }
    },

    async onChangeCheckboxArea(data) {
      data = EArea[data]
      const parsedObj = JSON.parse(JSON.stringify(this.listAreaFilter))
      if (parsedObj.includes(data) === false) {
        await parsedObj.push(data)
        this.setListAreaFilter(parsedObj)
        await this.getAllTimeKeeping([this.selectedTimeRange, 1])
      } else {
        const index = parsedObj.indexOf(data)
        await parsedObj.splice(index, 1)
        this.setListAreaFilter(parsedObj)
        await this.getAllTimeKeeping([this.selectedTimeRange, 1])
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

.header-actions__button {
  margin-left: 16px;
}
</style>
