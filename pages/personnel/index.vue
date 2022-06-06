<template>
  <div class="personnel">
    <div class="personnel__header">
      <div class="personnel__header-text">Danh sách nhân sự</div>
      <div class="personnel__header-actions">
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
          >Tạo mới</el-button
        >
      </div>
    </div>
    <div class="personnel-table">
      <vue-good-table
        :fixed-header="false"
        :columns="columns"
        :rows="personnelList"
        :sort-options="{
          enabled: true,
        }"
        :pagination-options="{
          enabled: true,
          perPage: 10,
          perPageDropdownEnabled: false,
          dropdownAllowAll: false,
          mode: 'pages',
        }"
        @on-row-dblclick="onRowDoubleClick"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PersonnelPage',
  layout: 'main',
  middleware: ['auth'],
  data() {
    return {
      searchText: '',
      value: '',
    }
  },

  computed: {
    ...mapGetters('user', ['columns', 'workingStatus', 'personnelList']),
  },

  mounted() {
    this.getPersonnelList()
  },

  methods: {
    ...mapActions('user', ['getPersonnelList']),
    onRowDoubleClick() {},
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

.header-actions__search {
  width: 200px;
  margin-right: 12px;
}

.header-actions__working-status {
  margin-right: 12px;
  max-width: 200px;
}

.personnel-table {
  margin-top: 24px;
}

.table-header-center {
  text-align: center;
}
</style>
