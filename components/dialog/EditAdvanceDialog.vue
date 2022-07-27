<template>
  <el-dialog
    class="edit-deduction-dialog"
    :visible.sync="editAdvanceDialogVisible"
    width="30%"
    center
    :before-close="closeDialog"
  >
    <template slot="title">
      <div class="dialog-title">Sửa khấu trừ</div>
    </template>
    <el-form
      ref="advanceForm"
      :rules="rules"
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
      <el-form-item label="Loại khấu trừ" prop="deductionType">
        <el-select
          v-model="advanceForm.deductionTypeId"
          class="deduction-dialog__input"
        >
          <el-option label="Đi làm muộn" value="1"></el-option>
          <el-option label="Về sớm" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Số tiền" prop="value">
        <el-input
          v-model.trim.number="advanceForm.value"
          class="deduction-dialog__input"
        ></el-input>
      </el-form-item>
      <el-form-item label="Ghi chú" prop="description">
        <el-input
          v-model="advanceForm.description"
          type="textarea"
          class="deduction-dialog__input"
          :rows="3"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">Đóng</el-button>
      <el-button type="primary" @click="editAdvance">Xác nhận</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'EditAdvanceDialog',
  data() {
    return {
      advanceForm: {
        deductionSalaryId: this.$route.params.employeeId,
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
    ...mapGetters('salary', ['editAdvanceDialogVisible']),
  },

  methods: {
    ...mapMutations('salary', ['setEditAdvanceDialogVisible']),

    closeDialog() {
      this.setEditAdvanceDialogVisible(false)
    },

    editAdvance() {},
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
