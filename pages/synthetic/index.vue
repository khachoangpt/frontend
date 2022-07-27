<template>
  <div class="container">
    <h1 class="title">Tổng hợp biểu đồ quản lý nhân viên phòng ban</h1>
    <el-row :gutter="20">
      <el-col class="dashboard__col" :span="8">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text"
                >Tổng số nhân viên phòng ban</span
              >
            </div>
            <doughnut-chart :values="employeeNumber" />
          </el-card>
        </div>
      </el-col>
      <el-col class="dashboard__col" :span="8">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Mức tuổi</span>
            </div>
            <doughnut-chart :values="ageNumber" :background-color="ageColor" />
          </el-card>
        </div>
      </el-col>
      <el-col class="dashboard__col" :span="8">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Full time/Part time</span>
            </div>
            <doughnut-chart
              :values="workTimeNumber"
              :background-color="workTimeColor"
            />
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col class="dashboard__col" :span="24">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Lịch sử thôi việc</span>
              <el-select v-model="option" placeholder="Thời gian">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </div>
            <bar-chart :values="reasonType" />
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col class="dashboard__col" :span="24">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Lịch sử nghỉ phép</span>
              <el-select v-model="option" placeholder="Loại nghỉ phép">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </div>
            <multiple-column-chart />
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col class="dashboard__col" :span="24">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card__header-text">Thâm niên</span>
            </div>
            <bar-chart :values="seniorityNumber" />
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import BarChart from '~/components/chart/BarChart.vue'
import DoughnutChart from '~/components/chart/DoughnutChart.vue'
import MultipleColumnChart from '~/components/chart/MultipleColumnChart.vue'
export default {
  name: 'SyntheticPage',
  components: {
    BarChart,
    DoughnutChart,
    MultipleColumnChart,
  },
  layout: 'main',
  data() {
    return {
      ageColor: ['#64a340', '#348c75', '#348c75', '#05ffd1'],
      workTimeColor: ['#328fa8', '#ffde05'],
      seniorityNumber: [
        {
          key: 1,
          label: '10 Năm',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 2,
          label: '20 Năm',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 3,
          label: '30 Năm',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 4,
          label: '40 Năm',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 5,
          label: '50 Năm',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 6,
          label: '60 Năm',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 7,
          label: '70 Năm',
          value: Math.floor(Math.random() * 11),
        },
      ],
      options: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
          disabled: true,
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
      option: '',
      reasonType: [
        {
          key: 1,
          label: 'Ghét sếp',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 2,
          label: 'Đánh nhau với đồng nghiệp',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 3,
          label: 'Lương thấp',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 4,
          label: 'Buồn',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 5,
          label: 'Vui',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 6,
          label: 'Hơi buồn',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 7,
          label: 'Hơi vui',
          value: Math.floor(Math.random() * 11),
        },
      ],
      workTimeNumber: [
        {
          key: 1,
          label: 'Full time',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 2,
          label: 'Full time',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 3,
          label: 'Full time',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 4,
          label: 'Full time',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 5,
          label: 'Full time',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 6,
          label: 'Part time',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 7,
          label: 'Part time',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 8,
          label: 'Part time',
          value: Math.floor(Math.random() * 11),
        },
      ],
      ageNumber: [
        {
          key: 1,
          label: 'Tuổi 18-20',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 2,
          label: 'Tuổi 18-20',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 3,
          label: 'Tuổi 18-20',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 4,
          label: 'Tuổi 20-30',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 5,
          label: 'Tuổi 20-30',
          value: Math.floor(Math.random() * 11),
        },
      ],
      employeeNumber: [
        {
          key: 1,
          label: 'Nam',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 2,
          label: 'Nam',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 3,
          label: 'Nam',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 4,
          label: 'Nữ',
          value: 1,
        },
        {
          key: 5,
          label: 'Nữ',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 6,
          label: 'Nữ',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 7,
          label: 'Nữ',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 8,
          label: 'Nữ',
          value: Math.floor(Math.random() * 11),
        },
        {
          key: 9,
          label: 'Nữ',
          value: Math.floor(Math.random() * 11),
        },
      ],
    }
  },
}
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.box-card__header-text {
  font-weight: 600;
  font-size: 16px;
  color: #1e90ff;
}
.clearfix {
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 2.25rem;
  font-family: 'Roboto', sans-serif;
}
</style>
