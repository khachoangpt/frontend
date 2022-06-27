<template>
  <div>
    <div class="request__header">
      <div class="request__header-text">Danh sách yêu cầu</div>
      <div class="request__search">
        <el-date-picker
          class="request-search__date-range request-search__input"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        >
        </el-date-picker>
        <el-select
          class="request-search__request-type request-search__input"
          placeholder="Loại yêu cầu"
        >
          <el-option label="Xin nghỉ" value="dayoff"> </el-option>
        </el-select>
        <el-select
          class="request-search__status request-search__input"
          placeholder="Trạng thái"
        >
          <el-option label="Chờ duyệt" value="pending"> </el-option>
        </el-select>
        <div>
          <el-dropdown>
            <el-button
              class="header-actions__button"
              type="primary"
              @click="centerDialogVisible = true"
            >
              Tạo yêu cầu
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Tạo yêu cầu 1</el-dropdown-item>
              <el-dropdown-item>Tạo yêu cầu 2</el-dropdown-item>
              <el-dropdown-item>Tạo yêu cầu 3</el-dropdown-item>
              <el-dropdown-item>Tạo yêu cầu 4</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-button
          class="header-actions__button"
          type="primary"
          @click="isOpenDetailWorking = true"
        >
          Paid Leave Admin- Manager
        </el-button>
        <el-button
          class="header-actions__button"
          type="primary"
          @click="isOpenDetailPaidLeave = true"
        >
          Paid Leave User
        </el-button> -->
        </div>
      </div>
    </div>
    <div class="personnel-table">
      <!-- <el-table :data="rows" :row-click="onChangeDoubleClick">
        <el-table-column prop="id" label="Id" width="60"> </el-table-column>
        <el-table-column prop="employeeName" label="Employee Name" width="180">
        </el-table-column>
        <el-table-column prop="date" label="Create Date" width="160">
        </el-table-column>
        <el-table-column prop="titleRequest" label="Title Request" width="160">
        </el-table-column>
        <el-table-column prop="description" label="Description" width="160">
        </el-table-column>
        <el-table-column
          prop="status"
          label="Status"
          width="140"
          :filters="[
            { text: 'Pending', value: 'Pending' },
            { text: 'Approve', value: 'Approve' },
            { text: 'Reject', value: 'Reject' },
          ]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.status === 'Approve'
                  ? (type = 'success')
                  : scope.row.status === 'Pending'
                  ? (type = '')
                  : 'danger'
              "
              disable-transitions
              >{{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="dateApprove" label="Date Change" width="160">
        </el-table-column>
        <el-table-column prop="bookmark" label="Bookmark" width="120">
          <i class="el-icon-star-on" style="font-size: 40px"></i>
        </el-table-column>
        <el-table-column prop="request_type" label="Request Type" width="180">
        </el-table-column>
      </el-table> -->
      <el-tabs
        v-model="activeTable"
        type="border-card"
        @tab-click="handleClickTab"
      >
        <el-tab-pane label="Yêu cầu gửi" name="first">
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
        </el-tab-pane>
        <el-tab-pane label="Yêu cầu nhận" name="second">
          <vue-good-table
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
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- Modal Create Request -->
    <el-dialog
      title="Create Request"
      :visible.sync="centerDialogVisible"
      width="40%"
      center
    >
      <div class="footer">
        <p class="labelText">1. Increase salary for only offcial staff.</p>
        <p class="labelText">
          2. Request is only validated when it get the acceptance from manager.
        </p>
        <p class="labelText">3. Create time required: before 48 hours.</p>
        <p class="labelText">4. Request is approved within 48 hours.</p>
      </div>
      <div class="modal-create-request">
        <el-form ref="form" label-position="top" class="demo-dynamic">
          <el-row :gutter="40">
            <el-col :span="20" class="display">
              <el-label class="labelRq">Request Type</el-label>
              <el-select
                v-model="valueReq"
                type="text"
                placeholder="Select option"
              >
                <el-option
                  v-for="item in RequestType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="20" class="display">
              <el-label class="labelRqName">Request Name</el-label>
              <el-select
                v-model="valueReq"
                type="text"
                placeholder="Select option"
              >
                <el-option
                  v-for="item in RequestType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="20" class="display">
              <el-label class="labelStartDate">Start Date</el-label>
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="Pick a day"
              >
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="20" class="display">
              <el-label class="labelEndDate">End Date</el-label>
              <el-date-picker
                v-model="value2"
                type="date"
                placeholder="Pick a day"
              >
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="20" class="display">
              <el-label class="labelParialDay">Parial Day</el-label>
              <el-select
                v-model="valuePar"
                type="text"
                placeholder="Parial Day"
              >
                <el-option
                  v-for="item in ParialDay"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="20" class="display">
              <el-label class="labelApprover">Approver</el-label>
              <el-select
                v-model="valueApprover"
                class="modalForm"
                type="text"
                placeholder="Approver"
              >
                <el-option
                  v-for="item in Approver"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="reason-detail">
                <el-form-item label="Detail Reason">
                  <el-input
                    v-model="textarea"
                    type="textarea"
                    :rows="3"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
          >Send</el-button
        >
      </span>
    </el-dialog>

    <!-- Modal detail Paid Leave Admin-Manager -->
    <el-dialog
      title="Paid Leave"
      :visible.sync="isOpenDetailWorking"
      width="45%"
      center
    >
      <div class="statusPaidLeave">
        <label> Employee Information </label>
      </div>

      <div class="working-schedule-dialog__content">
        <el-form ref="form" label-position="top" label-width="120px">
          <div class="col_1">
            <el-row :gutter="40">
              <el-col :span="12">
                <div class="lb_fullName">
                  <label> Full Name: </label>
                </div>
              </el-col>
              <div class="col_status">
                <el-col :span="12">
                  <div class="lb_status">
                    <el-form-item label="Status: "> </el-form-item>
                    <el-button class="btn_status" type="warning"
                      >Pending</el-button
                    >
                  </div>
                </el-col>
              </div>
            </el-row>
          </div>

          <div class="col_1">
            <el-row :gutter="40" class="displayRow">
              <el-col :span="12" class="display">
                <el-label class="lb_EmpID">Employee ID: </el-label>
              </el-col>
              <el-col :span="12">
                <el-label class="lb_RqName">Request Type: </el-label>
              </el-col>
            </el-row>
          </div>

          <div class="col_1">
            <el-row :gutter="40">
              <el-col :span="12" class="display">
                <el-label class="lb_createDate">Create Date: </el-label>
              </el-col>
              <el-col :span="12">
                <el-label class="lb_RqName">Request Name: </el-label>
              </el-col>
            </el-row>
          </div>

          <div class="col_1">
            <el-row :gutter="40">
              <el-col :span="12" class="display">
                <el-label class="lb_lChangeStatus"
                  >Latest Change Status:
                </el-label>
              </el-col>
            </el-row>
          </div>

          <div class="col_1">
            <el-row :gutter="40">
              <el-col :span="20" class="display">
                <el-label class="labelRq">Forward To</el-label>
                <el-select
                  v-model="valueReq"
                  type="text"
                  placeholder="Select option"
                >
                  <el-option
                    v-for="item in RequestType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>

          <div class="col_1">
            <el-row>
              <el-col>
                <div class="reason-detail">
                  <el-form-item label="Description: ">
                    <el-input
                      v-model="textarea"
                      type="textarea"
                      :rows="3"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="isOpenDetailWorking = false"
          >Approve</el-button
        >
        <el-button type="info" @click="isOpenDetailWorking = false"
          >Forward</el-button
        >
        <el-button type="danger" @click="isOpenDetailWorking = false"
          >Reject</el-button
        >
      </span>
    </el-dialog>

    <!-- Modal detail Paid Leave User -->
    <el-dialog
      title="Paid Leave"
      :visible.sync="isOpenDetailPaidLeave"
      width="45%"
      center
    >
      <div class="statusPaidLeave">
        <label> Employee Information </label>
      </div>

      <div class="working-schedule-dialog__content">
        <el-form ref="form" label-position="top" label-width="120px">
          <div class="col_1">
            <el-row :gutter="40">
              <el-col :span="12">
                <div class="lb_fullName">
                  <label> Employee Name: </label>
                </div>
              </el-col>
              <div class="col_status">
                <el-col :span="12">
                  <div class="lb_status">
                    <el-form-item label="Status: "> </el-form-item>
                    <el-button class="btn_status" type="warning"
                      >Pending</el-button
                    >
                  </div>
                </el-col>
              </div>
            </el-row>
          </div>

          <div class="col_1">
            <el-row :gutter="40" class="displayRow">
              <el-col :span="12" class="display">
                <el-label class="lb_EmpID">Employee ID: </el-label>
              </el-col>
              <el-col :span="12">
                <el-label class="lb_RqName">Request Type: </el-label>
              </el-col>
            </el-row>
          </div>

          <div class="col_1">
            <el-row :gutter="40">
              <el-col :span="12" class="display">
                <el-label class="lb_createDate">Create Date: </el-label>
              </el-col>
              <el-col :span="12">
                <el-label class="lb_RqName">Request Name: </el-label>
              </el-col>
            </el-row>
          </div>

          <div class="col_1">
            <el-row :gutter="40">
              <el-col :span="12" class="display">
                <el-label class="lb_lChangeStatus"
                  >Latest Change Status:
                </el-label>
              </el-col>
            </el-row>
          </div>

          <div class="col_1">
            <el-row>
              <el-col>
                <div class="reason-detail">
                  <el-form-item label="Description: ">
                    <el-input
                      v-model="textarea"
                      type="textarea"
                      :rows="3"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ViewRequestPage',
  layout: 'main',
  data() {
    return {
      activeTable: 'first',
      centerDialogVisible: false,
      isOpenDetailWorking: false,
      isOpenDetailPaidLeave: false,
      searchText: '',
      workingStatus: [
        {
          value: 'Approved',
          label: 'Approved',
        },
        {
          value: 'Pending',
          label: 'Pending',
        },
        {
          value: 'Reject',
          label: 'Reject',
        },
      ],
      RequestType: [
        {
          value: 'Work From home (WFH_Covid19)',
          label: 'Work From home (WFH_Covid19)',
        },
        {
          value: 'Đi muộn',
          label: 'Đi muộn',
        },
        {
          value: 'Về Sớm',
          label: 'Về Sớm',
        },
      ],
      ParialDay: [
        {
          value: 'Cả Ngày',
          label: 'Cả Ngày',
        },
        {
          value: 'Buổi sáng',
          label: 'Buổi sáng',
        },
        {
          value: 'Buổi chiều',
          label: 'Buổi chiều',
        },
      ],
      Approver: [
        {
          value: 'ThuongNS',
          label: 'ThuongNS',
        },
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
      valueReq: '',
      valueApprover: '',
      valuePar: '',
      value1: '',
      value2: '',
      valueId: '',
    }
  },

  computed: {
    ...mapGetters('request', [
      'requestTableHeader',
      'requestListSend',
      'totalPageRequestListSend',
      'totalPageRequestListReceive',
      'requestListReceive',
    ]),
  },

  async mounted() {
    await this.getListRequestSend(1)
  },

  methods: {
    ...mapActions('request', ['getListRequestSend', 'getListRequestReceive']),
    async currentChangePageSend(page) {
      await this.getListRequestSend(page)
    },

    async currentChangePageReceive(page) {
      await this.getListRequestReceive(page)
    },

    async handleClickTab(tab, event) {
      if (tab.name === 'first') {
        await this.getListRequestSend(1)
      } else if (tab.name === 'second') {
        await this.getListRequestReceive(1)
      }
    },
  },
}
</script>

<style>
.personnel__header {
  display: flex;
  justify-content: space-between;
}

.personnel__header-text {
  font-weight: 600;
  font-size: 20px;
}

.personnel__header-actions {
  display: flex;
}

.header-actions__working-status {
  margin-right: 12px;
  max-width: 300px;
}

.personnel-table {
  margin-top: 24px;
}

.modal-create-request {
  padding: 0 16px 0 0;
}

.modalRequest {
  width: 200px;
}

.detailReason {
  height: 100px;
  width: 300px;
}

.display {
  display: flex;
  padding-bottom: 20px;
}

.labelRq {
  padding-right: 25px;
  margin: 10px 0px 26px 0px;
}

.labelRqName {
  padding-right: 18px;
  margin: 10px 0px 26px 0px;
}

.labelStartDate {
  padding-right: 48px;
  margin: 10px 0px 17px 0px;
}

.labelEndDate {
  padding-right: 53px;
  margin: 10px 0px 17px 0px;
}

.labelParialDay {
  padding-right: 47px;
  margin: 10px 0px 26px 0px;
}

.labelApprover {
  padding-right: 55px;
  margin: 10px 0px 26px 0px;
}

.footer {
  background-color: #8bed97;
}

.statusPaidLeave {
  text-align: left;
  text-transform: uppercase;
  font-size: 18px;
}

.displayRow {
  display: flex;
}

.lb_fullName {
  margin-top: 10px;
}

.col_1 {
  margin-top: 25px;
}

.lb_status {
  display: flex;
}

.btn_status {
  height: 10px;
  margin: 6px 0px 3px 35px;
  padding: 5px 26px 16px 25px;
}

.request__search {
  display: flex;
  margin-bottom: 16px;
}

.request-search__input {
  margin-right: 16px;
}

.request-search__date-range {
  width: 300px !important;
}

.request-search__request-type {
  width: 200px;
}

.request-search__status {
  width: 200px;
}

.request-search__name {
  width: 200px;
}

.request__header {
  display: flex;
  justify-content: space-between;
}

.request__header-text {
  font-weight: 600;
  font-size: 20px;
}

.el-pagination {
  margin-top: 16px;
  text-align: center;
  padding-bottom: 16px;
}

.request-status__PENDING {
  background-color: #e6a23c;
  color: #fff;
  padding: 6px;
  border-radius: 5px;
}

.request-status__APPROVED {
  background-color: #67c23a;
  color: #fff;
  padding: 6px;
  border-radius: 5px;
}

.request-status__REJECTED {
  background-color: #f56c6c;
  color: #fff;
  padding: 6px;
  border-radius: 5px;
}

.request-send-table__description {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 50px;
}

.request-table-header__center {
  text-align: center;
}
</style>
