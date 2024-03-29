<template>
  <div
    v-loading.fullscreen.lock="loadingRequest"
    element-loading-background="rgba(0, 0, 0, 0.2)"
    type="primary"
  >
    <div class="request__header">
      <div class="request__header-text">
        {{ $i18n.t('request.listRequest') }}
      </div>
      <div>
        <el-dropdown @command="createRequest">
          <el-button class="header-actions__button" type="primary">
            {{ $i18n.t('request.createRequest') }}
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(requestType, index) in listRequestType"
              :key="'type' + index"
              :command="[
                requestType.request_type_id,
                requestType.request_type_name,
              ]"
            >
              {{ requestType.request_type_name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown
          :disabled="requestListSelected <= 0"
          @command="exportRequest"
        >
          <el-button class="header-actions__button" type="success">
            Export
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="excel"> Excel </el-dropdown-item>
            <el-dropdown-item command="csv"> CSV </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-button
          class="header-actions__button"
          type="success"
          :disabled="requestListSelected <= 0"
          @click="exportRequest"
        >
          Export
        </el-button> -->
      </div>
    </div>
    <div class="request__search">
      <el-date-picker
        v-model="requestDateRange"
        class="request-search__date-range request-search__input"
        type="daterange"
        range-separator="-"
        :start-placeholder="$i18n.t('request.dateFrom')"
        :end-placeholder="$i18n.t('request.dateTo')"
        format="dd-MM-yyyy"
        value-format="timestamp"
        @change="onChangeDate"
      >
      </el-date-picker>
      <el-select
        v-model="requestTypeSearch"
        class="request-search__request-type request-search__input"
        :placeholder="$i18n.t('request.requestType')"
        :clearable="true"
        @clear="onClearRequestType"
        @change="onRequestTypeChange"
      >
        <el-option
          v-for="(requestType, index) in listRequestType"
          :key="'requestType' + index"
          :label="$i18n.t(`request['${requestType.request_type_name}']`)"
          :value="requestType.request_type_name"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="requestStatusSearch"
        class="request-search__status request-search__input"
        :placeholder="$i18n.t('request.requestStatus')"
        :clearable="true"
        @clear="onClearRequestStatus"
        @change="onRequestStatusChange"
      >
        <el-option
          v-for="requestStatus in listRequestStatus"
          :key="'status_' + requestStatus.request_status_id"
          :class="'request-status-select__' + requestStatus.request_status_name"
          :label="requestStatus.request_status_name"
          :value="requestStatus.request_status_name"
        >
        </el-option>
      </el-select>
    </div>
    <div class="request-table">
      <el-tabs :value="activeTable" type="border-card" @tab-click="clickTab">
        <el-tab-pane :label="$i18n.t('request.requestSend')" name="first">
          <request-send-table />
        </el-tab-pane>
        <el-tab-pane :label="$i18n.t('request.requestReceive')" name="second">
          <request-receive-table />
        </el-tab-pane>
      </el-tabs>
    </div>
    <request-advance-dialog />
    <request-nomination-dialog
      v-if="!roles.find((role) => role.authority === 'ROLE_USER')"
    />
    <request-paid-leave-dialog />
    <request-working-schedule-dialog />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import RequestReceiveTable from '~/components/table/RequestReceiveTable.vue'
import RequestSendTable from '~/components/table/RequestSendTable.vue'
import RequestAdvanceDialog from '~/components/dialog/RequestAdvanceDialog.vue'
import RequestNominationDialog from '~/components/dialog/RequestNominationDialog.vue'
import RequestPaidLeaveDialog from '~/components/dialog/RequestPaidLeaveDialog.vue'
import RequestWorkingScheduleDialog from '~/components/dialog/RequestWorkingScheduleDialog.vue'
export default {
  name: 'ViewRequestPage',
  components: {
    RequestReceiveTable,
    RequestSendTable,
    RequestAdvanceDialog,
    RequestNominationDialog,
    RequestPaidLeaveDialog,
    RequestWorkingScheduleDialog,
  },
  layout: 'main',
  data() {
    return {
      requestDateRange: [],
      requestTypeSearch: '',
      requestStatusSearch: '',
      loadingRequest: true,
    }
  },

  computed: {
    ...mapGetters('auth', ['roles']),
    ...mapGetters('request', [
      'listRequestType',
      'listRequestStatus',
      'activeTable',
      'requestListSelected',
      'requestOvertimeDialogVisible',
    ]),
  },

  async mounted() {
    await this.getListRequestSend(1)
    await this.getListRequestType()
    await this.getListRequestStatus()
    this.loadingRequest = false
  },

  methods: {
    ...mapActions('request', [
      'getListRequestSend',
      'getListRequestReceive',
      'getListRequestType',
      'handleClickTab',
      'onChangeDateRangeSend',
      'onChangeDateRangeReceive',
      'getListRequestStatus',
      'createRequest',
      'exportRequestSend',
      'exportRequestReceive',
    ]),
    ...mapMutations('request', [
      'setRequestAdvanceDialogVisible',
      'setDateRangeFilter',
      'setRequestTypeFilter',
      'setRequestStatusFilter',
    ]),

    async onChangeDate(dateRange) {
      this.setDateRangeFilter(dateRange)
      this.setRequestTypeFilter(this.requestTypeSearch)
      this.setRequestStatusFilter(this.requestStatusSearch)
      await this.onChangeDateRangeSend(1)
      await this.onChangeDateRangeReceive(1)
    },

    async onRequestTypeChange() {
      this.setDateRangeFilter(this.requestDateRange)
      this.setRequestTypeFilter(this.requestTypeSearch)
      this.setRequestStatusFilter(this.requestStatusSearch)
      await this.onChangeDateRangeSend(1)
      await this.onChangeDateRangeReceive(1)
    },

    async onRequestStatusChange() {
      this.setDateRangeFilter(this.requestDateRange)
      this.setRequestTypeFilter(this.requestTypeSearch)
      this.setRequestStatusFilter(this.requestStatusSearch)
      await this.onChangeDateRangeSend(1)
      await this.onChangeDateRangeReceive(1)
    },

    onClearRequestType() {
      this.requestTypeSearch = ''
    },

    onClearRequestStatus() {
      this.requestStatusSearch = ''
    },

    clickTab(tab) {
      this.requestDateRange = []
      this.requestTypeSearch = ''
      this.requestStatusSearch = ''
      this.handleClickTab(tab)
    },

    exportRequest(data) {
      if (this.activeTable === 'first') {
        this.exportRequestSend(data)
      } else if (this.activeTable === 'second') {
        this.exportRequestReceive(data)
      }
    },
  },
}
</script>

<style>
.header-actions__working-status {
  margin-right: 12px;
  max-width: 300px;
}

.request-table {
  margin-top: 24px;
}

.request__search {
  display: flex;
  margin-top: 16px;
  justify-content: flex-end;
}

.request-search__input {
  margin-left: 16px;
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
  white-space: pre-line;
  word-break: break-word;
}

.request-status__APPROVED {
  background-color: #67c23a;
  color: #fff;
  padding: 6px;
  border-radius: 5px;
  white-space: pre-line;
  word-break: break-word;
}

.request-status__REJECTED {
  background-color: #f56c6c;
  color: #fff;
  padding: 6px;
  border-radius: 5px;
  white-space: pre-line;
  word-break: break-word;
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

.header-actions__button {
  margin-left: 16px;
}

.request-status-select__Pending {
  color: #e6a23c;
}

.request-status-select__Approved {
  color: #67c23a;
}

.request-status-select__Rejected {
  color: #f56c6c;
}

.el-autocomplete-suggestion {
  width: fit-content !important;
}
</style>
