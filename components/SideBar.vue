<template>
  <div>
    <nuxt-link :to="localePath('/personnel/' + id)">
      <div class="avatar">
        <div>
          <div
            :style="{
              backgroundImage: 'url(' + personnelDetail[0].avatar + ')',
            }"
            class="avatar__background"
          ></div>
        </div>
        <div>
          <p class="avatar__name">{{ personnelDetail[0].full_name }}</p>
          <p class="avatar__role">{{ personnelDetail[0].grade }}</p>
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
        <span>{{ $i18n.t('sidebar.dashboard') }}</span>
      </el-menu-item>
      <el-menu-item class="sidebar-item" :index="localePath('/timekeeping')">
        <i class="el-icon-s-claim sidebar-icon"></i>
        <span>{{ $i18n.t('sidebar.timekeeping') }}</span>
      </el-menu-item>
      <el-menu-item class="sidebar-item" :index="localePath('/personnel')">
        <i class="el-icon-s-custom sidebar-icon"></i>
        <span>{{ $i18n.t('sidebar.personnel') }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SideBar',
  middleware: ['auth'],
  computed: {
    ...mapGetters('auth', ['id']),
    ...mapGetters('user', ['personnelDetail']),
  },

  beforeMount() {
    this.getPersonnelDetail(this.id)
  },

  methods: {
    ...mapActions('user', ['getPersonnelDetail']),
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
  color: #fff !important;
}

.sidebar-item {
  border-radius: 8px;
}

.sidebar-item:hover {
  background-color: #4d77ff !important;
}

.el-menu-item.is-active {
  color: aqua;
}
</style>
