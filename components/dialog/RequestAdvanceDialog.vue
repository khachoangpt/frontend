<template>
  <el-dialog
    top="8vh"
    :visible.sync="requestAdvanceDialogVisible"
    custom-class="request-detail-dialog"
    center
    :before-close="closeDialog"
    :destroy-on-close="true"
  >
    <span slot="title" class="request-dialog__title">{{
      $i18n.t('request.Advance')
    }}</span>
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
      <el-form-item
        :label="$i18n.t('request.dialog.requestName')"
        prop="requestName"
      >
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
      <el-form-item :label="$i18n.t('request.dialog.date')" prop="requestDate">
        <el-date-picker
          v-model="advanceForm.requestDate"
          class="request-form__input"
          type="date"
          :placeholder="$i18n.t('request.dialog.chooseDay')"
          format="dd-MM-yyyy"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$i18n.t('request.Advance')" prop="requestAdvance">
        <el-input v-model="advanceForm.requestAdvance"></el-input>
      </el-form-item>
      <el-form-item
        :label="$i18n.t('request.dialog.note')"
        prop="requestDescription"
      >
        <el-input
          v-model="advanceForm.requestDescription"
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
        @click="submitForm('advanceForm')"
      >
        {{ $i18n.t('request.dialog.sendRequest') }}
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
        requestAdvance: [
          {
            required: true,
            message: 'Advance is not blank.',
            trigger: 'blur',
          },
        ],
        requestDescription: [
          {
            required: true,
            message: 'Note is not blank.',
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
      this.advanceForm = {
        requestName: '',
        requestDate: '',
        requestAdvance: '',
        requestDescription: '',
      }
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
