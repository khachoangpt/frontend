<template>
  <div class="main-info__work-info">
    <div class="main-info-header">
      <span id="sub-5" class="main-info-header__text">
        {{ $i18n.t('personnel.detail.additionalInfo') }}
      </span>
      <span
        v-if="
          isEditAdditionInfo &&
          roles.find(
            (role) =>
              role.authority === 'ROLE_ADMIN' ||
              role.authority === 'ROLE_MANAGER'
          )
        "
        class="main-info-header__edit"
        @click="editAdditionInfo"
      >
        {{ $i18n.t('personnel.detail.editAdditionalInfo') }}
      </span>
      <span
        v-else-if="
          isEditAdditionInfo === false &&
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
        <el-button
          type="primary"
          @click="confirmEditAdditionalInfo($route.params.employeeId)"
          >{{ $i18n.t('personnel.detail.confirm') }}</el-button
        >
      </span>
    </div>
    <el-row class="main-info__content">
      <el-col :span="8">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.currentAddress')
            }}</span>
            <span v-if="isEditAdditionInfo" class="content-item__detail">
              {{ additionInfo.address }}
            </span>
            <el-input
              v-else
              size="medium"
              class="edit-input"
              :value="additionInfo.address"
              @input="updateAdditionAddress"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.placeOfBirth')
            }}</span>
            <span v-if="isEditAdditionInfo" class="content-item__detail">
              {{ additionInfo.place_of_origin }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="additionInfo.place_of_origin"
              class="edit-input"
              @input="updateAdditionPlaceOfOrigin"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">
              {{ $i18n.t('personnel.detail.permanentResidence') }}
            </span>
            <span v-if="isEditAdditionInfo" class="content-item__detail">
              {{ additionInfo.place_of_residence }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="additionInfo.place_of_residence"
              class="edit-input"
              @input="updateAdditionPlaceOfResidence"
            ></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="main-info__content">
      <el-col :span="8">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">
              {{ $i18n.t('personnel.detail.idCard') }}</span
            >
            <span v-if="isEditAdditionInfo" class="content-item__detail">
              {{ additionInfo.card_id }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="additionInfo.card_id"
              class="edit-input"
              @input="updateAdditionCardId"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.providedDate')
            }}</span>
            <span v-if="isEditAdditionInfo" class="content-item__detail">
              {{ additionInfo.provideDate }}
            </span>
            <!-- <el-input
              v-else
              size="medium"
              :value="additionInfo.provideDate"
              class="edit-input"
              @input="updateAdditionProvideDate"
            ></el-input> -->
            <el-date-picker
              v-else
              size="medium"
              :value="additionInfo.provideDate"
              type="date"
              class="edit-input"
              placeholder="Pick a day"
              @input="updateAdditionProvideDate"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">
              {{ $i18n.t('personnel.detail.providedPlace') }}
            </span>
            <span v-if="isEditAdditionInfo" class="content-item__detail">
              {{ additionInfo.providePlace }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="additionInfo.providePlace"
              class="edit-input"
              @input="updateAdditionProvidePlace"
            ></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="main-info__content">
      <el-col :span="8">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.nationality')
            }}</span>
            <span v-if="isEditAdditionInfo" class="content-item__detail">
              {{ additionInfo.nationality }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="additionInfo.nationality"
              class="edit-input"
              @input="updateAdditionNationality"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.otherEmail')
            }}</span>
            <span v-if="isEditAdditionInfo" class="content-item__detail">
              {{ additionInfo.personal_email }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="additionInfo.personal_email"
              class="edit-input"
              @input="updateAdditionPersonalEmail"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.otherPhone')
            }}</span>
            <span v-if="isEditAdditionInfo" class="content-item__detail">
              {{ additionInfo.phone_number }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="additionInfo.phone_number"
              class="edit-input"
              @input="updateAdditionPhoneNumber"
            ></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="main-info__content">
      <el-col :span="8">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head"> Nickname </span>
            <span v-if="isEditAdditionInfo" class="content-item__detail">
              {{ additionInfo.nick_name }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="additionInfo.nick_name"
              class="edit-input"
              @input="updateAdditionNickname"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">Facebook</span>
            <!-- <span v-if="isEditAdditionInfo" class="content-item__detail">
              {{ additionInfo.facebook }}
            </span> -->
            <el-popover
              v-if="isEditAdditionInfo"
              placement="bottom-start"
              width="400"
              trigger="hover"
              class="content-item__detail content-item__detail-link"
            >
              <a
                :href="additionInfo.facebook"
                target="_blank"
                class="content-item__detail-link"
              >
                {{ additionInfo.facebook }}
              </a>
              <span
                slot="reference"
                target="_blank"
                class="content-item__detail-link"
              >
                {{ additionInfo.facebook }}
              </span>
            </el-popover>
            <el-input
              v-else
              size="medium"
              :value="additionInfo.facebook"
              class="edit-input"
              @input="updateAdditionFacebook"
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
    ...mapGetters('user', ['additionInfo', 'isEditAdditionInfo']),
  },

  async mounted() {
    await this.getAdditionInfo(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('user', ['getAdditionInfo', 'confirmEditAdditionalInfo']),
    ...mapMutations('user', [
      'updateAdditionAddress',
      'updateAdditionPlaceOfOrigin',
      'updateAdditionPlaceOfResidence',
      'updateAdditionCardId',
      'updateAdditionProvideDate',
      'updateAdditionProvidePlace',
      'updateAdditionNationality',
      'updateAdditionPersonalEmail',
      'updateAdditionPhoneNumber',
      'updateAdditionNickname',
      'updateAdditionFacebook',
      'setIsEditAdditionInfo',
    ]),
    async closeEdit() {
      this.setIsEditAdditionInfo(true)
      await this.getAdditionInfo(this.$route.params.employeeId)
    },

    editAdditionInfo() {
      this.setIsEditAdditionInfo(false)
    },
  },
}
</script>

<style>
.content-item__detail-link {
  color: #409eff;
}
</style>
