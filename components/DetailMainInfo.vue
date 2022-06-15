<template>
  <div>
    <div class="main-info-header">
      <span id="sub-1" class="main-info-header__text">Thông tin chính</span>
      <span
        v-if="
          isEditMainInfo &&
          roles.find((role) => role.authority === 'ROLE_ADMIN')
        "
        class="main-info-header__edit"
        @click="setIsEditMainInfo(false)"
      >
        Sửa thông tin chính
      </span>
      <span
        v-else-if="
          isEditBankInfo === false &&
          roles.find((role) => role.authority === 'ROLE_ADMIN')
        "
      >
        <el-button type="info" @click="closeEdit">Đóng</el-button>
        <el-button type="primary" @click="updateMainInfo">Xác nhận</el-button>
      </span>
    </div>
    <el-row class="main-info__content">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Họ và tên</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail[0].full_name }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="personnelDetail[0].full_name"
              class="edit-input"
              @input="updatePersonnelFullName"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <div class="main-info__content-item">
            <span class="content-item__head">Mã nhân sự</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail[0].employee_id }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="personnelDetail[0].employee_id"
              class="edit-input"
              @input="updatePersonnelEmployeeId"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Ngày bắt đầu</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail[0].start_date }}
            </span>
            <el-date-picker
              v-else
              size="medium"
              :value="personnelDetail[0].start_date"
              type="date"
              class="edit-input"
              placeholder="Pick a day"
              @input="updatePersonnelStartDate"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="main-info__content">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Tình trạng việc làm</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{
                personnelDetail[0].working_status === true
                  ? 'Active'
                  : 'Deactivate'
              }}
            </span>
            <el-select
              v-else
              size="medium"
              class="edit-input"
              :value="
                personnelDetail[0].working_status === true
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
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <div class="main-info__content-item">
            <span class="content-item__head">Hợp đồng hiện tại</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail[0].contract_url }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="personnelDetail[0].contract_url"
              class="edit-input"
              @input="updatePersonnelContractUrl"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Số điện thoại</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail[0].phone_number }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="personnelDetail[0].phone_number"
              class="edit-input"
              @input="updatePersonnelPhoneNumber"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Cấp bậc</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail[0].grade }}
            </span>
            <el-select
              v-else
              size="medium"
              class="edit-input"
              :value="personnelDetail[0].grade"
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
      </el-col>
    </el-row>
    <el-row class="main-info__content">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Ngày sinh</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail[0].birth_date }}
            </span>
            <el-date-picker
              v-else
              :value="personnelDetail[0].birth_date"
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
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <div class="main-info__content-item">
            <span class="content-item__head">Email</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail[0].company_email }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="personnelDetail[0].company_email"
              class="edit-input"
              @input="updatePersonnelCompanyEmail"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Giới tính</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              <i class="el-icon-female content-item__detail-icon"></i>
              {{ personnelDetail[0].gender }}
            </span>
            <el-select
              v-else
              size="medium"
              class="edit-input"
              :value="personnelDetail[0].gender"
              placeholder="Select"
              @input="updatePersonnelGender"
            >
              <el-option label="Nam" value="Male"> </el-option>
              <el-option label="Nữ" value="Female"> </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Tình trạng hôn nhân</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              {{ personnelDetail[0].marital_status }}
            </span>
            <el-select
              v-else
              size="medium"
              class="edit-input"
              :value="personnelDetail[0].marital_status"
              placeholder="Select"
              @input="updatePersonnelMaritalStatus"
            >
              <el-option label="Độc thân" value="Độc thân"> </el-option>
              <el-option label="Đã có gia đình" value="Đã có gia đình">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="main-info__content">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Văn phòng</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              <i class="el-icon-office-building"></i>
              {{ personnelDetail[0].office_name }}
            </span>
            <el-select
              v-else
              size="medium"
              class="edit-input"
              :value="personnelDetail[0].office_name"
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
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <div class="main-info__content-item">
            <span class="content-item__head">Lịch làm việc</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              <i class="el-icon-date"></i>
              {{ personnelDetail[0].working_name }}
            </span>
            <el-select
              v-else
              size="medium"
              class="edit-input"
              :value="personnelDetail[0].working_name"
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
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Vị trí</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              <i class="el-icon-folder-checked"></i>
              {{ personnelDetail[0].position_name }}
            </span>
            <el-select
              v-else
              size="medium"
              class="edit-input"
              :value="personnelDetail[0].position_name"
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
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Lĩnh vực</span>
            <span v-if="isEditMainInfo" class="content-item__detail">
              <i class="el-icon-collection-tag"></i>
              {{ personnelDetail[0].area_name }}
            </span>
            <el-select
              v-else
              size="medium"
              class="edit-input"
              :value="personnelDetail[0].area_name"
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
    await this.getListGrade()
    await this.getListOffice()
    await this.getWorkingTypes()
    await this.getListPositions()
    await this.getListArea()
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

<style></style>
