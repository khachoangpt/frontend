<template>
  <div class="main-info__work-info">
    <div class="main-info-header">
      <span id="sub-4" class="main-info-header__text">
        Thông tin ngân hàng
      </span>
      <span
        v-if="
          isEditBankInfo &&
          roles.find((role) => role.authority === 'ROLE_ADMIN')
        "
        class="main-info-header__edit"
        @click="setIsEditBankInfo(false)"
      >
        Sửa thông tin ngân hàng
      </span>
      <span
        v-else-if="
          isEditBankInfo === false &&
          roles.find((role) => role.authority === 'ROLE_ADMIN')
        "
      >
        <el-button type="info" @click="closeEdit">Đóng</el-button>
        <el-button type="primary" @click="editBankInfo">Xác nhận</el-button>
      </span>
    </div>
    <el-row class="main-info__content">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Tên chủ tài khoản</span>
            <span v-if="isEditBankInfo" class="content-item__detail">
              {{ bankInfo.account_name }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="bankInfo.account_name"
              class="edit-input"
              @input="updateBankAccountName"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <div class="main-info__content-item">
            <span class="content-item__head">Ngân hàng</span>
            <span v-if="isEditBankInfo" class="content-item__detail">
              {{ bankInfo.name_bank }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="bankInfo.name_bank"
              class="edit-input"
              @input="updateBankNameBank"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Địa chỉ</span>
            <span v-if="isEditBankInfo" class="content-item__detail">
              {{ bankInfo.address }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="bankInfo.address"
              class="edit-input"
              @input="updateBankAddress"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Số tài khoản</span>
            <span v-if="isEditBankInfo" class="content-item__detail">
              {{ bankInfo.account_number }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="bankInfo.account_number"
              class="edit-input"
              @input="updateBankAccountNumber"
            ></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
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
    ...mapGetters('user', ['bankInfo', 'isEditBankInfo']),
  },

  async mounted() {
    await this.getBankInfo(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('user', ['getBankInfo', 'editBankInfo']),
    ...mapMutations('user', [
      'updateBankAccountName',
      'updateBankNameBank',
      'updateBankAddress',
      'updateBankAccountNumber',
      'setIsEditBankInfo',
    ]),

    async closeEdit() {
      this.setIsEditBankInfo(true)
      await this.getBankInfo(this.$route.params.employeeId)
    },
  },
}
</script>

<style></style>
