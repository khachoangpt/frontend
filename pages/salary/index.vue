<template>
  <div class="salary">
    <div class="salary__header">
      <div class="salary__header-text">Quản lý tiền lương</div>
      <div>
        <el-date-picker
          :value="monthSearch"
          type="month"
          placeholder="Tìm kiếm"
          format="MMMM - yyyy"
          :clearable="false"
          @input="selectMonth"
          @change="onChangeMonth"
        >
        </el-date-picker>
        <el-button class="salary__export" type="success"> Export </el-button>
      </div>
    </div>
    <div class="salary-table">
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
        sort-options="{
          enabled: true,
        }"
        :pagination-options="{
          enabled: true,
        }"
      >
        <template slot="pagination-bottom">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="5"
            :total="5"
          >
          </el-pagination>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'SalaryPage',
  layout: 'main',
  data() {
    return {
      columns: [
        {
          label: 'Nhân viên',
          field: 'empName',
          width: '150px',
          sortable: false,
        },
        {
          label: 'Mã',
          field: 'empId',
          width: '50px',
          sortable: false,
        },
        {
          label: 'Vị trí',
          field: 'position',
          width: '80px',
          sortable: false,
        },
        {
          label: 'Ngày công tiêu chuẩn',
          field: 'standardPoint',
          width: '168px',
          sortable: false,
        },
        {
          label: 'Ngày công thực tế',
          field: 'actualPoint',
          width: '144px',
          sortable: false,
        },
        {
          label: 'Điểm OT',
          field: 'OTPoint',
          width: '70px',
          sortable: false,
        },
        {
          label: 'Total Deduction',
          field: 'totalDeduction',
          sortable: false,
        },
        {
          label: 'Insurance Payment',
          field: 'insurancePayment',
          sortable: false,
        },
        {
          label: 'Tax Payment',
          field: 'taxPayment',
          sortable: false,
        },
        {
          label: 'Total Bonus',
          field: 'totalBonus',
          sortable: false,
        },
        {
          label: 'Advance',
          field: 'advance',
          sortable: false,
        },
        {
          label: 'Actual income',
          field: 'actualIncome',
          sortable: false,
        },
      ],
      rows: [
        {
          empId: 'He13131',
          empName: 'Nguyễn Khắc Hoàng',
          position: 'BA',
          standardPoint: '26',
          actualPoint: '24',
          OTPoint: '5',
          totalDeduction: '700000',
          insurancePayment: '700000',
          taxPayment: '45456345',
          totalBonus: '123123412',
          advance: '123423',
          actualIncome: '1234585',
        },
      ],
    }
  },

  computed: {
    ...mapGetters('salary', ['monthSearch']),
  },
  methods: {
    ...mapActions('salary', ['onChangeMonth']),
    ...mapMutations('salary', ['setMonthSearch']),
    selectMonth(e) {
      this.$emit('input', e)
      this.setMonthSearch(e)
    },

    handleChange(val) {
      console.log(val)
    },
  },
}
</script>

<style scoped>
.salary__header {
  display: flex;
  justify-content: space-between;
}

.salary__header-text {
  font-weight: 600;
  font-size: 20px;
}

.salary__export {
  margin-left: 16px;
}

.salary-table {
  margin-top: 30px;
}
</style>
