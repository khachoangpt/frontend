<template>
  <el-dialog
    title="Warning"
    :visible.sync="requestIntegrityDialogVisible"
    width="40%"
    center
    :before-close="closeDialog"
  >
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog"> Đóng </el-button>
      <el-button type="primary" @click="createRequestIntegrity">
        Tạo yêu cầu
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'RequestIntegrityDialog',

  computed: {
    ...mapGetters('request', ['requestIntegrityDialogVisible']),
  },

  methods: {
    ...mapMutations('request', ['setRequestIntegrityDialogVisible']),

    closeDialog() {
      this.setRequestIntegrityDialogVisible(false)
    },

    createRequestIntegrity() {
      this.setRequestIntegrityDialogVisible(false)
    },
  },
}
</script>

<style></style>
