<template>
  <div>
    <div class="add-personnel__header">
      <div class="add-personnel__header-text">
        {{ $i18n.t('personnel.addNewEmployee') }}
      </div>
      <div class="add-employee__action">
        <a
          class="download-template"
          href="https://res.cloudinary.com/pingdaily/raw/upload/v1660546108/template/Import_fsxewa.xlsx"
        >
          Template
        </a>
        <label for="fusk" class="import-by-excel__button">
          <span class="import-by-excel__text">Import from Excel</span>
          <img class="import-by-excel" src="~/static/excel.png" alt="excel" />
        </label>
      </div>
      <input
        id="fusk"
        ref="excelFile"
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        style="display: none"
        @change="importFileExcel"
      />
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
            <div class="grid-content">
              <el-form-item
                :label="$i18n.t('personnel.fullName')"
                prop="fullName"
              >
                <el-input
                  v-model="addEmployeeForm.fullName"
                  :placeholder="$i18n.t('personnel.fullName')"
                  class="add-employee-form__input"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item
                :label="$i18n.t('personnel.dateOfBirth')"
                prop="birthDate"
              >
                <el-date-picker
                  v-model="addEmployeeForm.birthDate"
                  type="date"
                  :placeholder="$i18n.t('personnel.dateOfBirth')"
                  class="add-employee-form__input"
                >
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item :label="$i18n.t('personnel.gender')" prop="gender">
                <el-select
                  v-model="addEmployeeForm.gender"
                  :placeholder="$i18n.t('personnel.select')"
                  class="add-employee-form__input"
                >
                  <el-option
                    v-for="item in genderList"
                    :key="item.value"
                    :label="$i18n.t('personnel.genderList.' + item.label)"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item :label="$i18n.t('personnel.phone')" prop="phone">
                <el-input
                  v-model="addEmployeeForm.phone"
                  :placeholder="$i18n.t('personnel.phone')"
                  class="add-employee-form__input"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item
                :label="$i18n.t('personnel.personalEmail')"
                prop="personalEmail"
              >
                <el-input
                  v-model="addEmployeeForm.personalEmail"
                  :placeholder="$i18n.t('personnel.personalEmail')"
                  class="add-employee-form__input"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item :label="$i18n.t('personnel.role')" prop="role">
                <el-select
                  v-model="addEmployeeForm.role"
                  :placeholder="$i18n.t('personnel.select')"
                  class="add-employee-form__input"
                >
                  <el-option
                    v-for="item in roles"
                    :key="item.type_id"
                    :label="$i18n.t('personnel.roles.' + item.role)"
                    :value="item.type_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item
                :label="$i18n.t('personnel.position')"
                prop="position"
              >
                <el-select
                  v-model="addEmployeeForm.position"
                  :placeholder="$i18n.t('personnel.select')"
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
            <div class="grid-content">
              <el-form-item :label="$i18n.t('personnel.grade')" prop="grade">
                <el-select
                  v-model="addEmployeeForm.grade"
                  :placeholder="$i18n.t('personnel.select')"
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
            <div class="grid-content">
              <el-form-item :label="$i18n.t('personnel.area')" prop="area">
                <el-select
                  v-model="addEmployeeForm.area"
                  :placeholder="$i18n.t('personnel.select')"
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
            <div class="grid-content">
              <el-form-item
                :label="$i18n.t('personnel.workingType')"
                prop="workingType"
              >
                <el-select
                  v-model="addEmployeeForm.workingType"
                  :placeholder="$i18n.t('personnel.select')"
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
            <div class="grid-content">
              <el-form-item
                :label="$i18n.t('personnel.manager')"
                prop="managerId"
              >
                <el-autocomplete
                  v-model="addEmployeeForm.managerId"
                  class="add-employee-form__input"
                  :fetch-suggestions="querySearch"
                  :placeholder="$i18n.t('personnel.manager')"
                ></el-autocomplete>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item
                :label="$i18n.t('personnel.employeeType')"
                prop="employeeType"
              >
                <el-select
                  v-model="addEmployeeForm.employeeType"
                  :placeholder="$i18n.t('personnel.select')"
                  class="add-employee-form__input"
                >
                  <el-option
                    v-for="item in employeeTypes"
                    :key="item.type_id"
                    :label="
                      $i18n.t('personnel.employeeTypes[\'' + item.name + '\']')
                    "
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
            <div class="grid-content">
              <el-form-item :label="$i18n.t('personnel.office')" prop="office">
                <el-select
                  v-model="addEmployeeForm.office"
                  :placeholder="$i18n.t('personnel.select')"
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
            <div class="grid-content">
              <el-form-item
                :label="$i18n.t('personnel.startDate')"
                prop="startDate"
              >
                <el-date-picker
                  v-model="addEmployeeForm.startDate"
                  type="date"
                  :placeholder="$i18n.t('personnel.startDate')"
                  class="add-employee-form__input"
                >
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item
                :label="$i18n.t('personnel.endDate')"
                prop="endDate"
              >
                <el-date-picker
                  v-model="addEmployeeForm.endDate"
                  type="date"
                  :placeholder="$i18n.t('personnel.endDate')"
                  class="add-employee-form__input"
                >
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item
                :label="$i18n.t('personnel.baseSalary')"
                prop="baseSalary"
              >
                <el-input
                  v-model.number="addEmployeeForm.baseSalary"
                  :placeholder="$i18n.t('personnel.baseSalary')"
                  class="add-employee-form__input"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item :label="$i18n.t('personnel.salary')" prop="salary">
                <el-input
                  v-model.number="addEmployeeForm.salary"
                  :placeholder="$i18n.t('personnel.salary')"
                  class="add-employee-form__input"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="add-personnel__footer">
      <el-button type="info" @click="$router.go(-1)">{{
        $i18n.t('personnel.back')
      }}</el-button>
      <el-button
        v-loading.fullscreen.lock="fullscreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
        type="primary"
        @click="addNewEmployee('addEmployeeForm')"
      >
        {{ $i18n.t('personnel.addEmployee') }}
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
        baseSalary: '',
        salary: '',
      },

      rules: {
        fullName: [
          {
            required: true,
            message: this.$i18n.t('personnel.validation.fullName'),
            trigger: 'blur',
          },
        ],
        birthDate: [
          {
            required: true,
            message: this.$i18n.t('personnel.validation.birthDate'),
            trigger: 'blur',
          },
        ],
        gender: [
          {
            required: true,
            message: this.$i18n.t('personnel.validation.gender'),
            trigger: 'change',
          },
        ],
        phone: [
          {
            required: true,
            message: this.$i18n.t('personnel.validation.phone'),
            trigger: 'blur',
          },
        ],
        personalEmail: [
          {
            required: true,
            message: this.$i18n.t('personnel.validation.personalEmail'),
            trigger: 'blur',
          },
        ],
        role: [
          {
            required: true,
            message: this.$i18n.t('personnel.validation.role'),
            trigger: 'change',
          },
        ],
        position: [
          {
            required: true,
            message: this.$i18n.t('personnel.validation.position'),
            trigger: 'change',
          },
        ],
        grade: [
          {
            required: true,
            message: this.$i18n.t('personnel.validation.grade'),
            trigger: 'change',
          },
        ],
        area: [
          {
            required: true,
            message: this.$i18n.t('personnel.validation.area'),
            trigger: 'change',
          },
        ],
        workingType: [
          {
            required: true,
            message: this.$i18n.t('personnel.validation.workingType'),
            trigger: 'change',
          },
        ],
        employeeType: [
          {
            required: true,
            message: this.$i18n.t('personnel.validation.employeeType'),
            trigger: 'change',
          },
        ],
        office: [
          {
            required: true,
            message: this.$i18n.t('personnel.validation.office'),
            trigger: 'change',
          },
        ],
        startDate: [
          {
            required: true,
            message: this.$i18n.t('personnel.validation.startDate'),
            trigger: 'blur',
          },
        ],
        endDate: [
          {
            required: true,
            message: this.$i18n.t('personnel.validation.endDate'),
            trigger: 'blur',
          },
        ],
        baseSalary: [
          {
            required: true,
            message: this.$i18n.t('personnel.validation.baseSalary'),
            trigger: 'blur',
          },
          {
            type: 'number',
            message: this.$i18n.t('personnel.validation.number'),
          },
        ],
        salary: [
          {
            required: true,
            message: this.$i18n.t('personnel.validation.salary'),
            trigger: 'blur',
          },
          {
            type: 'number',
            message: this.$i18n.t('personnel.validation.number'),
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
    await this.getManagerLowerOfArea()
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
      'onChangePosition',
      'addEmployeeByExcel',
    ]),
    ...mapActions('salary', ['getManagerLowerOfArea']),

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

    async importFileExcel() {
      await this.setFullscreenLoading(true)
      await this.addEmployeeByExcel(this.$refs.excelFile.files[0])
      this.$refs.excelFile.value = null;
    },
  },
}
</script>

<style>
.add-personnel__header {
  border-bottom: 2px solid #ccc;
  padding-bottom: 16px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.import-by-excel__button {
  background-color: #67c23a;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.import-by-excel__button:hover {
  opacity: 0.8;
}

.import-by-excel__text {
  font-size: 14px;
}

.import-by-excel {
  width: 40px;
  margin-left: 8px;
}

.add-employee__action {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.download-template {
  color: #409eff;
  margin-right: 12px;
  font-size: 14px;
}
</style>
