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
            {{ requestReceiveDetail.request_title }}
          </span>
        </el-col>
        <el-col :span="10">
          Trạng thái:
          <span class="request-detail-dialog__value">
            {{ requestReceiveDetail.request_status }}
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
            :value="requestReceiveDetail.description"
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
  name: 'RequestReceiveTable',
  data() {
    return {
      detailRequestVisible: false,
    }
  },

  computed: {
    ...mapGetters('request', [
      'requestTableHeader',
      'requestListReceive',
      'totalPageRequestListReceive',
      'requestListSelected',
      'requestReceiveDetail',
    ]),
  },

  methods: {
    ...mapActions('request', [
      'currentChangePageReceive',
      'getDetailReceiveRequest',
    ]),
    ...mapMutations('request', ['setRequestListSelected']),

    onRowDoubleClick(data) {
      this.detailRequestVisible = true
      this.getDetailReceiveRequest(data.row.application_request_id)
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
</style>
