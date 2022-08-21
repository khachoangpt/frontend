<template>
  <vue-good-table
    ref="my-table"
    :columns="columns"
    :rows="allTimeKeeping"
    :select-options="{
      enabled: true,
      selectOnCheckboxOnly: true,
      selectionInfoClass: 'select-info-class',
      selectionText: $i18n.t('workingData.rowSelected'),
      clearSelectionText: $i18n.t('workingData.clear'),
    }"
    :pagination-options="{
      enabled: true,
    }"
    @on-selected-rows-change="onSelectedRowsChange"
    @on-row-dblclick="onRowDoubleClick"
  >
    <template slot="pagination-bottom">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="8"
        :total="totalPage"
        @current-change="currentChange"
      >
      </el-pagination>
    </template>
  </vue-good-table>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },

  computed: {
    ...mapGetters('timekeeping', [
      'allTimeKeeping',
      'totalPage',
      'selectedTimeRange',
      'workingDataList',
      'monthSearch',
      'columns',
    ]),
  },

  async mounted() {
    this.setWorkingDataList(0)
    await this.getDaysInMonth({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    })
  },

  methods: {
    ...mapActions('timekeeping', ['getAllTimeKeeping', 'getDaysInMonth']),
    ...mapMutations('timekeeping', ['setListEmployeeId', 'setWorkingDataList']),
    onSelectedRowsChange() {
      const employeeIdSelectedList = []
      this.setWorkingDataList(this.$refs['my-table'].selectedRows.length)
      for (let i = 0; i < this.workingDataList; i++) {
        employeeIdSelectedList.push(
          this.$refs['my-table'].selectedRows[i].employee_id
        )
      }
      this.setListEmployeeId(employeeIdSelectedList)
    },

    async currentChange(page) {
      await this.getAllTimeKeeping([this.selectedTimeRange, page])
    },

    onRowDoubleClick(params) {
      this.$router.push('/working-data/' + params.row.employee_id)
    },
  },
}
</script>

<style>
.select-info-class {
  font-size: 14px !important;
  color: #67c23a !important;
}

.select-info-class a {
  color: #f56c6c;
}
</style>
