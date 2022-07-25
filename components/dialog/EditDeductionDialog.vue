<template>
  <el-dialog
    title="Sửa khấu trừ"
    class="edit-deduction-dialog"
    :visible.sync="editDeductionDialogVisible"
    width="30%"
    center
    :before-close="closeDialog"
  >
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
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="Loại khấu trừ" prop="deductionType">
        <el-select v-model="deductionForm.deductionTypeId">
          <el-option label="Đi làm muộn" value="shanghai"></el-option>
          <el-option label="Về sớm" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Số tiền" prop="value">
        <el-input v-model.trim.number="deductionForm.value"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">Đóng</el-button>
      <el-button type="primary" @click="editDeduction">Xác nhận</el-button>
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
        deductionType: [
          {
            required: true,
            message: 'Chọn một loại khấu trừ',
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
</style>
