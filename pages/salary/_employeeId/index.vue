<template>
  <div
    v-loading.fullscreen.lock="loadingSalaryEmployee"
    element-loading-background="rgba(0, 0, 0, 0.2)"
    type="primary"
  >
    <div class="salary-detail__header">
      <div class="salary-detail__header-text">
        {{ $i18n.t('payrollDetail') }}
      </div>
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
          <span class="salary-status__label"
            >{{ $i18n.t('salary.status') }}:</span
          >
          <span :class="'salary-status__' + salaryDetail.salaryStatus">
            {{ salaryDetail.salaryStatus }}
          </span>
          <div
            v-if="
              salaryDetail.comment !== null &&
              salaryDetail.salaryStatus !== 'APPROVED'
            "
            class="reject-salary-comment"
            @click="openReviewComment"
          >
            {{ $i18n.t('request.dialog.rejectComment') }}
          </div>
        </div>
      </div>
      <el-row class="salary-detail__row">
        <el-col :span="16" :offset="4">
          <el-card>
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item name="1">
                <template slot="title">
                  <span class="salary-detail-content__detail">
                    Actual Point: {{ salaryDetail.standardPoint }}
                  </span>
                </template>
                <div class="salary-detail-content__sub-detail">
                  <div class="salary-detail__actual-point">
                    <h3>
                      Actual Working Days:
                      <span>{{
                        salaryDetail.pointResponses.actual_working_day
                      }}</span>
                    </h3>
                  </div>
                  <div class="salary-detail__actual-point">
                    <h3>
                      Unpaid Leave Days:
                      <span>{{
                        salaryDetail.pointResponses.unpaid_leave_day
                      }}</span>
                    </h3>
                  </div>
                  <div class="salary-detail__actual-point">
                    <h3>
                      Paid Leave Days:
                      <span>{{
                        salaryDetail.pointResponses.paid_leave_day
                      }}</span>
                    </h3>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item name="2">
                <template slot="title">
                  <span class="salary-detail-content__detail"
                    >OT Point:
                    {{ salaryDetail.otResponseList.totalOTPoint }}</span
                  >
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
                    Total Deduction:
                    {{
                      new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(salaryDetail.deductionSalaryResponseList.total)
                    }}
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
                  <span class="salary-detail-content__detail"
                    >Advances:
                    {{
                      new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(salaryDetail.advanceSalaryResponseList.total)
                    }}</span
                  >
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
              <el-collapse-item name="5">
                <template slot="title">
                  <span class="salary-detail-content__detail"
                    >Tax Payment:
                    {{
                      new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(salaryDetail.employeeTaxResponseList.total)
                    }}</span
                  >
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
                    Insurance Payment:
                    {{
                      new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(
                        salaryDetail.employeeInsuranceResponseList.total
                      )
                    }}
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
                  <span class="salary-detail-content__detail"
                    >Bonus:
                    {{
                      new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(salaryDetail.bonusSalaryResponseList.total)
                    }}</span
                  >
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
                  <span class="salary-detail-content__detail"
                    >Allowance:
                    {{
                      new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(
                        salaryDetail.employeeAllowanceResponseList.total
                      )
                    }}</span
                  >
                </template>
                <div class="salary-detail-content__sub-detail">
                  <h3
                    v-for="(allowance, index) in salaryDetail
                      .employeeAllowanceResponseList
                      .employeeAllowanceResponseList"
                    :key="'allowance' + index"
                  >
                    <span> {{ allowance.allowance_name }}: </span>
                    <span>
                      {{
                        new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(allowance.value)
                      }}</span
                    >
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
        {{ $i18n.t('salary.forward') }}
      </el-button>
      <el-button
        v-if="isShowReject && isEnoughLevelApprove === 'True'"
        size="medium"
        type="danger"
        @click="handleClickRejectSalary"
      >
        {{ $i18n.t('salary.reject') }}
      </el-button>
      <el-button
        v-if="isShowApprove && isEnoughLevelApprove === 'True'"
        size="medium"
        type="success"
        @click="handleClickApproveSalary"
      >
        {{ $i18n.t('salary.approve') }}
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
        <div class="dialog-title">
          {{ $i18n.t('salary.deductionDialog.editDeduction') }}
        </div>
      </template>
      <el-form
        ref="deductionForm"
        :rules="rules"
        :model="deductionForm"
        label-width="120px"
      >
        <el-form-item
          :label="$i18n.t('salary.deductionDialog.date')"
          prop="date"
        >
          <el-date-picker
            v-model="deductionForm.date"
            type="date"
            :placeholder="$i18n.t('salary.deductionDialog.chooseDay')"
            class="deduction-dialog__input"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          :label="$i18n.t('salary.deductionDialog.deductionType')"
          prop="deduction"
        >
          <el-select
            v-model="deductionForm.deductionTypeId"
            class="deduction-dialog__input"
          >
            <el-option
              :label="$i18n.t('salary.deductionDialog[\'Work late\']')"
              value="Work late"
            ></el-option>
            <el-option
              :label="$i18n.t('salary.deductionDialog[\'Leave soon\']')"
              value="Leave soon"
            ></el-option>
            <el-option
              :label="
                $i18n.t('salary.deductionDialog[\'Business responsibility\']')
              "
              value="Business responsibility"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$i18n.t('salary.deductionDialog.amount')"
          prop="value"
        >
          <el-input
            v-model.trim.number="deductionForm.value"
            class="deduction-dialog__input"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$i18n.t('salary.deductionDialog.description')"
          prop="description"
        >
          <el-input
            v-model="deductionForm.description"
            type="textarea"
            class="deduction-dialog__input"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogDeduction">{{
          $i18n.t('salary.deductionDialog.close')
        }}</el-button>
        <el-button type="primary" @click="submitForm('deductionForm')">
          {{ $i18n.t('salary.deductionDialog.confirm') }}
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
        <div class="dialog-title">
          {{ $i18n.t('salary.advanceDialog.editAdvance') }}
        </div>
      </template>
      <el-form
        ref="advanceForm"
        :rules="advanceRules"
        :model="advanceForm"
        label-width="120px"
      >
        <el-form-item
          :label="$i18n.t('salary.deductionDialog.date')"
          prop="date"
        >
          <el-date-picker
            v-model="advanceForm.date"
            type="date"
            :placeholder="$i18n.t('salary.deductionDialog.chooseDay')"
            class="deduction-dialog__input"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          :label="$i18n.t('salary.deductionDialog.amount')"
          prop="value"
        >
          <el-input
            v-model.trim.number="advanceForm.value"
            class="deduction-dialog__input"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$i18n.t('salary.deductionDialog.description')"
          prop="description"
        >
          <el-input
            v-model="advanceForm.description"
            type="textarea"
            class="deduction-dialog__input"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogAdvance">{{
          $i18n.t('salary.deductionDialog.close')
        }}</el-button>
        <el-button type="primary" @click="submitForm('advanceForm')">
          {{ $i18n.t('salary.deductionDialog.confirm') }}
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
        <div class="dialog-title">
          {{ $i18n.t('salary.bonusDialog.editBonus') }}
        </div>
      </template>
      <el-form
        ref="bonusForm"
        :rules="rules"
        :model="bonusForm"
        label-width="120px"
      >
        <el-form-item
          :label="$i18n.t('salary.deductionDialog.date')"
          prop="date"
        >
          <el-date-picker
            v-model="bonusForm.date"
            type="date"
            :placeholder="$i18n.t('salary.deductionDialog.chooseDay')"
            class="deduction-dialog__input"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          :label="$i18n.t('salary.bonusDialog.bonusType')"
          prop="bonus"
        >
          <el-select
            v-model="bonusForm.bonusTypeId"
            class="deduction-dialog__input"
          >
            <el-option
              :label="$i18n.t('salary.bonusDialog[\'Project bonus\']')"
              value="Project bonus"
            ></el-option>
            <el-option
              :label="$i18n.t('salary.bonusDialog[\'Reward bonus\']')"
              value="Reward bonus"
            ></el-option>
            <el-option
              :label="$i18n.t('salary.bonusDialog[\'KPI bonus\']')"
              value="KPI bonus"
            ></el-option>
            <el-option
              :label="$i18n.t('salary.bonusDialog[\'Out source bonus\']')"
              value="Out source bonus"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$i18n.t('salary.deductionDialog.amount')"
          prop="value"
        >
          <el-input
            v-model.trim.number="bonusForm.value"
            class="deduction-dialog__input"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$i18n.t('salary.deductionDialog.description')"
          prop="description"
        >
          <el-input
            v-model="bonusForm.description"
            type="textarea"
            class="deduction-dialog__input"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogBonus">{{
          $i18n.t('salary.deductionDialog.close')
        }}</el-button>
        <el-button type="primary" @click="submitForm('bonusForm')">
          {{ $i18n.t('salary.deductionDialog.confirm') }}
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$i18n.t('salary.forwardPayroll')"
      :visible.sync="checkDialogVisible"
      top="30vh"
      width="30%"
      :before-close="closeDialog"
    >
      <div class="dialog-check-salary__label">
        {{ $i18n.t('salary.enterManagerForward') }}:
      </div>
      <el-autocomplete
        v-model="managerApprove"
        :clearable="true"
        :placeholder="$i18n.t('salary.manager')"
        :fetch-suggestions="querySearchManager"
        @select="handleChangeManager"
        @clear="handleChangeManager"
      ></el-autocomplete>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">{{
          $i18n.t('salary.deductionDialog.close')
        }}</el-button>
        <el-button size="small" type="primary" @click="submitCheckSalary">
          {{ $i18n.t('salary.deductionDialog.confirm') }}
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
      loadingSalaryEmployee: true,
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
            message: this.$i18n.t('salary.deductionDialog.dateValidate'),
            trigger: 'blur',
          },
        ],
        value: [
          {
            required: true,
            message: this.$i18n.t('salary.deductionDialog.amountValidate'),
            trigger: 'blur',
          },
          {
            type: 'number',
            message: this.$i18n.t('salary.deductionDialog.numberValidate'),
          },
        ],
        description: [
          {
            required: true,
            message: 'Description is not blank',
            trigger: 'blur',
          },
        ],
      },

      bonusRules: {
        date: [
          {
            required: true,
            message: this.$i18n.t('salary.deductionDialog.dateValidate'),
            trigger: 'blur',
          },
        ],
        value: [
          {
            required: true,
            message: this.$i18n.t('salary.deductionDialog.amountValidate'),
            trigger: 'blur',
          },
          {
            type: 'number',
            message: this.$i18n.t('salary.deductionDialog.numberValidate'),
          },
        ],
        description: [
          {
            required: true,
            message: 'Description is not blank',
            trigger: 'blur',
          },
        ],
      },

      advanceRules: {
        date: [
          {
            required: true,
            message: this.$i18n.t('salary.deductionDialog.dateValidate'),
            trigger: 'blur',
          },
        ],
        value: [
          {
            required: true,
            message: this.$i18n.t('salary.deductionDialog.amountValidate'),
            trigger: 'blur',
          },
          {
            type: 'number',
            message: this.$i18n.t('salary.deductionDialog.numberValidate'),
          },
        ],
        description: [
          {
            required: true,
            message: this.$i18n.t('salary.deductionDialog.descriptionValidate'),
            trigger: 'blur',
          },
        ],
      },
      isShowCheck: true,
      isShowReject: true,
      isShowApprove: true,
      managerApprove: '',
    }
  },

  computed: {
    ...mapGetters('auth', ['id', 'roles']),
    ...mapGetters('user', ['personnelDetail']),
    ...mapGetters('salary', [
      'salaryDetail',
      'editDeductionDialogVisible',
      'editAdvanceDialogVisible',
      'editBonusDialogVisible',
      'isEnoughLevelApprove',
      'searchManagerText',
      'checkDialogVisible',
      'listManagerOfArea',
    ]),
  },

  async mounted() {
    await this.getListSalary(1)
    await this.getListDeductionType()
    await this.getListBonusType()
    await this.getSalaryDetail(this.$route.params.employeeId)
    this.isShowCheck = true
    this.isShowReject = true
    this.isShowApprove = true
    if (this.personnelDetail.employee_id === this.id) {
      this.isShowCheck = false
      this.isShowReject = false
      this.isShowApprove = false
    }
    if (this.salaryDetail.salaryStatus === 'REJECTED') {
      this.isShowCheck = true
      this.isShowReject = false
      this.isShowApprove = true
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
    this.loadingSalaryEmployee = false
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
      'getManagerOfArea',
      'checkSalary',
      'rejectSalary',
      'approveSalary',
      'getListDeductionType',
      'getListBonusType',
      'getListSalary',
    ]),
    ...mapMutations('salary', [
      'setEditDeductionDialogVisible',
      'setEditAdvanceDialogVisible',
      'setEditBonusDialogVisible',
      'setCheckDialogVisible',
      'setSearchManagerText',
      'setListSalaryId',
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
        this.$i18n.t('salary.confirmDeleteAdvance'),
        this.$i18n.t('salary.warning'),
        {
          confirmButtonText: this.$i18n.t('salary.remove'),
          cancelButtonText: this.$i18n.t('salary.close'),
          type: 'warning',
        }
      )
        .then(() => {
          this.deleteAdvance(data)
        })
        .catch(() => {})
    },

    confirmDeleteDeduction(data) {
      this.$confirm(
        this.$i18n.t('salary.confirmDeleteDeduction'),
        this.$i18n.t('salary.warning'),
        {
          confirmButtonText: this.$i18n.t('salary.remove'),
          cancelButtonText: this.$i18n.t('salary.close'),
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
        this.$i18n.t('salary.confirmDeleteBonus'),
        this.$i18n.t('salary.warning'),
        {
          confirmButtonText: this.$i18n.t('salary.remove'),
          cancelButtonText: this.$i18n.t('salary.close'),
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

    async closeDialog() {
      await this.setCheckDialogVisible(false)
    },

    async submitForm(formName) {
      await this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (formName === 'advanceForm') {
            await this.editAdvance(this.advanceForm)
          } else if (formName === 'deductionForm') {
            await this.editDeduction(this.deductionForm)
          } else if (formName === 'bonusForm') {
            await this.editBonus(this.bonusForm)
          }
          this.isShowCheck = true
          this.isShowReject = true
          this.isShowApprove = true
          if (this.personnelDetail.employee_id === this.id) {
            this.isShowCheck = false
            this.isShowReject = false
            this.isShowApprove = false
          }
          if (this.salaryDetail.salaryStatus === 'REJECTED') {
            this.isShowCheck = true
            this.isShowReject = false
            this.isShowApprove = true
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
        } else {
          return false
        }
      })
    },

    handleClickRejectSalary() {
      this.$prompt(
        this.$i18n.t('salary.enterReason'),
        this.$i18n.t('salary.rejectPayroll'),
        {
          confirmButtonText: this.$i18n.t('salary.deductionDialog.confirm'),
          cancelButtonText: this.$i18n.t('salary.deductionDialog.close'),
        }
      )
        .then(async ({ value }) => {
          await this.setListSalaryId([this.salaryDetail.salary_monthly_id])
          await this.rejectSalary(value)
        })
        .catch(() => {})
    },

    async handleClickCheckSalary() {
      await this.setCheckDialogVisible(true)
      await this.getManagerOfArea()
    },

    async openReviewComment() {
      let reason = ''
      if (this.salaryDetail.comment === null) {
        reason = 'No reason'
      } else {
        reason = this.salaryDetail.comment
      }
      await this.$alert(reason, this.$i18n.t('salary.reason'), {
        confirmButtonText: 'OK',
        callback: (action) => {},
      })
    },

    querySearchManager(queryString, cb) {
      const results = queryString
        ? this.listManagerOfArea.filter(this.createFilter(queryString))
        : this.listManagerOfArea
      cb(results)
    },

    createFilter(queryString) {
      return (link) => {
        return (
          this.removeMark(link.value.toLowerCase()).includes(
            this.removeMark(queryString.toLowerCase())
          ) === true
        )
      }
    },

    removeMark(str) {
      str = str.replace(/\s+/g, ' ')
      str = str.trim()
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      str = str.replace(/đ/g, 'd')
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
      str = str.replace(/Đ/g, 'D')
      return str
    },

    async handleChangeManager(data) {
      await this.setSearchManagerText(data)
    },

    async submitCheckSalary() {
      await this.setListSalaryId([this.salaryDetail.salary_monthly_id])
      await this.checkSalary()
    },

    async handleClickApproveSalary() {
      await this.setListSalaryId([this.salaryDetail.salary_monthly_id])
      await this.approveSalary()
      this.isShowCheck = true
      this.isShowReject = true
      this.isShowApprove = true
      if (this.personnelDetail.employee_id === this.id) {
        this.isShowCheck = false
        this.isShowReject = false
        this.isShowApprove = false
      }
      if (this.salaryDetail.salaryStatus === 'REJECTED') {
        this.isShowCheck = true
        this.isShowReject = false
        this.isShowApprove = true
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

.reject-salary-comment {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #f56c6c;
  text-decoration: underline;
  cursor: pointer;
}
</style>
