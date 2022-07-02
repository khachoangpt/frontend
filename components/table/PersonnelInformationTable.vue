<template>
  <vue-good-table
    :fixed-header="false"
    :columns="columns"
    :rows="personnelList.hrmResponse"
    :search-options="{
      enabled: true,
      externalQuery: searchText,
    }"
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
        :page-size="5"
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
    return {}
  },

  computed: {
    ...mapGetters('user', [
      'columns',
      'personnelList',
      'searchText',
      'totalPage',
    ]),
  },

  mounted() {
    this.getPersonnelList({
      searchText: this.searchText,
      page: 1,
    })
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
