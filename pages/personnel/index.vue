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
        :fixed-header="true"
        :columns="columns"
        :rows="rows"
        :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
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
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonnelPage',
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
          label: 'Nhân sự',
          field: 'name',
        },
        {
          label: 'Mã',
          field: 'code',
        },
        {
          label: 'Trạng thái',
          field: 'status',
        },
        {
          label: 'Thâm niên',
          field: 'experience',
        },
        {
          label: 'Chức danh',
          field: 'jobTitle',
        },
        {
          label: 'Chuyên môn',
          field: 'specialize',
        },
        {
          label: 'Văn phòng',
          field: 'office',
        },
      ],
      rows: [
        {
          name: 'Nguyễn Khắc Hoàng',
          code: 'HE140',
          status: 'True',
          experience: '1 năm',
          jobTitle: 'Nhân viên',
          specialize: 'Developer',
          office: 'Hà Nội',
        },
        {
          name: 'Nguyễn Khắc Hoàng',
          code: 'HE140',
          status: 'True',
          experience: '1 năm',
          jobTitle: 'Nhân viên',
          specialize: 'Developer',
          office: 'Hà Nội',
        },
        {
          name: 'Nguyễn Khắc Hoàng',
          code: 'HE140',
          status: 'True',
          experience: '1 năm',
          jobTitle: 'Nhân viên',
          specialize: 'Developer',
          office: 'Hà Nội',
        },
        {
          name: 'Nguyễn Khắc Hoàng',
          code: 'HE140',
          status: 'True',
          experience: '1 năm',
          jobTitle: 'Nhân viên',
          specialize: 'Developer',
          office: 'Hà Nội',
        },
        {
          name: 'Nguyễn Khắc Hoàng',
          code: 'HE140',
          status: 'True',
          experience: '1 năm',
          jobTitle: 'Nhân viên',
          specialize: 'Developer',
          office: 'Hà Nội',
        },
        {
          name: 'Nguyễn Khắc Hoàng',
          code: 'HE140',
          status: 'True',
          experience: '1 năm',
          jobTitle: 'Nhân viên',
          specialize: 'Developer',
          office: 'Hà Nội',
        },
        {
          name: 'Nguyễn Khắc Hoàng',
          code: 'HE140',
          status: 'True',
          experience: '1 năm',
          jobTitle: 'Nhân viên',
          specialize: 'Developer',
          office: 'Hà Nội',
        },
        {
          name: 'Nguyễn Khắc Hoàng',
          code: 'HE140',
          status: 'True',
          experience: '1 năm',
          jobTitle: 'Nhân viên',
          specialize: 'Developer',
          office: 'Hà Nội',
        },
        {
          name: 'Nguyễn Khắc Hoàng',
          code: 'HE140',
          status: 'True',
          experience: '1 năm',
          jobTitle: 'Nhân viên',
          specialize: 'Developer',
          office: 'Hà Nội',
        },
        {
          name: 'Nguyễn Khắc Hoàng',
          code: 'HE140',
          status: 'True',
          experience: '1 năm',
          jobTitle: 'Nhân viên',
          specialize: 'Developer',
          office: 'Hà Nội',
        },
        {
          name: 'Nguyễn Khắc Hoàng',
          code: 'HE140',
          status: 'True',
          experience: '1 năm',
          jobTitle: 'Nhân viên',
          specialize: 'Developer',
          office: 'Hà Nội',
        },
      ],
    }
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
</style>
