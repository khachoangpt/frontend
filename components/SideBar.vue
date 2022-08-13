<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#003c8a"
    text-color="#fff"
    :collapse="isCollapse"
    :router="true"
  >
    <el-card class="collapse-button" shadow="hover">
      <el-tooltip
        v-if="isCollapse"
        :content="$i18n.t('sidebar.expand')"
        placement="bottom"
        effect="light"
      >
        <i class="el-icon-s-unfold collapse-icon" @click="collapseSidebar"></i>
      </el-tooltip>
      <el-tooltip
        v-else
        :content="$i18n.t('sidebar.collapse')"
        placement="bottom"
        effect="light"
      >
        <i class="el-icon-s-fold collapse-icon" @click="collapseSidebar"></i>
      </el-tooltip>
    </el-card>
    <el-menu-item class="avatar" :index="localePath('/personnel/' + id)">
      <div
        class="avatar__background"
        :style="{ backgroundImage: 'url(' + avatar + ')' }"
      ></div>
      <div v-if="!isCollapse">
        <p class="avatar__name">{{ name }}</p>
        <p class="avatar__role">{{ grade }}</p>
      </div>
    </el-menu-item>
    <el-menu-item class="sidebar-item" :index="localePath('/')">
      <i class="el-icon-menu sidebar-icon"></i>
      <span class="sidebar-item__text">
        {{ $i18n.t('sidebar.dashboard') }}
      </span>
    </el-menu-item>
    <el-menu-item
      v-if="
        roles.find(
          (role) =>
            role.authority === 'ROLE_USER' || role.authority === 'ROLE_MANAGER'
        )
      "
      class="sidebar-item"
      :index="localePath('/timekeeping')"
    >
      <i class="el-icon-s-claim sidebar-icon"></i>
      <span class="sidebar-item__text">
        {{ $i18n.t('sidebar.timekeeping') }}
      </span>
    </el-menu-item>
    <el-menu-item
      v-if="roles.find((role) => role.authority === 'ROLE_MANAGER')"
      class="sidebar-item"
      :index="localePath('/working-data')"
    >
      <i class="el-icon-time sidebar-icon"></i>
      <span class="sidebar-item__text">
        {{ $i18n.t('sidebar.workingData') }}
      </span>
    </el-menu-item>
    <el-menu-item
      v-if="
        roles.find(
          (role) =>
            role.authority === 'ROLE_ADMIN' || role.authority === 'ROLE_MANAGER'
        )
      "
      class="sidebar-item"
      :index="localePath('/personnel')"
    >
      <i class="el-icon-s-custom sidebar-icon"></i>
      <span class="sidebar-item__text">
        {{ $i18n.t('sidebar.personnel') }}
      </span>
    </el-menu-item>
    <el-menu-item
      v-if="
        roles.find(
          (role) =>
            role.authority === 'ROLE_USER' || role.authority === 'ROLE_MANAGER'
        )
      "
      class="sidebar-item"
      :index="localePath('/request')"
    >
      <i class="el-icon-s-order sidebar-icon"></i>
      <span class="sidebar-item__text">{{ $i18n.t('sidebar.request') }}</span>
    </el-menu-item>
    <el-menu-item
      v-if="
        roles.find(
          (role) =>
            role.authority === 'ROLE_USER' || role.authority === 'ROLE_MANAGER'
        )
      "
      class="sidebar-item"
      :index="localePath('/salary')"
    >
      <i class="el-icon-s-finance sidebar-icon"></i>
      <span class="sidebar-item__text">{{ $i18n.t('sidebar.salary') }}</span>
    </el-menu-item>
    <el-menu-item
      v-if="roles.find((role) => role.authority === 'ROLE_MANAGER')"
      class="sidebar-item"
      :index="localePath('/synthetic')"
    >
      <i class="el-icon-pie-chart sidebar-icon"></i>
      <span class="sidebar-item__text">{{ $i18n.t('sidebar.synthetic') }}</span>
    </el-menu-item>
    <el-submenu class="sidebar-item" :index="localePath('/policy')">
      <template slot="title">
        <i class="el-icon-s-claim sidebar-icon"></i>
        <span slot="title">{{ $i18n.t('sidebar.policy') }}</span>
      </template>
      <el-menu-item
        class="sub-title-policy"
        :index="localePath('/policy/working-rule')"
      >
        Chính sách làm việc
      </el-menu-item>
      <el-menu-item
        class="sub-title-policy"
        :index="localePath('/policy/benefit')"
      >
        Phúc lợi
      </el-menu-item>
      <el-menu-item class="sub-title-policy" :index="localePath('/policy/tax')">
        Thuế
      </el-menu-item>
      <el-menu-item
        class="sub-title-policy"
        :index="localePath('/policy/insurance')"
      >
        Bảo hiểm
      </el-menu-item>
      <el-menu-item
        class="sub-title-policy"
        :index="localePath('/policy/leave')"
      >
        Nghỉ phép
      </el-menu-item>
      <el-menu-item
        class="sub-title-policy"
        :index="localePath('/policy/salary')"
      >
        Lương
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'SideBar',
  data() {
    return {}
  },

  computed: {
    ...mapGetters('auth', [
      'id',
      'name',
      'grade',
      'avatar',
      'roles',
      'isCollapse',
    ]),
    ...mapGetters('user', ['personnelDetail']),
  },

  async mounted() {
    await this.getEmployeeInfo(this.id)
  },

  methods: {
    ...mapActions('auth', ['getEmployeeInfo']),
    ...mapMutations('auth', ['setIsCollapse']),

    async collapseSidebar() {
      await this.setIsCollapse(!this.isCollapse)
    },
  },
}
</script>

<style>
.el-menu {
  position: fixed;
}

.el-menu-vertical-demo {
  color: #333;
  height: 100vh;
  background-color: #003c8a;
  z-index: 101;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px !important;
  color: #333;
  height: 100vh;
  background-color: #003c8a;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0 !important;
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
  line-height: 16px;
}

.avatar__role {
  color: #8ba9cb;
  font-size: 13px;
  margin: 8px 0 0 12px;
  line-height: 16px;
}

.sidebar-icon {
  font-size: 24px !important;
}

.el-menu-item i,
.el-submenu__title i {
  color: #fff;
}

.sidebar-item {
  border-radius: 4px;
}

.sidebar-item:hover {
  background-color: #4d77ff !important;
}

.el-menu-item {
  padding: 0;
}

.el-menu-item.is-active {
  color: aqua !important;
}

.sidebar-item__text {
  font-size: 15px;
}

.collapse-button {
  position: absolute;
  right: -40px;
  border: none;
  cursor: pointer;
}

.collapse-button .el-card__body {
  padding: 11px;
}

.collapse-icon {
  font-size: 24px;
  color: #003c8a;
}

.el-submenu__title:hover {
  background-color: #4d77ff !important;
  border-radius: 4px;
}

.sub-title-policy {
  width: 100%;
}

.sub-title-policy:hover {
  background-color: #4d77ff !important;
}

.el-submenu .el-menu {
  height: 250px;
  overflow-y: scroll;
}
</style>
