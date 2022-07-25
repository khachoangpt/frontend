<template>
  <div>
    <div class="add-personnel__header">
      <div class="add-personnel__header-text">Thêm mới nhân viên</div>
    </div>
    <div class="add-personnel__content">
      <el-form
        ref="addEmployeeForm"
        label-position="top"
        :model="addEmployeeForm"
        label-width="120px"
        :rules="rules"
      >
        <el-row :gutter="40">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="Họ và tên" prop="fullName">
                <el-input
                  v-model="addEmployeeForm.fullName"
                  placeholder="Họ và tên"
                  class="add-employee-form__input"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Ngày sinh" prop="birthDate">
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
              <el-form-item label="Giới tính" prop="gender">
                <el-select
                  v-model="addEmployeeForm.gender"
                  placeholder="Chọn"
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
              <el-form-item label="Số điện thoại" prop="phone">
                <el-input
                  v-model="addEmployeeForm.phone"
                  placeholder="Số điện thoại"
                  class="add-employee-form__input"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Email cá nhân" prop="personalEmail">
                <el-input
                  v-model="addEmployeeForm.personalEmail"
                  placeholder="Email cá nhân"
                  class="add-employee-form__input"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Phân quyền" prop="role">
                <el-select
                  v-model="addEmployeeForm.role"
                  placeholder="Chọn"
                  class="add-employee-form__input"
                >
                  <el-option
                    v-for="item in roles"
                    :key="item.type_id"
                    :label="item.role"
                    :value="item.type_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Vị trí" prop="position">
                <el-select
                  v-model="addEmployeeForm.position"
                  placeholder="Chọn"
                  class="add-employee-form__input"
                  @change="onChangePosition"
                >
                  <el-option
                    v-for="item in listPositions"
                    :key="item.job_id"
                    :label="item.position"
                    :value="item.job_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Cấp bậc" prop="grade">
                <el-select
                  v-model="addEmployeeForm.grade"
                  placeholder="Chọn"
                  class="add-employee-form__input"
                  :disabled="addEmployeeForm.position === ''"
                >
                  <el-option
                    v-for="item in listGrade"
                    :key="item.grade_id"
                    :label="item.name"
                    :value="item.grade_id"
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
              <el-form-item label="Lĩnh vực" prop="area">
                <el-select
                  v-model="addEmployeeForm.area"
                  placeholder="Chọn"
                  class="add-employee-form__input"
                >
                  <el-option
                    v-for="item in listArea"
                    :key="item.area_id"
                    :label="item.name"
                    :value="item.area_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Loại hình lao động" prop="workingType">
                <el-select
                  v-model="addEmployeeForm.workingType"
                  placeholder="Chọn"
                  class="add-employee-form__input"
                >
                  <el-option
                    v-for="item in workingTypes"
                    :key="item.type_id"
                    :label="item.name"
                    :value="item.type_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Quản lý" prop="managerId">
                <el-autocomplete
                  v-model="addEmployeeForm.managerId"
                  class="add-employee-form__input"
                  :fetch-suggestions="querySearch"
                  placeholder="Please Input"
                ></el-autocomplete>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Loại nhân sự" prop="employeeType">
                <el-select
                  v-model="addEmployeeForm.employeeType"
                  placeholder="Chọn"
                  class="add-employee-form__input"
                >
                  <el-option
                    v-for="item in employeeTypes"
                    :key="item.type_id"
                    :label="item.name"
                    :value="item.type_id"
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
              <el-form-item label="Văn phòng làm việc" prop="office">
                <el-select
                  v-model="addEmployeeForm.office"
                  placeholder="Chọn"
                  class="add-employee-form__input"
                >
                  <el-option
                    v-for="item in listOffice"
                    :key="item.office_id"
                    :label="item.name"
                    :value="item.office_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Ngày bắt đầu" prop="startDate">
                <el-date-picker
                  v-model="addEmployeeForm.startDate"
                  type="date"
                  placeholder="Ngày bắt đầu"
                  class="add-employee-form__input"
                >
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-form-item label="Ngày kết thúc" prop="endDate">
                <el-date-picker
                  v-model="addEmployeeForm.endDate"
                  type="date"
                  placeholder="Ngày kết thúc"
                  class="add-employee-form__input"
                >
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="add-personnel__footer">
      <el-button type="info" @click="$router.go(-1)">Quay lại</el-button>
      <el-button
        v-loading.fullscreen.lock="fullscreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        type="primary"
        @click="addNewEmployee('addEmployeeForm')"
      >
        Thêm
      </el-button>
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
      state1: '',
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
        startDate: '',
        endDate: '',
      },

      rules: {
        fullName: [
          {
            required: true,
            message: 'Tên không được để trống',
            trigger: 'blur',
          },
        ],
        birthDate: [
          {
            required: true,
            message: 'Ngày sinh không được để trống',
            trigger: 'blur',
          },
        ],
        gender: [
          {
            required: true,
            message: 'Giới tính không được để trống',
            trigger: 'blur',
          },
        ],
        phone: [
          {
            required: true,
            message: 'Số điện thoại không được để trống',
            trigger: 'blur',
          },
        ],
        personalEmail: [
          {
            required: true,
            message: 'Email không được để trống',
            trigger: 'blur',
          },
        ],
        role: [
          {
            required: true,
            message: 'Phân quyền không được để trống',
            trigger: 'blur',
          },
        ],
        position: [
          {
            required: true,
            message: 'Vị trí không được để trống',
            trigger: 'blur',
          },
        ],
        grade: [
          {
            required: true,
            message: 'Cấp bậc không được để trống',
            trigger: 'blur',
          },
        ],
        area: [
          {
            required: true,
            message: 'Lĩnh vực không được để trống',
            trigger: 'blur',
          },
        ],
        workingType: [
          {
            required: true,
            message: 'Loại hình lao động không được để trống',
            trigger: 'blur',
          },
        ],
        employeeType: [
          {
            required: true,
            message: 'Loại nhân viên không được để trống',
            trigger: 'blur',
          },
        ],
        office: [
          {
            required: true,
            message: 'Văn phòng không được để trống',
            trigger: 'blur',
          },
        ],
        startDate: [
          {
            required: true,
            message: 'Ngày bắt đầu không được để trống',
            trigger: 'blur',
          },
        ],
        endDate: [
          {
            required: true,
            message: 'Ngày kết thúc không được để trống',
            trigger: 'blur',
          },
        ],
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
      'fullscreenLoading',
      'listManager',
    ]),
  },

  async mounted() {
    await this.getListOffice()
    await this.getListArea()
    await this.getEmployeeTypes()
    await this.getWorkingTypes()
    await this.getListPositions()
    await this.getListRoleType()
    await this.searchManager('')
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
      'getListRoleType',
      'searchManager',
      'onChangePosition'
    ]),

    ...mapMutations('user', ['setFullscreenLoading']),

    addNewEmployee(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.setFullscreenLoading(true)
          await this.addEmployee(this.addEmployeeForm)
        } else {
          return false
        }
      })
    },

    querySearch(queryString, cb) {
      const results = queryString
        ? this.listManager.filter(this.createFilter(queryString))
        : this.listManager
      cb(results)
    },
    createFilter(queryString) {
      return (link) => {
        return link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
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
  width: 80% !important;
}

.el-autocomplete-suggestion {
  width: fit-content !important;
}
</style>
