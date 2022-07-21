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
                      <span>{{ salaryDetail.standardPoint }}</span>
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
                  <el-collapse-item
                    v-for="(ot, index) in salaryDetail.otResponseList
                      .otResponseList"
                    :key="'ot' + index"
                  >
                    <template slot="title">
                      <h3>
                        {{ ot.overtime_type }}: {{ ot.totalOTPointByType }}
                      </h3>
                    </template>
                    <div class="salary-detail__flex">
                      <h4
                        v-for="(overtime, i) in ot.otDetailResponseList"
                        :key="'overtime' + i"
                      >
                        <span
                          >From {{ overtime.start_time }} to
                          {{ overtime.end_time }}</span
                        >
                        <span class="salary-detail__date-deduction">
                          {{ overtime.date }}
                        </span>
                      </h4>
                    </div>
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
                    <h4
                      v-for="(deduction, index) in salaryDetail
                        .deductionSalaryResponseList
                        .deductionSalaryResponseList"
                      :key="'deduction' + index"
                      class="salary-detail__flex"
                    >
                      <span
                        >{{ deduction.deduction_name }} -
                        {{ deduction.value }}</span
                      >
                      <span class="salary-detail__date-deduction">
                        {{ deduction.date }}
                      </span>
                    </h4>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item name="4">
                <template slot="title">
                  <span class="salary-detail-content__detail">Advances</span>
                </template>
                <div class="salary-detail-content__sub-detail">
                  <div>
                    <h3
                      v-for="(advance, index) in salaryDetail
                        .advanceSalaryResponseList.advanceSalaryResponseList"
                      :key="'advance' + index"
                      class="salary-detail__flex"
                    >
                      <span> {{ advance.value }}</span>
                      <span class="salary-detail__date-deduction">
                        {{ advance.date }}
                      </span>
                    </h3>
                  </div>
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
                  <h3
                    v-for="(tax, index) in salaryDetail.employeeTaxResponseList
                      .employeeTaxResponseList"
                    :key="'tax' + index"
                  >
                    {{ tax.tax_name }}({{ tax.tax_value }}): {{ tax.value }}
                  </h3>
                </div>
              </el-collapse-item>
              <el-collapse-item name="6">
                <template slot="title">
                  <span class="salary-detail-content__detail">
                    Insurance Payment
                  </span>
                </template>
                <div class="salary-detail-content__sub-detail">
                  <h3
                    v-for="(insurance, index) in salaryDetail
                      .employeeInsuranceResponseList
                      .employeeInsuranceResponseList"
                    :key="'insurance' + index"
                  >
                    {{ insurance.insurance_name }}({{
                      insurance.insurance_value
                    }}%): {{ insurance.value }} $
                  </h3>
                </div>
              </el-collapse-item>
              <el-collapse-item name="7">
                <template slot="title">
                  <span class="salary-detail-content__detail">Bonus</span>
                </template>
                <div class="salary-detail-content__sub-detail">
                  <h3
                    v-for="(bonus, index) in salaryDetail
                      .bonusSalaryResponseList.bonusSalaryResponseList"
                    :key="'bonus' + index"
                    class="salary-detail__flex"
                  >
                    <span> {{ bonus.value }}</span>
                    <span class="salary-detail__date-deduction">
                      {{ bonus.date }}
                    </span>
                  </h3>
                </div>
              </el-collapse-item>
              <p class="salary-detail-content__detail">
                Actual Income:
                <span class="salary-detail__actual-income">{{
                  salaryDetail.final_salary
                }}</span>
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
    }
  },

  computed: {
    ...mapGetters('user', ['personnelDetail']),
    ...mapGetters('salary', ['salaryDetail']),
  },

  async beforeMount() {
    await this.getSalaryDetail(this.$route.params.employeeId)
  },

  methods: {
    ...mapActions('salary', ['getSalaryDetail']),
    handleChange(val) {},
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
  width: 70%;
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
