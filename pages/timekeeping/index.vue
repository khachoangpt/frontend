<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <div class="time-keeping__header">
        <div class="time-keeping__header-bookmark">
          <i class="el-icon-finished custom-calendar__status-finished"></i>
          <span>{{ $i18n.t('timekeeping.status.normal') }}</span>
        </div>
        <div class="time-keeping__header-bookmark">
          <el-tag type="danger" effect="dark" size="mini"> late </el-tag>
          <span>{{ $i18n.t('timekeeping.status.late') }}</span>
        </div>
        <div class="time-keeping__header-bookmark">
          <el-tag type="warning" effect="dark" size="mini"> soon </el-tag>
          <span>{{ $i18n.t('timekeeping.status.soon') }}</span>
        </div>
        <div class="time-keeping__header-bookmark">
          <i class="el-icon-sunrise-1 custom-calendar__status-half"></i>
          <span>{{ $i18n.t('timekeeping.status.half') }}</span>
        </div>
        <div class="time-keeping__header-bookmark">
          <el-tag type="info" effect="dark" size="mini"> off </el-tag>
          <span>{{ $i18n.t('timekeeping.status.off') }}</span>
        </div>
        <div class="time-keeping__header-bookmark">
          <el-tag type="success" effect="dark" size="mini"> PL </el-tag>
          <span>{{ $i18n.t('timekeeping.status.paidLeave') }}</span>
        </div>
        <div class="time-keeping__header-bookmark">
          <i class="el-icon-date custom-calendar__status-holiday"></i>
          <span>{{ $i18n.t('timekeeping.status.holiday') }}</span>
        </div>
        <div class="time-keeping__header-bookmark">
          <i class="el-icon-moon custom-calendar__status-overnight"></i>
          <span>{{ $i18n.t('timekeeping.status.overtime') }}</span>
        </div>
      </div>
      <v-calendar
        class="custom-calendar"
        :locale="$i18n.locale"
        :masks="masks"
        :attributes="listEmployeeTimekeeping"
        :is-expanded="true"
        :first-day-of-week="1"
        disable-page-swipe
        @update:from-page="onChangeMonth"
      >
        <div
          slot="day-content"
          slot-scope="{ day, attributes }"
          class="custom-calendar__date"
          @click="dayClick(day)"
        >
          <span
            class="custom-calendar__date-text"
            :class="
              day.day === new Date().getDate()
                ? 'custom-calendar__date-text-today'
                : ''
            "
          >
            {{ day.day }}
            <i
              v-for="attr in attributes"
              :key="attr.key"
              class="custom-calendar__status"
              :class="attr.customData.class"
            >
            </i>
            <span v-for="(at, index) in attributes" :key="'key' + index">
              <span v-for="(type, i) in at.customData.status" :key="i">
                <el-tag
                  v-if="type !== ''"
                  class="custom-calendar__status-success"
                  :type="at.customData.type[i]"
                  effect="dark"
                  size="mini"
                >
                  {{ type }}
                </el-tag>
              </span>
            </span>
          </span>
          <div class="custom-calendar__date-check">
            <span
              v-for="(at, index) in attributes"
              :key="'index' + index"
              class="date-check__text"
            >
              <span class="date-check__text-in">IN</span>
              {{ at.customData.checkIn }}
            </span>
            <span v-for="a in attributes" :key="a.key" class="date-check__text">
              <span class="date-check__text-out">OUT</span>
              {{ a.customData.checkOut }}
            </span>
          </div>
        </div>
      </v-calendar>
    </el-col>
    <!-- <el-col :span="4">
      <div class="timekeeping-check">
        <div v-if="isCheckIn" class="timekeeping-check-in-btn" @click="checkIn">
          IN
        </div>
        <div
          v-if="!isCheckIn"
          class="timekeeping-check-out-btn"
          @click="checkOut"
        >
          OUT
        </div>
      </div>
    </el-col> -->
    <el-dialog
      :title="
        $i18n.t('timekeeping.dialog.title') +
        format(new Date(selectedDay.date || new Date()), 'dd-MM-yyyy')
      "
      :visible.sync="dialogTimekeepingDetailVisible"
      width="30%"
      center
    >
      <div class="dialog-timekeeping-detail__content">
        <el-row class="dialog-timekeeping-detail__row" :gutter="20">
          <el-col :span="10">
            {{ $i18n.t('timekeeping.dialog.totalTime') }}
          </el-col>
          <el-col :span="14">{{ timekeepingInDay.total_working_time }}</el-col>
        </el-row>
        <el-row class="dialog-timekeeping-detail__row" :gutter="20">
          <el-col :span="10">
            {{ $i18n.t('timekeeping.dialog.firstCheckIn') }}
          </el-col>
          <el-col v-if="selectedDay !== ''" :span="14">
            {{ selectedDay.attributes[0].customData.checkIn }}
          </el-col>
        </el-row>
        <el-row class="dialog-timekeeping-detail__row" :gutter="20">
          <el-col :span="10">
            {{ $i18n.t('timekeeping.dialog.lastCheckOut') }}
          </el-col>
          <el-col v-if="selectedDay !== ''" :span="14">
            {{ selectedDay.attributes[0].customData.checkOut }}
          </el-col>
        </el-row>
      </div>
      <div class="dialog-timekeeping-detail__history-head">
        {{ $i18n.t('timekeeping.dialog.history') }}
      </div>
      <div class="dialog-timekeeping-detail__history">
        <el-row>
          <el-col :span="10">
            <div class="detail-history__checkin">Checkin</div>
            <div
              v-for="(time, index) in timekeepingInDay.check_in_check_outs"
              :key="index"
              class="detail-history__checkin"
            >
              {{ time.checkin }}
            </div>
          </el-col>
          <el-col :span="4">
            <div class="detail-history__separate">------------</div>
            <div
              v-for="(time, index) in timekeepingInDay.check_in_check_outs"
              :key="index"
              class="detail-history__separate"
            >
              ------------
            </div>
          </el-col>
          <el-col :span="10">
            <div class="detail-history__checkout">Checkout</div>
            <div
              v-for="(time, index) in timekeepingInDay.check_in_check_outs"
              :key="index"
              class="detail-history__checkout"
            >
              {{ time.checkout }}
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import { format } from 'date-fns'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'TimekeepingPage',
  layout: 'main',
  data() {
    return {
      format,
      dialogTimekeepingDetailVisible: false,
      selectedDay: '',
      masks: {
        weekdays: 'WWWW',
      },
    }
  },

  computed: {
    ...mapGetters('auth', ['id', 'roles']),
    ...mapGetters('timekeeping', [
      'selectedTimeRange',
      'listEmployeeTimekeeping',
      'timekeepingInDay',
      'isCheckIn',
    ]),
  },

  async mounted() {
    // if (this.timekeepingInDay !== '') {
    //   if (
    //     this.timekeepingInDay.check_in_check_outs[
    //       this.timekeepingInDay.check_in_check_outs.length - 1
    //     ].checkout === null
    //   ) {
    //     await this.setIsCheckIn(false)
    //   }
    // }
  },

  methods: {
    ...mapActions('timekeeping', [
      'getListTimekeepingPersonnel',
      'getEmployeeTimekeepingList',
      'getDetailTimekeeping',
      'checkIn',
      'checkOut',
    ]),
    ...mapMutations('timekeeping', ['setIsCheckIn']),

    async dayClick(selectedDay) {
      if (selectedDay.attributes.length !== 0) {
        if (
          selectedDay.attributes[0].customData.status !== 'off' &&
          selectedDay.attributes[0].customData.status !== 'PL'
        ) {
          await this.getDetailTimekeeping(selectedDay.id)
          this.dialogTimekeepingDetailVisible = true
          this.selectedDay = selectedDay
        }
      }
    },

    async onChangeMonth(time) {
      const data = {
        startDate: Date.parse(new Date(time.year, time.month - 1, 1)),
        endDate: Date.parse(new Date(time.year, time.month, 0)),
      }
      if (this.roles.find((role) => role.authority === 'ROLE_MANAGER')) {
        await this.getEmployeeTimekeepingList({
          date: data,
          employeeId: this.id,
        })
      } else if (this.roles.find((role) => role.authority === 'ROLE_USER')) {
        await this.getListTimekeepingPersonnel({
          date: data,
          employeeId: this.id,
        })
      }
    },
  },
}
</script>

