<template>
  <el-dialog
    top="8vh"
    :visible.sync="requestPaidLeaveDialogVisible"
    width="36%"
    center
    :before-close="closeDialog"
    :destroy-on-close="true"
  >
    <span slot="title" class="request-dialog__title">Xin nghỉ</span>
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
        <span class="request-form__day-off">Quỹ ngày nghỉ còn lại: 8 ngày</span>
      </el-form-item>
      <el-form-item label="Yêu cầu" prop="requestName">
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
      <el-form-item label="Ngày" prop="requestDateRange">
        <el-date-picker
          v-model="paidLeaveForm.requestDateRange"
          class="request-form__input-area"
          type="daterange"
          range-separator="To"
          start-placeholder="Từ ngày"
          end-placeholder="Đến ngày"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Lý do" prop="requestDescription">
        <el-input
          v-model="paidLeaveForm.requestDescription"
          class="request-form__input-area"
          type="textarea"
          :rows="4"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog"> Đóng </el-button>
      <el-button type="primary" @click="submitForm('paidLeaveForm')">
        Tạo yêu cầu
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
        requestDateRange: [
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
      'requestPaidLeaveDialogVisible',
      'listRequestName',
      'fullscreenLoading',
    ]),
  },

  methods: {
    ...mapActions('request', ['createRequestPaidLeave']),
    ...mapMutations('request', [
      'setRequestPaidLeaveDialogVisible',
      'setCurrentRequestNameId',
      'setFullscreenLoading',
    ]),

    closeDialog() {
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
</style>