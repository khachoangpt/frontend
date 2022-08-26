<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <vue-good-table
      ref="request-table"
      :fixed-header="false"
      :columns="requestTableHeader"
      :rows="requestListReceive"
      :select-options="{
        enabled: true,
        selectOnCheckboxOnly: true,
        selectionInfoClass: 'select-info-class',
        selectionText: $i18n.t('request.table.rowSelected'),
        clearSelectionText: $i18n.t('request.table.clear'),
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
          :total="totalPageRequestListReceive"
          @current-change="currentChangePageReceive"
        >
        </el-pagination>
      </template>
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'request_status_name'">
          <span :class="'request-status__' + props.row.request_status_name">{{
            props.row.request_status_name
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
      :title="$i18n.t('request.dialog.requestDetail')"
      :visible.sync="detailRequestReceiveVisible"
      center
      custom-class="request-detail-dialog"
      :before-close="closeDialog"
    >
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="14"
          >{{ $i18n.t('request.dialog.employeeName') }}:
          <span class="request-detail-dialog__value">
            {{ requestReceiveDetail.full_name }}
          </span>
        </el-col>
        <el-col :span="10">
          {{ $i18n.t('request.dialog.employeeId') }}:
          <span class="request-detail-dialog__value">
            {{ requestReceiveDetail.employee_id }}
          </span>
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="14">
          {{ $i18n.t('request.dialog.requestName') }}:
          <span class="request-detail-dialog__value">
            {{ requestReceiveDetail.request_name }}
          </span>
        </el-col>
        <el-col :span="10">
          {{ $i18n.t('request.dialog.status') }}:
          <span
            class="request-detail-dialog__value"
            :class="'request-status__' + requestReceiveDetail.request_status_name"
          >
            <span>{{ requestReceiveDetail.request_status_name }}</span>
          </span>
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="14">
          {{ $i18n.t('request.dialog.createDate') }}:
          <span class="request-detail-dialog__value">
            {{ new Date(requestReceiveDetail.create_date).getDate() }}/{{
              new Date(requestReceiveDetail.create_date).getMonth() + 1
            }}/{{ new Date(requestReceiveDetail.create_date).getFullYear() }}
          </span>
        </el-col>
        <el-col :span="10">
          {{ $i18n.t('request.dialog.duration') }}:
          <span class="request-detail-dialog__value">
            {{ new Date(requestReceiveDetail.duration).getDate() }}/{{
              new Date(requestReceiveDetail.duration).getMonth() + 1
            }}/{{ new Date(requestReceiveDetail.duration).getFullYear() }}
          </span>
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="14">
          <span>{{ $i18n.t('request.dialog.checkedBy') }}:</span>
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
          v-if="requestReceiveDetail.request_status_name === 'REJECTED'"
          :span="10"
        >
          <span class="reject-reason" @click="getRejectReason">{{
            $i18n.t('request.dialog.rejectComment')
          }}</span>
        </el-col>
      </el-row>
      <el-row class="request-detail-dialog__row" :gutter="20">
        <el-col :span="24">
          {{ $i18n.t('request.dialog.detail') }}
          <div
            class="request-detail-dialog__description"
            v-html="requestReceiveDetail.description"
          ></div>
        </el-col>
      </el-row>
      <span v-if="isAction && isChecked" slot="footer" class="dialog-footer">
        <el-button v-if="isEnoughLevel" type="success" @click="approveRequest">
          {{ $i18n.t('request.dialog.approve') }}
        </el-button>
        <el-button
          v-if="!isEnoughLevel"
          type="primary"
          @click="openChooseManagerDialog"
        >
          {{ $i18n.t('request.dialog.check') }}
        </el-button>
        <el-button type="danger" @click="open">
          {{ $i18n.t('request.dialog.reject') }}
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      top="40vh"
      :title="$i18n.t('request.dialog.check')"
      class="request-dialog__choose-manager"
      :visible.sync="chooseManagerDialogVisible"
      width="24%"
      :before-close="closeChooseManagerDialog"
    >
      <el-form label-position="top">
        <el-form-item :label="$i18n.t('request.dialog.chooseForward')">
          <el-autocomplete
            v-model="chooseManager"
            :clearable="true"
            :placeholder="$i18n.t('request.dialog.manager')"
            :fetch-suggestions="querySearchManager"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeChooseManagerDialog">{{
          $i18n.t('request.dialog.close')
        }}</el-button>
        <el-button
          type="primary"
          @click="reviewedRequest({ chooseManager, selectedRequest })"
        >
          {{ $i18n.t('request.dialog.confirm') }}
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
      requestTableHeader: [
        {
          label: this.$i18n.t('request.table.employeeName'),
          field: 'full_name',
          width: '150px',
          thClass: 'request-table-header__center',
        },
        {
          label: this.$i18n.t('request.table.employeeId'),
          field: 'employee_id',
          width: '80px',
          sortable: false,
          thClass: 'request-table-header__center',
        },
        {
          label: this.$i18n.t('request.table.request'),
          field: 'request_name',
          width: '180px',
          sortable: false,
          thClass: 'request-table-header__center',
        },
        {
          label: this.$i18n.t('request.table.createDate'),
          field: 'create_date',
          width: '80px',
          thClass: 'request-table-header__center',
        },
        {
          label: this.$i18n.t('request.table.status'),
          field: 'request_status_name',
          width: '100px',
          sortable: false,
          thClass: 'request-table-header__center',
        },
        {
          label: this.$i18n.t('request.table.duration'),
          field: 'duration',
          width: '100px',
          sortable: false,
          thClass: 'request-table-header__center',
        },
      ],
    }
  },

  computed: {
    ...mapGetters('auth', ['id']),
    ...mapGetters('request', [
      'requestListReceive',
      'totalPageRequestListReceive',
      'requestListSelected',
      'requestReceiveDetail',
      'detailRequestReceiveVisible',
      'chooseManagerDialogVisible',
    ]),
    ...mapGetters('salary', ['listManagerOfArea', 'searchManagerText']),
  },

  mounted() {
    this.setRequestListSelected(0)
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
      if (data.row.request_status_name === 'PENDING') {
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
        return (
          this.removeMark(link.value.toLowerCase()).includes(
            this.removeMark(queryString.toLowerCase())
          ) === true
        )
      }
    },

    removeMark(str) {
      str = str.replace(/\s+/g, ' ')
      str = str.trim()
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      str = str.replace(/đ/g, 'd')
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
      str = str.replace(/Đ/g, 'D')
      return str
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

.request-des__dear {
  color: #f56c6c;
}

.request-des__date {
  color: #f56c6c;
}

.request-des__name {
  color: #f56c6c;
}

.request-des__money {
  color: #f56c6c;
}

.request-des__name-nomination {
  color: #f56c6c;
}

.request-des__current {
  color: #f56c6c;
}
</style>
