<template>
  <div>
    <div class="add-personnel__header">
      <div class="add-personnel__header-text">Thêm mới nhân viên</div>
    </div>
    <div class="add-personnel__content">
      <el-form
        ref="form"
        label-position="top"
        :model="addEmployeeForm"
        label-width="120px"
      >
        <el-row :gutter="40">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="Họ và tên">
                <el-input
                  v-model="addEmployeeForm.fullName"
                  class="add-employee-form__input"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Ngày sinh">
                <el-date-picker
                  v-model="addEmployeeForm.birthDate"
                  type="date"
                  placeholder="Ngày sinh"
                  class="add-employee-form__input"
                >
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="Giới tính">
                <el-select
                  v-model="addEmployeeForm.gender"
                  placeholder="Select"
                  class="add-employee-form__input"
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
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Số điện thoại">
                <el-input
                  v-model="addEmployeeForm.phone"
                  class="add-employee-form__input"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Email cá nhân">
                <el-input
                  v-model="addEmployeeForm.personalEmail"
                  class="add-employee-form__input"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Phân quyền">
                <el-select
                  v-model="addEmployeeForm.role"
                  placeholder="Select"
                  class="add-employee-form__input"
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
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Vị trí">
                <el-select
                  v-model="addEmployeeForm.position"
                  placeholder="Select"
                  class="add-employee-form__input"
                >
                  <el-option
                    v-for="item in listPositions"
                    :key="item.job_id"
                    :label="item.position"
                    :value="item.position"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Cấp bậc">
                <el-select
                  v-model="addEmployeeForm.grade"
                  placeholder="Select"
                  class="add-employee-form__input"
                >
                  <el-option
                    v-for="item in listGrade"
                    :key="item.grade_id"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Lĩnh vực">
                <el-select
                  v-model="addEmployeeForm.area"
                  placeholder="Select"
                  class="add-employee-form__input"
                >
                  <el-option
                    v-for="item in listArea"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Loại hình lao động">
                <el-select
                  v-model="addEmployeeForm.workingType"
                  placeholder="Select"
                  class="add-employee-form__input"
                >
                  <el-option
                    v-for="item in workingTypes"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Quản lý">
                <el-input
                  v-model="addEmployeeForm.managerId"
                  class="add-employee-form__input"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Loại nhân sự">
                <el-select
                  v-model="addEmployeeForm.employeeType"
                  placeholder="Select"
                >
                  <el-option
                    v-for="item in employeeTypes"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Văn phòng làm việc">
                <el-select
                  v-model="addEmployeeForm.office"
                  placeholder="Select"
                  class="add-employee-form__input"
                >
                  <el-option
                    v-for="item in listOffice"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="add-personnel__footer">
      <el-button type="info" @click="$router.go(-1)">Quay lại</el-button>
      <el-button type="primary">Xác nhận</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'AddEmployee',
  layout: 'main',
  middleware: ['auth', 'admin'],
  data() {
    return {
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
        personalEmail: '',
      },
    }
  },

  computed: {
    ...mapGetters('user', [
      'workingStatus',
      'personnelList',
      'genderList',
      'roles',
      'centerDialogVisible',
      'workingTypes',
      'listGrade',
      'listOffice',
      'listArea',
      'employeeTypes',
      'listPositions',
    ]),
  },

  mounted() {
    this.getListGrade()
    this.getListOffice()
    this.getListArea()
    this.getEmployeeTypes()
    this.getWorkingTypes()
    this.getListPositions()
  },

  methods: {
    ...mapActions('user', [
      'addEmployee',
      'onRowDoubleClick',
      'getListGrade',
      'getListOffice',
      'getListArea',
      'getEmployeeTypes',
      'getWorkingTypes',
      'getListPositions',
    ]),
    ...mapMutations('user', ['setCenterDialogVisible']),
  },
}
</script>

<style>
.add-personnel__header {
  border-bottom: 2px solid #ccc;
  padding-bottom: 16px;
  margin-bottom: 24px;
}

.add-personnel__header-text {
  font-weight: 600;
  font-size: 20px;
}

.add-personnel__footer {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

.add-employee-form__input {
  width: 80%;
}
</style>
