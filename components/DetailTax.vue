<template>
  <div class="main-info__work-info">
    <div class="main-info-header">
      <span id="sub-3" class="main-info-header__text"> Thuế và bảo hiểm </span>
      <span
        v-if="isEditMainInfo"
        class="main-info-header__edit"
        @click="isEditMainInfo = false"
      >
        Sửa thông tin pháp lý
      </span>
      <span v-else>
        <el-button type="info" @click="isEditMainInfo = true">Đóng</el-button>
        <el-button type="primary">Xác nhận</el-button>
      </span>
    </div>
    <el-row class="main-info__content">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Mã số thuế</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ taxList[0].tax_code }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="taxList[0].tax_code"
              class="edit-input"
            ></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="main-info__content">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Mã số BHXH</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ taxList[0].insurance_id }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="taxList[0].insurance_id"
              class="edit-input"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <div class="main-info__content-item">
            <span class="content-item__head"> Bảo hiểm </span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ taxList[0].insurance_name }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="taxList[0].insurance_name"
              class="edit-input"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Nơi đăng ký BHXH</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ taxList[0].address }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="taxList[0].address"
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
    ...mapGetters('user', ['taxList']),
  },

  async mounted() {
    await this.getTaxList(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('user', ['getTaxList']),
  },
}
</script>

<style></style>
