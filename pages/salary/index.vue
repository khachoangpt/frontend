<template>
  <div
    v-loading.fullscreen.lock="loadingSalary"
    element-loading-background="rgba(0, 0, 0, 0.2)"
    type="primary"
    class="salary"
  >
    <div class="salary__header">
      <div class="salary__header-text">
        {{ $i18n.t('salary.payrollAccounting') }}
      </div>
    </div>
    <div class="salary__header-actions">
      <el-autocomplete
        v-if="activeName === 'second'"
        v-model="employeeSearch"
        :clearable="true"
        class="header-actions__search"
        :placeholder="$i18n.t('salary.employeeName')"
        :fetch-suggestions="querySearch"
        @select="handleChangeEmployee"
        @clear="handleChangeEmployee"
      ></el-autocomplete>
      <el-select
        v-if="activeName === 'second'"
        v-model="statusText"
        class="header-actions__search-status"
        :placeholder="$i18n.t('salary.status')"
        @change="handleChangeSalaryStatus"
      >
        <el-option
          class="header-actions__item-status-pending"
          label="Pending"
          value="PENDING"
        >
        </el-option>
        <el-option
          class="header-actions__item-status-approve"
          label="Approve"
          value="APPROVED"
        >
        </el-option>
        <el-option
          class="header-actions__item-status-reject"
          label="Reject"
          value="REJECTED"
        >
        </el-option>
      </el-select>
      <el-date-picker
        v-show="activeName === 'second'"
        :value="monthSearch"
        type="month"
        placeholder="Tìm kiếm"
        format="MMMM - yyyy"
        :clearable="false"
        :picker-options="pickerOptions"
        @input="selectMonth"
        @change="onChangeMonth"
      >
      </el-date-picker>
      <!-- <el-date-picker
        v-if="activeName === 'first'"
        :value="yearSearch"
        type="year"
        placeholder="Tìm kiếm"
        format="yyyy"
        :clearable="false"
        @input="selectYear"
        @change="onChangeYear"
      >
      </el-date-picker> -->
      <el-date-picker
        v-show="activeName === 'first'"
        :value="yearSearch"
        type="monthrange"
        :clearable="false"
        range-separator="To"
        start-placeholder="Start month"
        end-placeholder="End month"
        @input="selectYear"
        @change="onChangeYear"
      >
      </el-date-picker>
      <el-dropdown
        :disabled="salaryDataList <= 0"
        @command="exportRequestSelected"
      >
        <el-button class="header-actions__button" type="success">
          Export
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="excel"> Excel </el-dropdown-item>
          <el-dropdown-item command="csv"> CSV </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <el-button
        class="salary__export"
        type="success"
        :disabled="salaryDataList <= 0"
        @click="exportSalary(activeName)"
      >
        Export
      </el-button> -->
    </div>
    <div class="salary-table">
      <vue-good-table
        v-if="roles.find((role) => role.authority === 'ROLE_USER')"
        ref="salary-table-1"
        :columns="salaryHistoryListHeader"
        :rows="salaryHistoryList"
        :select-options="{
          enabled: true,
          selectOnCheckboxOnly: true,
          selectionInfoClass: 'select-info-class',
          selectionText: $i18n.t('request.table.rowSelected'),
          clearSelectionText: $i18n.t('request.table.clear'),
        }"
        :sort-options="{
          enabled: true,
          initialSortBy: { field: 'month', type: 'asc' },
        }"
        @on-row-dblclick="onRowDoubleClick"
        @on-selected-rows-change="onSelectedRowsChange('salary-table-1')"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'salaryStatus'">
            <span :class="'salary-status__' + props.row.salaryStatus">{{
              props.row.salaryStatus
            }}</span>
          </span>
        </template>
      </vue-good-table>
      <el-tabs
        v-if="!roles.find((role) => role.authority === 'ROLE_USER')"
        v-model="activeName"
        type="border-card"
        @tab-click="handleChangeTabSalary"
      >
        <el-tab-pane :label="$i18n.t('salary.myPayroll')" name="first">
          <vue-good-table
            ref="salary-table-2"
            :columns="salaryHistoryListHeader"
            :rows="salaryHistoryList"
            :select-options="{
              enabled: true,
              selectOnCheckboxOnly: true,
              selectionInfoClass: 'select-info-class',
              selectionText: $i18n.t('request.table.rowSelected'),
              clearSelectionText: $i18n.t('request.table.clear'),
            }"
            :sort-options="{
              enabled: true,
              initialSortBy: { field: 'month', type: 'asc' },
            }"
            @on-row-dblclick="onRowDoubleClick"
            @on-selected-rows-change="onSelectedRowsChange('salary-table-2')"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'salaryStatus'">
                <span :class="'salary-status__' + props.row.salaryStatus">{{
                  props.row.salaryStatus
                }}</span>
              </span>
            </template>
          </vue-good-table>
        </el-tab-pane>
        <el-tab-pane :label="$i18n.t('salary.employeePayroll')" name="second">
          <vue-good-table
            ref="salary-table-3"
            :columns="salaryListHeader"
            :rows="salaryList"
            :select-options="{
              enabled: true,
              selectOnCheckboxOnly: true,
              selectionInfoClass: 'select-info-class',
              selectionText: $i18n.t('request.table.rowSelected'),
              clearSelectionText: $i18n.t('request.table.clear'),
            }"
            sort-options="{
          enabled: true,
        }"
            :pagination-options="{
              enabled: true,
            }"
            @on-row-dblclick="onRowDoubleClick"
            @on-selected-rows-change="onSelectedRowsChange('salary-table-3')"
          >
            <template slot="pagination-bottom">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="10"
                :total="totalPage"
                @current-change="currentChangeSalary"
              >
              </el-pagination>
            </template>
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'salaryStatus'">
                <span :class="'salary-status__' + props.row.salaryStatus">{{
                  props.row.salaryStatus
                }}</span>
              </span>
            </template>
            <div
              slot="selected-row-actions"
              class="salary-table__selected-action-btn"
            >
              <el-button
                v-if="isShowCheck && isEnoughLevelApprove === 'False'"
                size="medium"
                type="primary"
                @click="handleClickCheckSalary"
              >
                {{ $i18n.t('salary.forward') }}
              </el-button>
              <el-button
                v-if="isShowReject && isEnoughLevelApprove === 'True'"
                size="medium"
                type="danger"
                @click="handleClickRejectSalary"
              >
                {{ $i18n.t('salary.reject') }}
              </el-button>
              <el-button
                v-if="isShowApprove && isEnoughLevelApprove === 'True'"
                size="medium"
                type="success"
                @click="approveSalary"
              >
                {{ $i18n.t('salary.approve') }}
              </el-button>
            </div>
          </vue-good-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      :title="$i18n.t('salary.forwardPayroll')"
      :visible.sync="checkDialogVisible"
      top="30vh"
      width="30%"
      :before-close="closeDialog"
    >
      <div class="dialog-check-salary__label">
        {{ $i18n.t('salary.enterManagerForward') }}:
      </div>
      <el-autocomplete
        v-model="managerApprove"
        :clearable="true"
        :placeholder="$i18n.t('salary.manager')"
        :fetch-suggestions="querySearchManager"
        @select="handleChangeManager"
        @clear="handleChangeManager"
      ></el-autocomplete>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">{{
          $i18n.t('salary.deductionDialog.close')
        }}</el-button>
        <el-button size="small" type="primary" @click="submitCheckSalary">
          {{ $i18n.t('salary.deductionDialog.confirm') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'SalaryPage',
  layout: 'main',
  data() {
    return {
      statusText: '',
      activeName: 'first',
      employeeSearch: '',
      managerApprove: '',
      isShowCheck: true,
      isShowReject: true,
      isShowApprove: true,
      loadingSalary: true,
      salaryListHeader: [
        {
          label: this.$i18n.t('salary.employeeName'),
          field: 'fullName',
          width: '150px',
          sortable: false,
        },
        {
          label: 'ID',
          field: 'employeeId',
          width: '50px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.status'),
          field: 'salaryStatus',
          width: '80px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.position'),
          field: 'position',
          width: '80px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.standardWorkingDay'),
          field: 'standardPoint',
          width: '168px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.actualWorkingDay'),
          field: 'actualPoint',
          width: '148px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.otPoint'),
          field: 'otPoint',
          width: '70px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.deduction'),
          field: 'totalDeduction',
          width: '68px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.insurance'),
          field: 'totalInsurance',
          width: '74px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.tax'),
          field: 'totalTax',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.bonus'),
          field: 'totalBonus',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.advance'),
          field: 'totalAdvance',
          width: '70px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.salaryReceived'),
          field: 'finalSalary',
          width: '140px',
          sortable: false,
        },
      ],
      salaryHistoryListHeader: [
        {
          label: this.$i18n.t('salary.month'),
          field: 'month',
          width: '50px',
          sortable: true,
        },
        {
          label: this.$i18n.t('salary.status'),
          field: 'salaryStatus',
          width: '80px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.position'),
          field: 'position',
          width: '80px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.standardWorkingDay'),
          field: 'standardPoint',
          width: '168px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.actualWorkingDay'),
          field: 'actualPoint',
          width: '148px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.otPoint'),
          field: 'otPoint',
          width: '70px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.deduction'),
          field: 'totalDeduction',
          width: '68px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.insurance'),
          field: 'totalInsurance',
          width: '74px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.tax'),
          field: 'totalTax',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.bonus'),
          field: 'totalBonus',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.advance'),
          field: 'totalAdvance',
          width: '70px',
          sortable: false,
        },
        {
          label: this.$i18n.t('salary.salaryReceived'),
          field: 'finalSalary',
          width: '140px',
          sortable: false,
        },
      ],
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() >=
            new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          )
        },
      },
    }
  },

  computed: {
    ...mapGetters('auth', ['roles']),
    ...mapGetters('salary', [
      'monthSearch',
      'yearSearch',
      'salaryList',
      'totalPage',
      'salaryDataList',
      'listSalaryId',
      'salaryHistoryList',
      'listEmployeeByManager',
      'checkDialogVisible',
      'listManagerOfArea',
      'searchManagerText',
      'isEnoughLevelApprove',
      'listDeductionType',
    ]),
  },

  async mounted() {
    this.setSalaryDataList(0)
    if (!this.roles.find((role) => role.authority === 'ROLE_USER')) {
      await this.getEmployeeByManager()
    }
    await this.getListPersonalSalary()
    this.loadingSalary = false
    this.setListSalaryId([])
  },

  methods: {
    ...mapActions('user', ['getEmployeeByManager']),
    ...mapActions('salary', [
      'onChangeMonth',
      'onChangeYear',
      'onRowDoubleClick',
      'getListSalary',
      'exportSalary',
      'handleChangeSalaryStatus',
      'approveSalary',
      'rejectSalary',
      'checkSalary',
      'getListPersonalSalary',
      'getManagerOfArea',
      'currentChangeSalary',
    ]),
    ...mapMutations('salary', [
      'setMonthSearch',
      'setYearSearch',
      'setSalaryDataList',
      'setListSalaryId',
      'setSearchStatusText',
      'setSearchEmployeeText',
      'setCheckDialogVisible',
      'setSearchManagerText',
    ]),
    selectMonth(e) {
      this.$emit('input', e)
      this.setMonthSearch(e)
    },
    selectYear(e) {
      this.$emit('input', e)
      this.setYearSearch(e)
    },

    async onSelectedRowsChange(tableName) {
      this.isShowCheck = true
      this.isShowReject = true
      this.isShowApprove = true
      const salaryIdSelectedList = []
      await this.setSalaryDataList(this.$refs[tableName].selectedRows.length)
      for (let i = 0; i < this.salaryDataList; i++) {
        if (this.$refs[tableName].selectedRows[i].salaryStatus === 'REJECTED') {
          this.isShowCheck = true
          this.isShowReject = false
          this.isShowApprove = true
        }
        if (this.$refs[tableName].selectedRows[i].salaryStatus === 'APPROVED') {
          this.isShowApprove = false
          this.isShowCheck = false
          this.isShowReject = false
        }
        if (this.$refs[tableName].selectedRows[i].salaryStatus === 'PENDING') {
          this.isShowCheck = true
          this.isShowReject = true
        }
        salaryIdSelectedList.push(
          this.$refs[tableName].selectedRows[i].salaryMonthlyId
        )
      }
      await this.setListSalaryId(salaryIdSelectedList)
    },

    handleClickRejectSalary() {
      this.$prompt(
        this.$i18n.t('salary.enterReason'),
        this.$i18n.t('salary.rejectPayroll'),
        {
          confirmButtonText: this.$i18n.t('salary.deductionDialog.confirm'),
          cancelButtonText: this.$i18n.t('salary.deductionDialog.close'),
        }
      )
        .then(({ value }) => {
          this.rejectSalary(value)
        })
        .catch(() => {})
    },

    async handleClickCheckSalary() {
      await this.setCheckDialogVisible(true)
      await this.getManagerOfArea()
    },

    async handleChangeTabSalary(data) {
      if (data.name === 'second') {
        await this.setSearchStatusText('')
        this.statusText = ''
        this.employeeSearch = ''
        await this.setSearchEmployeeText('')
        await this.getListSalary(1)
      } else if (data.name === 'first') {
        await this.getListPersonalSalary()
      }
    },

    async handleChangeSalaryStatus(data) {
      await this.setSearchStatusText(data)
      await this.getListSalary(1)
    },

    querySearch(queryString, cb) {
      const results = queryString
        ? this.listEmployeeByManager.filter(this.createFilter(queryString))
        : this.listEmployeeByManager
      cb(results)
    },

    querySearchManager(queryString, cb) {
      const results = queryString
        ? this.listManagerOfArea.filter(this.createFilter(queryString))
        : this.listManagerOfArea
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

    async handleChangeEmployee(data) {
      await this.setSearchEmployeeText(data)
      await this.getListSalary(1)
    },

    async handleChangeManager(data) {
      await this.setSearchManagerText(data)
    },

    async closeDialog() {
      await this.setCheckDialogVisible(false)
    },

    submitCheckSalary() {
      this.checkSalary()
    },

    exportRequestSelected(data) {
      this.exportSalary([this.activeName, data])
    },
  },
}
</script>

