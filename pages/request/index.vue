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
          :v-model="requestDateSearch"
        >
        </el-date-picker>
        <el-select
          class="request-search__request-type request-search__input"
          placeholder="Loại yêu cầu"
          value=""
          :v-model="requestTypeSearch"
        >
          <el-option label="Xin nghỉ" value="dayoff"> </el-option>
        </el-select>
        <el-select
          class="request-search__status request-search__input"
          placeholder="Trạng thái"
          value=""
          :v-model="requestStatusSearch"
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
              <el-dropdown-item
                v-for="requestType in listRequestType"
                :key="requestType.request_type_id"
                @click="createRequest(requestType)"
              >
                {{ requestType.request_type_name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="request-table">
      <el-tabs
        :value="activeTable"
        type="border-card"
        @tab-click="handleClickTab"
      >
        <el-tab-pane label="Yêu cầu đi" name="first">
          <request-send-table />
        </el-tab-pane>
        <el-tab-pane label="Yêu cầu đến" name="second">
          <request-receive-table />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RequestReceiveTable from '~/components/table/RequestReceiveTable.vue'
import RequestSendTable from '~/components/table/RequestSendTable.vue'
export default {
  name: 'ViewRequestPage',
  components: { RequestReceiveTable, RequestSendTable },
  layout: 'main',
  data() {
    return {}
  },

  computed: {
    ...mapGetters('request', [
      'listRequestType',
      'activeTable',
      'requestTypeSearch',
      'requestStatusSearch',
      'requestDateSearch',
    ]),
  },

  async mounted() {
    await this.getListRequestSend(1)
    await this.getListRequestType()
  },

  methods: {
    ...mapActions('request', [
      'getListRequestSend',
      'getListRequestReceive',
      'getListRequestType',
      'handleClickTab',
    ]),
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
