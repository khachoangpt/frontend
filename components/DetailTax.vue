<template>
  <div class="main-info__work-info">
    <div class="main-info-header">
      <span id="sub-3" class="main-info-header__text">
        {{ $i18n.t('personnel.detail.taxInfo') }}
      </span>
      <span
        v-if="
          isEditTaxInfo && roles.find((role) => role.authority === 'ROLE_ADMIN')
        "
        class="main-info-header__edit"
        @click="setIsEditTaxInfo(false)"
      >
        {{ $i18n.t('personnel.detail.editTaxInfo') }}
      </span>
      <span
        v-else-if="
          isEditTaxInfo === false &&
          roles.find((role) => role.authority === 'ROLE_ADMIN')
        "
      >
        <el-button type="info" @click="closeEdit">{{
          $i18n.t('personnel.detail.close')
        }}</el-button>
        <el-button type="primary" @click="updateTaxInfo">{{
          $i18n.t('personnel.detail.confirm')
        }}</el-button>
      </span>
    </div>
    <el-row class="main-info__content">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.taxCode')
            }}</span>
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
    <el-row
      v-for="(insurance, index) in taxList.insuranceDtos"
      :key="'insurance' + index"
      class="main-info__content"
    >
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">
              {{ $i18n.t('personnel.detail.insurance') }}
            </span>
            <span v-if="isEditTaxInfo" class="content-item__detail">
              {{ insurance.insuranceName }}
            </span>
            <el-input
              v-else
              size="medium"
              :disabled="true"
              :value="insurance.insuranceName"
              class="edit-input"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.insuranceNumber')
            }}</span>
            <span v-if="isEditTaxInfo" class="content-item__detail">
              {{ insurance.insuranceID }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="insurance.insuranceID"
              class="edit-input"
              @input="updateInsuranceIdMethod($event, index)"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.placeRegistration')
            }}</span>
            <span v-if="isEditTaxInfo" class="content-item__detail">
              {{ insurance.address }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="insurance.address"
              class="edit-input"
              @input="updateTaxAddressMethod($event, index)"
            ></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="isEditTaxInfo">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.numberRelative')
            }}</span>
            <span v-if="isEditTaxInfo" class="content-item__detail">
              {{ relativeInfo.length }}
            </span>
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
    ...mapGetters('user', ['taxList', 'isEditTaxInfo', 'relativeInfo']),
  },

  async mounted() {
    await this.getTaxList(this.$route.params.employeeId)
    await this.getRelativeInfo(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('user', ['getTaxList', 'updateTaxInfo', 'getRelativeInfo']),
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

    updateInsuranceIdMethod(event, index) {
      this.updateInsuranceId({ event, index })
    },

    updateTaxAddressMethod(event, index) {
      this.updateTaxAddress({ event, index })
    },
  },
}
</script>

<style></style>
