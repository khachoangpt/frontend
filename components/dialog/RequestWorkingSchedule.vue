<template>
  <el-dialog
    title="Warning"
    :visible.sync="requestOvertimeDialogVisible"
    width="40%"
    center
  >
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog"> Cancel </el-button>
      <el-button type="primary" @click="createRequestOvertime">
        Confirm
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'RequestOvertimeDialog',
  data() {
    return {}
  },

  computed: {
    ...mapGetters('request', ['requestOvertimeDialogVisible']),
  },

  methods: {
    ...mapMutations('request', ['setRequestOvertimeDialogVisible']),

    closeDialog() {
      this.setRequestOvertimeDialogVisible(false)
    },

    createRequestOvertime() {
      this.setRequestOvertimeDialogVisible(false)
    },
  },
}
</script>

<style></style>