<style>
.custom-calendar {
  max-width: 100%;
}

.custom-calendar__date {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  z-index: 10;
  overflow: hidden;
}

.custom-calendar__date-check {
  display: flex;
  justify-content: space-between;
  position: relative;
  bottom: 0;
  padding: 0 4px;
}

.date-check__text {
  font-size: 13px;
  line-height: 1.25;
  margin: 0;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.date-check__text-in {
  color: #67c23a;
}

.date-check__text-out {
  color: #f56c6c;
}

.el-badge__content.is-fixed {
  top: 12px !important;
  right: 44px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.status-late {
  background-color: #f56c6c;
}

.status-soon {
  background-color: #67c23a;
}

.custom-calendar__status {
  float: right;
  margin-top: 4px;
  font-weight: 600;
}

.custom-calendar__status-finished {
  color: #67c23a;
  font-weight: 600;
  margin-left: 4px;
}

.custom-calendar__status-overnight {
  color: goldenrod;
  font-weight: 600;
  margin-left: 4px;
}

.custom-calendar__status-success {
  float: right;
  margin-top: 4px;
  margin-left: 4px;
}

.custom-calendar__status-holiday {
  font-weight: 600;
  margin-left: 4px;
}

.custom-calendar__date-text {
  margin-top: 4px;
  margin-left: 4px;
  font-size: 18px;
}

.time-keeping__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.time-keeping__header-bookmark {
  display: flex;
  justify-content: center;
  align-items: center;
}

.time-keeping__header-bookmark span {
  margin-left: 8px;
}

.custom-calendar__status-half {
  font-weight: 600;
  font-size: 20px;
  color: coral;
  margin-left: 4px;
}

.vc-h-full {
  height: 100%;
}
.custom-calendar.vc-container {
  --day-border: 1px solid #a8abad;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: auto;
}
.custom-calendar.vc-container .vc-weeks {
  padding: 0;
  height: 77vh;
  grid-template-rows: 33px repeat(6, 1fr);
}
.custom-calendar.vc-container .vc-header {
  background-color: #f1f5f8;
  padding: 10px 0;
}
.custom-calendar.vc-container .vc-weekday {
  background-color: var(--weekday-bg);
  border-bottom: var(--weekday-border);
  border-top: var(--weekday-border);
  padding: 5px 0;
}
.vc-border {
  border-width: 1px;
}
.custom-calendar.vc-container .vc-day:not(.on-right) {
  border-right: var(--day-border);
}
.custom-calendar.vc-container .vc-day:not(.on-bottom) {
  border-bottom: var(--day-border);
}
.custom-calendar.vc-container .vc-day.weekday-1,
.custom-calendar.vc-container .vc-day.weekday-7 {
  background-color: #d4e9f8;
}

.custom-calendar.vc-container .vc-day {
  padding: 0 5px 3px;
  text-align: left;
  /*min-height: var(--day-height);*/
  min-width: var(--day-width);
  background-color: #fff;
}
.vc-day {
  position: relative;
  min-height: var(--day-min-height);
  width: 100%;
  height: 100%;
  z-index: 1;
}

.dialog-timekeeping-detail__row {
  margin-bottom: 40px;
}

.dialog-timekeeping-detail__content {
  border-bottom: 2px solid #ccc;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
}

.dialog-timekeeping-detail__history {
  font-size: 16px;
  font-weight: 600;
  max-height: 150px;
  overflow: scroll;
  text-align: center;
}

.dialog-timekeeping-detail__history::-webkit-scrollbar {
  display: none;
}

.detail-history__checkin {
  color: #67c23a;
  margin-bottom: 16px;
}

.detail-history__checkout {
  color: #f56c6c;
  margin-bottom: 16px;
}

.dialog-timekeeping-detail__history-head {
  text-align: left;
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 16px;
}

.detail-history__separate {
  margin-bottom: 16px;
}

.timekeeping-check {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 80vh;
}

.timekeeping-check-in-btn {
  width: 130px;
  height: 130px;
  background-color: #409eff;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 72px;
  color: #fff;
  cursor: pointer;
}

.timekeeping-check-in-btn:hover {
  background-color: #0080ff;
}

.timekeeping-check-out-btn {
  width: 130px;
  height: 130px;
  background-color: #f56c6c;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 54px;
  color: #fff;
  cursor: pointer;
}

.timekeeping-check-out-btn:hover {
  background-color: #f54747;
}

.custom-calendar__date-text-today {
  font-weight: 600;
  color: #0080ff;
}
</style>
