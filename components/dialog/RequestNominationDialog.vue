<template>
  <el-dialog
    title="Warning"
    :visible.sync="requestNominationDialogVisible"
    width="40%"
    center
    :before-close="closeDialog"
  >
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog"> Đóng </el-button>
      <el-button type="primary" @click="createRequestNomination">
        Tạo yêu cầu
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'RequestNominationDialog',

  computed: {
    ...mapGetters('request', ['requestNominationDialogVisible']),
  },

  methods: {
    ...mapMutations('request', ['setRequestNominationDialogVisible']),

    closeDialog() {
      this.setRequestNominationDialogVisible(false)
    },

    createRequestNomination() {
      this.setRequestNominationDialogVisible(false)
    },
  },
}
</script>

<style></style>
