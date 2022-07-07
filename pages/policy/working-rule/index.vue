<template>
  <div class="policy">
    <div class="policy__header">
      <div class="policy__header-text">Chính sách làm việc</div>
    </div>
    <div class="policy-table">
      <vue-good-table
        :fixed-header="true"
        :columns="columns"
        :rows="policyList"
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
            :page-size="10"
            :total="totalPage"
            @current-change="currentChange"
          >
          </el-pagination>
        </template>
      </vue-good-table>
    </div>
    <el-dialog
      title="Chi tiết chính sách"
      :visible.sync="policyDetailDialogVisible"
      width="38%"
      center
    >
      <el-row :gutter="20">
        <el-col class="detail-policy" :span="12">
          Loại chính sách: <span>{{ policyDetail[0].policy_type }}</span>
        </el-col>
        <el-col class="detail-policy" :span="12">
          Tên chính sách: <span>{{ policyDetail[0].policy_name }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col class="detail-policy" :span="12">
          Ngày tạo: <span>{{ policyDetail[0].created_date }}</span>
        </el-col>
        <el-col class="detail-policy" :span="12">
          Ngày có hiệu lực: <span>{{ policyDetail[0].effective_date }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col class="detail-policy" :span="12">
          Trạng thái:
          <span>{{
            policyDetail[0].policy_status === true
              ? 'Đang áp dụng'
              : 'Không được áp dụng'
          }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col class="detail-policy" :span="24">
          Nội dung:
          <el-input
            type="textarea"
            :rows="6"
            :value="policyDetail[0].description"
            readonly
          >
          </el-input>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PolicyPage',
  layout: 'main',
  data() {
    return {
      searchText: '',
      policyDetailDialogVisible: false,
    }
  },

  computed: {
    ...mapGetters('policy', [
      'policyList',
      'columns',
      'totalPage',
      'policyDetail',
    ]),
  },

  async mounted() {
    await this.getListPolicyByCategory(1)
  },

  methods: {
    ...mapActions('policy', ['getListPolicyByCategory', 'getDetailPolicy']),
    async currentChange(page) {},

    async onRowDoubleClick(data) {
      await this.getDetailPolicy(data.row.policy_id)
      this.policyDetailDialogVisible = true
    },
  },
}
</script>

<style>
.policy__header {
  display: flex;
  justify-content: space-between;
}

.policy__header-text {
  font-weight: 600;
  font-size: 20px;
}

.policy__header-actions {
  display: flex;
}

.header-actions__search {
  width: 200px;
  margin-right: 12px;
}

.header-actions__working-status {
  margin-right: 12px;
  max-width: 200px;
}

.policy-table {
  margin-top: 24px;
}

.policy-table-header__center {
  text-align: center;
}

.detail-policy {
  margin-bottom: 24px;
  font-size: 16px;
}
</style>
