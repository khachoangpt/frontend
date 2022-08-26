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
        <el-autocomplete
          :value="searchText"
          class="header-actions__search"
          :clearable="true"
          :fetch-suggestions="querySearch"
          :placeholder="$i18n.t('personnel.search')"
          @input="inputSearch"
          @select="handleSelect"
          @clear="handleSelect"
          ><i slot="suffix" class="el-input__icon el-icon-search"></i
        ></el-autocomplete>
        <nuxt-link
          v-if="roles.find((role) => role.authority === 'ROLE_ADMIN')"
          class="btn-add-employee"
          :to="localePath('/personnel/add')"
        >
          <el-button class="header-actions__button" type="primary">
            {{ $i18n.t('personnel.addNew') }}
          </el-button>
        </nuxt-link>
        <el-dropdown
          :disabled="personalListSelected <= 0"
          @command="exportPersonal"
        >
          <el-button class="header-actions__button" type="success">
            Export
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="excel"> Excel </el-dropdown-item>
            <el-dropdown-item command="csv"> CSV </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
      'listEmployeeAutocomplete',
    ]),
  },

  async mounted() {
    this.setSearchText('')
    await this.getAllPersonnelList()
  },

  methods: {
    ...mapActions('user', [
      'onChangeSearchEmployee',
      'exportPersonal',
      'getAllPersonnelList',
    ]),
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
      }, 500)
    },

    querySearch(queryString, cb) {
      const results = queryString
        ? this.listEmployeeAutocomplete.filter(this.createFilter(queryString))
        : this.listEmployeeAutocomplete
      cb(results)
    },

    createFilter(queryString) {
      return (link) => {
        return (
          this.removeMark(link.value.toLowerCase()).includes(
            this.removeMark(queryString.toLowerCase())
          ) === true
        )
      }
    },

    removeMark(str) {
      str = str.replace(/\s+/g, ' ')
      str = str.trim()
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      str = str.replace(/đ/g, 'd')
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
      str = str.replace(/Đ/g, 'D')
      return str
    },

    async handleSelect(value) {
      if (value === undefined) {
        await this.setSearchText('')
      } else {
        await this.setSearchText(value.value)
      }
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
