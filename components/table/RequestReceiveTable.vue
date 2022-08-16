<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <vue-good-table
      ref="request-table"
      :fixed-header="false"
      :columns="requestTableHeader"
      :rows="requestListReceive"
      :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
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
          :total="totalPageRequestListReceive"
          @current-change="currentChangePageReceive"
        >
        </el-pagination>
      </template>
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'request_status'">
          <span :class="'request-status__' + props.row.request_status">{{
            props.row.request_status
          }}</span>
        </span>
        <!-- <span
          v-else-if="props.column.field == 'is_bookmark'"
          class="bookmark-column"
        >
          <i
            v-if="props.row.is_bookmark === 'True'"
            class="el-icon-star-on bookmark-icon"
          ></i>
          <i v-else class="el-icon-star-off"></i>
        </span> -->
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
    <el-dialog
      title="Chi tiết yêu cầu"
      :visible.sync="detailRequestReceiveVisible"
      center
      custom-class="request-detail-dialog"
      :before-close="closeDialog"
    >
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="14"
          >Nhân viên:
          <span class="request-detail-dialog__value">
            {{ requestReceiveDetail.full_name }}
          </span>
        </el-col>
        <el-col :span="10">
          Mã NV:
          <span class="request-detail-dialog__value">
            {{ requestReceiveDetail.employee_id }}
          </span>
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="14">
          Yêu cầu:
          <span class="request-detail-dialog__value">
            {{ requestReceiveDetail.request_name }}
          </span>
        </el-col>
        <el-col :span="10">
          Trạng thái:
          <span
            class="request-detail-dialog__value"
            :class="'request-status__' + requestReceiveDetail.request_status"
          >
            <span>{{ requestReceiveDetail.request_status }}</span>
          </span>
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="14">
          Ngày tạo:
          <span class="request-detail-dialog__value">
            {{ new Date(requestReceiveDetail.create_date).getDate() }}/{{
              new Date(requestReceiveDetail.create_date).getMonth() + 1
            }}/{{ new Date(requestReceiveDetail.create_date).getFullYear() }}
          </span>
        </el-col>
        <el-col :span="10">
          Thời hạn:
          <span class="request-detail-dialog__value">
            {{ new Date(requestReceiveDetail.duration).getDate() }}/{{
              new Date(requestReceiveDetail.duration).getMonth() + 1
            }}/{{ new Date(requestReceiveDetail.duration).getFullYear() }}
          </span>
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="14">
          <span>Đã xem bởi:</span>
          <div class="request-detail-dialog__tags">
            <el-tag
              v-for="(name, index) in requestReceiveDetail.checked_by"
              :key="'name' + index"
              class="request-detail-dialog__value request-detail-dialog__tag"
            >
              {{ name }}
            </el-tag>
          </div>
        </el-col>
        <el-col
          v-if="requestReceiveDetail.request_status === 'REJECTED'"
          :span="10"
        >
          <span class="reject-reason" @click="getRejectReason"
            >Xem lý do từ chối</span
          >
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="24">
          Chi tiết
          <div
            class="request-detail-dialog__description"
            v-html="requestReceiveDetail.description"
          ></div>
        </el-col>
      </el-row>
      <span v-if="isAction && isChecked" slot="footer" class="dialog-footer">
        <el-button v-if="isEnoughLevel" type="success" @click="approveRequest">
          Chấp nhận
        </el-button>
        <el-button
          v-if="!isEnoughLevel"
          type="primary"
          @click="openChooseManagerDialog"
        >
          Chuyển tiếp
        </el-button>
        <el-button type="danger" @click="open"> Từ chối </el-button>
      </span>
    </el-dialog>
    <el-dialog
      top="40vh"
      title="Chuyển tiếp"
      class="request-dialog__choose-manager"
      :visible.sync="chooseManagerDialogVisible"
      width="24%"
      :before-close="closeChooseManagerDialog"
    >
      <el-form label-position="top">
        <el-form-item label="Chọn người muốn chuyển tiếp:" la>
          <el-autocomplete
            v-model="chooseManager"
            :clearable="true"
            placeholder="Tên quản lý"
            :fetch-suggestions="querySearchManager"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeChooseManagerDialog">Đóng</el-button>
        <el-button
          type="primary"
          @click="reviewedRequest({ chooseManager, selectedRequest })"
        >
          Xác nhận
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'RequestReceiveTable',
  data() {
    return {
      isChecked: true,
      selectedRequest: '',
      chooseManager: '',
      isAction: true,
      isEnoughLevel: '',
    }
  },

  computed: {
    ...mapGetters('auth', ['id']),
    ...mapGetters('request', [
      'requestTableHeader',
      'requestListReceive',
      'totalPageRequestListReceive',
      'requestListSelected',
      'requestReceiveDetail',
      'detailRequestReceiveVisible',
      'chooseManagerDialogVisible',
    ]),
    ...mapGetters('salary', ['listManagerOfArea', 'searchManagerText']),
  },

  methods: {
    ...mapActions('request', [
      'currentChangePageReceive',
      'getDetailReceiveRequest',
      'updateRejectRequest',
      'updateApproveRequest',
      'reviewedRequest',
    ]),
    ...mapActions('salary', ['getManagerOfArea']),
    ...mapMutations('request', [
      'setRequestListSelected',
      'setDetailRequestReceiveVisible',
      'setListRequestId',
      'setChooseManagerDialogVisible',
    ]),

    async onRowDoubleClick(data) {
      this.selectedRequest = data.row.application_request_id
      if (data.row.is_enough_level === 'True') {
        this.isEnoughLevel = true
      } else {
        this.isEnoughLevel = false
      }
      if (data.row.request_status === 'PENDING') {
        this.isAction = true
      } else {
        this.isAction = false
      }
      this.isChecked = true
      await this.setDetailRequestReceiveVisible(true)
      await this.getDetailReceiveRequest(data.row.application_request_id)
      if (this.requestReceiveDetail.checked_by.includes(this.id)) {
        this.isChecked = false
      }
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

    closeDialog() {
      this.setDetailRequestReceiveVisible(false)
    },

    closeChooseManagerDialog() {
      this.setChooseManagerDialogVisible(false)
    },

    async openChooseManagerDialog() {
      await this.getManagerOfArea()
      await this.setChooseManagerDialogVisible(true)
    },

    async approveRequest() {
      await this.updateApproveRequest(
        this.requestReceiveDetail.application_request_id
      )
      this.setDetailRequestReceiveVisible(false)
    },

    open() {
      this.$prompt('Nhập lý do từ chối', 'Tip', {
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Đóng',
      })
        .then(({ value }) => {
          this.updateRejectRequest({
            requestId: this.requestReceiveDetail.application_request_id,
            comment: value,
          })
          this.setDetailRequestReceiveVisible(false)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled',
          })
        })
    },

    querySearchManager(queryString, cb) {
      const results = queryString
        ? this.listManagerOfArea.filter(this.createFilter(queryString))
        : this.listManagerOfArea
      cb(results)
    },

    createFilter(queryString) {
      return (link) => {
        return link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },

    async getRejectReason() {
      let reason = ''
      if (this.requestReceiveDetail.comment === null) {
        reason = 'Không có lý do'
      } else {
        reason = this.requestReceiveDetail.comment
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

.request-detail-dialog__description {
  height: 140px;
  overflow: scroll;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 8px;
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

.request-dialog__choose-manager .el-dialog__body {
  padding: 0 20px !important;
}

.reject-reason {
  color: #f56c6c;
  text-decoration: underline;
  cursor: pointer;
}

.reject-reason:hover {
  color: #f42b2b;
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
