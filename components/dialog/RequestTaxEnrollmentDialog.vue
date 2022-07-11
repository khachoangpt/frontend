<template>
  <el-dialog
    title="Warning"
    :visible.sync="requestTaxEnrollmentDialogVisible"
    width="40%"
    center
    :before-close="closeDialog"
  >
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog"> Đóng </el-button>
      <el-button type="primary" @click="createRequestTaxEnrollment">
        Tạo yêu cầu
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'RequestTaxEnrollmentDialog',

  computed: {
    ...mapGetters('request', ['requestTaxEnrollmentDialogVisible']),
  },

  methods: {
    ...mapMutations('request', ['setRequestTaxEnrollmentDialogVisible']),

    closeDialog() {
      this.setRequestTaxEnrollmentDialogVisible(false)
    },

    createRequestTaxEnrollment() {
      this.setRequestTaxEnrollmentDialogVisible(false)
    },
  },
}
</script>

<style></style>
