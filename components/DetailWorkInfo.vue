<template>
  <div>
    <div class="main-info__work-info">
      <div class="main-info-header">
        <span id="sub-2" class="main-info-header__text">
          {{ $i18n.t('personnel.detail.jobInfo') }}
        </span>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <el-popover
            v-if="isEditWorkInfo && workingInfo.newWorkingInfo.final_salary !== ''"
            popper-class="popover-new-salary"
            placement="left-start"
            :visible-arrow="false"
            :width="800"
            trigger="hover"
          >
            <div class="new-salary-header">
              <span class="new-salary">
                {{ $i18n.t('personnel.detail.salaryApplyFrom') }}
                {{ workingInfo.newWorkingInfo.start_date }}
              </span>
              <el-button
                type="primary"
                size="medium"
                class="new-salary-action"
                :disabled="
                  new Date(workingInfo.newWorkingInfo.start_date) > new Date()
                "
                @click="applyNewSalary"
              >
                {{ $i18n.t('personnel.detail.applyNow') }}
              </el-button>
            </div>
            <el-row class="main-info__content">
              <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
                <div class="grid-content">
                  <div class="main-info__content-item">
                    <span class="content-item__head">{{
                      $i18n.t('personnel.detail.salary')
                    }}</span>
                    <span v-if="isEditWorkInfo" class="content-item__detail">{{
                      new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(workingInfo.newWorkingInfo.final_salary)
                    }}</span>
                    <el-input
                      v-else
                      size="medium"
                      :value="workingInfo.newWorkingInfo.final_salary"
                      class="edit-input"
                      @input="updateWorkingFinalSalary"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
                <div class="grid-content">
                  <div class="main-info__content-item">
                    <span class="content-item__head">{{
                      $i18n.t('personnel.detail.baseSalary')
                    }}</span>
                    <span v-if="isEditWorkInfo" class="content-item__detail">{{
                      new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(workingInfo.newWorkingInfo.base_salary)
                    }}</span>
                    <el-input
                      v-else
                      size="medium"
                      :value="workingInfo.newWorkingInfo.base_salary"
                      class="edit-input"
                      @input="updateWorkingBaseSalary"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
                <div class="grid-content">
                  <div class="main-info__content-item">
                    <span class="content-item__head">{{
                      $i18n.t('personnel.detail.startDate')
                    }}</span>
                    <span v-if="isEditWorkInfo" class="content-item__detail">{{
                      workingInfo.newWorkingInfo.start_date
                    }}</span>
                    <el-date-picker
                      v-else
                      size="medium"
                      :value="workingInfo.newWorkingInfo.start_date"
                      type="month"
                      class="edit-input"
                      value-format="yyyy-MM"
                      placeholder="Pick a day"
                      :picker-options="pickerOptions"
                      @input="updateWorkingStartDate"
                    >
                    </el-date-picker>
                  </div>
                </div>
              </el-col>
              <!-- <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
                <div class="grid-content">
                  <div class="main-info__content-item">
                    <span class="content-item__head">{{
                      $i18n.t('personnel.detail.workingSchedule')
                    }}</span>
                    <span v-if="isEditWorkInfo" class="content-item__detail">{{
                      workingInfo.newWorkingInfo.working_type
                    }}</span>
                    <el-select
                      v-else
                      size="medium"
                      class="edit-input"
                      :value="workingInfo.newWorkingInfo.working_type"
                      placeholder="Select"
                      @input="updateWorkingWorkingName"
                    >
                      <el-option
                        v-for="workingType in workingTypes"
                        :key="workingType.type_id"
                        :label="workingType.name"
                        :value="workingType.name"
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
                      $i18n.t('personnel.detail.office')
                    }}</span>
                    <span v-if="isEditWorkInfo" class="content-item__detail">
                      {{ workingInfo.newWorkingInfo.office }}</span
                    >
                    <el-select
                      v-else
                      size="medium"
                      class="edit-input"
                      :value="workingInfo.newWorkingInfo.office"
                      placeholder="Select"
                      @input="updateWorkingOfficeName"
                    >
                      <el-option
                        v-for="office in listOffice"
                        :key="office.office_id"
                        :label="office.name"
                        :value="office.name"
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
                    <span v-if="isEditWorkInfo" class="content-item__detail">{{
                      workingInfo.newWorkingInfo.area
                    }}</span>
                    <el-select
                      v-else
                      size="medium"
                      class="edit-input"
                      :value="workingInfo.newWorkingInfo.area"
                      placeholder="Select"
                      @input="updateWorkingAreaName"
                    >
                      <el-option
                        v-for="area in listArea"
                        :key="area.area_id"
                        :label="area.name"
                        :value="area.name"
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
                    <span v-if="isEditWorkInfo" class="content-item__detail">{{
                      workingInfo.newWorkingInfo.position
                    }}</span>
                    <el-select
                      v-else
                      size="medium"
                      class="edit-input"
                      :value="workingInfo.newWorkingInfo.position"
                      placeholder="Select"
                      @input="updateWorkingPositionName"
                      @change="onChangePosition"
                    >
                      <el-option
                        v-for="position in listPositions"
                        :key="position.job_id"
                        :label="position.position"
                        :value="position.position"
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
                      $i18n.t('personnel.detail.grade')
                    }}</span>
                    <span v-if="isEditWorkInfo" class="content-item__detail">{{
                      workingInfo.newWorkingInfo.grade
                    }}</span>
                    <el-select
                      v-else
                      size="medium"
                      class="edit-input"
                      :value="workingInfo.newWorkingInfo.grade"
                      placeholder="Select"
                      @input="updateWorkingGrade"
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
              </el-col>
            </el-row>
            <el-row class="main-info__content">
              <!-- <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
                <div class="grid-content">
                  <div class="main-info__content-item">
                    <span class="content-item__head">{{
                      $i18n.t('personnel.detail.personnelClassification')
                    }}</span>
                    <span v-if="isEditWorkInfo" class="content-item__detail">
                      {{ workingInfo.newWorkingInfo.employee_type }}
                    </span>
                    <el-select
                      v-else
                      size="medium"
                      class="edit-input"
                      :value="workingInfo.newWorkingInfo.employee_type"
                      placeholder="Select"
                      @input="updateWorkingEmployeeType"
                    >
                      <el-option
                        v-for="employeeType in employeeTypes"
                        :key="employeeType.type_id"
                        :label="employeeType.name"
                        :value="employeeType.name"
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
                      $i18n.t('personnel.detail.manager')
                    }}</span>
                    <span v-if="isEditWorkInfo" class="content-item__detail">
                      {{ workingInfo.newWorkingInfo.manager_name }} ({{
                        workingInfo.newWorkingInfo.manager_id
                      }})
                    </span>
                    <el-autocomplete
                      v-else
                      :value="workingInfo.newWorkingInfo.manager_name"
                      class="edit-input"
                      :fetch-suggestions="querySearch"
                      :placeholder="$i18n.t('personnel.manager')"
                      @input="updateWorkingManager"
                      @select="handleSelect"
                    ></el-autocomplete>
                  </div>
                </div>
              </el-col> -->
              <el-col
                v-if="roles.find((role) => role.authority === 'ROLE_ADMIN')"
                :xs="24"
                :sm="12"
                :md="6"
                :lg="6"
                :xl="6"
              >
                <div class="grid-content">
                  <div class="main-info__content-item">
                    <span class="content-item__head">{{
                      $i18n.t('personnel.detail.role')
                    }}</span>
                    <span v-if="isEditWorkInfo" class="content-item__detail">
                      {{ employeeRole.roleName }}
                    </span>
                    <el-select
                      v-else
                      size="medium"
                      class="edit-input"
                      :value="employeeRole.roleName"
                      placeholder="Select"
                      @input="updateWorkingRole"
                    >
                      <el-option
                        v-for="role in $store.state.user.roles"
                        :key="role.type_id"
                        :label="role.role"
                        :value="role.role"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-tag
              slot="reference"
              class="salary-tag"
              type="danger"
              effect="dark"
            >
              {{ $i18n.t('personnel.detail.newSalary') }}
            </el-tag>
          </el-popover>
          <div
            v-if="
              isEditWorkInfo &&
              roles.find((role) => role.authority === 'ROLE_ADMIN')
            "
          >
            <span class="main-info-header__edit" @click="editWorkInfo">
              {{ $i18n.t('personnel.detail.editJobInformation') }}
            </span>
          </div>
          <span
            v-else-if="
              isEditWorkInfo === false &&
              roles.find((role) => role.authority === 'ROLE_ADMIN')
            "
          >
            <el-button type="info" @click="closeEdit">{{
              $i18n.t('personnel.detail.close')
            }}</el-button>
            <el-button
              type="primary"
              @click="confirmEditWorkingInfo($route.params.employeeId)"
              >{{ $i18n.t('personnel.detail.confirm') }}</el-button
            >
          </span>
        </div>
      </div>
      <el-row class="main-info__content">
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="grid-content">
            <div class="main-info__content-item">
              <span class="content-item__head">{{
                $i18n.t('personnel.detail.salary')
              }}</span>
              <span v-if="isEditWorkInfo" class="content-item__detail">{{
                new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(workingInfo.final_salary)
              }}</span>
              <el-input
                v-else
                size="medium"
                :value="workingInfo.final_salary"
                class="edit-input"
                @input="updateWorkingFinalSalary"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="grid-content">
            <div class="main-info__content-item">
              <span class="content-item__head">{{
                $i18n.t('personnel.detail.baseSalary')
              }}</span>
              <span v-if="isEditWorkInfo" class="content-item__detail">{{
                new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(workingInfo.base_salary)
              }}</span>
              <el-input
                v-else
                size="medium"
                :value="workingInfo.base_salary"
                class="edit-input"
                @input="updateWorkingBaseSalary"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="grid-content">
            <div class="main-info__content-item">
              <span class="content-item__head">{{
                $i18n.t('personnel.detail.startDate')
              }}</span>
              <span v-if="isEditWorkInfo" class="content-item__detail">{{
                workingInfo.start_date
              }}</span>
              <el-date-picker
                v-else
                size="medium"
                :value="workingInfo.start_date"
                type="month"
                class="edit-input"
                value-format="yyyy-MM"
                placeholder="Pick a day"
                :picker-options="pickerOptions"
                @input="updateWorkingStartDate"
              >
              </el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="grid-content">
            <div class="main-info__content-item">
              <span class="content-item__head">{{
                $i18n.t('personnel.detail.workingSchedule')
              }}</span>
              <span v-if="isEditWorkInfo" class="content-item__detail">{{
                workingInfo.working_type
              }}</span>
              <el-select
                v-else
                size="medium"
                class="edit-input"
                :value="workingInfo.working_type"
                placeholder="Select"
                @input="updateWorkingWorkingName"
              >
                <el-option
                  v-for="workingType in workingTypes"
                  :key="workingType.type_id"
                  :label="workingType.name"
                  :value="workingType.name"
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
              <span class="content-item__head">{{
                $i18n.t('personnel.detail.office')
              }}</span>
              <span v-if="isEditWorkInfo" class="content-item__detail">
                {{ workingInfo.office }}</span
              >
              <el-select
                v-else
                size="medium"
                class="edit-input"
                :value="workingInfo.office"
                placeholder="Select"
                @input="updateWorkingOfficeName"
              >
                <el-option
                  v-for="office in listOffice"
                  :key="office.office_id"
                  :label="office.name"
                  :value="office.name"
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
              <span v-if="isEditWorkInfo" class="content-item__detail">{{
                workingInfo.area
              }}</span>
              <el-select
                v-else
                size="medium"
                class="edit-input"
                :value="workingInfo.area"
                placeholder="Select"
                @input="updateWorkingAreaName"
              >
                <el-option
                  v-for="area in listArea"
                  :key="area.area_id"
                  :label="area.name"
                  :value="area.name"
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
              <span v-if="isEditWorkInfo" class="content-item__detail">{{
                workingInfo.position
              }}</span>
              <el-select
                v-else
                size="medium"
                class="edit-input"
                :value="workingInfo.position"
                placeholder="Select"
                @input="updateWorkingPositionName"
                @change="onChangePosition"
              >
                <el-option
                  v-for="position in listPositions"
                  :key="position.job_id"
                  :label="position.position"
                  :value="position.position"
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
                $i18n.t('personnel.detail.grade')
              }}</span>
              <span v-if="isEditWorkInfo" class="content-item__detail">{{
                workingInfo.grade
              }}</span>
              <el-select
                v-else
                size="medium"
                class="edit-input"
                :value="workingInfo.grade"
                placeholder="Select"
                @input="updateWorkingGrade"
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
        </el-col>
      </el-row>
      <el-row class="main-info__content">
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="grid-content">
            <div class="main-info__content-item">
              <span class="content-item__head">{{
                $i18n.t('personnel.detail.personnelClassification')
              }}</span>
              <span v-if="isEditWorkInfo" class="content-item__detail">
                {{ workingInfo.employee_type }}
              </span>
              <el-select
                v-else
                size="medium"
                class="edit-input"
                :value="workingInfo.employee_type"
                placeholder="Select"
                @input="updateWorkingEmployeeType"
              >
                <el-option
                  v-for="employeeType in employeeTypes"
                  :key="employeeType.type_id"
                  :label="employeeType.name"
                  :value="employeeType.name"
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
                $i18n.t('personnel.detail.manager')
              }}</span>
              <span v-if="isEditWorkInfo" class="content-item__detail">
                {{ workingInfo.manager_name }} ({{ workingInfo.manager_id }})
              </span>
              <el-autocomplete
                v-else
                :value="workingInfo.manager_name"
                class="edit-input"
                :fetch-suggestions="querySearch"
                :placeholder="$i18n.t('personnel.manager')"
                @input="updateWorkingManager"
                @select="handleSelect"
              ></el-autocomplete>
            </div>
          </div>
        </el-col>
        <el-col
          v-if="roles.find((role) => role.authority === 'ROLE_ADMIN')"
          :xs="24"
          :sm="12"
          :md="6"
          :lg="6"
          :xl="6"
        >
          <div class="grid-content">
            <div class="main-info__content-item">
              <span class="content-item__head">{{
                $i18n.t('personnel.detail.role')
              }}</span>
              <span v-if="isEditWorkInfo" class="content-item__detail">
                {{ employeeRole.roleName }}
              </span>
              <el-select
                v-else
                size="medium"
                class="edit-input"
                :value="employeeRole.roleName"
                placeholder="Select"
                @input="updateWorkingRole"
              >
                <el-option
                  v-for="role in $store.state.user.roles"
                  :key="role.type_id"
                  :label="role.role"
                  :value="role.role"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() <
            new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
          )
        },
      },
    }
  },

  computed: {
    ...mapGetters('auth', ['roles']),
    ...mapGetters('user', [
      'workingInfo',
      'isEditWorkInfo',
      'employeeRole',
      'workingTypes',
      'listOffice',
      'listArea',
      'listPositions',
      'listGrade',
      'employeeTypes',
      'listManager',
    ]),
  },

  async mounted() {
    await this.getWorkingInfo(this.$route.params.employeeId)
    if (this.roles.find((role) => role.authority === 'ROLE_ADMIN')) {
      await this.getRoleByEmployee(this.$route.params.employeeId)
      await this.getWorkingTypes()
      await this.getListOffice()
      await this.getListArea()
      await this.getListPositions()
      await this.getManagerLowerOfArea()
      await this.getListRoleType()
      await this.getListGrade(
        this.listPositions.find(
          (position) => position.position === this.workingInfo.position
        ).job_id
      )
      await this.getEmployeeTypes()
    }
  },

  methods: {
    ...mapActions('salary', ['getManagerLowerOfArea']),
    ...mapActions('user', [
      'getWorkingInfo',
      'getRoleByEmployee',
      'getWorkingTypes',
      'getListOffice',
      'getListArea',
      'getListPositions',
      'getListGrade',
      'getEmployeeTypes',
      'getListRoleType',
      'confirmEditWorkingInfo',
      'onChangePosition',
      'applyWorkingInfoNow',
    ]),
    ...mapMutations('user', [
      'setIsEditWorkInfo',
      'updateWorkingWorkingName',
      'updateWorkingOfficeName',
      'updateWorkingAreaName',
      'updateWorkingPositionName',
      'updateWorkingGrade',
      'updateWorkingEmployeeType',
      'updateWorkingManager',
      'updateWorkingRole',
      'updateWorkingStartDate',
      'updateWorkingFinalSalary',
      'updateWorkingBaseSalary',
      'handleSelect',
    ]),

    async closeEdit() {
      await this.setIsEditWorkInfo(true)
      await this.getWorkingInfo(this.$route.params.employeeId)
      await this.getRoleByEmployee(this.$route.params.employeeId)
    },

    async editWorkInfo() {
      await this.setIsEditWorkInfo(false)
    },

    querySearch(queryString, cb) {
      const results = queryString
        ? this.listManager.filter(this.createFilter(queryString))
        : this.listManager
      cb(results)
    },

    createFilter(queryString) {
      return (link) => {
        return (
          this.removeMark(link.value.toLowerCase()).includes(
            this.removeMark(queryString.toLowerCase())
          ) === true
        )
      }
    },

    removeMark(str) {
      str = str.replace(/\s+/g, ' ')
      str = str.trim()
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      str = str.replace(/đ/g, 'd')
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
      str = str.replace(/Đ/g, 'D')
      return str
    },

    applyNewSalary() {
      this.$confirm('Are you sure to apply?', 'Warning', {
        confirmButtonText: this.$i18n.t('personnel.detail.confirm'),
        cancelButtonText: this.$i18n.t('personnel.detail.close'),
        type: 'warning',
      })
        .then(() => {
          this.applyWorkingInfoNow()
        })
        .catch(() => {})
    },
  },
}
</script>

<style>
.el-autocomplete-suggestion {
  width: fit-content !important;
}

.new-salary {
  font-size: 20px;
  font-weight: 600;
  color: #67c23a;
}

.new-salary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.salary-tag {
  margin-right: 8px;
}

.popover-new-salary {
  border-color: #f56c6c;
}
</style>
