<template>
  <div class="main-info__work-info">
    <div class="main-info-header">
      <span id="sub-4" class="main-info-header__text">
        Thông tin ngân hàng
      </span>
      <span
        v-if="isEditMainInfo"
        class="main-info-header__edit"
        @click="isEditMainInfo = false"
      >
        Sửa thông tin ngân hàng
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
            <span class="content-item__head">Tên chủ tài khoản</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ bankInfo[0].accountName }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="bankInfo[0].accountName"
              class="edit-input"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <div class="main-info__content-item">
            <span class="content-item__head">Ngân hàng</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ bankInfo[0].nameBank }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="bankInfo[0].nameBank"
              class="edit-input"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Địa chỉ</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ bankInfo[0].address }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="bankInfo[0].address"
              class="edit-input"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Số tài khoản</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ bankInfo[0].accountNumber }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="bankInfo[0].accountNumber"
              class="edit-input"
            ></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
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
    ...mapGetters('user', ['bankInfo']),
  },

  async mounted() {
    await this.getBankInfo(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('user', ['getBankInfo']),
  },
}
</script>

<style></style>
