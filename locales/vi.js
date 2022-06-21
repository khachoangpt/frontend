import localeVi from 'element-ui/lib/locale/lang/vi'

const vi = {
  sidebar: {
    dashboard: 'Màn hình chính',
    workingData: 'Dữ liệu giờ làm',
    timekeeping: 'Chấm công',
    personnel: 'Nhân sự',
    request: 'Yêu cầu'
  },
  datepicker: {
    chooseDay: 'Chọn một ngày',
  },
}

export default {
  ...vi,
  ...localeVi,
}
