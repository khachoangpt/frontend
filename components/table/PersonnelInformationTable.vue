<template>
  <vue-good-table
    v-loading.fullscreen.lock="loadingPersonnelTable"
    element-loading-background="rgba(0, 0, 0, 0.2)"
    type="primary"
    :fixed-header="false"
    :columns="columns"
    :rows="personnelList.hrmResponse"
    :sort-options="{
      enabled: true,
    }"
    :pagination-options="{
      enabled: true,
    }"
    @on-row-dblclick="onRowDoubleClick"
  >
    <template slot="table-row" slot-scope="props">
      <span v-if="props.column.field == 'full_name'" class="full-name-column">
        <span>
          {{ props.row.full_name }}
        </span>
      </span>
      <span v-else>
        {{ props.formattedRow[props.column.field] }}
      </span>
    </template>
    <template slot="pagination-bottom">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="totalPage"
        @current-change="currentChange"
      >
      </el-pagination>
    </template>
  </vue-good-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PersonnelInformationTable',
  data() {
    return {
      loadingPersonnelTable: true,
    }
  },

  computed: {
    ...mapGetters('user', [
      'columns',
      'personnelList',
      'searchText',
      'totalPage',
    ]),
  },

  async mounted() {
    await this.getPersonnelList({
      searchText: '',
      page: 1,
    })
    this.loadingPersonnelTable = false
  },

  methods: {
    ...mapActions('user', ['getPersonnelList', 'onRowDoubleClick']),

    async currentChange(page) {
      await this.getPersonnelList({
        searchText: this.searchText,
        page,
      })
    },
  },
}
</script>

<style>
.el-pagination {
  margin-top: 16px;
  text-align: center;
  padding-bottom: 16px;
}
</style>
