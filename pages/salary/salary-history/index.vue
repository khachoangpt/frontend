<template>
  <div class="salary">
    <div class="salary__header">
      <div class="salary__header-text">Lịch sử lương</div>
      <div>
        <el-input
          v-if="activeTable === 'second'"
          :value="searchEmployeeText"
          class="header-actions__search"
          placeholder="Tên nhân viên"
          @input="inputSearch"
        >
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-date-picker
          :value="yearSearch"
          type="year"
          placeholder="Tìm kiếm"
          format="yyyy"
          :clearable="false"
          @input="selectYear"
        >
        </el-date-picker>
        <el-button
          class="salary__export"
          type="success"
          :disabled="salaryHistoryDataList.length <= 0"
          @click="exportSalary"
        >
          Export
        </el-button>
      </div>
    </div>
    <div class="salary-table">
      <el-tabs v-model="activeTable" type="border-card" @tab-click="clickTab">
        <el-tab-pane label="Lịch sử cá nhân" name="first">
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
          </vue-good-table>
        </el-tab-pane>
        <el-tab-pane label="Lịch sử nhân viên" name="second">
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
          </vue-good-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'SalaryPage',
  layout: 'main',
  data() {
    return {
      activeTable: 'first',
    }
  },

  computed: {
    ...mapGetters('salary', [
      'yearSearch',
      'salaryHistoryListHeader',
      'salaryHistoryList',
      'totalPage',
      'salaryHistoryDataList',
      'searchEmployeeText',
    ]),
  },

  async mounted() {},

  methods: {
    ...mapActions('salary', [
      'onChangeYear',
      'onRowDoubleClick',
      'getListSalary',
      'exportSalary',
    ]),
    ...mapMutations('salary', [
      'setYearSearch',
      'setSalaryHistoryDataList',
      'setListSalaryId',
      'setSearchEmployeeText',
    ]),
    selectYear(e) {
      this.$emit('input', e)
      this.setYearSearch(e)
    },

    onSelectedRowsChange() {
      const salaryIdSelectedList = []
      this.setSalaryHistoryDataList(
        this.$refs['salary-table'].selectedRows.length
      )
      for (let i = 0; i < this.salaryHistoryDataList; i++) {
        salaryIdSelectedList.push(
          this.$refs['salary-table'].selectedRows[i].salary_monthly_id
        )
      }
      this.setListSalaryId(salaryIdSelectedList)
    },

    clickTab(tab) {
      console.log(this.activeTable)
    },

    inputSearch(e) {
      this.$emit('input', e)
      this.setSearchEmployeeText(e)
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
</style>
