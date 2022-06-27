<template>
  <div>
    <nuxt-link :to="localePath('/personnel/' + id)">
      <div class="avatar">
        <div>
          <div
            :style="{
              backgroundImage: 'url(' + avatar + ')',
            }"
            class="avatar__background"
          ></div>
        </div>
        <div>
          <p class="avatar__name">{{ name }}</p>
          <p class="avatar__role">{{ grade }}</p>
        </div>
      </div>
    </nuxt-link>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#003c8a"
      text-color="#fff"
      :router="true"
    >
      <el-menu-item class="sidebar-item" :index="localePath('/')">
        <i class="el-icon-menu sidebar-icon"></i>
        <span class="sidebar-item__text">{{
          $i18n.t('sidebar.dashboard')
        }}</span>
      </el-menu-item>
      <el-menu-item class="sidebar-item" :index="localePath('/timekeeping')">
        <i class="el-icon-s-claim sidebar-icon"></i>
        <span class="sidebar-item__text">{{
          $i18n.t('sidebar.timekeeping')
        }}</span>
      </el-menu-item>
      <el-menu-item
        v-if="
          roles.find(
            (role) =>
              role.authority === 'ROLE_ADMIN' ||
              role.authority === 'ROLE_MANAGER'
          )
        "
        class="sidebar-item"
        :index="localePath('/working-data')"
      >
        <i class="el-icon-time sidebar-icon"></i>
        <span class="sidebar-item__text">{{
          $i18n.t('sidebar.workingData')
        }}</span>
      </el-menu-item>
      <el-menu-item
        v-if="
          roles.find(
            (role) =>
              role.authority === 'ROLE_ADMIN' ||
              role.authority === 'ROLE_MANAGER'
          )
        "
        class="sidebar-item"
        :index="localePath('/personnel')"
      >
        <i class="el-icon-s-custom sidebar-icon"></i>
        <span class="sidebar-item__text">{{
          $i18n.t('sidebar.personnel')
        }}</span>
      </el-menu-item>
      <el-menu-item class="sidebar-item" :index="localePath('/request')">
        <i class="el-icon-s-order sidebar-icon"></i>
        <span class="sidebar-item__text">{{
          $i18n.t('sidebar.request')
        }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SideBar',
  computed: {
    ...mapGetters('auth', ['id', 'name', 'grade', 'avatar', 'roles']),
    ...mapGetters('user', ['personnelDetail']),
  },

  async mounted() {
    await this.getEmployeeInfo(this.id)
  },

  methods: {
    ...mapActions('auth', ['getEmployeeInfo']),
  },
}
</script>

<style>
.avatar {
  height: 68px;
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.avatar__background {
  width: 46px;
  height: 46px;
  background-color: black;
  border-radius: 50%;
  border: 2px solid #fff;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.avatar__name {
  margin: 0 0 0 12px;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
}

.avatar__role {
  color: #8ba9cb;
  font-size: 13px;
  margin: 8px 0 0 12px;
}

.sidebar-icon {
  font-size: 24px !important;
  color: #fff !important;
}

.sidebar-item {
  border-radius: 4px;
}

.sidebar-item:hover {
  background-color: #4d77ff !important;
}

.el-menu-item.is-active {
  color: aqua;
}

.sidebar-item__text {
  font-size: 15px;
}
</style>
