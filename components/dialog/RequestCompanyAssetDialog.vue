<template>
  <el-dialog
    title="Warning"
    :visible.sync="requestCompanyAssetDialogVisible"
    width="40%"
    center
    :before-close="closeDialog"
  >
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog"> Đóng </el-button>
      <el-button type="primary" @click="createRequestCompanyAsset">
        Tạo yêu cầu
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'RequestCompanyAssetDialog',

  computed: {
    ...mapGetters('request', ['requestCompanyAssetDialogVisible']),
  },

  methods: {
    ...mapMutations('request', ['setRequestCompanyAssetDialogVisible']),

    closeDialog() {
      this.setRequestCompanyAssetDialogVisible(false)
    },

    createRequestCompanyAsset() {
      this.setRequestCompanyAssetDialogVisible(false)
    },
  },
}
</script>

<style></style>
