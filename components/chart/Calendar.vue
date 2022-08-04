<template>
  <v-calendar
    :attributes="attributes"
    is-expanded
    :locale="$i18n.locale"
    :first-day-of-week="1"
  />
</template>

<script>
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
      ],
    }
  },

  computed: {
    ...mapGetters('user', ['listHoliday']),
  },

  async beforeMount() {
    await this.getHoliday(new Date().getFullYear())
    this.attributes[0].dates.push(this.listHoliday[0])
  },

  methods: {
    ...mapActions('user', ['getHoliday']),
  },
}
</script>

<style></style>
