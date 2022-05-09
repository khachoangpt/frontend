<template>
  <div>{{$router.push('/login')}}</div>
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
