<template>
  <div class="main-info__work-info">
    <div class="main-info-header">
      <span id="sub-6" class="main-info-header__text">
        {{ $i18n.t('personnel.detail.workingHistoryInfo') }}
      </span>
      <span class="main-info-header__edit" @click="openDialog">
        {{ $i18n.t('personnel.detail.addWorkingHistory') }}
      </span>
    </div>
    <el-row
      v-for="(working, index) in workingHistory"
      :key="working.id"
      class="main-info__content"
    >
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.company')
            }}</span>
            <span v-if="isEditLine !== working" class="content-item__detail">
              {{ working.company_name }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="working.company_name"
              class="edit-input"
              @input="updateWorkingHistoryCompanyNameMethod($event, index)"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.position')
            }}</span>
            <span v-if="isEditLine !== working" class="content-item__detail">
              {{ working.position }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="working.position"
              class="edit-input"
              @input="updateWorkingHistoryPositionMethod($event, index)"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.timePeriod')
            }}</span>
            <span v-if="isEditLine !== working" class="content-item__detail">
              {{ working.start_date }} <i class="el-icon-right arrow-right"></i>
              {{ working.end_date }}
            </span>
            <el-date-picker
              v-else
              size="medium"
              style="width: 100%"
              :value="[working.start_date, working.end_date]"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
              @input="updateWorkingHistoryDateMethod($event, index)"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div
            v-if="isEditLine !== working"
            class="main-info__content-item-action"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="setIsEditLine(working)"
            ></el-button>
            <!-- <el-button type="danger" icon="el-icon-delete" circle></el-button> -->
          </div>
          <div v-else class="main-info__content-item-action">
            <span>
              <el-button type="info" @click="closeEdit">
                {{ $i18n.t('personnel.detail.close') }}
              </el-button>
              <el-button type="primary" @click="updateWorkingHistory(index)">
                {{ $i18n.t('personnel.detail.confirm') }}
              </el-button>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :title="$i18n.t('personnel.detail.addWorkingHistory')"
      :visible.sync="addWorkingHistoryVisible"
      width="30%"
      center
      :before-close="closeDialog"
    >
      <el-form
        ref="workingInformationForm"
        :model="workingInformationForm"
        :rules="rules"
        class="demo-form-inline"
      >
        <el-form-item
          :label="$i18n.t('personnel.detail.company')"
          prop="company"
        >
          <el-input
            v-model="workingInformationForm.company"
            :placeholder="$i18n.t('personnel.detail.company')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$i18n.t('personnel.detail.position')"
          prop="position"
        >
          <el-input
            v-model="workingInformationForm.position"
            :placeholder="$i18n.t('personnel.detail.position')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$i18n.t('personnel.detail.timePeriod')"
          prop="date"
        >
          <el-date-picker
            v-model="workingInformationForm.date"
            type="daterange"
            range-separator="To"
            :start-placeholder="$i18n.t('personnel.detail.startDate')"
            :end-placeholder="$i18n.t('personnel.detail.endDate')"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">{{
          $i18n.t('personnel.detail.close')
        }}</el-button>
        <el-button type="primary" @click="submitForm('workingInformationForm')">
          {{ $i18n.t('personnel.detail.confirm') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      workingInformationForm: {
        company: '',
        position: '',
        date: '',
      },
      rules: {
        company: [
          {
            required: true,
            message: this.$i18n.t('personnel.detail.validateCompany'),
            trigger: 'blur',
          },
        ],
        position: [
          {
            required: true,
            message: this.$i18n.t('personnel.detail.validatePosition'),
            trigger: 'blur',
          },
        ],
        date: [
          {
            required: true,
            message: this.$i18n.t('personnel.detail.validateTime'),
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {
    ...mapGetters('auth', ['roles']),
    ...mapGetters('user', [
      'workingHistory',
      'isEditLine',
      'addWorkingHistoryVisible',
    ]),
  },

  async mounted() {
    await this.getWorkingHistory(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('user', [
      'getWorkingHistory',
      'updateWorkingHistory',
      'addWorkingHistory',
    ]),
    ...mapMutations('user', [
      'updateWorkingHistoryCompanyName',
      'updateWorkingHistoryPosition',
      'updateWorkingHistoryDate',
      'setIsEditLine',
      'setAddWorkingHistoryVisible',
    ]),

    async closeEdit() {
      this.setIsEditLine('')
      await this.getWorkingHistory(this.$route.params.employeeId)
    },

    updateWorkingHistoryCompanyNameMethod(event, index) {
      this.updateWorkingHistoryCompanyName({ event, index })
    },

    updateWorkingHistoryPositionMethod(event, index) {
      this.updateWorkingHistoryPosition({ event, index })
    },

    updateWorkingHistoryDateMethod(event, index) {
      this.updateWorkingHistoryDate({ event, index })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addWorkingHistory(this.workingInformationForm)
        } else {
          return false
        }
      })
    },

    closeDialog() {
      this.setAddWorkingHistoryVisible(false)
    },

    openDialog() {
      this.setAddWorkingHistoryVisible(true)
    },
  },
}
</script>

<style>
.arrow-right {
  font-weight: 600;
  color: #409eff;
}
</style>
