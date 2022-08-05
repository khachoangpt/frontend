<template>
  <div>
    <div class="main-info__work-info">
      <div class="main-info-header">
        <span id="sub-2" class="main-info-header__text"
          >Thông tin công việc</span
        >
        <span
          v-if="
            isEditWorkInfo &&
            roles.find(
              (role) =>
                role.authority === 'ROLE_ADMIN' ||
                role.authority === 'ROLE_MANAGER'
            )
          "
          class="main-info-header__edit"
          @click="editWorkInfo"
        >
          Sửa thông tin công việc
        </span>
        <span
          v-else-if="
            isEditWorkInfo === false &&
            roles.find(
              (role) =>
                role.authority === 'ROLE_ADMIN' ||
                role.authority === 'ROLE_MANAGER'
            )
          "
        >
          <el-button type="info" @click="closeEdit">Đóng</el-button>
          <el-button type="primary">Xác nhận</el-button>
        </span>
      </div>
      <el-row class="main-info__content">
        <el-col :span="6">
          <div class="grid-content">
            <div class="main-info__content-item">
              <span class="content-item__head">Lương</span>
              <span v-if="isEditWorkInfo" class="content-item__detail"
                >10.000.000</span
              >
              <el-input
                v-else
                size="medium"
                :value="personnelDetail.full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="main-info__content-item">
              <span class="content-item__head">Lương cơ bản</span>
              <span v-if="isEditWorkInfo" class="content-item__detail"
                >3.000.000</span
              >
              <el-input
                v-else
                size="medium"
                :value="personnelDetail.full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="main-info__content-item">
              <span class="content-item__head">Ngày bắt đầu</span>
              <span v-if="isEditWorkInfo" class="content-item__detail">{{
                personnelDetail.start_date
              }}</span>
              <el-input
                v-else
                size="medium"
                :value="personnelDetail.full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="main-info__content-item">
              <span class="content-item__head">Lịch làm việc</span>
              <span v-if="isEditWorkInfo" class="content-item__detail"
                >Part Time</span
              >
              <el-input
                v-else
                size="medium"
                :value="personnelDetail.full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="main-info__content">
        <el-col :span="6">
          <div class="grid-content">
            <div class="main-info__content-item">
              <span class="content-item__head">Văn phòng</span>
              <span v-if="isEditWorkInfo" class="content-item__detail"
                >Ha Noi Office</span
              >
              <el-input
                v-else
                size="medium"
                :value="personnelDetail.full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="main-info__content-item">
              <span class="content-item__head">Phòng ban</span>
              <span v-if="isEditWorkInfo" class="content-item__detail"
                >Back Office</span
              >
              <el-input
                v-else
                size="medium"
                :value="personnelDetail.full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="main-info__content-item">
              <span class="content-item__head">Vị trí</span>
              <span v-if="isEditWorkInfo" class="content-item__detail">IT</span>
              <el-input
                v-else
                size="medium"
                :value="personnelDetail.full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="main-info__content-item">
              <span class="content-item__head">Cấp bậc</span>
              <span v-if="isEditWorkInfo" class="content-item__detail"
                >Develop 1</span
              >
              <el-input
                v-else
                size="medium"
                :value="personnelDetail.full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="main-info__content">
        <el-col :span="6">
          <div class="grid-content">
            <div class="main-info__content-item">
              <span class="content-item__head">Phân loại nhân sự</span>
              <span v-if="isEditWorkInfo" class="content-item__detail">
                Probationary Staff
              </span>
              <el-input
                v-else
                size="medium"
                :value="personnelDetail.full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="main-info__content-item">
              <span class="content-item__head">Manager</span>
              <span v-if="isEditWorkInfo" class="content-item__detail">
                Nguyễn Thị Liên
              </span>
              <el-input
                v-else
                size="medium"
                :value="personnelDetail.full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },

  computed: {
    ...mapGetters('auth', ['roles']),
    ...mapGetters('user', ['personnelDetail', 'isEditWorkInfo']),
  },

  async mounted() {
    await this.getPersonnelDetail(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('user', ['getPersonnelDetail']),
    ...mapMutations('user', ['setIsEditWorkInfo']),

    async closeEdit() {
      await this.setIsEditWorkInfo(true)
      await this.getPersonnelDetail(this.$route.params.employeeId)
    },

    editWorkInfo() {
      this.setIsEditWorkInfo(false)
    },
  },
}
</script>

<style></style>
