<template>
  <div>
    <div class="salary-detail__header">
      <div class="salary-detail__header-text">Chi tiết tiền lương</div>
    </div>

    <div class="salary-detail__content">
      <div class="salary-detail__employee">
        <div
          class="salary-avatar__background"
          :style="{ backgroundImage: 'url(' + personnelDetail.avatar + ')' }"
        ></div>
        <div>
          <p class="salary-avatar__name">{{ personnelDetail.full_name }}</p>
          <p class="salary-avatar__role">{{ personnelDetail.grade }}</p>
        </div>
      </div>
      <el-row class="salary-detail__row">
        <el-col :span="9" :offset="1">
          <el-card>
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item name="1">
                <template slot="title">
                  <span class="salary-detail-content__detail">
                    Actual Point
                  </span>
                </template>
                <div class="salary-detail-content__sub-detail">
                  <div class="salary-detail__actual-point">
                    <h3>
                      Actual Working Hours:
                      <span>160 hours</span>
                    </h3>
                    <i
                      class="salary-detail__actual-point-icon el-icon-edit-outline"
                    ></i>
                  </div>
                  <div class="salary-detail__actual-point">
                    <h3>
                      Unpaid Leave Hours:
                      <span>2 hours</span>
                    </h3>
                    <i
                      class="salary-detail__actual-point-icon el-icon-edit-outline"
                    ></i>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item name="2">
                <template slot="title">
                  <span class="salary-detail-content__detail">OT Point</span>
                </template>
                <div class="salary-detail-content__sub-detail">
                  <el-collapse-item name="9">
                    <template slot="title">
                      <h3>In week: 1</h3>
                    </template>
                  </el-collapse-item>
                  <el-collapse-item name="10">
                    <template slot="title">
                      <h3>Weekend: 2</h3>
                    </template>
                  </el-collapse-item>
                  <el-collapse-item name="11">
                    <template slot="title">
                      <h3>Holiday: 2</h3>
                    </template>
                  </el-collapse-item>
                </div>
              </el-collapse-item>
              <el-collapse-item name="3">
                <template slot="title">
                  <span class="salary-detail-content__detail">
                    Total Deduction
                  </span>
                </template>
                <div class="salary-detail-content__sub-detail">
                  <h3>Working Time:</h3>
                  <div class="salary-detail__working-time">
                    <h4 class="salary-detail__flex">
                      <span>Working Late - 50.000</span>
                      <span class="salary-detail__date-deduction">
                        05-07-2022
                      </span>
                    </h4>
                    <h4 class="salary-detail__flex">
                      <span>Leave Soon - 50.000</span>
                      <span class="salary-detail__date-deduction">
                        05-07-2022
                      </span>
                    </h4>
                  </div>
                  <h3>Company Asset:</h3>
                  <h3>Integrity:</h3>
                  <h3>Behaviour:</h3>
                </div>
              </el-collapse-item>
              <el-collapse-item name="4">
                <template slot="title">
                  <span class="salary-detail-content__detail">Advances</span>
                </template>
                <div class="salary-detail-content__sub-detail">
                  <h3>Advances:</h3>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
        <el-col :span="9" :offset="4">
          <el-card>
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item name="5">
                <template slot="title">
                  <span class="salary-detail-content__detail">Tax Payment</span>
                </template>
                <div class="salary-detail-content__sub-detail">
                  <h3>VN Progressive (By law):</h3>
                  <h3>Fixed Percentage Tax (10%):</h3>
                </div>
              </el-collapse-item>
              <el-collapse-item name="6">
                <template slot="title">
                  <span class="salary-detail-content__detail">
                    Insurance Payment
                  </span>
                </template>
                <div class="salary-detail-content__sub-detail">
                  <h3>Health Insurance (1.5%):</h3>
                  <h3>Social Insurance (8%):</h3>
                  <h3>Unemployment Insurance (1%):</h3>
                  <h3>Pension Insurance (8%):</h3>
                </div>
              </el-collapse-item>
              <el-collapse-item name="7">
                <template slot="title">
                  <span class="salary-detail-content__detail">Bonus</span>
                </template>
                <div class="salary-detail-content__sub-detail">
                  <h3>Project Bonus:</h3>
                  <h3>Reward Bonus:</h3>
                </div>
              </el-collapse-item>
              <p class="salary-detail-content__detail">
                Actual Income:
                <span class="salary-detail__actual-income">12.000.000</span>
              </p>
            </el-collapse>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PersonnelPage',
  layout: 'main',
  data() {
    return {
      activeNames: [],
      isOpenModalDetailPayroll: false,
      searchText: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },

      value: '',
      value1: '',
      columns: [
        {
          label: 'Employee Id',
          field: 'empId',
        },
        {
          label: 'Employee Name',
          field: 'empName',
        },
        {
          label: 'Position',
          field: 'position',
        },
        {
          label: 'Standard Point',
          field: 'standardPoint',
        },
        {
          label: 'Actual Point',
          field: 'actualPoint',
        },
        {
          label: 'OT Point',
          field: 'OTPoint',
        },
        {
          label: 'Total Deduction',
          field: 'totalDeduction',
        },
        {
          label: 'Insurance Payment',
          field: 'insurancePayment',
        },
        {
          label: 'Tax Payment',
          field: 'taxPayment',
        },
        {
          label: 'Total Bonus',
          field: 'totalBonus',
        },
        {
          label: 'Advance',
          field: 'advance',
        },
        {
          label: 'Actual income',
          field: 'actualIncome',
        },
      ],
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
    handleChange(val) {
      console.log(val)
    },
  },
}
</script>

