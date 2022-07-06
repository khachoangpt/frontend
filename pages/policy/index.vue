<template>
  <div class="policy">
    <div class="policy__header">
      <div class="policy__header-text">Chính sách công ty</div>
      <div class="policy__header-actions">
        <el-input
          v-model="searchText"
          class="header-actions__search"
          placeholder="Search"
        >
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-select
          v-model="value"
          placeholder="Select"
          class="header-actions__working-status"
        >
          <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
          <el-option
            v-for="item in workingStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button class="header-actions__button" type="primary"
          >Tạo mới
        </el-button>
      </div>
    </div>
    <div class="policy-table">
      <vue-good-table
        :fixed-header="true"
        :columns="columns"
        :rows="rows"
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
            :total="1"
            @current-change="currentChange"
          >
          </el-pagination>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PolicyPage',
  layout: 'main',
  data() {
    return {
      searchText: '',
      workingStatus: [
        {
          value: 'Đang làm việc',
          label: 'Đang làm việc',
        },
        {
          value: 'Không đi làm',
          label: 'Không đi làm',
        },
      ],
      value: '',
      columns: [
        {
          label: 'Type',
          field: 'type',
        },
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Created Date',
          field: 'startDate',
        },
        {
          label: 'Effective Date',
          field: 'effectiveDate',
        },
        {
          label: 'Applied to',
          field: 'apply',
        },
        {
          label: 'Status',
          field: 'status',
        },
      ],
      rows: [
        {
          type: 'Working Time',
          name: 'Work Late',
          startDate: '23/06/2022',
          effectiveDate: '23/07/2022',
          apply: 'Whole Company',
          status: '1',
        },
      ],
    }
  },

  methods: {
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
</style>
