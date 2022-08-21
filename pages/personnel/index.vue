<template>
  <div
    v-loading.fullscreen.lock="loadingOnSearchEmployee"
    element-loading-background="rgba(0, 0, 0, 0.2)"
    type="primary"
    class="personnel"
  >
    <div class="personnel__header">
      <div class="personnel__header-text">
        {{ $i18n.t('personnel.listOfPersonnel') }}
      </div>
      <div class="personnel__header-actions">
        <el-input
          :value="searchText"
          class="header-actions__search"
          :placeholder="$i18n.t('personnel.search')"
          @input="inputSearch"
        >
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <nuxt-link
          v-if="roles.find((role) => role.authority === 'ROLE_ADMIN')"
          class="btn-add-employee"
          :to="localePath('/personnel/add')"
        >
          <el-button class="header-actions__button" type="primary">
            {{ $i18n.t('personnel.addNew') }}
          </el-button>
        </nuxt-link>
        <el-button
          class="header-actions__button"
          type="success"
          :disabled="personalListSelected <= 0"
          @click="exportPersonal"
        >
          Export
        </el-button>
      </div>
    </div>
    <div class="personnel-table">
      <personnel-information-table />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import PersonnelInformationTable from '~/components/table/PersonnelInformationTable.vue'

export default {
  name: 'PersonnelPage',
  components: { PersonnelInformationTable },
  layout: 'main',
  middleware: ['auth'],
  data() {
    return {
      value: '',
      isEditPersonnel: '',
      timeout: null,
    }
  },

  computed: {
    ...mapGetters('auth', ['roles']),
    ...mapGetters('user', [
      'workingStatus',
      'searchText',
      'loadingOnSearchEmployee',
      'personnelList',
      'personalListSelected',
    ]),
  },

  mounted() {
    this.setSearchText('')
  },

  methods: {
    ...mapActions('user', ['onChangeSearchEmployee', 'exportPersonal']),
    ...mapMutations('user', [
      'setSearchText',
      'setLoadingOnSearchEmployee',
      'setSearchText',
    ]),
    inputSearch(e) {
      this.$emit('input', e)
      this.setSearchText(e)
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.setLoadingOnSearchEmployee(true)
        this.onChangeSearchEmployee()
      }, 1000)
    },
  },
}
</script>

<style>
.personnel__header {
  display: flex;
  justify-content: space-between;
}

.personnel__header-text {
  font-weight: 600;
  font-size: 20px;
}

.personnel__header-actions {
  display: flex;
}

.header-actions__search {
  width: 200px;
  margin-right: 12px;
}

.header-actions__working-status {
  margin-right: 12px;
  max-width: 200px;
}

.personnel-table {
  margin-top: 24px;
}

.table-header-center {
  text-align: center;
}

.full-name-column {
  display: flex;
  justify-content: space-between;
}

.full-name-column__icon {
  display: none;
}

.btn-add-employee {
  text-decoration: none;
  color: #fff !important;
}

.header-actions__button {
  margin-left: 16px;
}
</style>
