<template>
  <div>
    <vue-good-table
      ref="request-table"
      :fixed-header="false"
      :columns="requestTableHeader"
      :rows="requestListSend"
      :select-options="{
        enabled: true,
        selectOnCheckboxOnly: true,
        selectionInfoClass: 'select-info-class',
        selectionText: 'hàng đã chọn',
        clearSelectionText: 'Bỏ chọn tất cả',
      }"
      :sort-options="{
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
        <span
          v-else-if="props.column.field == 'is_bookmark'"
          class="bookmark-column"
        >
          <i
            v-if="props.row.is_bookmark === 'True'"
            class="el-icon-star-on bookmark-icon"
          ></i>
          <i v-else class="el-icon-star-off"></i>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
    <el-dialog
      title="Chi tiết yêu cầu"
      :visible.sync="detailRequestVisible"
      width="40%"
      center
      custom-class="request-detail-dialog"
    >
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="14"
          >Nhân viên:
          <span class="request-detail-dialog__value">
            {{ requestSendDetail.full_name }}
          </span>
        </el-col>
        <el-col :span="10">
          Mã NV:
          <span class="request-detail-dialog__value">
            {{ requestSendDetail.employee_id }}
          </span>
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="14">
          Yêu cầu:
          <span class="request-detail-dialog__value">
            {{ requestSendDetail.request_title }}
          </span>
        </el-col>
        <el-col :span="10">
          Trạng thái:
          <span class="request-detail-dialog__value">
            {{ requestSendDetail.request_status }}
          </span>
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="14">
          Ngày tạo:
          <span class="request-detail-dialog__value">
            {{ new Date(requestSendDetail.create_date).getDate() }}/{{
              new Date(requestSendDetail.create_date).getMonth() + 1
            }}/{{ new Date(requestSendDetail.create_date).getFullYear() }}
          </span>
        </el-col>
        <el-col :span="10">
          Thời hạn:
          <span class="request-detail-dialog__value">
            {{ new Date(requestSendDetail.duration).getDate() }}/{{
              new Date(requestSendDetail.duration).getMonth() + 1
            }}/{{ new Date(requestSendDetail.duration).getFullYear() }}
          </span>
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="14">
          Đã xem bởi:
          <span class="request-detail-dialog__value">Nguyễn Khắc Hoàng</span>
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="24">
          Mô tả
          <el-input
            type="textarea"
            :rows="4"
            readonly
            :value="requestSendDetail.description"
          >
          </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="detailRequestVisible = false">
          Chấp nhận
        </el-button>
        <el-button type="danger" @click="detailRequestVisible = false">
          Từ chối
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'RequestSendTable',
  data() {
    return {
      detailRequestVisible: false,
    }
  },
  computed: {
    ...mapGetters('request', [
      'requestTableHeader',
      'requestListSend',
      'totalPageRequestListSend',
      'requestListSelected',
      'requestSendDetail',
    ]),
  },

  methods: {
    ...mapActions('request', ['currentChangePageSend', 'getDetailSendRequest']),

    ...mapMutations('request', ['setRequestListSelected']),

    onRowDoubleClick(data) {
      this.detailRequestVisible = true
      this.getDetailSendRequest(data.row.application_request_id)
    },

    onSelectedRowsChange() {
      this.setRequestListSelected(
        this.$refs['request-table'].selectedRows.length
      )
    },
  },
}
</script>

<style>
.request-detail-dialog .el-dialog__title {
  font-size: 24px;
  font-weight: 600;
  color: blue;
}

.request-detail-dialog__row {
  font-size: 16px;
  margin-bottom: 24px;
}

.request-detail-dialog__value {
  font-size: 17px;
  font-weight: 600;
}

.bookmark-column {
  width: 100%;
  display: block;
  text-align: center;
}

.bookmark-icon {
  font-size: 20px;
  color: #e6a23c;
}

.vgt-left-align {
  text-align: center !important;
}

.select-info-class {
  font-size: 14px !important;
  color: #67c23a !important;
}

.select-info-class a {
  color: #f56c6c;
}
</style>
