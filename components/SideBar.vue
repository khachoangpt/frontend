<template>
  <div>
    <div class="avatar">
      <div class="avatar__background"></div>
      <span class="avatar__name">Đặng Linh Lan</span>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#1E90FF"
      text-color="#fff"
    >
      <el-menu-item class="sidebar-item" index="1">
        <i class="el-icon-menu sidebar-icon"></i>
        <span>{{$i18n.t('sidebar.dashboard')}}</span>
      </el-menu-item>
      <el-menu-item class="sidebar-item" index="2">
        <i class="el-icon-s-claim sidebar-icon"></i>
        <span>{{$i18n.t('sidebar.timekeeping')}}</span>
      </el-menu-item>
      <el-menu-item class="sidebar-item" index="3">
        <i class="el-icon-s-custom sidebar-icon"></i>
        <span>{{$i18n.t('sidebar.personnel')}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
}
</script>

<style>
.avatar {
  height: 60px;
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
  background-image: url('static/avatar.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.avatar__name {
  margin-left: 12px;
  color: #fff;
  font-weight: bold;
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
