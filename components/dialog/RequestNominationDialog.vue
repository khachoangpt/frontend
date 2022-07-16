<template>
  <el-dialog
    title="Warning"
    top="4vh"
    :visible.sync="requestNominationDialogVisible"
    width="50%"
    center
    :before-close="closeDialog"
    :destroy-on-close="true"
  >
    <ul class="request-dialog__header">
      <li class="request-dialog__header-line">
        1. Nomination for all employees.
      </li>
      <li class="request-dialog__header-line">
        2. Request is only validated when it get the acceptance from manager.
      </li>
      <li class="request-dialog__header-line">
        3. Create time required: before 48 hours.
      </li>
      <li class="request-dialog__header-line">
        4. Request is approved within 48 hours.
      </li>
    </ul>
    <el-form
      ref="nominationForm"
      :model="nominationForm"
      :rules="rules"
      label-position="left"
      label-width="150px"
      class="request-dialog__body"
    >
      <el-form-item label="Yêu cầu" prop="requestName">
        <el-select
          v-model="nominationForm.requestName"
          class="request-form__input"
          @change="onChangeRequestName"
        >
          <el-option
            v-for="(requestName, index) in listRequestName"
            :key="'requestName' + index"
            :label="requestName.request_name_name"
            :value="requestName.request_name_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Nhân viên" prop="employeeName">
        <el-autocomplete
          v-model="nominationForm.employeeName"
          class="inline-input"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Ngày" prop="requestDate">
            <el-date-picker
              v-model="nominationForm.requestDate"
              class="request-form__input"
              type="date"
              placeholder="Chọn một ngày"
              format="dd-MM-yyyy"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Lĩnh vực hiện tại">
            <el-input value="IT" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Vị trí hiện tại">
            <el-input value="Develop" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="nominationForm.requestName.trim() === 'Bonus'" :span="12">
          <el-form-item label="Tiền thưởng">
            <el-input v-model="nominationForm.bonusValue"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="nominationForm.requestName.trim() === 'Salary increment'"
        :gutter="20"
      >
        <el-col :span="12">
          <el-form-item label="Lương hiện tại">
            <el-input value="2000" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Lương mong muốn" prop="salary">
            <el-input v-model="nominationForm.salary"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Ghi chú" prop="requestDescription">
        <el-input
          v-model="nominationForm.requestDescription"
          class="request-form__input-area"
          type="textarea"
          :rows="4"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog"> Đóng </el-button>
      <el-button
        v-loading.fullscreen.lock="fullscreenLoading"
        type="primary"
        @click="submitForm('nominationForm')"
      >
        Tạo yêu cầu
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'RequestNominationDialog',

  data() {
    return {
      links: [],
      nominationForm: {
        requestName: '',
        employeeName: '',
        requestDate: '',
        bonusValue: '',
        requestDescription: '',
        salary: '',
      },

      rules: {
        requestName: [
          {
            required: true,
            message: 'Yêu cầu không được để trống.',
            trigger: 'blur',
          },
        ],
        employeeName: [
          {
            required: true,
            message: 'Nhân viên không được để trống.',
            trigger: 'blur',
          },
        ],
        requestDate: [
          {
            required: true,
            message: 'Ngày không được để trống.',
            trigger: 'blur',
          },
        ],
        bonusValue: [
          {
            required: true,
            message: 'Tiền thưởng không được để trống.',
            trigger: 'blur',
          },
        ],
        salary: [
          {
            required: true,
            message: 'Lương mong muốn không được để trống.',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {
    ...mapGetters('request', [
      'requestNominationDialogVisible',
      'listRequestName',
      'fullscreenLoading',
    ]),
  },

  mounted() {
    this.links = this.loadAll()
  },

  methods: {
    ...mapActions('request', [
      'createRequestBonus',
      'createRequestSalaryIncrement',
    ]),
    ...mapMutations('request', [
      'setRequestNominationDialogVisible',
      'setFullscreenLoading',
      'setCurrentRequestNameId',
    ]),

    closeDialog() {
      this.setRequestNominationDialogVisible(false)
    },

    createRequestNomination() {
      this.setRequestNominationDialogVisible(false)
    },

    querySearch(queryString, cb) {
      console.log(queryString)
      const links = this.links
      const results = queryString
        ? links.filter(this.createFilter(queryString))
        : links
      // call callback function to return suggestions
      cb(results)
    },
    createFilter(queryString) {
      return (link) => {
        return link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },

    loadAll() {
      return [
        { value: 'vue', link: 'https://github.com/vuejs/vue' },
        { value: 'element', link: 'https://github.com/ElemeFE/element' },
        { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
        { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
        { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
        { value: 'babel', link: 'https://github.com/babel/babel' },
      ]
    },

    handleSelect(item) {
      this.nominationForm.employeeName = item.value
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.nominationForm.requestName.trim() === 'Bonus') {
          this.createRequestBonus(this.nominationForm)
          this.setFullscreenLoading(true)
        } else if (
          valid &&
          this.nominationForm.requestName.trim() === 'Salary increment'
        ) {
          this.createRequestSalaryIncrement(this.nominationForm)
          this.setFullscreenLoading(true)
        } else {
          return false
        }
      })
    },

    onChangeRequestName(data) {
      for (let i = 0; i < this.listRequestName.length; i++) {
        if (this.listRequestName[i].request_name_name === data) {
          this.setCurrentRequestNameId(this.listRequestName[i].request_name_id)
        }
      }
    },
  },
}
</script>

<style scoped>
.request-dialog__header {
  background-color: #b2f59a;
  list-style: none;
  padding: 8px 16px;
  margin: 0;
  color: #184e05;
  border-radius: 5px;
}

.request-dialog__header-line {
  line-height: 20px;
}

.request-dialog__body {
  margin-top: 16px;
}

.request-form__input {
  width: 90%;
}
</style>
