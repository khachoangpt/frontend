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
        },
        {
          key: 'today',
          highlight: true,
          dates: new Date(),
        },
        {
          highlight: 'yellow',
          dates: [],
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
      this.attributes[2].dates.push(this.listHoliday[i])
    }
  },

  methods: {
    ...mapActions('user', ['getHoliday', 'insertHoliday']),

    onInputCalendar(data) {
      if (data !== null) {
        for (let i = 0; i < this.attributes[2].dates.length; i++) {
          if (
            format(new Date(this.attributes[2].dates[i]), 'dd-MM-yyyy') ===
            format(new Date(data), 'dd-MM-yyyy')
          ) {
            return
          }
        }
        this.$confirm(
          `Set ${format(data, 'dd-MM-yyyy')} is day off?`,
          'Confirm',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'success',
          }
        )
          .then(async () => {
            await this.insertHoliday(data)
            for (let i = 0; i < this.listHoliday.length; i++) {
              await this.attributes[2].dates.push(this.listHoliday[i])
            }
          })
          .catch(() => {})
      }
    },
  },
}
</script>

<style></style>
