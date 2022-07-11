<template>
  <el-dialog
    title="Warning"
    :visible.sync="requestAdvanceDialogVisible"
    width="40%"
    center
    :before-close="closeDialog"
  >
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog"> Cancel </el-button>
      <el-button type="primary" @click="createRequestAdvance">
        Confirm
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'RequestAdvanceDialog',

  computed: {
    ...mapGetters('request', ['requestAdvanceDialogVisible']),
  },

  methods: {
    ...mapMutations('request', ['setRequestAdvanceDialogVisible']),

    closeDialog() {
      this.setRequestAdvanceDialogVisible(false)
    },

    createRequestAdvance() {
      this.setRequestAdvanceDialogVisible(false)
    },
  },
}
</script>

<style></style>
