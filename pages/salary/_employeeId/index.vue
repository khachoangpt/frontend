<template>
  <div class="personnel">
    <div class="statusPaidLeave">
      <label> Truong Tuan Khang - HE141566 </label>
      <br />
      <label> BA </label>
    </div>

    <div class="content">
      <el-form ref="form" label-position="top" label-width="120px">
        <div class="col_1">
          <el-row :gutter="40">
            <div class="actual_point">
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item name="1">
                  <template slot="title">
                    <b style="">Actual Point</b>
                  </template>
                  <div class="block">
                    <h4>Actual Working Hours:</h4>
                    <h4>Unpaid Leave Hours:</h4>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-row>
          <el-row :gutter="40">
            <div class="ot_point">
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item name="2">
                  <template slot="title">
                    <b style="">OT Point</b>
                  </template>

                  <div class="col_status">
                    <el-col :span="24">
                      <div class="lb_status">
                        <h4>In week:</h4>
                        <div class="block">
                          <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="Pick a date"
                            default-value="2010-10-01"
                          >
                          </el-date-picker>
                        </div>
                      </div>
                    </el-col>
                  </div>
                  <div class="col_status">
                    <el-col :span="24">
                      <div class="lb_status">
                        <h4>Weeken:</h4>
                        <div class="block">
                          <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="Pick a date"
                            default-value="2010-10-01"
                          >
                          </el-date-picker>
                        </div>
                      </div>
                    </el-col>
                  </div>
                  <div class="col_status">
                    <el-col :span="24">
                      <div class="lb_status">
                        <h4>Holiday:</h4>
                        <div class="block">
                          <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="Pick a date"
                            default-value="2010-10-01"
                          >
                          </el-date-picker>
                        </div>
                      </div>
                    </el-col>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-row>

          <el-row :gutter="40">
            <div class="total_deduction">
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item name="3">
                  <template slot="title">
                    <b style="">Total Deduction</b>
                  </template>
                  <div class="block">
                    <h4>Working Time:</h4>
                    <h4>Working Late:</h4>
                    <h4>Leave Soon:</h4>
                    <h4>Company Asset:</h4>
                    <h4>Integrity:</h4>
                    <h4>Behaviour:</h4>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-row>

          <el-row :gutter="40">
            <div class="insurance_payment">
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item name="4">
                  <template slot="title">
                    <b style="">Insurance Payment</b>
                  </template>
                  <div class="block">
                    <h4>Health Insurance (1.5%):</h4>
                    <h4>Social Insurance (8%):</h4>
                    <h4>Unemployment Insurance (1%):</h4>
                    <h4>Pension Insurance (8%):</h4>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-row>

          <el-row :gutter="40">
            <div class="tax_payment">
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item name="5">
                  <template slot="title">
                    <b style="">Tax Payment</b>
                  </template>
                  <div class="block">
                    <h4>VN Progressive (By law):</h4>
                    <h4>Fixed Percentage Tax (10%):</h4>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-row>

          <el-row :gutter="40">
            <div class="bonus">
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item name="6">
                  <template slot="title">
                    <b style="">Bonus</b>
                  </template>
                  <div class="block">
                    <h4>Project Bonus:</h4>
                    <h4>Reward Bonus:</h4>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-row>

          <el-row :gutter="40">
            <div class="advances">
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item name="7">
                  <template slot="title">
                    <b style="">Advances</b>
                  </template>
                  <div class="block">
                    <h4>Advances:</h4>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-row>

          <el-row :gutter="40">
            <div class="actual_income">
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item name="8">
                  <template slot="title">
                    <b style="">Actual Income</b>
                  </template>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-row>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonnelPage',
  layout: 'main',
  data() {
    return {
      activeNames: [''],
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

  methods: {
    handleChange(val) {
      console.log(val)
    },
  },
}
</script>

<style>
.block {
  padding-left: 30px;
}

.content {
  padding: 20px;
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
</style>
