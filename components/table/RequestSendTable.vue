<!-- eslint-disable vue/no-v-html -->
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
      top="10vh"
      center
      custom-class="request-detail-dialog"
      :before-close="closeDialog"
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
            {{ requestSendDetail.request_name }}
          </span>
        </el-col>
        <el-col :span="10">
          Trạng thái:
          <span
            class="request-detail-dialog__value"
            :class="'request-status__' + requestSendDetail.request_status"
          >
            <span>{{ requestSendDetail.request_status }}</span>
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
          <span>Đã xem bởi:</span>
          <div class="request-detail-dialog__tags">
            <el-tag
              v-for="(name, index) in requestSendDetail.checked_by"
              :key="'name' + index"
              class="request-detail-dialog__value request-detail-dialog__tag"
            >
              {{ name }}
            </el-tag>
          </div>
        </el-col>
        <el-col
          v-if="requestSendDetail.request_status === 'REJECTED'"
          :span="10"
        >
          <span class="reject-reason" @click="getRejectReason">
            Xem lý do từ chối
          </span>
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="24">
          Chi tiết
          <div class="request-detail-dialog__description">
            {{ requestSendDetail.description }}
          </div>
        </el-col>
      </el-row>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="detailRequestVisible = false">
          Chấp nhận
        </el-button>
        <el-button type="danger" @click="rejectRequest"> Từ chối </el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'RequestSendTable',
  data() {
    return {}
  },
  computed: {
    ...mapGetters('request', [
      'requestTableHeader',
      'requestListSend',
      'totalPageRequestListSend',
      'requestListSelected',
      'requestSendDetail',
      'detailRequestVisible',
    ]),
  },

  methods: {
    ...mapActions('request', [
      'currentChangePageSend',
      'getDetailSendRequest',
      'updateRejectRequest',
    ]),

    ...mapMutations('request', [
      'setRequestListSelected',
      'setDetailRequestVisible',
      'setListRequestId',
    ]),

    closeDialog() {
      this.setDetailRequestVisible(false)
    },

    onRowDoubleClick(data) {
      this.setDetailRequestVisible(true)
      this.getDetailSendRequest(data.row.application_request_id)
    },

    onSelectedRowsChange() {
      const requestIdSelectedList = []
      this.setRequestListSelected(
        this.$refs['request-table'].selectedRows.length
      )
      for (let i = 0; i < this.requestListSelected; i++) {
        requestIdSelectedList.push(
          this.$refs['request-table'].selectedRows[i].application_request_id
        )
      }
      this.setListRequestId(requestIdSelectedList)
    },

    async rejectRequest() {
      await this.updateRejectRequest(
        this.requestSendDetail.application_request_id
      )
      this.setDetailRequestVisible(false)
    },

    async getRejectReason() {
      let reason = ''
      if (this.requestSendDetail.comment === null) {
        reason = 'Không có lý do'
      } else {
        reason = this.requestSendDetail.comment
      }
      await this.$alert(reason, 'Lý do từ chối', {
        confirmButtonText: 'OK',
        callback: (action) => {},
      })
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

.request-detail-dialog__value-status {
  background-color: #e6a23c;
  color: #fff;
  padding: 6px;
  border-radius: 5px;
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

.request-detail-dialog__description {
  height: 140px;
  overflow: scroll;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  white-space: pre-line;
  word-break: break-word;
}

.request-detail-dialog__description::-webkit-scrollbar {
  display: none;
}

.request-detail-dialog__tags {
  display: flex;
  margin-top: 4px;
}

.request-detail-dialog__tag {
  margin-left: 8px;
}

.request-detail-dialog {
  width: 40%;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .request-detail-dialog {
    width: 100%;
  }
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .request-detail-dialog {
    width: 90%;
  }
}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .request-detail-dialog {
    width: 60%;
  }
}
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .request-detail-dialog {
    width: 50%;
  }
}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .request-detail-dialog {
    width: 40%;
  }
}
</style>
