export default () => ({
  policyList: [],
  columns: [
    {
      label: 'Loại chính sách',
      field: 'policy_type',
      thClass: 'policy-table-header__center',
    },
    {
      label: 'Tên chính sách',
      field: 'policy_name',
      thClass: 'policy-table-header__center',
    },
    {
      label: 'Nội dung',
      field: 'description',
      thClass: 'policy-table-header__center',
    },
    {
      label: 'Ngày tạo',
      field: 'created_date',
      thClass: 'policy-table-header__center',
    },
    {
      label: 'Ngày hiệu lực',
      field: 'effective_date',
      thClass: 'policy-table-header__center',
    },
    {
      label: 'Trạng thái',
      field: 'policy_status',
      thClass: 'policy-table-header__center',
    },
  ],
  totalPage: 1,
  policyDetail: [''],
})
