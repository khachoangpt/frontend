<template>
  <el-dialog
    title="Yêu cầu giờ làm"
    top="8vh"
    :visible.sync="requestWorkingScheduleDialogVisible"
    width="36%"
    center
    :before-close="closeDialog"
    :destroy-on-close="true"
  >
    <ul class="request-dialog__header">
      <li class="request-dialog__header-line">
        1. Working schedule for all employees.
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
      ref="workingScheduleForm"
      :model="workingScheduleForm"
      :rules="rules"
      label-position="left"
      label-width="120px"
      class="request-dialog__body"
    >
      <el-form-item label="Yêu cầu" prop="requestName">
        <el-select
          v-model="workingScheduleForm.requestName"
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
      <el-form-item
        v-if="workingScheduleForm.requestName === 'Working Time'"
        label="Ngày"
        prop="requestDate"
      >
        <el-date-picker
          v-model="workingScheduleForm.requestDate"
          class="request-form__input"
          type="date"
          placeholder="Chọn một ngày"
          format="dd-MM-yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        v-if="workingScheduleForm.requestName === 'OT'"
        label="Ngày & Giờ"
        prop="requestTimeOT"
      >
        <el-date-picker
          v-model="workingScheduleForm.requestTimeOT"
          class="request-form__input-area"
          type="datetimerange"
          range-separator="To"
          start-placeholder="Ngày bắt đầu"
          end-placeholder="Ngày kết thúc"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Nội dung" prop="requestDescription">
        <el-input
          v-model="workingScheduleForm.requestDescription"
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
        type="primary"
        @click="submitForm('workingScheduleForm')"
      >
        Gửi yêu cầu
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'RequestWorkingScheduleDialog',

  data() {
    return {
      workingScheduleForm: {
        requestName: '',
        requestDate: new Date(),
        requestTimeOT: '',
        requestDescription: '',
      },

      rules: {
        requestName: [
          {
            required: true,
            message: 'Yêu cầu không được để trống.',
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
        requestDescription: [
          {
            required: true,
            message: 'Nội dung không được để trống.',
            trigger: 'blur',
          },
        ],
        requestTimeOT: [
          {
            required: true,
            message: 'Ngày & Giờ không được để trống.',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {
    ...mapGetters('request', [
      'requestWorkingScheduleDialogVisible',
      'listRequestName',
      'fullscreenLoading',
    ]),
  },

  methods: {
    ...mapActions('request', ['createRequestTimekeeping']),
    ...mapMutations('request', [
      'setRequestWorkingScheduleDialogVisible',
      'setCurrentRequestNameId',
      'setFullscreenLoading',
    ]),

    closeDialog() {
      this.setRequestWorkingScheduleDialogVisible(false)
    },

    createRequestWorkingSchedule() {
      this.setRequestWorkingScheduleDialogVisible(false)
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createRequestTimekeeping(this.workingScheduleForm)
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

.request-form__input {
  width: 56%;
}

.request-form__input-area {
  width: 100%;
}
</style>
