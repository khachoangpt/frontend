<template>
  <div class="policy">
    <div class="policy__header">
      <div class="policy__header-text">{{ $i18n.t('sidebar.paidLeave') }}</div>
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
      :title="$i18n.t('policy.dialog.policyDetail')"
      :visible.sync="policyDetailDialogVisible"
      width="38%"
      center
    >
      <el-row :gutter="20">
        <el-col class="detail-policy" :span="12">
          {{ $i18n.t('policy.dialog.policyType') }}:
          <span>{{ policyDetail[0].policy_type }}</span>
        </el-col>
        <el-col class="detail-policy" :span="12">
          {{ $i18n.t('policy.dialog.policyName') }}:
          <span>{{ policyDetail[0].policy_name }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col class="detail-policy" :span="12">
          {{ $i18n.t('policy.dialog.createDate') }}:
          <span>{{ policyDetail[0].created_date }}</span>
        </el-col>
        <el-col class="detail-policy" :span="12">
          {{ $i18n.t('policy.dialog.effectiveDate') }}:
          <span>{{ policyDetail[0].effective_date }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col class="detail-policy" :span="12">
          {{ $i18n.t('policy.dialog.status') }}:
          <span>{{
            policyDetail[0].policy_status === true ? 'Active' : 'Deactivate'
          }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col class="detail-policy" :span="24">
          {{ $i18n.t('policy.dialog.content') }}:
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
      columns: [
        {
          label: this.$i18n.t('policy.dialog.policyType'),
          field: 'policy_type',
          thClass: 'policy-table-header__center',
        },
        {
          label: this.$i18n.t('policy.dialog.policyName'),
          field: 'policy_name',
          thClass: 'policy-table-header__center',
        },
        {
          label: this.$i18n.t('policy.dialog.description'),
          field: 'description',
          thClass: 'policy-table-header__center',
        },
        {
          label: this.$i18n.t('policy.dialog.createDate'),
          field: 'created_date',
          thClass: 'policy-table-header__center',
        },
        {
          label: this.$i18n.t('policy.dialog.effectiveDate'),
          field: 'effective_date',
          thClass: 'policy-table-header__center',
        },
        {
          label: this.$i18n.t('policy.dialog.status'),
          field: 'policy_status',
          thClass: 'policy-table-header__center',
        },
      ],
    }
  },

  computed: {
    ...mapGetters('policy', ['policyList', 'totalPage', 'policyDetail']),
  },

  async mounted() {
    await this.getListPolicyByCategory(5)
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

.el-pagination {
  margin-top: 16px;
  text-align: center;
  padding-bottom: 16px;
}
</style>
