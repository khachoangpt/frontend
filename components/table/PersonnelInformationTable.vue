<template>
  <vue-good-table
    ref="personal-table"
    v-loading.fullscreen.lock="loadingPersonnelTable"
    element-loading-background="rgba(0, 0, 0, 0.2)"
    type="primary"
    :fixed-header="false"
    :columns="columns"
    :rows="personnelList"
    :select-options="{
      enabled: true,
      selectOnCheckboxOnly: true,
      selectionInfoClass: 'select-info-class',
      selectionText: $i18n.t('request.table.rowSelected'),
      clearSelectionText: $i18n.t('request.table.clear'),
    }"
    :sort-options="{
      enabled: true,
    }"
    :pagination-options="{
      enabled: true,
    }"
    @on-row-dblclick="onRowDoubleClick"
    @on-selected-rows-change="onSelectedRowsChange"
  >
    <template slot="table-row" slot-scope="props">
      <span v-if="props.column.field == 'full_name'" class="full-name-column">
        <span>
          {{ props.row.full_name }}
        </span>
      </span>
      <span
        v-else-if="props.column.field == 'working_status'"
        class="working-status-column"
      >
        <span>
          <i
            v-if="props.row.working_status === 'Active'"
            class="el-icon-success content-item__detail-status-icon"
          ></i>
          <i
            v-if="props.row.working_status === 'Deactive'"
            class="el-icon-error content-item__detail-status-icon"
          ></i>
        </span>
      </span>
      <span v-else>
        {{ props.formattedRow[props.column.field] }}
      </span>
    </template>
    <template slot="pagination-bottom">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="totalPage"
        @current-change="currentChange"
      >
      </el-pagination>
    </template>
  </vue-good-table>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'PersonnelInformationTable',
  data() {
    return {
      columns: [
        {
          label: this.$i18n.t('personnel.detail.fullName'),
          field: 'full_name',
          width: '180px',
          thClass: 'table-header-center',
        },
        {
          label: this.$i18n.t('personnel.detail.employeeId'),
          field: 'employee_id',
          width: '120px',
          thClass: 'table-header-center',
        },
        {
          label: 'Email',
          field: 'email',
          width: '150px',
          thClass: 'table-header-center',
          sortable: false,
        },
        {
          label: this.$i18n.t('personnel.detail.workingStatus'),
          field: 'working_status',
          width: '120px',
          thClass: 'table-header-center',
          sortable: false,
        },
        {
          label: this.$i18n.t('personnel.detail.phoneNumber'),
          field: 'phone',
          width: '130px',
          thClass: 'table-header-center',
          sortable: false,
        },
        {
          label: this.$i18n.t('personnel.detail.gender'),
          field: 'gender',
          width: '80px',
          thClass: 'table-header-center',
          sortable: false,
        },
        {
          label: this.$i18n.t('personnel.detail.birthDate'),
          field: 'birth_date',
          width: '100px',
          thClass: 'table-header-center',
          sortable: false,
        },
        {
          label: this.$i18n.t('personnel.detail.office'),
          field: 'office_name',
          width: '150px',
          thClass: 'table-header-center',
          sortable: false,
        },
        {
          label: this.$i18n.t('personnel.detail.area'),
          field: 'area_name',
          width: '100px',
          thClass: 'table-header-center',
          sortable: false,
        },
        {
          label: this.$i18n.t('personnel.detail.grade'),
          field: 'grade',
          width: '120px',
          thClass: 'table-header-center',
          sortable: false,
        },
        {
          label: this.$i18n.t('personnel.detail.seniority'),
          field: 'seniority',
          width: '150px',
          thClass: 'table-header-center',
          sortable: false,
        },
        {
          label: this.$i18n.t('personnel.detail.position'),
          field: 'position_name',
          width: '100px',
          thClass: 'table-header-center',
          sortable: false,
        },
        {
          label: this.$i18n.t('personnel.employeeType'),
          field: 'working_name',
          width: '150px',
          thClass: 'table-header-center',
          sortable: false,
        },
      ],
      loadingPersonnelTable: true,
    }
  },

  computed: {
    ...mapGetters('user', [
      'personnelList',
      'searchText',
      'totalPage',
      'personalListSelected',
    ]),
  },

  async mounted() {
    this.setPersonalListSelected(0)
    await this.getPersonnelList({
      searchText: '',
      page: 1,
    })
    this.loadingPersonnelTable = false
  },

  methods: {
    ...mapActions('user', ['getPersonnelList', 'onRowDoubleClick']),
    ...mapMutations('user', ['setPersonalListSelected', 'setListPersonalId']),

    async currentChange(page) {
      await this.getPersonnelList({
        searchText: this.searchText,
        page,
      })
    },

    onSelectedRowsChange() {
      const personalIdSelectedList = []
      this.setPersonalListSelected(
        this.$refs['personal-table'].selectedRows.length
      )
      for (let i = 0; i < this.personalListSelected; i++) {
        personalIdSelectedList.push(
          this.$refs['personal-table'].selectedRows[i].employee_id
        )
      }
      this.setListPersonalId(personalIdSelectedList)
    },
  },
}
</script>

<style>
.el-pagination {
  margin-top: 16px;
  text-align: center;
  padding-bottom: 16px;
}

.content-item__detail-status-icon {
  font-size: 20px;
}

.el-icon-success {
  color: #67c23a;
}
.el-icon-error {
  color: #f56c6c;
}

.table-header-center {
  text-align: center;
}
</style>
