<template>
  <div class="main-info__work-info">
    <div class="main-info-header">
      <span id="sub-5" class="main-info-header__text"> Thông tin thêm </span>
      <span
        v-if="
          isEditAdditionInfo &&
          roles.find((role) => role.authority === 'ROLE_ADMIN')
        "
        class="main-info-header__edit"
        @click="editAdditionInfo"
      >
        Sửa thông tin thêm
      </span>
      <span
        v-else-if="
          isEditAdditionInfo === false &&
          roles.find((role) => role.authority === 'ROLE_ADMIN')
        "
      >
        <el-button type="info" @click="closeEdit">Đóng</el-button>
        <el-button type="primary">Xác nhận</el-button>
      </span>
    </div>
    <el-row class="main-info__content">
      <el-col :span="8">
        <div class="grid-content ">
          <div class="main-info__content-item">
            <span class="content-item__head">Địa chỉ hiện tại</span>
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
        <div class="grid-content ">
          <div class="main-info__content-item">
            <span class="content-item__head">Nơi sinh</span>
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
        <div class="grid-content ">
          <div class="main-info__content-item">
            <span class="content-item__head"> Hộ khẩu thường trú </span>
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
        <div class="grid-content ">
          <div class="main-info__content-item">
            <span class="content-item__head">CMT / CCCD</span>
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
        <div class="grid-content ">
          <div class="main-info__content-item">
            <span class="content-item__head">Ngày cấp</span>
            <span v-if="isEditAdditionInfo" class="content-item__detail">
              {{ additionInfo.provideDate }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="additionInfo.provideDate"
              class="edit-input"
              @input="updateAdditionProvideDate"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content ">
          <div class="main-info__content-item">
            <span class="content-item__head"> Nơi cấp </span>
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
        <div class="grid-content ">
          <div class="main-info__content-item">
            <span class="content-item__head">Quốc tịch</span>
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
        <div class="grid-content ">
          <div class="main-info__content-item">
            <span class="content-item__head">Email khác</span>
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
        <div class="grid-content ">
          <div class="main-info__content-item">
            <span class="content-item__head">Số điện thoại khác</span>
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
        <div class="grid-content ">
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
        <div class="grid-content ">
          <div class="main-info__content-item">
            <span class="content-item__head">Facebook</span>
            <span v-if="isEditAdditionInfo" class="content-item__detail">
              {{ additionInfo.facebook }}
            </span>
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
    ...mapActions('user', ['getAdditionInfo']),
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

<style></style>
