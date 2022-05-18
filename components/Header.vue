<template>
  <div class="header">
    <i class="header__icon">
      <country-flag class="header__language" country="vn" />
    </i>
    <i class="el-icon-bell header__icon"></i>
    <i class="el-icon-switch-button header__icon"></i>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
}
</script>

<style scoped>
.header {
  text-align: right;
}

.header__icon {
  font-weight: 700;
  margin: 0 10px;
  cursor: pointer;
}

.header__language {
    margin-bottom: -12px !important;
}
</style>
