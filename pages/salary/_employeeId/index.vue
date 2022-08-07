<template>
  <div>
    <div class="salary-detail__header">
      <div class="salary-detail__header-text">Chi tiết tiền lương</div>
    </div>

    <div class="salary-detail__content">
      <div class="salary-detail__content-head">
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
        <div>
          <span class="salary-status__label">Trạng thái:</span>
          <span :class="'salary-status__' + salaryDetail.salaryStatus">
            {{ salaryDetail.salaryStatus }}
          </span>
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
                      class="salary-detail__edit-icon el-icon-edit-outline"
                    ></i>
                  </div>
                  <div class="salary-detail__actual-point">
                    <h3>
                      Unpaid Leave Hours:
                      <span>2 hours</span>
                    </h3>
                    <i
                      class="salary-detail__edit-icon el-icon-edit-outline"
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
                  <div class="salary-detail__working-time">
                    <h3
                      v-for="(deduction, index) in salaryDetail
                        .deductionSalaryResponseList
                        .deductionSalaryResponseList"
                      :key="'deduction' + index"
                      class="salary-detail__flex"
                    >
                      <span class="salary-detail__date-deduction">
                        {{ deduction.date }}
                      </span>
                      <span>
                        {{ deduction.deduction_name }} (-{{
                          new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(deduction.value)
                        }}
                        )
                      </span>
                      <div>
                        <i
                          class="salary-detail__edit-icon el-icon-edit-outline"
                          @click="openEditDeductionDialog(deduction)"
                        ></i>
                        <i
                          class="salary-detail__delete-icon el-icon-delete"
                          @click="
                            confirmDeleteDeduction(deduction.deduction_id)
                          "
                        ></i>
                      </div>
                    </h3>
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
                      <span class="salary-detail__date-deduction">
                        {{ advance.date }}
                      </span>
                      <span>
                        {{
                          new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(advance.value)
                        }}
                      </span>
                      <div>
                        <i
                          class="salary-detail__edit-icon el-icon-edit-outline"
                          @click="openEditAdvanceDialog(advance)"
                        ></i>
                        <i
                          class="salary-detail__delete-icon el-icon-delete"
                          @click="confirmDeleteAdvance(advance.advances_id)"
                        ></i>
                      </div>
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
                    {{ tax.tax_name }}({{ tax.tax_value }}%): {{ tax.value }}
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
                    }}%):
                    {{
                      new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(insurance.value)
                    }}
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
                    <span class="salary-detail__date-deduction">
                      {{ bonus.date }}
                    </span>
                    <span>
                      {{
                        new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(bonus.value)
                      }}</span
                    >
                    <div>
                      <i
                        class="salary-detail__edit-icon el-icon-edit-outline"
                        @click="openEditBonusDialog(bonus)"
                      ></i>
                      <i
                        class="salary-detail__delete-icon el-icon-delete"
                        @click="confirmDeleteBonus(bonus.bonus_id)"
                      ></i>
                    </div>
                  </h3>
                </div>
              </el-collapse-item>
              <el-collapse-item name="8">
                <template slot="title">
                  <span class="salary-detail-content__detail">Allowance</span>
                </template>
                <div class="salary-detail-content__sub-detail">
                  <h3
                    v-for="(allowance, index) in salaryDetail
                      .employeeAllowanceResponseList
                      .employeeAllowanceResponseList"
                    :key="'allowance' + index"
                    class="salary-detail__flex"
                  >
                    <span>
                      {{ allowance.allowance_name }}
                    </span>
                    <span>
                      {{
                        new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(allowance.value)
                      }}</span
                    >
                    <div>
                      <i
                        class="salary-detail__edit-icon el-icon-edit-outline"
                        @click="openEditAllowanceDialog(allowance)"
                      ></i>
                      <i
                        class="salary-detail__delete-icon el-icon-delete"
                        @click="
                          confirmDeleteAllowance(
                            allowance.employee_allowance_id
                          )
                        "
                      ></i>
                    </div>
                  </h3>
                </div>
              </el-collapse-item>
              <p class="salary-detail-content__detail">
                Actual Income:
                <span class="salary-detail__actual-income">{{
                  new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(salaryDetail.final_salary)
                }}</span>
              </p>
            </el-collapse>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="salary-detail__actions">
      <el-button
        v-if="isShowCheck && isEnoughLevelApprove === 'False'"
        size="medium"
        type="primary"
        @click="handleClickCheckSalary"
      >
        Chuyển tiếp
      </el-button>
      <el-button
        v-if="isShowReject"
        size="medium"
        type="danger"
        @click="handleClickRejectSalary"
      >
        Từ chối
      </el-button>
      <el-button
        v-if="isShowApprove && isEnoughLevelApprove === 'True'"
        size="medium"
        type="success"
        @click="approveSalary"
      >
        Chốt bảng lương
      </el-button>
    </div>
    <el-dialog
      class="edit-deduction-dialog"
      :visible.sync="editDeductionDialogVisible"
      width="30%"
      center
      :before-close="closeDialogDeduction"
    >
      <template slot="title">
        <div class="dialog-title">Sửa khấu trừ</div>
      </template>
      <el-form
        ref="deductionForm"
        :rules="rules"
        :model="deductionForm"
        label-width="120px"
      >
        <el-form-item label="Ngày" prop="date">
          <el-date-picker
            v-model="deductionForm.date"
            type="date"
            placeholder="Chọn một ngày"
            class="deduction-dialog__input"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="Loại khấu trừ" prop="deduction">
          <el-select
            v-model="deductionForm.deductionTypeId"
            class="deduction-dialog__input"
          >
            <el-option
              :label="$i18n.t('salary.deductionDialog[\'Work Late\']')"
              :value="1"
            ></el-option>
            <el-option
              :label="$i18n.t('salary.deductionDialog[\'Leave Soon\']')"
              :value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Số tiền" prop="value">
          <el-input
            v-model.trim.number="deductionForm.value"
            class="deduction-dialog__input"
          ></el-input>
        </el-form-item>
        <el-form-item label="Chi tiết" prop="description">
          <el-input
            v-model="deductionForm.description"
            type="textarea"
            class="deduction-dialog__input"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogDeduction">Đóng</el-button>
        <el-button type="primary" @click="submitForm('deductionForm')">
          Xác nhận
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="edit-deduction-dialog"
      :visible.sync="editAdvanceDialogVisible"
      width="30%"
      center
      :before-close="closeDialogAdvance"
    >
      <template slot="title">
        <div class="dialog-title">Sửa tạm ứng</div>
      </template>
      <el-form
        ref="advanceForm"
        :rules="advanceRules"
        :model="advanceForm"
        label-width="120px"
      >
        <el-form-item label="Ngày" prop="date">
          <el-date-picker
            v-model="advanceForm.date"
            type="date"
            placeholder="Chọn một ngày"
            class="deduction-dialog__input"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="Số tiền" prop="value">
          <el-input
            v-model.trim.number="advanceForm.value"
            class="deduction-dialog__input"
          ></el-input>
        </el-form-item>
        <el-form-item label="Chi tiết" prop="description">
          <el-input
            v-model="advanceForm.description"
            type="textarea"
            class="deduction-dialog__input"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogAdvance">Đóng</el-button>
        <el-button type="primary" @click="submitForm('advanceForm')">
          Xác nhận
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="edit-deduction-dialog"
      :visible.sync="editBonusDialogVisible"
      width="30%"
      center
      :before-close="closeDialogBonus"
    >
      <template slot="title">
        <div class="dialog-title">Sửa tiền thưởng</div>
      </template>
      <el-form
        ref="bonusForm"
        :rules="rules"
        :model="bonusForm"
        label-width="120px"
      >
        <el-form-item label="Ngày" prop="date">
          <el-date-picker
            v-model="bonusForm.date"
            type="date"
            placeholder="Chọn một ngày"
            class="deduction-dialog__input"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="Loại tiền thưởng" prop="bonus">
          <el-select
            v-model="bonusForm.bonusTypeId"
            class="deduction-dialog__input"
          >
            <el-option
              :label="$i18n.t('salary.deductionDialog[\'Work Late\']')"
              :value="1"
            ></el-option>
            <el-option
              :label="$i18n.t('salary.deductionDialog[\'Leave Soon\']')"
              :value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Số tiền" prop="value">
          <el-input
            v-model.trim.number="bonusForm.value"
            class="deduction-dialog__input"
          ></el-input>
        </el-form-item>
        <el-form-item label="Chi tiết" prop="description">
          <el-input
            v-model="bonusForm.description"
            type="textarea"
            class="deduction-dialog__input"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogBonus">Đóng</el-button>
        <el-button type="primary" @click="submitForm('bonusForm')">
          Xác nhận
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'PersonnelPage',
  layout: 'main',

  data() {
    return {
      activeNames: [],
      deductionForm: {
        deductionSalaryId: '',
        value: '',
        description: '',
        date: '',
        deductionTypeId: '',
      },
      advanceForm: {
        advanceId: '',
        value: '',
        description: '',
        date: '',
      },
      bonusForm: {
        bonusSalaryId: '',
        value: '',
        description: '',
        date: '',
        bonusTypeId: '',
      },
      rules: {
        date: [
          {
            required: true,
            message: 'Ngày không được để trống',
            trigger: 'blur',
          },
        ],
        value: [
          {
            required: true,
            message: 'Số tiền không được để trống',
            trigger: 'blur',
          },
          { type: 'number', message: 'Nhập vào một số' },
        ],
        description: [
          {
            required: true,
            message: 'Chi tiết không được để trống',
            trigger: 'blur',
          },
        ],
      },

      bonusRules: {
        date: [
          {
            required: true,
            message: 'Ngày không được để trống',
            trigger: 'blur',
          },
        ],
        value: [
          {
            required: true,
            message: 'Số tiền không được để trống',
            trigger: 'blur',
          },
          { type: 'number', message: 'Nhập vào một số' },
        ],
        description: [
          {
            required: true,
            message: 'Chi tiết không được để trống',
            trigger: 'blur',
          },
        ],
      },

      advanceRules: {
        date: [
          {
            required: true,
            message: 'Ngày không được để trống',
            trigger: 'blur',
          },
        ],
        value: [
          {
            required: true,
            message: 'Số tiền không được để trống',
            trigger: 'blur',
          },
          { type: 'number', message: 'Nhập vào một số' },
        ],
        description: [
          {
            required: true,
            message: 'Chi tiết không được để trống',
            trigger: 'blur',
          },
        ],
      },
      isShowCheck: true,
      isShowReject: true,
      isShowApprove: true,
    }
  },

  computed: {
    ...mapGetters('auth', ['id']),
    ...mapGetters('user', ['personnelDetail']),
    ...mapGetters('salary', [
      'salaryDetail',
      'editDeductionDialogVisible',
      'editAdvanceDialogVisible',
      'editBonusDialogVisible',
      'isEnoughLevelApprove',
    ]),
  },

  async mounted() {
    await this.getSalaryDetail(this.$route.params.employeeId)
    if (this.personnelDetail.employee_id === this.id) {
      this.isShowCheck = false
      this.isShowReject = false
      this.isShowApprove = false
    }
    if (this.salaryDetail.salaryStatus === 'REJECTED') {
      this.isShowCheck = true
      this.isShowReject = false
    }
    if (this.salaryDetail.salaryStatus === 'APPROVED') {
      this.isShowApprove = false
      this.isShowCheck = false
      this.isShowReject = false
    }
    if (this.salaryDetail.salaryStatus === 'PENDING') {
      this.isShowCheck = true
      this.isShowReject = true
    }
  },

  methods: {
    ...mapActions('salary', [
      'getSalaryDetail',
      'editDeduction',
      'deleteDeduction',
      'editAdvance',
      'deleteAdvance',
      'editBonus',
      'deleteBonus',
    ]),
    ...mapMutations('salary', [
      'setEditDeductionDialogVisible',
      'setEditAdvanceDialogVisible',
      'setEditBonusDialogVisible',
    ]),
    handleChange(val) {},

    async openEditDeductionDialog(data) {
      this.deductionForm.deductionSalaryId = data.deduction_id
      this.deductionForm.value = data.value
      this.deductionForm.description = data.description
      this.deductionForm.date = data.date
      this.deductionForm.deductionTypeId = data.deduction_name
      await this.setEditDeductionDialogVisible(true)
    },

    async openEditAdvanceDialog(data) {
      this.advanceForm.advanceId = data.advances_id
      this.advanceForm.value = data.value
      this.advanceForm.description = data.description
      this.advanceForm.date = data.date
      await this.setEditAdvanceDialogVisible(true)
    },

    async openEditBonusDialog(data) {
      this.bonusForm.bonusSalaryId = data.bonus_id
      this.bonusForm.value = data.value
      this.bonusForm.description = data.description
      this.bonusForm.date = data.date
      this.bonusForm.bonusTypeId = data.bonus_name
      await this.setEditBonusDialogVisible(true)
    },

    confirmDeleteAdvance(data) {
      this.$confirm(
        'Bạn có chắc chắn muốn xóa tạm ứng này không?',
        'Cảnh báo',
        {
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Đóng',
          type: 'warning',
        }
      )
        .then(() => {
          this.deleteAdvance(data)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    },

    confirmDeleteDeduction(data) {
      this.$confirm(
        'Bạn có chắc chắn muốn xóa khấu trừ này không?',
        'Cảnh báo',
        {
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Đóng',
          type: 'warning',
        }
      )
        .then(() => {
          this.deleteDeduction(data)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    },

    confirmDeleteBonus(data) {
      this.$confirm(
        'Bạn có chắc chắn muốn xóa tiền thưởng này không?',
        'Cảnh báo',
        {
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Đóng',
          type: 'warning',
        }
      )
        .then(() => {
          this.deleteBonus(data)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    },

    closeDialogDeduction() {
      this.setEditDeductionDialogVisible(false)
    },

    closeDialogAdvance() {
      this.setEditAdvanceDialogVisible(false)
    },

    closeDialogBonus() {
      this.setEditBonusDialogVisible(false)
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName === 'advanceForm') {
            this.editAdvance(this.advanceForm)
          } else if (formName === 'deductionForm') {
            this.editDeduction(this.deductionForm)
          } else if (formName === 'bonusForm') {
            this.editBonus(this.bonusForm)
          }
        } else {
          return false
        }
      })
    },

    approveSalary() {},

    handleClickRejectSalary() {
      this.$prompt('Nhập lý do từ chối:', 'Từ chối bảng lương', {
        confirmButtonText: 'Xong',
        cancelButtonText: 'Đóng',
      })
        .then(({ value }) => {
          this.rejectSalary(value)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled',
          })
        })
    },

    handleClickCheckSalary() {
      this.checkSalary()
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

.salary-detail__edit-icon {
  font-size: 20px;
  font-weight: 600;
  color: #4d77ff;
  cursor: pointer;
  padding: 8px;
}

.salary-detail__edit-icon:hover {
  background-color: rgb(216, 216, 216);
  border-radius: 50%;
}

.salary-detail__delete-icon {
  font-size: 20px;
  font-weight: 600;
  color: #f56c6c;
  cursor: pointer;
  padding: 8px;
}

.salary-detail__delete-icon:hover {
  background-color: rgb(216, 216, 216);
  border-radius: 50%;
}

.salary-detail__date-deduction {
  background-color: #4d77ff;
  color: #fff;
  padding: 0px 4px;
  border-radius: 3px;
  margin-right: 8px;
}

.salary-detail__flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.edit-deduction-dialog .el-dialog {
  border-radius: 10px;
}

.dialog-title {
  font-size: 23px;
  font-weight: 600;
  padding-bottom: 8px;
  border-bottom: 2px solid #ccc;
}

.deduction-dialog__input {
  width: 100% !important;
}

.salary-status__PENDING {
  background-color: #e6a23c;
  color: #fff;
  padding: 6px;
  border-radius: 5px;
}

.salary-status__APPROVED {
  background-color: #67c23a;
  color: #fff;
  padding: 6px;
  border-radius: 5px;
}

.salary-status__REJECTED {
  background-color: #f56c6c;
  color: #fff;
  padding: 6px;
  border-radius: 5px;
}

.salary-detail__content-head {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.salary-status__label {
  font-weight: 600;
}

.salary-detail__actions {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10vh;
}
</style>
