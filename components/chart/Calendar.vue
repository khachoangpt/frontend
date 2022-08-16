<template>
  <div>
    <v-calendar
      v-if="
        !roles.find((role) => role.authority === 'ROLE_ADMIN') ||
        enableEditCalendar === false
      "
      :attributes="attributes"
      is-expanded
      :locale="$i18n.locale"
      :first-day-of-week="1"
    />
    <v-date-picker
      v-else-if="enableEditCalendar === true"
      v-model="dateRangeHoliday"
      :attributes="attributes"
      is-expanded
      :locale="$i18n.locale"
      :first-day-of-week="1"
      @input="onInputCalendar"
    />
  </div>
</template>

<script>
import { format } from 'date-fns'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'HolidayCalendar',
  data() {
    return {
      attributes: [
        {
          highlight: 'red',
          dates: [
            {
              weekdays: [1, 7],
            },
          ],
          popover: {
            label: 'Weekend',
          },
        },
        {
          key: 'today',
          highlight: true,
          dates: {
            start: new Date(),
            end: new Date(),
          },
          popover: {
            label: 'Today',
          },
        },
      ],
      dateRangeHoliday: '',
      componentKey: 0,
    }
  },

  computed: {
    ...mapGetters('auth', ['roles']),
    ...mapGetters('user', ['listHoliday', 'enableEditCalendar']),
  },

  async mounted() {
    await this.getHoliday(new Date().getFullYear())
    for (let i = 0; i < this.listHoliday.length; i++) {
      this.attributes.push(this.listHoliday[i])
    }
  },

  methods: {
    ...mapActions('user', ['getHoliday', 'insertHoliday']),

    onInputCalendar(data) {
      if (data !== null) {
        for (let i = 2; i < this.attributes.length; i++) {
          if (
            this.attributes[i].dates[0].start === format(data, 'yyyy-MM-dd')
          ) {
            return
          }
        }
        this.$prompt('Enter name of holiday', 'Set holiday', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
        })
          .then(async (value) => {
            await this.insertHoliday({ date: data, holidayName: value.value })
            for (let i = 2; i < this.listHoliday.length; i++) {
              this.attributes.push(this.listHoliday[i])
            }
          })
          .catch(() => {})
      }
    },
  },
}
</script>

<style></style>
