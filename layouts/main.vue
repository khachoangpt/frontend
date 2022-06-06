<template>
  <div>
    <el-container>
      <el-aside>
        <SideBar />
      </el-aside>
      <el-container>
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
import Header from '~/components/Header.vue'
import SideBar from '~/components/SideBar.vue'
export default {
  name: 'DefaultLayout',
  components: { SideBar, Header },
}
</script>

<style>
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.el-aside {
  width: max-content !important;
  max-width: 230px !important;
  color: #333;
  height: 100vh;
  background-color: #003c8a;
}
</style>
