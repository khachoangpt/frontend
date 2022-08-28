<template>
  <el-dialog
    top="8vh"
    :visible.sync="requestPaidLeaveDialogVisible"
    center
    custom-class="request-detail-dialog"
    :before-close="closeDialog"
    :destroy-on-close="true"
  >
    <span slot="title" class="request-dialog__title">{{
      $i18n.t('request.dialog.requestPaidLeave')
    }}</span>
    <ul class="request-dialog__header">
      <li class="request-dialog__header-line">
        1. Paid Leave for only official employee.
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
      ref="paidLeaveForm"
      :model="paidLeaveForm"
      :rules="rules"
      label-position="left"
      label-width="120px"
      class="request-dialog__body"
    >
      <el-form-item>
        <span class="request-form__day-off"
          >{{ $i18n.t('request.dialog.remainingDayOff') }}:
          <span> {{ dayOffRemaining }} </span>
        </span>
      </el-form-item>
      <el-form-item
        :label="$i18n.t('request.dialog.requestName')"
        prop="requestName"
      >
        <el-select
          v-model="paidLeaveForm.requestName"
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
        :label="$i18n.t('request.dialog.date')"
        prop="requestDateRange"
      >
        <el-date-picker
          v-model="paidLeaveForm.requestDateRange"
          class="request-form__input-area"
          type="daterange"
          range-separator="-"
          :start-placeholder="$i18n.t('request.dialog.dateFrom')"
          :end-placeholder="$i18n.t('request.dialog.dateTo')"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$i18n.t('request.dialog.reason')" prop="reason">
        <el-select
          v-model="paidLeaveForm.reason"
          class="request-form__input"
          @change="onChangeReason"
        >
          <el-option
            v-for="(reason, index) in listReason"
            :key="'reason' + index"
            :label="reason.reason_name"
            :value="reason.reason_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="paidLeaveForm.reason === 3"
        :label="$i18n.t('request.dialog.inputReason')"
        prop="requestDescription"
      >
        <el-input
          v-model="paidLeaveForm.requestDescription"
          class="request-form__input-area"
          type="textarea"
          :rows="3"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">
        {{ $i18n.t('request.dialog.close') }}
      </el-button>
      <el-button type="primary" @click="submitForm('paidLeaveForm')">
        {{ $i18n.t('request.dialog.sendRequest') }}
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'RequestPaidLeaveDialog',

  data() {
    return {
      paidLeaveForm: {
        requestName: '',
        requestDateRange: '',
        requestDescription: '',
        reason: '',
      },

      listReason: [
        { reason_id: 1, reason_name: this.$i18n.t('familyReason') },
        { reason_id: 2, reason_name: this.$i18n.t('unexpectedReason') },
        { reason_id: 3, reason_name: this.$i18n.t('healthReason') },
        { reason_id: 4, reason_name: this.$i18n.t('other') },
      ],

      rules: {
        requestName: [
          {
            required: true,
            message: 'Request name is not blank.',
            trigger: 'blur',
          },
        ],
        requestDate: [
          {
            required: true,
            message: 'Date is not blank.',
            trigger: 'blur',
          },
        ],
        requestDescription: [
          {
            required: true,
            message: 'Content is not blank.',
            trigger: 'blur',
          },
        ],
        requestDateRange: [
          {
            required: true,
            message: 'Date & Time are not blank.',
            trigger: 'blur',
          },
        ],
        reason: [
          {
            required: true,
            message: 'Choose paid leave reason.',
            trigger: 'blur',
          },
        ],
      },

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        },
      },
    }
  },

  computed: {
    ...mapGetters('auth', ['id']),
    ...mapGetters('request', [
      'requestPaidLeaveDialogVisible',
      'listRequestName',
      'fullscreenLoading',
      'dayOffRemaining',
    ]),
  },

  async mounted() {
    await this.getPaidLeaveRemaining(this.id)
  },

  methods: {
    ...mapActions('request', [
      'createRequestPaidLeave',
      'getPaidLeaveRemaining',
    ]),
    ...mapMutations('request', [
      'setRequestPaidLeaveDialogVisible',
      'setCurrentRequestNameId',
      'setFullscreenLoading',
      'setCurrentRequestReasonId',
    ]),

    closeDialog() {
      this.paidLeaveForm = {
        requestName: '',
        requestDateRange: '',
        requestDescription: '',
        reason: '',
      }
      this.setRequestPaidLeaveDialogVisible(false)
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createRequestPaidLeave(this.paidLeaveForm)
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

    onChangeReason(data) {
      this.setCurrentRequestReasonId(data)
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

.request-form__day-off {
  font-weight: 600;
  color: #e6a23c;
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
