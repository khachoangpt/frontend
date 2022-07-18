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
        @on-row-dblclick="onRowDoubleClick"
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
          field: 'full_name',
          width: '150px',
          sortable: false,
        },
        {
          label: 'Mã',
          field: 'employee_id',
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
          field: 'base_salary',
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
          label: 'Khấu trừ',
          field: 'totalDeduction',
          width: '68px',
          sortable: false,
        },
        {
          label: 'Bảo hiểm',
          field: 'insurancePayment',
          width: '74px',
          sortable: false,
        },
        {
          label: 'Thuế',
          field: 'taxPayment',
          sortable: false,
        },
        {
          label: 'Thưởng',
          field: 'totalBonus',
          sortable: false,
        },
        {
          label: 'Tạm ứng',
          field: 'advance',
          width: '70px',
          sortable: false,
        },
        {
          label: 'Lương thực nhận',
          field: 'actualIncome',
          width: '140px',
          sortable: false,
        },
      ],
      rows: [
        {
          employee_id: 'huynq100',
          full_name: 'Nguyễn Khắc Hoàng',
          position: 'BA',
          base_salary: '26',
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
    ...mapActions('salary', ['onChangeMonth', 'onRowDoubleClick']),
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

<style>
.el-pagination {
  margin-top: 16px;
  text-align: center;
  padding-bottom: 16px;
}
</style>
