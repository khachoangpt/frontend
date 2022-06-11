<template>
  <div class="main-info__work-info">
    <div class="main-info-header">
      <span id="sub-6" class="main-info-header__text"> Lịch sử làm việc </span>
      <span class="main-info-header__edit"> Thêm lịch sử làm việc </span>
    </div>
    <el-row
      v-for="working in workingHistory"
      :key="working.id"
      class="main-info__content"
    >
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Công ty</span>
            <span v-if="isEditLine !== working" class="content-item__detail">
              {{ working.companyName }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="working.companyName"
              class="edit-input"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <div class="main-info__content-item">
            <span class="content-item__head">Vị trí</span>
            <span v-if="isEditLine !== working" class="content-item__detail">
              {{ working.position }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="working.position"
              class="edit-input"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="main-info__content-item">
            <span class="content-item__head">Khoảng thời gian</span>
            <span v-if="isEditLine !== working" class="content-item__detail">
              {{ working.startDate }} -
              {{ working.endDate }}
            </span>
            <el-date-picker
              v-else
              size="medium"
              style="width: 100%"
              :value="[working.startDate, working.endDate]"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div
            v-if="isEditLine !== working"
            class="main-info__content-item-action"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="isEditLine = working"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </div>
          <div v-else class="main-info__content-item-action">
            <span>
              <el-button type="info" @click="isEditLine = ''"> Đóng </el-button>
              <el-button type="primary">Xác nhận</el-button>
            </span>
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
      isEditLine: '',
    }
  },

  computed: {
    ...mapGetters('user', ['workingHistory']),
  },

  async mounted() {
    await this.getWorkingHistory(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('user', ['getWorkingHistory']),
  },
}
</script>

<style></style>
