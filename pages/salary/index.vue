<template>
  <div class="salary">
    <div class="salary__header">
      <div class="salary__header-text">Quản lý tiền lương</div>
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
        <el-button
          class="salary__export"
          type="success"
          :disabled="salaryDataList.length <= 0"
          @click="exportSalary"
        >
          Export
        </el-button>
      </div>
    </div>
    <div class="salary-table">
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
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'SalaryPage',
  layout: 'main',
  data() {
    return {}
  },

  computed: {
    ...mapGetters('salary', [
      'monthSearch',
      'salaryListHeader',
      'salaryList',
      'totalPage',
      'salaryDataList',
    ]),
  },

  async mounted() {
    await this.getListSalary(1)
  },

  methods: {
    ...mapActions('salary', [
      'onChangeMonth',
      'onRowDoubleClick',
      'getListSalary',
      'exportSalary',
    ]),
    ...mapMutations('salary', [
      'setMonthSearch',
      'setSalaryDataList',
      'setListSalaryId',
    ]),
    selectMonth(e) {
      this.$emit('input', e)
      this.setMonthSearch(e)
    },

    onSelectedRowsChange() {
      const salaryIdSelectedList = []
      this.setSalaryDataList(this.$refs['salary-table'].selectedRows.length)
      for (let i = 0; i < this.salaryDataList; i++) {
        salaryIdSelectedList.push(
          this.$refs['salary-table'].selectedRows[i].salary_monthly_id
        )
      }
      this.setListSalaryId(salaryIdSelectedList)
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
</style>
