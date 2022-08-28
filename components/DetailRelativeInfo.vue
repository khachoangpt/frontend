<template>
  <div class="main-info__work-info">
    <div class="main-info-header">
      <span id="sub-7" class="main-info-header__text">
        Danh sách người phụ thuộc
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
        Thêm người phụ thuộc
      </span>
    </div>
    <el-row
      v-for="(relative, index) in relativeInfo"
      :key="index"
      class="main-info__content"
    >
      <el-col :span="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">Họ và tên</span>
            <span
              v-if="isEditLineRelative !== relative"
              class="content-item__detail"
            >
              {{ relative.parent_name }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="relative.parent_name"
              class="edit-input"
              @input="updateRelaParentName($event, index)"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">Ngày sinh</span>
            <span
              v-if="isEditLineRelative !== relative"
              class="content-item__detail"
            >
              {{ relative.birth_date }}
            </span>
            <el-date-picker
              v-else
              :value="relative.birth_date"
              type="date"
              placeholder="Pick a day"
              @input="updateRelaBirthDate($event, index)"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">Liên hệ</span>
            <span
              v-if="isEditLineRelative !== relative"
              class="content-item__detail"
            >
              {{ relative.contact }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="relative.contact"
              class="edit-input"
              @input="updateRelaContact($event, index)"
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
            v-if="isEditLineRelative !== relative"
            class="main-info__content-item-action"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="setIsEditLineRelative(relative)"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </div>
          <div v-else class="main-info__content-item-action">
            <span>
              <el-button type="info" @click="closeEdit"> Đóng </el-button>
              <el-button type="primary" @click="updateRelativeInfo(index)">
                Xác nhận
              </el-button>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :model="relativeInformationForm"
      title="Thêm người phụ thuộc"
      :visible.sync="addRelativeDialogVisible"
      width="30%"
      center
      :before-close="closeDialog"
    >
      <el-form
        ref="relativeInformationForm"
        :model="relativeInformationForm"
        :rules="rules"
        label-position="top"
        class="demo-form-inline"
      >
        <el-form-item label="Họ và tên" prop="parentName">
          <el-input
            v-model="relativeInformationForm.parentName"
            placeholder="Họ và tên"
          ></el-input>
        </el-form-item>
        <el-form-item label="Quan hệ" prop="relative">
          <el-input
            v-model="relativeInformationForm.relative"
            placeholder="Quan hệ"
          ></el-input>
        </el-form-item>
        <el-form-item label="Liên hệ" prop="contact">
          <el-input
            v-model="relativeInformationForm.contact"
            placeholder="Liên hệ"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">Đóng</el-button>
        <el-button
          type="primary"
          @click="submitForm('relativeInformationForm')"
        >
          Xác nhận
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
      isEditMainInfo: true,
      relativeInformationForm: {
        parentName: '',
        relative: '',
        contact: '',
      },
      rules: {
        parentName: [
          {
            required: true,
            message: 'Name is not blank.',
            trigger: 'blur',
          },
        ],
        relative: [
          {
            required: true,
            message: 'Quan hệ không được để trống.',
            trigger: 'blur',
          },
        ],
        contact: [
          {
            required: true,
            message: 'Thông tin liên hệ không được để trống.',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {
    ...mapGetters('auth', ['roles']),
    ...mapGetters('user', [
      'relativeInfo',
      'isEditLineRelative',
      'addRelativeDialogVisible',
    ]),
  },

  async mounted() {
    await this.getRelativeInfo(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('user', [
      'getRelativeInfo',
      'editRelativeInfo',
      'updateRelativeInfo',
      'addRelativeInfo',
    ]),

    ...mapMutations('user', [
      'updateRelativeParentName',
      'updateRelativeBirthDate',
      'updateRelativeContact',
      'setIsEditLineRelative',
      'setAddRelativeDialogVisible',
    ]),
    async closeEdit() {
      this.setIsEditLineRelative('')
      await this.getRelativeInfo(this.$route.params.employeeId)
    },

    updateRelaParentName(event, index) {
      this.updateRelativeParentName({ event, index })
    },

    updateRelaBirthDate(event, index) {
      this.updateRelativeBirthDate({ event, index })
    },

    updateRelaContact(event, index) {
      this.updateRelativeContact({ event, index })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addRelativeInfo(this.relativeInformationForm)
        } else {
          return false
        }
      })
    },

    closeDialog() {
      this.setAddRelativeDialogVisible(false)
    },

    openDialog() {
      this.setAddRelativeDialogVisible(true)
    },
  },
}
</script>

<style></style>
