<template>
  <vue-good-table
    :fixed-header="false"
    :columns="requestTableHeader"
    :rows="requestListSend"
    :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
    :sort-options="{
      enabled: true,
    }"
    :pagination-options="{
      enabled: true,
    }"
  >
    <template slot="pagination-bottom">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="5"
        :total="totalPageRequestListSend"
        @current-change="currentChangePageSend"
      >
      </el-pagination>
    </template>
    <template slot="table-row" slot-scope="props">
      <span v-if="props.column.field == 'request_status'">
        <span :class="'request-status__' + props.row.request_status">{{
          props.row.request_status
        }}</span>
      </span>
      <span v-else>
        {{ props.formattedRow[props.column.field] }}
      </span>
    </template>
  </vue-good-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'RequestSendTable',
  computed: {
    ...mapGetters('request', [
      'requestTableHeader',
      'requestListSend',
      'totalPageRequestListSend',
    ]),
  },

  methods: {
    ...mapActions('request', ['currentChangePageSend']),
  },
}
</script>

<style></style>
