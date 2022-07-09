export default () => ({
  requestTableHeader: [
    {
      label: 'Nhân viên',
      field: 'full_name',
      width: '150px',
      thClass: 'request-table-header__center',
    },
    {
      label: 'Mã',
      field: 'employee_id',
      width: '80px',
      sortable: false,
      thClass: 'request-table-header__center',
    },
    {
      label: 'Ngày tạo',
      field: 'create_date',
      width: '80px',
      thClass: 'request-table-header__center',
    },
    {
      label: 'Loại yêu cầu',
      field: 'request_title',
      width: '180px',
      sortable: false,
      thClass: 'request-table-header__center',
    },
    {
      label: 'Trạng thái',
      field: 'request_status',
      width: '80px',
      sortable: false,
      thClass: 'request-table-header__center',
    },
    // {
    //   label: 'Mô tả',
    //   field: 'description',
    //   width: '80px',
    //   tdClass: 'request-send-table__description',
    //   sortable: false,
    //   thClass: 'request-table-header__center',
    // },
    {
      label: 'Ngày hết hạn',
      field: 'duration',
      width: '100px',
      sortable: false,
      thClass: 'request-table-header__center',
    },
    // {
    //   label: 'Phê duyệt',
    //   field: 'approver',
    //   width: '80px',
    //   sortable: false,
    //   thClass: 'request-table-header__center',
    // },
    {
      label: 'Bookmark',
      field: 'is_bookmark',
      width: '50px',
      sortable: false,
      thClass: 'request-table-header__center',
    },
  ],
  requestListSend: [],
  requestListReceive: [],
  totalPageRequestListSend: 2,
  totalPageRequestListReceive: 2,
  listRequestType: [],
  activeTable: 'first',
  requestListSelected: 0,
  requestOvertimeDialogVisible: false,
  requestSendDetail: [],
  requestReceiveDetail: [],
})