<template>
  <div class="main-info__work-info">
    <div class="main-info-header">
      <span id="sub-7" class="main-info-header__text">
        Danh sách người phụ thuộc
      </span>
      <span class="main-info-header__edit">Thêm người phụ thuộc</span>
    </div>
    <el-row
      v-for="relative in relativeInfo"
      :key="relative.id"
      class="main-info__content"
    >
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Họ và tên</span>
            <span class="content-item__detail">
              {{ relative.parentName }}
            </span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <div class="main-info__content-item">
            <span class="content-item__head">Ngày sinh</span>
            <span class="content-item__detail">
              {{ relative.birthDate }}
            </span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Quan hệ</span>
            <span class="content-item__detail">
              {{ relative.relativeType }}
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
    ...mapGetters('user', ['relativeInfo']),
  },

  async mounted() {
    await this.getRelativeInfo(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('user', ['getRelativeInfo']),
  },
}
</script>

<style></style>
