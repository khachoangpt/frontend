<template>
  <el-dialog
    top="8vh"
    :visible.sync="requestAdvanceDialogVisible"
    width="36%"
    center
    :before-close="closeDialog"
    :destroy-on-close="true"
  >
    <span slot="title" class="request-dialog__title">Yêu cầu tạm ứng</span>
    <ul class="request-dialog__header">
      <li class="request-dialog__header-line">
        1. Advance for only official staff.
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
      ref="advanceForm"
      :model="advanceForm"
      :rules="rules"
      label-position="left"
      label-width="120px"
      class="request-dialog__body"
    >
      <el-form-item label="Yêu cầu" prop="requestName">
        <el-select
          v-model="advanceForm.requestName"
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
      <el-form-item label="Ngày" prop="requestDate">
        <el-date-picker
          v-model="advanceForm.requestDate"
          class="request-form__input"
          type="date"
          placeholder="Chọn một ngày"
          format="dd-MM-yyyy"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="Tạm ứng" prop="requestAdvance">
        <el-input v-model="advanceForm.requestAdvance"></el-input>
      </el-form-item>
      <el-form-item label="Ghi chú" prop="requestDescription">
        <el-input
          v-model="advanceForm.requestDescription"
          class="request-form__input-area"
          type="textarea"
          :rows="4"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog"> Cancel </el-button>
      <el-button
        v-loading.fullscreen.lock="fullscreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        type="primary"
        @click="submitForm('advanceForm')"
      >
        Confirm
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'RequestAdvanceDialog',

  data() {
    return {
      advanceForm: {
        requestName: '',
        requestDate: '',
        requestAdvance: '',
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
        requestAdvance: [
          {
            required: true,
            message: 'Tạm ứng không được để trống.',
            trigger: 'blur',
          },
        ],
        requestDescription: [
          {
            required: true,
            message: 'Ghi chú không được để trống.',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {
    ...mapGetters('request', [
      'requestAdvanceDialogVisible',
      'listRequestName',
      'fullscreenLoading',
    ]),
  },

  methods: {
    ...mapActions('request', ['createRequestAdvance']),
    ...mapMutations('request', [
      'setRequestAdvanceDialogVisible',
      'setCurrentRequestNameId',
      'setFullscreenLoading',
    ]),

    closeDialog() {
      this.setRequestAdvanceDialogVisible(false)
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createRequestAdvance(this.advanceForm)
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
</style>
