<template>
  <div
    v-loading.fullscreen.lock="loadingPersonnelDetail"
    element-loading-background="rgba(0, 0, 0, 0.2)"
    type="primary"
  >
    <div class="main-info-header">
      <span id="sub-1" class="main-info-header__text">{{
        $i18n.t('personnel.detail.mainInfo')
      }}</span>
      <span
        v-if="
          isEditMainInfo &&
          roles.find((role) => role.authority === 'ROLE_ADMIN')
        "
        class="main-info-header__edit"
        @click="setIsEditMainInfo(false)"
      >
        {{ $i18n.t('personnel.detail.editMainInfo') }}
      </span>
      <span
        v-else-if="
          isEditMainInfo === false &&
          roles.find((role) => role.authority === 'ROLE_ADMIN')
        "
      >
        <el-button type="info" @click="closeEdit">{{
          $i18n.t('personnel.detail.close')
        }}</el-button>
        <el-button type="primary" @click="updateMainInfo">{{
          $i18n.t('personnel.detail.confirm')
        }}</el-button>
      </span>
    </div>
    <el-row class="main-info__content">
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.fullName')
            }}</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail.full_name }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="personnelDetail.full_name"
              class="edit-input"
              @input="updatePersonnelFullName"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.employeeId')
            }}</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail.employee_id }}
            </span>
            <el-input
              v-else
              size="medium"
              disabled
              :value="personnelDetail.employee_id"
              class="edit-input"
              @input="updatePersonnelEmployeeId"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.birthDate')
            }}</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail.birth_date }}
            </span>
            <el-date-picker
              v-else
              :value="personnelDetail.birth_date"
              size="medium"
              type="date"
              class="edit-input"
              placeholder="Pick a day"
              @input="updatePersonnelBirthDate"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.gender')
            }}</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              <i
                v-if="personnelDetail.gender === 'Male'"
                class="el-icon-male content-item__detail-icon"
              ></i>
              <i v-else class="el-icon-female content-item__detail-icon"></i>
              {{ personnelDetail.gender }}
            </span>
            <el-select
              v-else
              size="medium"
              class="edit-input"
              :value="personnelDetail.gender"
              placeholder="Select"
              @input="updatePersonnelGender"
            >
              <el-option :label="$i18n.t('personnel.detail.male')" value="Male">
              </el-option>
              <el-option
                :label="$i18n.t('personnel.detail.female')"
                value="Female"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="main-info__content">
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">Email</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail.company_email }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="personnelDetail.company_email"
              class="edit-input"
              @input="updatePersonnelCompanyEmail"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.workingStatus')
            }}</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              <span
                v-if="personnelDetail.working_status === true"
                class="el-icon-success content-item__detail-status-icon"
              ></span>
              <span
                v-else
                class="el-icon-error content-item__detail-status-icon"
              ></span>
              {{
                personnelDetail.working_status === true
                  ? 'Active'
                  : 'Deactivate'
              }}
            </span>
            <el-select
              v-else
              size="medium"
              class="edit-input"
              :value="
                personnelDetail.working_status === true
                  ? 'Active'
                  : 'Deactivate'
              "
              placeholder="Select"
              @input="updatePersonnelWorkingStatus"
            >
              <el-option label="Active" :value="true"> </el-option>
              <el-option label="Deactivate" :value="false"> </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.contractUrl')
            }}</span>
            <el-popover
              v-if="isEditMainInfo"
              placement="bottom-start"
              width="400"
              trigger="hover"
              class="content-item__detail content-item__detail-link"
            >
              <a
                :href="personnelDetail.contract_url"
                target="_blank"
                class="content-item__detail-link"
              >
                {{ personnelDetail.contract_url }}
              </a>
              <span
                slot="reference"
                target="_blank"
                class="content-item__detail-link"
              >
                {{ personnelDetail.contract_url }}
              </span>
            </el-popover>
            <el-input
              v-else
              size="medium"
              :value="personnelDetail.contract_url"
              class="edit-input"
              @input="updatePersonnelContractUrl"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.phoneNumber')
            }}</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail.phone_number }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="personnelDetail.phone_number"
              class="edit-input"
              @input="updatePersonnelPhoneNumber"
            ></el-input>
          </div>
        </div>
      </el-col>
      <!-- <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.grade')
            }}</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail.grade }}
            </span>
            <el-select
              v-else
              size="medium"
              class="edit-input"
              :value="personnelDetail.grade"
              placeholder="Select"
              @input="updatePersonnelGrade"
            >
              <el-option
                v-for="grade in listGrade"
                :key="grade.grade_id"
                :label="grade.name"
                :value="grade.name"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col> -->
    </el-row>
    <el-row class="main-info__content">
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.maritalStatus')
            }}</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail.marital_status }}
            </span>
            <el-select
              v-else
              size="medium"
              class="edit-input"
              :value="personnelDetail.marital_status"
              placeholder="Select"
              @input="updatePersonnelMaritalStatus"
            >
              <el-option
                :label="$i18n.t('personnel.detail.alone')"
                value="Alone"
              >
              </el-option>
              <el-option
                :label="$i18n.t('personnel.detail.married')"
                value="Married"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.startDate')
            }}</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail.start_date }}
            </span>
            <el-date-picker
              v-else
              size="medium"
              :value="personnelDetail.start_date"
              type="date"
              class="edit-input"
              placeholder="Pick a day"
              @input="updatePersonnelStartDate"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.endDate')
            }}</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail.end_date }}
            </span>
            <el-date-picker
              v-else
              size="medium"
              :value="personnelDetail.end_date"
              type="date"
              class="edit-input"
              placeholder="Pick a day"
              @input="updatePersonnelEndDate"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="main-info__content">
      <!-- <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.office')
            }}</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              <i class="el-icon-office-building"></i>
              {{ personnelDetail.office_name }}
            </span>
            <el-select
              v-else
              size="medium"
              class="edit-input"
              :value="personnelDetail.office_name"
              placeholder="Select"
              @input="updatePersonnelOfficeName"
            >
              <el-option
                v-for="office in listOffice"
                :key="office.office_id"
                :label="office.name"
                :value="office.office_id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col> -->
      <!-- <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.workingSchedule')
            }}</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              <i class="el-icon-date"></i>
              {{ personnelDetail.working_name }}
            </span>
            <el-select
              v-else
              size="medium"
              class="edit-input"
              :value="personnelDetail.working_name"
              placeholder="Select"
              @input="updatePersonnelWorkingName"
            >
              <el-option
                v-for="workingType in workingTypes"
                :key="workingType.type_id"
                :label="workingType.name"
                :value="workingType.type_id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.position')
            }}</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              <i class="el-icon-folder-checked"></i>
              {{ personnelDetail.position_name }}
            </span>
            <el-select
              v-else
              size="medium"
              class="edit-input"
              :value="personnelDetail.position_name"
              placeholder="Select"
              @input="updatePersonnelPositionName"
            >
              <el-option
                v-for="position in listPositions"
                :key="position.job_id"
                :label="position.position"
                :value="position.job_id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">{{
              $i18n.t('personnel.detail.area')
            }}</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              <i class="el-icon-collection-tag"></i>
              {{ personnelDetail.area_name }}
            </span>
            <el-select
              v-else
              size="medium"
              class="edit-input"
              :value="personnelDetail.area_name"
              placeholder="Select"
              @input="updatePersonnelAreaName"
            >
              <el-option
                v-for="area in listArea"
                :key="area.area_id"
                :label="area.name"
                :value="area.area_id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      loadingPersonnelDetail: true,
    }
  },

  computed: {
    ...mapGetters('auth', ['roles']),
    ...mapGetters('user', [
      'personnelDetail',
      'listGrade',
      'listOffice',
      'workingTypes',
      'listPositions',
      'listArea',
      'isEditMainInfo',
    ]),
  },

  async mounted() {
    await this.getPersonnelDetail(this.$route.params.employeeId)
    if (this.roles.find((role) => role.authority === 'ROLE_ADMIN')) {
      await this.getListOffice()
      await this.getWorkingTypes()
      await this.getListPositions()
      await this.getListArea()
      await this.getListGrade(
        this.listPositions.find(
          (position) => position.position === this.personnelDetail.position_name
        ).job_id
      )
    }
    this.loadingPersonnelDetail = false
  },

  methods: {
    ...mapActions('user', [
      'getPersonnelDetail',
      'getListGrade',
      'getListOffice',
      'getWorkingTypes',
      'getListPositions',
      'getListArea',
      'updateMainInfo',
    ]),
    ...mapMutations('user', [
      'updatePersonnelFullName',
      'updatePersonnelEmployeeId',
      'updatePersonnelStartDate',
      'updatePersonnelEndDate',
      'updatePersonnelWorkingStatus',
      'updatePersonnelContractUrl',
      'updatePersonnelPhoneNumber',
      'updatePersonnelGrade',
      'updatePersonnelBirthDate',
      'updatePersonnelCompanyEmail',
      'updatePersonnelGender',
      'updatePersonnelMaritalStatus',
      'updatePersonnelOfficeName',
      'updatePersonnelWorkingName',
      'updatePersonnelPositionName',
      'updatePersonnelAreaName',
      'setIsEditMainInfo',
    ]),

    async closeEdit() {
      this.setIsEditMainInfo(true)
      await this.getPersonnelDetail(this.$route.params.employeeId)
    },
  },
}
</script>

<style>
.content-item__detail-link {
  color: #409eff;
}

.el-icon-success {
  color: #67c23a;
}
.el-icon-error {
  color: #f56c6c;
}

.content-item__detail-status-icon {
  font-size: 18px;
}
</style>
