<template>
  <el-dialog
    top="8vh"
    :visible.sync="requestWorkingScheduleDialogVisible"
    center
    custom-class="request-detail-dialog"
    :before-close="closeDialog"
    :destroy-on-close="true"
  >
    <span slot="title" class="request-dialog__title">{{
      $i18n.t('request.dialog.requestWorkingTime')
    }}</span>
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
      <el-form-item
        :label="$i18n.t('request.dialog.requestName')"
        prop="requestName"
      >
        <el-select
          v-model="workingScheduleForm.requestName"
          class="request-form__input"
          :value-key="workingScheduleForm.requestName"
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
        v-if="
          workingScheduleForm.requestName === 'Work Late' ||
          workingScheduleForm.requestName === 'Leave Soon'
        "
        :label="$i18n.t('request.dialog.date')"
        prop="requestDate"
      >
        <el-date-picker
          v-model="workingScheduleForm.requestDate"
          class="request-form__input"
          type="date"
          :placeholder="$i18n.t('request.dialog.chooseDay')"
          format="dd-MM-yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        v-if="workingScheduleForm.requestName === 'OT'"
        :label="$i18n.t('request.dialog.dayAndHour')"
        prop="requestTimeOT"
      >
        <el-date-picker
          v-model="workingScheduleForm.requestTimeOT"
          class="request-form__input-area"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$i18n.t('request.dialog.dateFrom')"
          :end-placeholder="$i18n.t('request.dialog.dateTo')"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        :label="$i18n.t('request.dialog.content')"
        prop="requestDescription"
      >
        <el-input
          v-model="workingScheduleForm.requestDescription"
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
        @click="submitForm('workingScheduleForm')"
      >
        {{ $i18n.t('request.dialog.sendRequest') }}
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
        requestName: 'Leave Soon',
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
    ...mapActions('request', ['createRequestTimekeeping', 'createRequestOT']),
    ...mapMutations('request', [
      'setRequestWorkingScheduleDialogVisible',
      'setCurrentRequestNameId',
      'setFullscreenLoading',
    ]),

    closeDialog() {
      this.workingScheduleForm = {
        requestName: 'Leave Soon',
        requestDate: new Date(),
        requestTimeOT: '',
        requestDescription: '',
      }
      this.setRequestWorkingScheduleDialogVisible(false)
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (
          (valid && this.workingScheduleForm.requestName === 'Work Late') ||
          this.workingScheduleForm.requestName === 'Leave Soon'
        ) {
          this.createRequestTimekeeping(this.workingScheduleForm)
          this.setFullscreenLoading(true)
        } else if (valid && this.workingScheduleForm.requestName === 'OT') {
          this.createRequestOT(this.workingScheduleForm)
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

.request-dialog__title {
  font-size: 20px;
  font-weight: 600;
}

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
    width: 90%;
  }
}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .request-detail-dialog {
    width: 60%;
  }
}
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .request-detail-dialog {
    width: 50%;
  }
}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .request-detail-dialog {
    width: 36%;
  }
}
</style>
