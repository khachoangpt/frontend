<template>
  <div class="container">
    <VueTree
      style="width: 100%; height: 1000px"
      :dataset="vehicules"
      :config="treeConfig"
      direction="vertical"
      link-style="straight"
    >
      <template v-slot:node="{ node, collapsed }">
        <div
          v-if="!node.title"
          class="rich-media-node"
          :style="{ border: collapsed ? '2px solid grey' : '' }"
        >
          <span class="department">
            {{ node.department }}
          </span>
          <div class="wrap-info">
            <el-avatar
              class="image"
              size="10"
              icon="el-icon-user-solid"
            ></el-avatar>
            <span class="name">{{ node.name }}</span>
          </div>
        </div>
        <div v-else class="rich-media-node">
          <span class="title">{{ node.name }}</span>
        </div>
      </template>
    </VueTree>
  </div>
</template>
<script>
import VueTree from '@ssthouse/vue-tree-chart'
export default {
  name: 'TreeChart',
  components: { VueTree },
  data() {
    return {
      vehicules: {
        name: 'The company',
        title: '1',
        children: [
          {
            department: 'Sale',
            name: 'Nguyễn Phương Tú',
            children: [
              {
                department: 'Sale team 1',
                name: 'Bùi Thanh Tâm',
              },
              {
                department: 'Sale team 2',
                name: 'Nguyễn Thu Việt',
              },
              {
                department: 'Sale team 3',
                name: 'Nguyễn Anh Thắng',
              },
            ],
          },
          {
            department: 'Marketing',
            name: 'Trần Trí Quang',

            children: [
              {
                department: 'Sale team 3',
                name: 'Nguyễn Anh Thắng',
              },
            ],
          },
          {
            department: 'Kế toán',
            name: 'Nguyễn Hồng Tân',
          },
          {
            department: 'HR & Admin',
            name: 'Lê Văn Thêm',

            children: [
              {
                department: 'Tuyển dụng ',
                name: 'Nguyễn Anh Thắng',
                children: [
                  {
                    department: 'HR team 01',
                    name: 'Bùi Thanh Tâm',
                  },
                  {
                    department: 'HR team 02',
                    name: 'Bùi Thanh Tâm',
                  },
                ],
              },
            ],
          },
        ],
        identifier: 'customID',
      },
      treeConfig: { nodeWidth: 200, nodeHeight: 80, levelHeight: 200 },
    }
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #2cbcff;
}

.rich-media-node {
  width: 200px;
  max-width: 500px;
  height: 80px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #000000;
  background-color: #ffffff;
  border-radius: 4px;
  margin: 4px;
}
.department {
  font-weight: bold;
  margin: 4px;
}
.wrap-info {
  color: #303131;
  margin-top: 4px;
  font-size: 15px;
  display: flex;
  justify-content: center;
}
.image {
  display: block;
  height: 20px;
  width: 20px;
  margin-right: 8px;
}

.title {
  margin: auto;
  display: table;
  font-size: 21px;
  font-weight: bold;
}
</style>