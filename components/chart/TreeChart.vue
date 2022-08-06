<template>
  <div class="container">
    <v-zoomer>
      <VueTree
        style="width: 100%; height: 500px"
        :dataset="vehicules"
        :config="treeConfig"
        direction="vertical"
        link-style="straight"
      >
        <template #node="{ node, collapsed }">
          <div
            v-if="!node.true"
            class="rich-media-node"
            :style="{ border: collapsed ? '2px solid grey' : '' }"
          >
            <span class="department">
              {{ node.title }}
            </span>
            <div class="wrap-info">
              <img
                v-if="node.avatar"
                :src="node.avatar"
                alt="image"
                class="avartar"
              />
              <el-avatar
                v-else
                class="avartar"
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
    </v-zoomer>
  </div>
</template>
<script>
import VueTree from '@ssthouse/vue-tree-chart'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TreeChart',
  components: { VueTree },
  data() {
    return {
      vehicules: {
        head: true,
        title: '',
        children: [],
        identifier: 'employeeID',
      },
      treeConfig: { nodeWidth: 130, nodeHeight: 50, levelHeight: 100 },
    }
  },
  computed: {
    ...mapState('salary', ['organizational']),
  },

  async mounted() {
    await this.getOrganizational()
    this.vehicules = {
      ...this.vehicules,
      title: this.organizational.title,
      children: this.organizational.children,
      identifier: 'employeeID',
    }
  },

  methods: {
    ...mapActions('salary', ['getOrganizational']),
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
  width: 130px;
  height: 50px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #000000;
  background-color: #ffffff;
  border-radius: 4px;
  margin: 4px;
  font-size: 11px;
}
.department {
  font-weight: bold;
  margin: 4px;
}
.wrap-info {
  color: #303131;
  margin-top: 4px;
  font-size: 10px;
  display: flex;
  justify-content: center;
}
.avartar {
  display: block;
  height: 10px;
  width: 10px;
  margin-right: 8px;
}

.title {
  margin: auto;
  display: table;
  font-size: 21px;
  font-weight: bold;
}

.vue-zoomer {
  width: 100%;
}
</style>
<style>
.dom-container {
  margin-top: 150px;
  margin-left: 50px;
}
.vue-tree {
  margin-top: 150px;
  margin-left: 50px;
}
</style>
