<template>
  <div>
    <div class="main-info__work-info">
      <div class="main-info-header">
        <span id="sub-2" class="main-info-header__text"
          >Thông tin công việc</span
        >
        <span
          v-if="isEditMainInfo"
          class="main-info-header__edit"
          @click="isEditMainInfo = false"
        >
          Sửa thông tin công việc
        </span>
        <span v-else>
          <el-button type="info" @click="isEditMainInfo = true">Đóng</el-button>
          <el-button type="primary">Xác nhận</el-button>
        </span>
      </div>
      <el-row class="main-info__content">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="main-info__content-item">
              <span class="content-item__head">Vị trí</span>
              <span v-if="isEditMainInfo" class="content-item__detail">{{
                personnelDetail[0].full_name
              }}</span>
              <el-input
                v-else
                size="medium"
                :value="personnelDetail[0].full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <div class="main-info__content-item">
              <span class="content-item__head">Lương</span>
              <span v-if="isEditMainInfo" class="content-item__detail">{{
                personnelDetail[0].employee_id
              }}</span>
              <el-input
                v-else
                size="medium"
                :value="personnelDetail[0].full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="main-info__content-item">
              <span class="content-item__head">Lương cơ bản</span>
              <span v-if="isEditMainInfo" class="content-item__detail">{{
                personnelDetail[0].start_date
              }}</span>
              <el-input
                v-else
                size="medium"
                :value="personnelDetail[0].full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="main-info__content-item">
              <span class="content-item__head">Văn phòng</span>
              <span v-if="isEditMainInfo" class="content-item__detail"
                >28/12/2016</span
              >
              <el-input
                v-else
                size="medium"
                :value="personnelDetail[0].full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="main-info__content">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="main-info__content-item">
              <span class="content-item__head">Lịch làm việc</span>
              <span v-if="isEditMainInfo" class="content-item__detail">{{
                personnelDetail[0].full_name
              }}</span>
              <el-input
                v-else
                size="medium"
                :value="personnelDetail[0].full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <div class="main-info__content-item">
              <span class="content-item__head">Lĩnh vực / Chuyên môn</span>
              <span v-if="isEditMainInfo" class="content-item__detail">{{
                personnelDetail[0].employee_id
              }}</span>
              <el-input
                v-else
                size="medium"
                :value="personnelDetail[0].full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="main-info__content-item">
              <span class="content-item__head">Ngày bắt đầu</span>
              <span v-if="isEditMainInfo" class="content-item__detail">{{
                personnelDetail[0].start_date
              }}</span>
              <el-input
                v-else
                size="medium"
                :value="personnelDetail[0].full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="main-info__content-item">
              <span class="content-item__head">Ngày chính thức</span>
              <span v-if="isEditMainInfo" class="content-item__detail"
                >28/12/2016</span
              >
              <el-input
                v-else
                size="medium"
                :value="personnelDetail[0].full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="main-info__content">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="main-info__content-item">
              <span class="content-item__head">Chính sách lương</span>
              <span v-if="isEditMainInfo" class="content-item__detail">{{
                personnelDetail[0].full_name
              }}</span>
              <el-input
                v-else
                size="medium"
                :value="personnelDetail[0].full_name"
                class="edit-input"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <div class="main-info__content-item">
              <span class="content-item__head">Phân loại nhân sự</span>
              <span v-if="isEditMainInfo" class="content-item__detail">{{
                personnelDetail[0].employee_id
              }}</span>
              <el-input
                v-else
                size="medium"
                :value="personnelDetail[0].full_name"
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
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      isEditMainInfo: true,
    }
  },

  computed: {
    ...mapGetters('user', ['personnelDetail']),
  },

  async beforeMount() {
    await this.getPersonnelDetail(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('user', ['getPersonnelDetail']),
  },
}
</script>

<style></style>
