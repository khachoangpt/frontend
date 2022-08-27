<template>
  <el-dialog
    class="edit-deduction-dialog"
    :visible.sync="editDeductionDialogVisible"
    width="30%"
    center
    :before-close="closeDialog"
  >
    <template slot="title">
      <div class="dialog-title">
        {{ $i18n.t('deductionDialog.editDeduction') }}
      </div>
    </template>
    <el-form
      ref="deductionForm"
      :rules="rules"
      :model="deductionForm"
      label-width="120px"
    >
      <el-form-item :label="$i18n.t('deductionDialog.date')" prop="date">
        <el-date-picker
          v-model="deductionForm.date"
          type="date"
          :placeholder="$i18n.t('datepicker.chooseDay')"
          class="deduction-dialog__input"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        :label="$i18n.t('datepicker.deductionType')"
        prop="deductionType"
      >
        <el-select
          v-model="deductionForm.deductionTypeId"
          class="deduction-dialog__input"
        >
          <el-option
            :label="$i18n.t('salary.deductionDialog[\'Work late\']')"
            value="1"
          ></el-option>
          <el-option
            :label="$i18n.t('salary.deductionDialog[\'Leave soon\']')"
            value="2"
          ></el-option>
          <el-option
            :label="
              $i18n.t('salary.deductionDialog[\'Business responsibility\']')
            "
            value="3"
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
      <el-form-item label="Ghi chú" prop="description">
        <el-input
          v-model="deductionForm.description"
          type="textarea"
          class="deduction-dialog__input"
          :rows="3"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">{{
        $i18n.t('salary.deductionDialog.close')
      }}</el-button>
      <el-button type="primary" @click="editDeduction">{{
        $i18n.t('salary.deductionDialog.confirm')
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'EditDeductionDialog',
  data() {
    return {
      deductionForm: {
        deductionSalaryId: '',
        value: '',
        description: '',
        date: '',
        deductionTypeId: '',
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
        deductionType: [
          {
            required: true,
            message: this.$i18n.t(
              'salary.deductionDialog.deductionTypeValidate'
            ),
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {
    ...mapGetters('salary', ['editDeductionDialogVisible']),
  },

  methods: {
    ...mapMutations('salary', ['setEditDeductionDialogVisible']),

    closeDialog() {
      this.setEditDeductionDialogVisible(false)
    },

    editDeduction() {},
  },
}
</script>

<style>
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
</style>
