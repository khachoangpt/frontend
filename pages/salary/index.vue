<template>
  <div class="salary">
    <div class="salary__header">
      <div class="salary__header-text">Quản lý tiền lương</div>
    </div>
    <div class="salary__header-actions">
      <el-autocomplete
        v-if="activeName === 'second'"
        v-model="employeeSearch"
        :clearable="true"
        class="header-actions__search"
        placeholder="Tên nhân viên"
        :fetch-suggestions="querySearch"
        @select="handleChangeEmployee"
        @clear="handleChangeEmployee"
      ></el-autocomplete>
      <el-select
        v-if="activeName === 'second'"
        v-model="statusText"
        class="header-actions__search-status"
        placeholder="Select"
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
        v-if="activeName === 'second'"
        :value="monthSearch"
        type="month"
        placeholder="Tìm kiếm"
        format="MMMM - yyyy"
        :clearable="false"
        @input="selectMonth"
        @change="onChangeMonth"
      >
      </el-date-picker>
      <el-date-picker
        v-if="activeName === 'first'"
        :value="yearSearch"
        type="year"
        placeholder="Tìm kiếm"
        format="yyyy"
        :clearable="false"
        @input="selectYear"
        @change="onChangeYear"
      >
      </el-date-picker>
      <el-button
        class="salary__export"
        type="success"
        :disabled="salaryDataList <= 0"
        @click="exportSalary"
      >
        Export
      </el-button>
    </div>
    <div class="salary-table">
      <el-tabs
        v-model="activeName"
        type="border-card"
        @tab-click="handleChangeTabSalary"
      >
        <el-tab-pane label="Cá nhân" name="first">
          <vue-good-table
            ref="salary-table"
            :columns="salaryHistoryListHeader"
            :rows="salaryHistoryList"
            :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
            sort-options="{
          enabled: true,
        }"
            @on-row-dblclick="onRowDoubleClick"
            @on-selected-rows-change="onSelectedRowsChange"
          >
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
                size="medium"
                type="primary"
                @click="handleClickCheckSalary"
              >
                Đã xem
              </el-button>
              <el-button
                size="medium"
                type="danger"
                @click="handleClickRejectSalary"
              >
                Từ chối
              </el-button>
              <el-button size="medium" type="success" @click="approveSalary">
                Chốt bảng lương
              </el-button>
            </div>
          </vue-good-table>
        </el-tab-pane>
        <el-tab-pane label="Bảng lương" name="second">
          <vue-good-table
            ref="salary-table"
            :columns="salaryListHeader"
            :rows="salaryList"
            :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
            sort-options="{
          enabled: true,
        }"
            :pagination-options="{
              enabled: true,
            }"
            @on-row-dblclick="onRowDoubleClick"
            @on-selected-rows-change="onSelectedRowsChange"
          >
            <template slot="pagination-bottom">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="5"
                :total="totalPage"
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
                v-if="isShowCheck"
                size="medium"
                type="primary"
                @click="handleClickCheckSalary"
              >
                Đã xem
              </el-button>
              <el-button
                v-if="isShowReject"
                size="medium"
                type="danger"
                @click="handleClickRejectSalary"
              >
                Từ chối
              </el-button>
              <el-button
                v-if="isShowApprove"
                size="medium"
                type="success"
                @click="approveSalary"
              >
                Chốt bảng lương
              </el-button>
            </div>
          </vue-good-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="Chuyển tiếp bảng lương"
      :visible.sync="checkDialogVisible"
      top="30vh"
      width="30%"
      :before-close="closeDialog"
    >
      <div class="dialog-check-salary__label">
        Nhập tên người muốn chuyển tiếp:
      </div>
      <el-autocomplete
        v-model="managerApprove"
        :clearable="true"
        placeholder="Tên quản lý"
        :fetch-suggestions="querySearchManager"
        @select="handleChangeManager"
        @clear="handleChangeManager"
      ></el-autocomplete>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">Đóng</el-button>
        <el-button size="small" type="primary" @click="submitCheckSalary"
          >Xác nhận</el-button
        >
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
    }
  },

  computed: {
    ...mapGetters('salary', [
      'monthSearch',
      'yearSearch',
      'salaryListHeader',
      'salaryList',
      'totalPage',
      'salaryDataList',
      'listSalaryId',
      'salaryHistoryListHeader',
      'salaryHistoryList',
      'listEmployeeByManager',
      'checkDialogVisible',
      'listManagerOfArea',
      'searchManagerText',
    ]),
  },

  async mounted() {
    await this.getEmployeeByManager()
    await this.getListPersonalSalary()
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

    onSelectedRowsChange() {
      this.isShowCheck = true
      this.isShowReject = true
      this.isShowApprove = true
      const salaryIdSelectedList = []
      this.setSalaryDataList(this.$refs['salary-table'].selectedRows.length)
      for (let i = 0; i < this.salaryDataList; i++) {
        if (
          this.$refs['salary-table'].selectedRows[i].salaryStatus ===
            'APPROVED' ||
          this.$refs['salary-table'].selectedRows[i].salaryStatus === 'REJECTED'
        ) {
          this.isShowCheck = false
          this.isShowReject = false
          this.isShowApprove = false
        }
        salaryIdSelectedList.push(
          this.$refs['salary-table'].selectedRows[i].salaryMonthlyId
        )
      }
      this.setListSalaryId(salaryIdSelectedList)
    },

    handleClickRejectSalary() {
      this.$prompt('Nhập lý do từ chối:', 'Từ chối bảng lương', {
        confirmButtonText: 'Xong',
        cancelButtonText: 'Đóng',
      })
        .then(({ value }) => {
          this.rejectSalary(value)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled',
          })
        })
    },

    async handleClickCheckSalary() {
      await this.setCheckDialogVisible(true)
      await this.getManagerOfArea()
    },

    async handleChangeTabSalary(data) {
      if (data.name === 'second') {
        await this.setSearchStatusText('')
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
        return link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
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
  width: auto !important;
}
.dialog-check-salary__label {
  margin-bottom: 12px;
}
</style>
