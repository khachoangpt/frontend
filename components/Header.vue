<template>
  <div class="header">
    <el-dropdown @command="handleCommand">
      <i class="header__icon">
        <country-flag class="header__language" :country="country" />
      </i>
      <el-dropdown-menu slot="dropdown">
        <nuxt-link class="dropdown-language__item" :to="switchLocalePath('vi')">
          <el-dropdown-item command="vn">Tiếng Việt</el-dropdown-item>
        </nuxt-link>
        <nuxt-link class="dropdown-language__item" :to="switchLocalePath('en')">
          <el-dropdown-item command="us">English</el-dropdown-item>
        </nuxt-link>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown class="notification">
      <el-badge class="header__notification" :value="12">
        <i class="el-icon-bell header__icon"></i>
      </el-badge>
      <el-dropdown-menu slot="dropdown" class="notification__drop">
        <el-empty :image-size="80"></el-empty>
      </el-dropdown-menu>
    </el-dropdown>
    <el-tooltip
      class="item"
      effect="light"
      content="Đăng xuất"
      placement="bottom-start"
    >
      <i
        class="el-icon-switch-button header__icon header__icon--hover"
        @click="logout"
      ></i>
    </el-tooltip>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'HeaderComponent',
  data() {
    return {
      country: 'vn',
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    handleCommand(command) {
      this.country = command
    },
  },
}
</script>

<style>
.header {
  text-align: right;
}

.header__icon {
  font-weight: 700;
  margin: 0 16px;
  cursor: pointer;
  font-size: 20px;
}

.header__language {
  margin-bottom: -12px !important;
}

.el-badge__content.is-fixed {
  top: 20px !important;
  right: 26px !important;
}

.header__icon--hover:hover {
  color: red;
}

.el-menu {
  border: none;
}

.header__notification {
  cursor: pointer;
}

.dropdown-language__item {
  text-decoration: none;
}

.notification__drop {
  width: 300px;
  height: 200px;
}
</style>
