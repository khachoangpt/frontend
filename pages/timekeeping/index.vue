<template>
  <el-row :gutter="20">
    <el-col :span="19">
      <div class="time-keeping__header">
        <div class="time-keeping__header-bookmark">
          <i class="el-icon-finished custom-calendar__status-finished"></i>
          <span>Đủ</span>
        </div>
        <div class="time-keeping__header-bookmark">
          <el-tag type="danger" effect="dark" size="mini"> late </el-tag>
          <span>Đi muộn</span>
        </div>
        <div class="time-keeping__header-bookmark">
          <el-tag type="warning" effect="dark" size="mini"> soon </el-tag>
          <span>Đi sớm</span>
        </div>
        <div class="time-keeping__header-bookmark">
          <el-tag type="info" effect="dark" size="mini"> off </el-tag>
          <span>Nghỉ không phép</span>
        </div>
        <div class="time-keeping__header-bookmark">
          <el-tag type="success" effect="dark" size="mini"> OL </el-tag>
          <span>Nghỉ có phép</span>
        </div>
        <div class="time-keeping__header-bookmark">
          <i class="el-icon-sunrise-1 custom-calendar__status-half"></i>
          <span>Nửa ngày</span>
        </div>
        <div class="time-keeping__header-bookmark">
          <i class="el-icon-date custom-calendar__status-holiday"></i>
          <span>Ngày nghỉ</span>
        </div>
        <div class="time-keeping__header-bookmark">
          <i class="el-icon-moon custom-calendar__status-overnight"></i>
          <span>Tăng ca</span>
        </div>
      </div>
      <v-calendar
        class="custom-calendar"
        :locale="$i18n.locale"
        :masks="masks"
        :attributes="attributes"
        :is-expanded="true"
        :first-day-of-week="1"
        disable-page-swipe
      >
        <div
          slot="day-content"
          slot-scope="{ day, attributes }"
          class="custom-calendar__date"
          @click="dayClick(day)"
        >
          <span class="custom-calendar__date-text">
            {{ day.day }}
            <i
              v-for="attr in attributes"
              :key="attr.key"
              class="custom-calendar__status"
              :class="attr.customData.class"
            ></i>
            <span v-for="(at, index) in attributes" :key="index">
              <el-tag
                v-if="at.customData.status !== ''"
                class="custom-calendar__status-success"
                :type="at.customData.type"
                effect="dark"
                size="mini"
              >
                {{ at.customData.status }}
              </el-tag>
            </span>
          </span>
          <div class="custom-calendar__date-check">
            <span
              v-for="(at, index) in attributes"
              :key="index"
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
    <el-col :span="5"></el-col>
    <el-dialog
      :title="
        'Dữ liệu giờ làm ngày ' +
        new Date(selectedDay.date).getDate() +
        '-' +
        (new Date(selectedDay.date).getMonth() + 1) +
        '-' +
        new Date(selectedDay.date).getFullYear()
      "
      :visible.sync="dialogTimekeepingDetailVisible"
      width="30%"
      center
    >
      <div class="dialog-timekeeping-detail__content">
        <el-row class="dialog-timekeeping-detail__row" :gutter="20">
          <el-col :span="10"> Tổng giờ làm: </el-col>
          <el-col :span="14">08 giờ 12 phút</el-col>
        </el-row>
        <el-row class="dialog-timekeeping-detail__row" :gutter="20">
          <el-col :span="10"> Checkin lần đầu: </el-col>
          <el-col v-if="selectedDay !== ''" :span="14">
            {{ selectedDay.attributes[0].customData.checkIn }}
          </el-col>
        </el-row>
        <el-row class="dialog-timekeeping-detail__row" :gutter="20">
          <el-col :span="10"> Checkout lần cuối: </el-col>
          <el-col v-if="selectedDay !== ''" :span="14">
            {{ selectedDay.attributes[0].customData.checkOut }}
          </el-col>
        </el-row>
      </div>
      <div class="dialog-timekeeping-detail__history">
        <div class="detail-history__checkin">Checkin lúc - 08:30</div>
        <div class="detail-history__checkout">Checkout lúc - 12:30</div>
        <div class="detail-history__checkin">Checkin lúc - 12:30</div>
        <div class="detail-history__checkout">Checkout lúc - 17:32</div>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TimekeepingPage',
  layout: 'main',
  data() {
    return {
      dialogTimekeepingDetailVisible: false,
      selectedDay: '',
      masks: {
        weekdays: 'WWWW',
      },
    }
  },

  computed: {
    ...mapGetters('timekeeping', ['attributes']),
  },

  methods: {
    dayClick(selectedDay) {
      if (selectedDay.attributes.length !== 0) {
        if (
          selectedDay.attributes[0].customData.status !== 'off' &&
          selectedDay.attributes[0].customData.status !== 'PL'
        ) {
          this.dialogTimekeepingDetailVisible = true
          this.selectedDay = selectedDay
        }
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
}

.custom-calendar__status-overnight {
  color: goldenrod;
  font-weight: 600;
}

.custom-calendar__status-success {
  float: right;
  margin-top: 4px;
}

.custom-calendar__status-holiday {
  font-weight: 600;
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
}

.vc-h-full {
  height: 100%;
}
.custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
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
  height: 80vh;
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
  background-color: #eff8ff;
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
</style>
