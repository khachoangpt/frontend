<template>
  <div class="policy">
    <div class="policy__header">
      <div class="policy__header-text">Chính sách phúc lợi</div>
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PolicyPage',
  layout: 'main',
  middleware: ['admin'],
  data() {
    return {
      searchText: '',
    }
  },

  computed: {
    ...mapGetters('policy', ['policyList', 'columns', 'totalPage']),
  },

  async mounted() {
    await this.getListPolicyByCategory(5)
  },

  methods: {
    ...mapActions('policy', ['getListPolicyByCategory']),
    async currentChange(page) {},
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
</style>
