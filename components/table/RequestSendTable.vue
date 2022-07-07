<template>
  <div>
    <vue-good-table
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
        <el-col :span="12"
          >Nhân viên:
          <span class="request-detail-dialog__value">Trương Tuấn Khang</span>
        </el-col>
        <el-col :span="12"
          >Mã NV: <span class="request-detail-dialog__value">TK01</span>
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="12"
          >Yêu cầu: <span class="request-detail-dialog__value">Xin nghỉ</span>
        </el-col>
        <el-col :span="12"
          >Ngày xin nghỉ:
          <span class="request-detail-dialog__value">14-6-2022</span>
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="12"
          >Ngày tạo: <span class="request-detail-dialog__value">13-6-2022</span>
        </el-col>
        <el-col :span="12"
          >Thời hạn:
          <span class="request-detail-dialog__value">15-06-2022</span>
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="12"
          >Trạng thái: <span class="request-detail-dialog__value">Pending</span>
        </el-col>
        <el-col :span="12"
          >Đã xem bởi:
          <span class="request-detail-dialog__value">Nguyễn Khắc Hoàng</span>
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="24">
          Mô tả
          <el-input type="textarea" :rows="4" readonly> </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="detailRequestVisible = false"
          >Chấp nhận</el-button
        >
        <el-button type="danger" @click="detailRequestVisible = false">
          Từ chối
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    ]),
  },

  methods: {
    ...mapActions('request', ['currentChangePageSend']),

    onRowDoubleClick() {
      this.detailRequestVisible = true
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
