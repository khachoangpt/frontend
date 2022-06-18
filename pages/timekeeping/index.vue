<template>
  <div>
    <div class="time-keeping__header">
      <el-date-picker
        v-model="monthSearch"
        type="month"
        placeholder="Tìm kiếm"
        format="MMM - yyyy"
        :clearable="false"
        @change="onChangeMonth"
      >
      </el-date-picker>
      <el-button class="time-keeping__export" type="success">Export</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="20">
        <el-card>
          <vue-good-table
            :columns="columns"
            :rows="rows"
            :select-options="{ enabled: true }"
            :pagination-options="{
              enabled: true,
            }"
          />
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="time-keeping__filter">
          <h3>Văn phòng</h3>
          <el-checkbox checked class="time-keeping__filter-check-box"
            >Hà Nội</el-checkbox
          >
          <el-checkbox checked class="time-keeping__filter-check-box"
            >Đà Nẵng</el-checkbox
          >
          <el-checkbox class="time-keeping__filter-check-box"
            >TP Hồ Chí Minh</el-checkbox
          >
        </el-card>
        <el-card class="time-keeping__filter">
          <h3>Lĩnh vực</h3>
          <el-checkbox checked class="time-keeping__filter-check-box"
            >IT</el-checkbox
          >
          <el-checkbox checked class="time-keeping__filter-check-box"
            >Sales</el-checkbox
          >
          <el-checkbox class="time-keeping__filter-check-box">HR</el-checkbox>
          <el-checkbox class="time-keeping__filter-check-box"
            >Marketing</el-checkbox
          >
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'TimekeepingPage',
  layout: 'main',
  data() {
    return {
      monthSearch: new Date(),
      columns: [
        {
          label: 'Nhân viên',
          field: 'full_name',
          width: '150px',
        },
      ],

      rows: [
        {
          full_name: 'Nguyen Khac Hoang',
          1: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          2: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          3: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          4: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          5: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          6: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          7: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          8: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
        },
        {
          full_name: 'Nguyen Khac Hoang',
          1: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          2: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          3: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          4: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          5: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          6: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          7: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          8: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
        },
        {
          full_name: 'Nguyen Khac Hoang',
          1: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          2: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          3: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          4: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          5: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          6: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          7: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          8: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
        },
        {
          full_name: 'Nguyen Khac Hoang',
          1: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          2: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          3: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          4: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          5: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          6: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          7: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
          8: '<span class="checkin-color">8:30</span><br/><span>--</span><br/><span class="checkout-color">17:50</span>',
        },
      ],
    }
  },

  mounted() {
    this.getDaysInMonth(
      this.monthSearch.getMonth() + 1,
      this.monthSearch.getFullYear()
    )
  },

  methods: {
    getDaysInMonth(month, year) {
      this.columns = [
        {
          label: 'Nhân viên',
          field: 'full_name',
          width: '150px',
        },
      ]
      const date = new Date(year, month - 1, 1)
      const days = []
      while (date.getMonth() === month - 1) {
        days.push(new Date(date))
        const day = {
          label: date.getDate() + '/' + (date.getMonth() + 1),
          field: date.getDate().toString(),
          width: '50px',
          sortable: false,
          thClass: 'table-header-center',
          tdClass: 'day-status',
          html: true,
        }
        this.columns.push(day)
        date.setDate(date.getDate() + 1)
      }
      return days
    },

    onChangeMonth() {
      this.getDaysInMonth(
        this.monthSearch.getMonth() + 1,
        this.monthSearch.getFullYear()
      )
    },
  },
}
</script>

<style>
.vgt-left-align {
  text-align: center;
}

.checkin-color {
  color: #67c23a;
}

.checkout-color {
  color: #f56c6c;
}

.time-keeping__header {
  margin-bottom: 16px;
  display: flex;
}

.vgt-table th {
  padding: 0.75em 1.5em 0.75em 1.75em;
}

.time-keeping__export {
  margin-left: 16px;
}

.time-keeping__filter {
  margin-bottom: 16px;
}

.time-keeping__filter-check-box {
  margin-bottom: 8px;
  display: block;
}
</style>