<style scoped>
.salary__header {
  display: flex;
  justify-content: space-between;
}

.salary__header-text {
  font-weight: 600;
  font-size: 20px;
}

.salary__export {
  margin-left: 16px;
}

.salary-table {
  margin-top: 30px;
}
</style>

<style>
.el-pagination {
  margin-top: 16px;
  text-align: center;
  padding-bottom: 16px;
}

.vgt-left-align {
  text-align: center;
}

.header-actions__search {
  width: 240px;
  margin-right: 12px;
}

.salary__header-actions {
  display: flex;
  justify-content: flex-end;
  margin: 18px 0;
}

.header-actions__search-status {
  margin-right: 8px;
  width: 200px;
}

.salary-status__PENDING {
  background-color: #e6a23c;
  color: #fff;
  padding: 6px;
  border-radius: 5px;
}

.salary-status__APPROVED {
  background-color: #67c23a;
  color: #fff;
  padding: 6px;
  border-radius: 5px;
}

.salary-status__REJECTED {
  background-color: #f56c6c;
  color: #fff;
  padding: 6px;
  border-radius: 5px;
}

.salary-table .vgt-selection-info-row {
  line-height: 40px;
}

.salary-table__selected-action-btn {
  margin-left: 30px;
}

.header-actions__item-status-pending {
  color: #e6a23c;
}

.header-actions__item-status-approve {
  color: #67c23a;
}

.header-actions__item-status-reject {
  color: #f56c6c;
}

.el-autocomplete-suggestion {
  width: fit-content !important;
}
.dialog-check-salary__label {
  margin-bottom: 12px;
}

.header-actions__button {
  margin-left: 16px;
}
</style>
