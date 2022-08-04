<template>
  <el-dialog
    top="4vh"
    :visible.sync="requestNominationDialogVisible"
    width="50%"
    center
    :before-close="closeDialog"
    :destroy-on-close="true"
  >
    <span slot="title" class="request-dialog__title">Đề cử</span>
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
          <el-form-item label="Yêu cầu" prop="requestName">
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
          <el-form-item label="Nhân viên" prop="employeeName">
            <el-autocomplete
              v-model="nominationForm.employeeName"
              class="header-actions__search request-form__input"
              placeholder="Tên nhân viên"
              :clearable="true"
              :fetch-suggestions="querySearch"
              @select="handleChangeEmployee"
              @clear="handleChangeEmployee"
            ></el-autocomplete> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="Ngày" prop="requestDate">
            <el-date-picker
              v-model="nominationForm.requestDate"
              class="request-form__input"
              type="date"
              placeholder="Chọn một ngày"
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
          <el-form-item label="Tiền thưởng">
            <el-input
              v-model="nominationForm.bonusValue"
              class="request-form__input"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="nominationForm.requestNameId.trim() === 'Salary increment'"
        :gutter="20"
      >
        <el-col :span="12">
          <el-form-item label="Lương">
            <el-input
              class="request-form__input"
              value="2000"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <span slot="label"><i class="el-icon-right arrow-icon"></i></span>
            <el-input
              v-model="nominationForm.salary"
              class="request-form__input"
              value="IT"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Ghi chú" prop="requestDescription">
        <el-input
          v-model="nominationForm.requestDescription"
          class="request-form__input-area"
          type="textarea"
          :rows="4"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog"> Đóng </el-button>
      <el-button
        v-loading.fullscreen.lock="fullscreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
        type="primary"
        @click="submitForm('nominationForm')"
      >
        Tạo yêu cầu
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
        requestName: [
          {
            required: true,
            message: 'Yêu cầu không được để trống.',
            trigger: 'blur',
          },
        ],
        employeeName: [
          {
            required: true,
            message: 'Nhân viên không được để trống.',
            trigger: 'blur',
          },
        ],
        requestDate: [
          {
            required: true,
            message: 'Ngày không được để trống.',
            trigger: 'blur',
          },
        ],
        bonusValue: [
          {
            required: true,
            message: 'Tiền thưởng không được để trống.',
            trigger: 'blur',
          },
        ],
        salary: [
          {
            required: true,
            message: 'Lương mong muốn không được để trống.',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {
    ...mapGetters('user', ['personnelDetail', 'listPositions', 'listGrade']),
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
        return link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },

    async handleChangeEmployee(data) {
      if (data !== undefined) {
        const regexEmpId = /\((.+)\)/i
        const employeeId = data.value.match(regexEmpId)[1]
        await this.getPersonnelDetail(employeeId)
        this.currentPosition = this.personnelDetail.position_name
        this.currentGrade = this.personnelDetail.grade
        this.setSearchEmployeeText(data.value)
      } else {
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

.request-dialog__title {
  font-size: 20px;
  font-weight: 600;
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
