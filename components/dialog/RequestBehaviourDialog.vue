<template>
  <el-dialog
    title="Warning"
    :visible.sync="requestBehaviourDialogVisible"
    width="40%"
    center
    :before-close="closeDialog"
  >
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog"> Đóng </el-button>
      <el-button type="primary" @click="createRequestBehaviour">
        Tạo yêu cầu
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'RequestBehaviourDialog',

  computed: {
    ...mapGetters('request', ['requestBehaviourDialogVisible']),
  },

  methods: {
    ...mapMutations('request', ['setRequestBehaviourDialogVisible']),

    closeDialog() {
      this.setRequestBehaviourDialogVisible(false)
    },

    createRequestBehaviour() {
      this.setRequestBehaviourDialogVisible(false)
    },
  },
}
</script>

<style></style>
