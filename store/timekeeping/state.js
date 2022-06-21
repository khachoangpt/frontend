const now = new Date()
const month = now.getMonth()
const year = now.getFullYear()
// const day = now.getDate()

export default () => ({
  attributes: [
    {
      key: 1,
      customData: {
        checkIn: '08:30',
        checkOut: '17:50',
        status: 'late',
        type: 'danger',
        class: '',
      },
      dates: new Date(year, month, 1),
    },
    {
      key: 2,
      customData: {
        checkIn: '08:30',
        checkOut: '17:50',
        status: 'soon',
        type: 'warning',
        class: '',
      },
      dates: new Date(year, month, 2),
    },
    {
      key: 3,
      customData: {
        checkIn: '08:30',
        checkOut: '17:50',
        status: '',
        type: null,
        class: 'el-icon-finished custom-calendar__status-finished',
      },
      dates: new Date(year, month, 3),
    },
    {
      key: 6,
      customData: {
        checkIn: '08:30',
        checkOut: '17:50',
        status: '',
        type: null,
        class: 'el-icon-finished custom-calendar__status-finished',
      },
      dates: new Date(year, month, 6),
    },
    {
      key: 7,
      customData: {
        checkIn: '08:30',
        checkOut: '17:50',
        status: '',
        type: null,
        class: 'el-icon-finished custom-calendar__status-finished',
      },
      dates: new Date(year, month, 7),
    },

    {
      key: 8,
      customData: {
        checkIn: '08:30',
        checkOut: '17:50',
        status: '',
        type: null,
        class: 'el-icon-finished custom-calendar__status-finished',
      },
      dates: new Date(year, month, 8),
    },
    {
      key: 9,
      customData: {
        checkIn: '08:30',
        checkOut: '17:50',
        status: '',
        type: null,
        class: 'el-icon-finished custom-calendar__status-finished',
      },
      dates: new Date(year, month, 9),
    },
    {
      key: 10,
      customData: {
        checkIn: '08:30',
        checkOut: '17:50',
        status: '',
        type: '',
        class: 'el-icon-moon custom-calendar__status-overnight',
      },
      dates: new Date(year, month, 10),
    },
    {
      key: 10,
      customData: {
        checkIn: '08:30',
        checkOut: '17:50',
        status: '',
        type: '',
        class: 'el-icon-finished custom-calendar__status-finished',
      },
      dates: new Date(year, month, 13),
    },
    {
      key: 10,
      customData: {
        checkIn: '08:30',
        checkOut: '17:50',
        status: '',
        type: '',
        class: 'el-icon-finished custom-calendar__status-finished',
      },
      dates: new Date(year, month, 14),
    },
    {
      key: 10,
      customData: {
        checkIn: '',
        checkOut: '',
        status: 'PL',
        type: 'success',
        class: '',
      },
      dates: new Date(year, month, 15),
    },
    {
      key: 10,
      customData: {
        checkIn: '',
        checkOut: '',
        status: 'off',
        type: 'info',
        class: '',
      },
      dates: new Date(year, month, 16),
    },
    {
      key: 10,
      customData: {
        checkIn: '08:30',
        checkOut: '17:50',
        status: '',
        type: '',
        class: 'el-icon-finished custom-calendar__status-finished',
      },
      dates: new Date(year, month, 17),
    },
  ],
})
