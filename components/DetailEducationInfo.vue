<template>
  <div class="main-info__work-info">
    <div class="main-info-header">
      <span id="sub-8" class="main-info-header__text">
        {{ $i18n.t('personnel.detail.educationInfo') }}
      </span>
      <span
        v-if="
          roles.find(
            (role) =>
              role.authority === 'ROLE_ADMIN' ||
              role.authority === 'ROLE_MANAGER'
          )
        "
        class="main-info-header__edit"
        @click="openDialog"
      >
        {{ $i18n.t('personnel.detail.addEducationInfo') }}
      </span>
    </div>
    <el-row
      v-for="(education, index) in educationInfo"
      :key="index"
      class="main-info__content"
    >
      <el-col :span="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.school')
            }}</span>
            <span
              v-if="isEditLineEducation !== education"
              class="content-item__detail"
            >
              {{ education.name_school }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="education.name_school"
              class="edit-input"
              @input="updateEduNameSchool($event, index)"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.timePeriod')
            }}</span>
            <span
              v-if="isEditLineEducation !== education"
              class="content-item__detail"
            >
              {{ education.start_date }} -
              {{ education.end_date }}
            </span>
            <el-date-picker
              v-else
              size="medium"
              style="width: 100%"
              :value="[education.start_date, education.end_date]"
              type="daterange"
              range-separator="To"
              :start-placeholder="$i18n.t('personnel.detail.startDate')"
              :end-placeholder="$i18n.t('personnel.detail.endDate')"
              @input="updateEduDate($event, index)"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.degree')
            }}</span>
            <span
              v-if="isEditLineEducation !== education"
              class="content-item__detail"
            >
              {{ education.certificate }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="education.certificate"
              class="edit-input"
              @input="updateEduCertificate($event, index)"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col
        v-if="
          roles.find(
            (role) =>
              role.authority === 'ROLE_ADMIN' ||
              role.authority === 'ROLE_MANAGER'
          )
        "
        :span="6"
      >
        <div class="grid-content">
          <div
            v-if="isEditLineEducation !== education"
            class="main-info__content-item-action"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="setIsEditLineEducation(education)"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </div>
          <div v-else class="main-info__content-item-action">
            <span>
              <el-button type="info" @click="closeEdit">
                {{ $i18n.t('personnel.detail.close') }}
              </el-button>
              <el-button type="primary" @click="updateEducationInfo(index)">
                {{ $i18n.t('personnel.detail.confirm') }}
              </el-button>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :title="$i18n.t('personnel.detail.addEducationInfo')"
      :visible.sync="addEducationDialogVisible"
      width="30%"
      center
      :before-close="closeDialog"
    >
      <el-form
        ref="educationForm"
        :model="educationForm"
        :rules="rules"
        label-position="top"
        class="demo-form-inline"
      >
        <el-form-item :label="$i18n.t('personnel.detail.school')" prop="school">
          <el-input
            v-model="educationForm.school"
            :placeholder="$i18n.t('personnel.detail.school')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$i18n.t('personnel.detail.timePeriod')"
          prop="date"
        >
          <el-date-picker
            v-model="educationForm.date"
            class="add-education__time"
            type="daterange"
            range-separator="To"
            :start-placeholder="$i18n.t('personnel.detail.startDate')"
            :end-placeholder="$i18n.t('personnel.detail.endDate')"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          :label="$i18n.t('personnel.detail.degree')"
          prop="certificate"
        >
          <el-input
            v-model="educationForm.certificate"
            :placeholder="$i18n.t('personnel.detail.degree')"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">{{
          $i18n.t('personnel.detail.close')
        }}</el-button>
        <el-button type="primary" @click="submitForm('educationForm')">{{
          $i18n.t('personnel.detail.confirm')
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      educationForm: {
        school: '',
        certificate: '',
        date: '',
      },
      rules: {
        school: [
          {
            required: true,
            message: this.$i18n.t('personnel.detail.validateSchool'),
            trigger: 'blur',
          },
        ],
        certificate: [
          {
            required: true,
            message: this.$i18n.t('personnel.detail.validateDegree'),
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
      'educationInfo',
      'isEditLineEducation',
      'addEducationDialogVisible',
    ]),
  },

  async mounted() {
    await this.getEducationInfo(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('user', [
      'getEducationInfo',
      'updateEducationInfo',
      'addEducationInfo',
    ]),
    ...mapMutations('user', [
      'updateEducationDate',
      'updateEducationCertificate',
      'updateEducationNameSchool',
      'setIsEditLineEducation',
      'setAddEducationDialogVisible',
    ]),
    async closeEdit() {
      this.setIsEditLineEducation('')
      await this.getEducationInfo(this.$route.params.employeeId)
    },

    updateEduNameSchool(event, index) {
      this.updateEducationNameSchool({ event, index })
    },

    updateEduDate(event, index) {
      this.updateEducationDate({ event, index })
    },

    updateEduCertificate(event, index) {
      this.updateEducationCertificate({ event, index })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addEducationInfo(this.educationForm)
        } else {
          return false
        }
      })
    },

    closeDialog() {
      this.setAddEducationDialogVisible(false)
    },

    openDialog() {
      this.setAddEducationDialogVisible(true)
    },
  },
}
</script>

<style>
.add-education__time {
  width: 100% !important;
}
</style>
