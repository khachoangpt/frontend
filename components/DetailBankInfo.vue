<template>
  <div class="main-info__work-info">
    <div class="main-info-header">
      <span id="sub-4" class="main-info-header__text">
        {{ $i18n.t('personnel.detail.bankInfo') }}
      </span>
      <span
        v-if="
          isEditBankInfo &&
          roles.find(
            (role) =>
              role.authority === 'ROLE_ADMIN' ||
              role.authority === 'ROLE_MANAGER'
          )
        "
        class="main-info-header__edit"
        @click="setIsEditBankInfo(false)"
      >
        {{ $i18n.t('personnel.detail.editBankInfo') }}
      </span>
      <span
        v-else-if="
          isEditBankInfo === false &&
          roles.find(
            (role) =>
              role.authority === 'ROLE_ADMIN' ||
              role.authority === 'ROLE_MANAGER'
          )
        "
      >
        <el-button type="info" @click="closeEdit">{{
          $i18n.t('personnel.detail.close')
        }}</el-button>
        <el-button type="primary" @click="editBankInfo">{{
          $i18n.t('personnel.detail.confirm')
        }}</el-button>
      </span>
    </div>
    <el-row class="main-info__content">
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.accountName')
            }}</span>
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
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.bank')
            }}</span>
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
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.address')
            }}</span>
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
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.accountNumber')
            }}</span>
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
