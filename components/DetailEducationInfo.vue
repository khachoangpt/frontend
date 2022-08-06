<template>
  <div class="main-info__work-info">
    <div class="main-info-header">
      <span id="sub-8" class="main-info-header__text"> Thông tin học vấn </span>
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
        Thêm thông tin học vấn
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
            <span class="content-item__head">Trường học</span>
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
            <span class="content-item__head">Khoảng thời gian</span>
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
              start-placeholder="Start date"
              end-placeholder="End date"
              @input="updateEduDate($event, index)"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">Bằng cấp</span>
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
              <el-button type="info" @click="closeEdit"> Đóng </el-button>
              <el-button type="primary" @click="updateEducationInfo(index)">
                Xác nhận
              </el-button>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="Thêm thông tin học vấn"
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
        <el-form-item label="Trường học">
          <el-input
            v-model="educationForm.school"
            placeholder="Trường học"
          ></el-input>
        </el-form-item>
        <el-form-item label="Khoảng thời gian">
          <el-date-picker
            v-model="educationForm.date"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Bằng cấp">
          <el-input
            v-model="educationForm.certificate"
            placeholder="Bằng cấp"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">Đóng</el-button>
        <el-button type="primary" @click="submitForm('educationForm')"
          >Xác nhận</el-button
        >
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
            message: 'Trường học không được để trống.',
            trigger: 'blur',
          },
        ],
        certificate: [
          {
            required: true,
            message: 'Bằng cấp không được để trống.',
            trigger: 'blur',
          },
        ],
        date: [
          {
            required: true,
            message: 'Thời gian không được để trống.',
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

<style></style>
