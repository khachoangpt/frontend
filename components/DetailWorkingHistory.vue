<template>
  <div class="main-info__work-info">
    <div class="main-info-header">
      <span id="sub-6" class="main-info-header__text"> Lịch sử làm việc </span>
      <span
        v-if="
          roles.find(
            (role) =>
              role.authority === 'ROLE_ADMIN' ||
              role.authority === 'ROLE_MANAGER'
          )
        "
        class="main-info-header__edit"
        @click="centerDialogVisible = true"
      >
        Thêm lịch sử làm việc
      </span>
    </div>
    <el-row
      v-for="(working, index) in workingHistory"
      :key="working.id"
      class="main-info__content"
    >
      <el-col :span="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">Công ty</span>
            <span v-if="isEditLine !== working" class="content-item__detail">
              {{ working.company_name }}
            </span>
            <el-input
              v-else
              size="medium"
              :value="working.company_name"
              class="edit-input"
              @input="updateWorkingHistoryCompanyNameMethod($event, index)"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
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
              @input="updateWorkingHistoryPositionMethod($event, index)"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="main-info__content-item">
            <span class="content-item__head">Khoảng thời gian</span>
            <span v-if="isEditLine !== working" class="content-item__detail">
              {{ working.start_date }} -
              {{ working.end_date }}
            </span>
            <el-date-picker
              v-else
              size="medium"
              style="width: 100%"
              :value="[working.start_date, working.end_date]"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
              @input="updateWorkingHistoryDateMethod($event, index)"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col
        v-if="
          roles.find(
            (role) =>
              role.authority === 'ROLE_ADMIN' ||
              role.authority === 'ROLE_MANAGER'
          )
        "
        :span="6"
      >
        <div class="grid-content">
          <div
            v-if="isEditLine !== working"
            class="main-info__content-item-action"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="setIsEditLine(working)"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </div>
          <div v-else class="main-info__content-item-action">
            <span>
              <el-button type="info" @click="closeEdit"> Đóng </el-button>
              <el-button type="primary" @click="updateWorkingHistory(index)">
                Xác nhận
              </el-button>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="Thêm lịch sử làm việc"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form class="demo-form-inline">
        <el-form-item label="Công ty">
          <el-input placeholder="Công ty"></el-input>
        </el-form-item>
        <el-form-item label="Vị trí">
          <el-input placeholder="Vị trí"></el-input>
        </el-form-item>
        <el-form-item label="Khoảng thời gian">
          <el-date-picker
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Đóng</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
          >Xác nhận</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      centerDialogVisible: false,
    }
  },

  computed: {
    ...mapGetters('auth', ['roles']),
    ...mapGetters('user', ['workingHistory', 'isEditLine']),
  },

  async mounted() {
    await this.getWorkingHistory(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('user', ['getWorkingHistory', 'updateWorkingHistory']),
    ...mapMutations('user', [
      'updateWorkingHistoryCompanyName',
      'updateWorkingHistoryPosition',
      'updateWorkingHistoryDate',
      'setIsEditLine',
    ]),

    async closeEdit() {
      this.setIsEditLine('')
      await this.getWorkingHistory(this.$route.params.employeeId)
    },

    updateWorkingHistoryCompanyNameMethod(event, index) {
      this.updateWorkingHistoryCompanyName({ event, index })
    },

    updateWorkingHistoryPositionMethod(event, index) {
      this.updateWorkingHistoryPosition({ event, index })
    },

    updateWorkingHistoryDateMethod(event, index) {
      this.updateWorkingHistoryDate({ event, index })
    },
  },
}
</script>

<style></style>
