<template>
  <div>
    <div class="main-info-header">
      <span id="sub-1" class="main-info-header__text">Thông tin chính</span>
      <span
        v-if="isEditMainInfo"
        class="main-info-header__edit"
        @click="isEditMainInfo = false"
      >
        Sửa thông tin chính
      </span>
      <span v-else>
        <el-button type="info" @click="isEditMainInfo = true">Đóng</el-button>
        <el-button type="primary">Xác nhận</el-button>
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
            <el-input
              v-else
              size="medium"
              :value="personnelDetail[0].start_date"
              class="edit-input"
            ></el-input>
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
              {{ personnelDetail[0].working_status }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="personnelDetail[0].working_status"
              class="edit-input"
            ></el-input>
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
            <el-input
              v-else
              size="medium"
              :value="personnelDetail[0].grade"
              class="edit-input"
            ></el-input>
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
            <el-input
              v-else
              size="medium"
              :value="personnelDetail[0].birth_date"
              class="edit-input"
            ></el-input>
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
            <el-input
              v-else
              size="medium"
              :value="personnelDetail[0].gender"
              class="edit-input"
            ></el-input>
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
            <el-input
              v-else
              size="medium"
              :value="personnelDetail[0].marital_status"
              class="edit-input"
            ></el-input>
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
            <el-input
              v-else
              size="medium"
              :value="personnelDetail[0].office_name"
              class="edit-input"
            ></el-input>
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
            <el-input
              v-else
              size="medium"
              :value="personnelDetail[0].working_name"
              class="edit-input"
            ></el-input>
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
            <el-input
              v-else
              size="medium"
              :value="personnelDetail[0].position_name"
              class="edit-input"
            ></el-input>
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
            <el-input
              v-else
              size="medium"
              :value="personnelDetail[0].area_name"
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
    ...mapGetters('user', ['personnelDetail']),
  },

  async mounted() {
    await this.getPersonnelDetail(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('user', ['getPersonnelDetail']),
  },
}
</script>

<style></style>
