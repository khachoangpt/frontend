<template>
  <el-dialog
    top="4vh"
    :visible.sync="requestNominationDialogVisible"
    center
    custom-class="request-detail-dialog"
    :before-close="closeDialog"
    :destroy-on-close="true"
  >
    <span slot="title" class="request-dialog__title">{{
      $i18n.t('request.Nomination')
    }}</span>
    <ul class="request-dialog__header">
      <li class="request-dialog__header-line">
        1. Nomination for all employees.
      </li>
      <li class="request-dialog__header-line">
        2. Request is only validated when it get the acceptance from manager.
      </li>
      <li class="request-dialog__header-line">
        3. Create time required: before 48 hours.
      </li>
      <li class="request-dialog__header-line">
        4. Request is approved within 48 hours.
      </li>
    </ul>
    <el-form
      ref="nominationForm"
      :model="nominationForm"
      :rules="rules"
      label-position="left"
      label-width="100px"
      class="request-dialog__body"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            :label="$i18n.t('request.dialog.requestName')"
            :rules="{
              required: true,
              message: 'Request name is not blank.',
              trigger: 'change',
            }"
          >
            <el-select
              v-model="nominationForm.requestNameId"
              class="request-form__input"
              @change="onChangeRequestName"
            >
              <el-option
                v-for="(requestName, index) in listRequestName"
                :key="'requestName' + index"
                :label="requestName.request_name_name"
                :value="requestName.request_name_name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            :label="$i18n.t('request.dialog.employeeName')"
            prop="employeeName"
          >
            <el-autocomplete
              v-model="nominationForm.employeeName"
              class="header-actions__search request-form__input"
              :placeholder="$i18n.t('request.dialog.employeeName')"
              :clearable="true"
              :fetch-suggestions="querySearch"
              @select="handleChangeEmployee"
              @clear="handleChangeEmployee"
            ></el-autocomplete> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item
            :label="$i18n.t('request.dialog.date')"
            prop="requestDate"
          >
            <el-date-picker
              v-model="nominationForm.requestDate"
              class="request-form__input"
              type="date"
              :placeholder="$i18n.t('request.dialog.chooseDay')"
              format="dd-MM-yyyy"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="nominationForm.requestNameId.trim() === 'Promotion'"
        :gutter="20"
      >
        <el-col :span="12">
          <el-form-item label="Vị trí">
            <el-input
              class="request-form__input"
              :value="currentPosition"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <span slot="label"><i class="el-icon-right arrow-icon"></i></span>
            <el-select
              v-model="nominationForm.desiredTitle"
              placeholder="Select"
              :disabled="nominationForm.employeeName === ''"
            >
              <el-option
                v-for="position in listPositions"
                :key="position.job_id"
                :label="position.position"
                :value="position.job_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="nominationForm.requestNameId.trim() === 'Promotion'"
        :gutter="20"
      >
        <el-col :span="12">
          <el-form-item label="Cấp bậc">
            <el-input
              class="request-form__input"
              :value="currentGrade"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <span slot="label"><i class="el-icon-right arrow-icon"></i></span>
            <el-select
              v-model="nominationForm.desiredGrade"
              placeholder="Select"
              :disabled="nominationForm.employeeName === ''"
            >
              <el-option
                v-for="grade in listGrade"
                :key="grade.grade_id"
                :label="grade.name"
                :value="grade.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col
          v-if="nominationForm.requestNameId.trim() === 'Bonus'"
          :span="12"
        >
          <el-form-item :label="$i18n.t('request.dialog.bonus')">
            <el-input
              v-model="nominationForm.bonusValue"
              class="request-form__input"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          v-if="nominationForm.requestNameId.trim() === 'Bonus'"
          :span="12"
        >
          <el-form-item :label="$i18n.t('request.dialog.type')" prop="type">
            <el-select
              v-model="nominationForm.type"
              class="request-form__input"
              placeholder="Select"
            >
              <el-option label="Project bonus" value="1"></el-option>
              <el-option label="Reward bonus" value="2"></el-option>
              <el-option label="KPI bonus" value="3"></el-option>
              <el-option label="Out source bonus" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="nominationForm.requestNameId.trim() === 'Salary increment'"
        :gutter="20"
      >
        <el-col :span="12">
          <el-form-item :label="$i18n.t('request.dialog.salary')">
            <el-input
              v-model="currentSalary"
              class="request-form__input"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="salary">
            <span slot="label"><i class="el-icon-right arrow-icon"></i></span>
            <el-input
              v-model.number="nominationForm.salary"
              class="request-form__input"
              value="IT"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="nominationForm.requestNameId.trim() === 'Salary increment'"
        :gutter="20"
      >
        <el-col :span="12">
          <el-form-item :label="$i18n.t('request.dialog.type')" prop="type">
            <el-select
              v-model="nominationForm.type"
              class="request-form__input"
              placeholder="Select"
            >
              <el-option
                label="Outstanding employee"
                value="Outstanding employee"
              ></el-option>
              <el-option
                label="Excellent Account"
                value="Excellent Account"
              ></el-option>
              <el-option
                label="Best Recruiter"
                value="Best Recruiter"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        :label="$i18n.t('request.dialog.note')"
        prop="requestDescription"
      >
        <el-input
          v-model="nominationForm.description"
          class="request-form__input-area"
          type="textarea"
          :rows="4"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">
        {{ $i18n.t('request.dialog.close') }}
      </el-button>
      <el-button
        v-loading.fullscreen.lock="fullscreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
        type="primary"
        @click="submitForm('nominationForm')"
      >
        {{ $i18n.t('request.dialog.sendRequest') }}
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'RequestNominationDialog',

  data() {
    return {
      currentPosition: '',
      currentGrade: '',
      currentSalary: '',
      nominationForm: {
        createEmployeeId: '',
        requestTypeId: '',
        requestNameId: '',
        description: '',
        employeeId: '',
        employeeName: '',
        date: '',
        currentTitle: '',
        desiredTitle: '',
        currentGrade: '',
        desiredGrade: '',
        currentArea: '',
        desiredArea: '',
        currentOffice: '',
        desiredOffice: '',
        type: '',
        value: '',
      },

      rules: {
        requestValidate: {
          required: true,
          message: 'Request name is not blank.',
          trigger: 'change',
        },

        employeeName: [
          {
            required: true,
            message: 'Employee is not blank.',
            trigger: 'change',
          },
        ],
        requestDate: [
          {
            required: true,
            message: 'Date is not blank.',
            trigger: 'blur',
          },
        ],
        bonusValue: [
          {
            required: true,
            message: 'Bonus is not blank.',
            trigger: 'blur',
          },
        ],
        salary: [
          {
            required: true,
            message: 'Salary is not blank.',
            trigger: 'blur',
          },
          { type: 'number', message: 'Enter a number.' },
        ],
        type: [
          {
            required: true,
            message: 'Type is not blank.',
            trigger: 'change',
          },
        ],
      },
    }
  },

  computed: {
    ...mapGetters('user', [
      'personnelDetail',
      'listPositions',
      'listGrade',
      'workingInfo',
    ]),
    ...mapGetters('request', [
      'requestNominationDialogVisible',
      'listRequestName',
      'fullscreenLoading',
    ]),
    ...mapGetters('salary', ['listEmployeeByManager']),
  },

  async mounted() {
    await this.getEmployeeByManager()
    await this.getListPositions()
    // await this.getListGrade(
    //   this.listPositions.find(
    //     (position) => position.position === this.personnelDetail.position_name
    //   ).job_id
    // )
  },

  methods: {
    ...mapActions('user', [
      'getEmployeeByManager',
      'getPersonnelDetail',
      'getListPositions',
      'getListGrade',
      'getWorkingInfo',
    ]),
    ...mapActions('request', [
      'createRequestBonus',
      'createRequestPromotion',
      'createRequestSalaryIncrement',
    ]),
    ...mapActions('salary', ['getListSalary']),
    ...mapMutations('request', [
      'setRequestNominationDialogVisible',
      'setFullscreenLoading',
      'setCurrentRequestNameId',
    ]),
    ...mapMutations('salary', ['setSearchEmployeeText']),

    closeDialog() {
      this.nominationForm = {
        createEmployeeId: '',
        requestTypeId: '',
        requestNameId: '',
        description: '',
        employeeId: '',
        employeeName: '',
        date: '',
        currentTitle: '',
        desiredTitle: '',
        currentGrade: '',
        desiredGrade: '',
        currentArea: '',
        desiredArea: '',
        currentOffice: '',
        desiredOffice: '',
        type: '',
        value: '',
      }
      this.setRequestNominationDialogVisible(false)
    },

    createRequestNomination() {
      this.setRequestNominationDialogVisible(false)
    },

    handleSelect(item) {
      this.nominationForm.employeeName = item.value
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.nominationForm.requestNameId.trim() === 'Bonus') {
          this.createRequestBonus(this.nominationForm)
          this.setFullscreenLoading(true)
        } else if (
          valid &&
          this.nominationForm.requestNameId.trim() === 'Salary increment'
        ) {
          this.createRequestSalaryIncrement(this.nominationForm)
          this.setFullscreenLoading(true)
        } else if (
          valid &&
          this.nominationForm.requestNameId.trim() === 'Promotion'
        ) {
          this.createRequestPromotion(this.nominationForm)
          this.setFullscreenLoading(true)
        } else {
          return false
        }
      })
    },

    onChangeRequestName(data) {
      for (let i = 0; i < this.listRequestName.length; i++) {
        if (this.listRequestName[i].request_name_name === data) {
          this.setCurrentRequestNameId(this.listRequestName[i].request_name_id)
        }
      }
    },

    querySearch(queryString, cb) {
      const results = queryString
        ? this.listEmployeeByManager.filter(this.createFilter(queryString))
        : this.listEmployeeByManager
      cb(results)
    },

    createFilter(queryString) {
      return (link) => {
        return (
          this.removeMark(link.value.toLowerCase()).includes(
            this.removeMark(queryString.toLowerCase())
          ) === true
        )
      }
    },

    removeMark(str) {
      str = str.replace(/\s+/g, ' ')
      str = str.trim()
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      str = str.replace(/đ/g, 'd')
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
      str = str.replace(/Đ/g, 'D')
      return str
    },

    async handleChangeEmployee(data) {
      if (data !== undefined) {
        const regexEmpId = /\((.+)\)/i
        const employeeId = data.value.match(regexEmpId)[1]
        await this.getPersonnelDetail(employeeId)
        await this.getWorkingInfo(employeeId)
        this.currentPosition = this.personnelDetail.position_name
        this.currentGrade = this.personnelDetail.grade
        this.currentSalary = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(this.workingInfo.final_salary)
        this.setSearchEmployeeText(data.value)
      } else {
        this.currentSalary = ''
        this.currentPosition = ''
        this.currentGrade = ''
        this.setSearchEmployeeText('')
      }
    },
  },
}
</script>

<style scoped>
.request-dialog__header {
  background-color: #b2f59a;
  list-style: none;
  padding: 8px 16px;
  margin: 0;
  color: #184e05;
  border-radius: 5px;
}

.request-dialog__header-line {
  line-height: 20px;
}

.request-dialog__body {
  margin-top: 16px;
}

.form-with-arrow {
  display: flex;
  align-items: center;
}

.arrow {
  width: 100px;
}

.arrow-icon {
  font-weight: 600;
  font-size: 24px;
}

.request-form__input {
  width: 90% !important;
}
</style>

<style>
.request-detail-dialog {
  width: 36%;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .request-detail-dialog {
    width: 100%;
  }
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .request-detail-dialog {
    width: 100%;
  }
}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .request-detail-dialog {
    width: 80%;
  }
}
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .request-detail-dialog {
    width: 60%;
  }
}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .request-detail-dialog {
    width: 54%;
  }
}
</style>
