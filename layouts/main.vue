<template>
  <div>
    <el-container>
      <SideBar />
      <el-container class="content" :class="{ 'content-collapse': !isCollapse }">
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <Nuxt />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/Header.vue'
import SideBar from '~/components/SideBar.vue'
export default {
  name: 'DefaultLayout',
  components: { SideBar, Header },
  middleware: ['auth'],

  computed: {
    ...mapGetters('auth', ['isCollapse']),
  },
}
</script>

<style>
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 50px;
  height: 50px !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 100;
}

.el-main {
  margin-top: 50px;
}

.content {
  margin-left: 64px;
}

.content-collapse {
  margin-left: 230px;
}
</style>
