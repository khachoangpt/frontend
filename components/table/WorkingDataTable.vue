<template>
  <vue-good-table
    ref="my-table"
    :columns="columns"
    :rows="allTimeKeeping"
    :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
    :pagination-options="{
      enabled: true,
    }"
    @on-selected-rows-change="onSelectedRowsChange"
  >
    <template slot="pagination-bottom">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="5"
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
    await this.getDaysInMonth({
      month: this.monthSearch.getMonth() + 1,
      year: this.monthSearch.getFullYear(),
    })
  },

  methods: {
    ...mapActions('timekeeping', ['getAllTimeKeeping', 'getDaysInMonth']),
    ...mapMutations('timekeeping', ['setListEmployeeId', 'setWorkingDataList']),
    onSelectedRowsChange() {
      const employeeIdSelectedList = []
      this.setWorkingDataList(this.$refs['my-table'].selectedRows)
      for (let i = 0; i < this.workingDataList.length; i++) {
        employeeIdSelectedList.push(this.workingDataList[i].employee_id)
      }
      this.setListEmployeeId(employeeIdSelectedList)
    },

    async currentChange(page) {
      await this.getAllTimeKeeping([this.selectedTimeRange, page])
    },
  },
}
</script>

<style></style>