<style>
.salary-detail__header {
  display: flex;
  justify-content: space-between;
}

.salary-detail__header-text {
  font-weight: 600;
  font-size: 20px;
}

.salary-detail__content {
  margin-top: 16px;
}

.el-page-header__left::after {
  display: none;
}

.el-page-header__title {
  color: #4d77ff;
}

.el-icon-back {
  color: #4d77ff;
}

.salary-detail__row {
  margin-bottom: 20px;
}

.salary-detail-content__detail {
  font-size: 16px;
  font-weight: 600;
}

.salary-avatar__background {
  width: 56px;
  height: 56px;
  background-color: black;
  border-radius: 50%;
  border: 2px solid #000;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.salary-avatar__name {
  margin: 0 0 0 12px;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
}

.salary-avatar__role {
  color: #8ba9cb;
  font-size: 14px;
  margin: 8px 0 0 12px;
  line-height: 16px;
}

.salary-detail__employee {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.salary-detail-content__sub-detail {
  padding-left: 30px;
}

.salary-detail__actual-point {
  display: flex;
  align-items: center;
}

.salary-detail__actual-point-icon {
  font-size: 20px;
  font-weight: 600;
  margin-left: 12px;
  color: #4d77ff;
  cursor: pointer;
}

.salary-detail__date-deduction {
  background-color: #4d77ff;
  color: #fff;
  padding: 0px 4px;
  border-radius: 3px;
  margin-right: 8px;
}

.salary-detail__working-time {
  margin-left: 30px;
}

.salary-detail__flex {
  width: 60%;
  display: flex;
  justify-content: space-between;
}

.salary-detail__actual-income {
  font-size: 20px;
  margin-left: 8px;
  color: #4d77ff;
}

.col_status {
  display: flex;
}

.personnel__header {
  display: flex;
  justify-content: space-between;
}

.personnel__header-text {
  font-weight: 600;
  font-size: 20px;
}

.personnel__header-actions {
  display: flex;
}

.header-actions__search {
  width: 200px;
  margin-right: 12px;
}

.header-actions__working-status {
  margin-right: 12px;
  max-width: 200px;
}

.personnel-table {
  margin-top: 30px;
}

.el-collapse-item__arrow {
  font-weight: 600;
}
</style>
