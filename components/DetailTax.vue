<template>
  <div class="main-info__work-info">
    <div class="main-info-header">
      <span id="sub-3" class="main-info-header__text"> Thuế và bảo hiểm </span>
      <span
        v-if="
          isEditTaxInfo && roles.find((role) => role.authority === 'ROLE_ADMIN')
        "
        class="main-info-header__edit"
        @click="setIsEditTaxInfo(false)"
      >
        Sửa thông tin pháp lý
      </span>
      <span
        v-else-if="
          isEditTaxInfo === false &&
          roles.find((role) => role.authority === 'ROLE_ADMIN')
        "
      >
        <el-button type="info" @click="closeEdit">Đóng</el-button>
        <el-button type="primary" @click="updateTaxInfo">Xác nhận</el-button>
      </span>
    </div>
    <el-row class="main-info__content">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Mã số thuế</span>
            <span v-if="isEditTaxInfo" class="content-item__detail">
              {{ taxList.tax_code }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="taxList.tax_code"
              class="edit-input"
              @input="updateTaxCode"
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
            <span v-if="isEditTaxInfo" class="content-item__detail">
              {{ taxList.insurance_id }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="taxList.insurance_id"
              class="edit-input"
              @input="updateInsuranceId"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <div class="main-info__content-item">
            <span class="content-item__head"> Bảo hiểm </span>
            <span v-if="isEditTaxInfo" class="content-item__detail">
              {{ taxList.insurance_name }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="taxList.insurance_name"
              class="edit-input"
              @input="updateInsuranceName"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Nơi đăng ký BHXH</span>
            <span v-if="isEditTaxInfo" class="content-item__detail">
              {{ taxList.address }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="taxList.address"
              class="edit-input"
              @input="updateTaxAddress"
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
    ...mapGetters('user', ['taxList', 'isEditTaxInfo']),
  },

  async mounted() {
    // await this.getTaxList(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('user', ['getTaxList', 'updateTaxInfo']),
    ...mapMutations('user', [
      'updateTaxCode',
      'updateInsuranceId',
      'updateInsuranceName',
      'updateTaxAddress',
      'setIsEditTaxInfo',
    ]),

    async closeEdit() {
      this.setIsEditTaxInfo(true)
      await this.getTaxList(this.$route.params.employeeId)
    },
  },
}
</script>

<style></style>
