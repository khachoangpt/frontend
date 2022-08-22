import { format } from 'date-fns'
const now = new Date()
const month = now.getMonth()
const year = now.getFullYear()
const startDate = new Date(year, month - 1, 1)
const endDate = new Date(year, month, 0)

export default () => ({
  monthSearch: new Date(year, month - 1, 1),
  yearSearch: [
    new Date(new Date().getFullYear(), 0, 1),
    new Date(new Date().getFullYear(), 11, 31),
  ],
  selectedTimeRange: {
    startDate: format(startDate, 'yyyy-MM-dd'),
    endDate: format(endDate, 'yyyy-MM-dd'),
  },
  salaryListHeader: [
    {
      label: 'Nhân viên',
      field: 'fullName',
      width: '150px',
      sortable: false,
    },
    {
      label: 'Mã',
      field: 'employeeId',
      width: '50px',
      sortable: false,
    },
    {
      label: 'Trạng thái',
      field: 'salaryStatus',
      width: '80px',
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
      field: 'otPoint',
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
      field: 'totalInsurance',
      width: '74px',
      sortable: false,
    },
    {
      label: 'Thuế',
      field: 'totalTax',
      sortable: false,
    },
    {
      label: 'Thưởng',
      field: 'totalBonus',
      sortable: false,
    },
    {
      label: 'Tạm ứng',
      field: 'totalAdvance',
      width: '70px',
      sortable: false,
    },
    {
      label: 'Lương thực nhận',
      field: 'finalSalary',
      width: '140px',
      sortable: false,
    },
  ],
  salaryHistoryListHeader: [
    {
      label: 'Tháng',
      field: 'month',
      width: '50px',
      sortable: true,
    },
    {
      label: 'Trạng thái',
      field: 'salaryStatus',
      width: '80px',
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
      field: 'otPoint',
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
      field: 'totalInsurance',
      width: '74px',
      sortable: false,
    },
    {
      label: 'Thuế',
      field: 'totalTax',
      sortable: false,
    },
    {
      label: 'Thưởng',
      field: 'totalBonus',
      sortable: false,
    },
    {
      label: 'Tạm ứng',
      field: 'totalAdvance',
      width: '70px',
      sortable: false,
    },
    {
      label: 'Lương thực nhận',
      field: 'finalSalary',
      width: '140px',
      sortable: false,
    },
  ],
  salaryList: [],
  salaryDetail: {
    salary_monthly_id: '',
    employee_id: '',
    full_name: '',
    position: '',
    start_date: '',
    end_date: '',
    base_salary: '',
    final_salary: '',
    standardPoint: '',
    pointResponses: {
      actual_working_day: 0,
      unpaid_leave_day: 0,
      paid_leave_day: 0,
      totalWorkPoint: 0,
    },
    otResponseList: {
      otResponseList: [],
      totalOTPoint: 0,
    },
    bonusSalaryResponseList: {
      bonusSalaryResponseList: [],
      total: 0,
    },
    employeeAllowanceResponseList: {
      employeeAllowanceResponseList: [],
      total: 0,
    },
    deductionSalaryResponseList: {
      deductionSalaryResponseList: [],
      total: 0,
    },
    advanceSalaryResponseList: {
      advanceSalaryResponseList: [],
      total: 0,
    },
    employeeTaxResponseList: {
      employeeTaxResponseList: [],
      total: 0,
    },
    employeeInsuranceResponseList: {
      employeeInsuranceResponseList: [],
      total: 0,
    },
  },
  totalPage: 1,
  salaryDataList: [],
  listSalaryId: [],
  editDeductionDialogVisible: true,
  editAdvanceDialogVisible: false,
  editBonusDialogVisible: false,
  salaryHistoryDataList: [],
  salaryHistoryList: [],
  searchEmployeeText: '',
  searchStatusText: 'PENDING',
  listEmployeeByManager: [],
  checkDialogVisible: false,
  listManagerOfArea: [],
  searchManagerText: '',
  isEnoughLevelApprove: 'False',
  historySalary: [],
  salaryStructure: [],
  organizational: [],
  employeeById: [],
  listManagerLowerOfArea: [],
  listDeductionType: [],
  listBonusType: [],
})
