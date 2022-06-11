<template>
  <div class="main-info__work-info">
    <div class="main-info-header">
      <span id="sub-8" class="main-info-header__text"> Thông tin học vấn </span>
      <span class="main-info-header__edit"> Thêm thông tin học vấn </span>
    </div>
    <el-row
      v-for="education in educationInfo"
      :key="education.id"
      class="main-info__content"
    >
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Trường học</span>
            <span class="content-item__detail">
              {{ education.nameSchool }}
            </span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <div class="main-info__content-item">
            <span class="content-item__head">Khoảng thời gian</span>
            <span class="content-item__detail">
              {{ education.startDate }} -
              {{ education.endDate }}
            </span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Bằng cấp</span>
            <span class="content-item__detail">
              {{ education.certificate }}
            </span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item-action">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
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
    ...mapGetters('user', ['educationInfo']),
  },

  async mounted() {
    await this.getEducationInfo(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('user', ['getEducationInfo']),
  },
}
</script>

<style></style>
