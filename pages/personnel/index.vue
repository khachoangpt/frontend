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
          clearable
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
        <el-button
          class="header-actions__button"
          type="primary"
          @click="setCenterDialogVisible(true)"
        >
          Tạo mới
        </el-button>
      </div>
    </div>
    <div class="personnel-table">
      <vue-good-table
        :fixed-header="false"
        :columns="columns"
        :rows="personnelList.hrmResponse"
        :search-options="{
          enabled: true,
          externalQuery: value,
          externalQuery: searchText,
        }"
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
        @on-row-mouseenter="onRowMouseover"
        @on-row-mouseleave="onRowMouseleave"
        @on-row-dblclick="onRowDoubleClick"
      >
        <template slot="table-row" slot-scope="props">
          <span
            v-if="props.column.field == 'full_name'"
            class="full-name-column"
          >
            <span>
              {{ props.row.full_name }}
            </span>
            <i
              class="el-icon-edit"
              :class="{ 'full-name-column__icon': isEditPersonnel }"
            ></i>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </div>
    <el-dialog
      title="Tạo mới nhân sự"
      :visible.sync="centerDialogVisible"
      width="70%"
      top="5vh"
      :show-close="false"
    >
      <div class="add-personnel-dialog__content">
        <el-form
          ref="form"
          label-position="top"
          :model="addEmployeeForm"
          label-width="120px"
        >
          <el-row :gutter="40">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="Họ và tên">
                  <el-input v-model="addEmployeeForm.fullName"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="Ngày sinh">
                  <el-date-picker
                    v-model="addEmployeeForm.birthDate"
                    type="date"
                    placeholder="Ngày sinh"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="Số điện thoại">
                  <el-input v-model="addEmployeeForm.phone"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="Giới tính">
                  <el-select
                    v-model="addEmployeeForm.gender"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in genderList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="Phân quyền">
                  <el-select
                    v-model="addEmployeeForm.role"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in roles"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="Cấp bậc">
                  <el-input v-model="addEmployeeForm.grade"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="Vị trí">
                  <el-input v-model="addEmployeeForm.position"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="Văn phòng làm việc">
                  <el-input v-model="addEmployeeForm.office"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="Lĩnh vực">
                  <el-input v-model="addEmployeeForm.area"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="Loại hình lao động">
                  <el-input v-model="addEmployeeForm.workingType"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="Quản lý">
                  <el-input v-model="addEmployeeForm.managerId"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="Thời gian làm việc">
                  <el-input v-model="addEmployeeForm.employeeType"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setCenterDialogVisible(false)">Cancel</el-button>
        <el-button type="primary" @click="addEmployee(addEmployeeForm)"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PersonnelPage',
  layout: 'main',
  middleware: ['auth'],
  data() {
    return {
      searchText: '',
      value: '',
      isEditPersonnel: '',
      addEmployeeForm: {
        fullName: '',
        role: '',
        phone: '',
        gender: '',
        birthDate: '',
        grade: '',
        position: '',
        office: '',
        area: '',
        workingType: '',
        managerId: '',
        employeeType: '',
      },
    }
  },

  computed: {
    ...mapGetters('user', [
      'columns',
      'workingStatus',
      'personnelList',
      'genderList',
      'roles',
      'centerDialogVisible',
    ]),
  },

  mounted() {
    this.getPersonnelList()
  },

  methods: {
    ...mapActions('user', ['getPersonnelList', 'addEmployee', 'onRowDoubleClick']),
    ...mapMutations('user', ['setCenterDialogVisible']),
    onRowMouseover() {
      this.isEditPersonnel = false
    },
    onRowMouseleave() {
      this.isEditPersonnel = true
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

.full-name-column {
  display: flex;
  justify-content: space-between;
}

.full-name-column__icon {
  display: none;
}

.el-dialog__title {
  font-size: 24px;
  font-weight: 600;
  color: #204ee7;
}

.add-personnel-dialog__content {
  padding: 0 48px;
}
</style>
