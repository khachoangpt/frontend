<template>
  <div>
    <el-date-picker type="date" :placeholder="$t('datepicker.chooseDay')">
    </el-date-picker>
    <li v-for="(locale, i) in showLocales" :key="i">
      <nuxt-link :to="switchLocalePath(locale.code)">
        {{ locale.name }}
      </nuxt-link>
    </li>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  computed: {
    showLocales() {
      return this.$i18n.locales
    },
  },
}
</script>
