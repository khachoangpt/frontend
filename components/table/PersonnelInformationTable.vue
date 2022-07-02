<template>
  <vue-good-table
    :fixed-header="false"
    :columns="columns"
    :rows="personnelList.hrmResponse"
    :search-options="{
      enabled: true,
      externalQuery: searchText,
    }"
    :sort-options="{
      enabled: true,
    }"
    :pagination-options="{
      enabled: true,
      perPage: 10,
      perPageDropdownEnabled: false,
      dropdownAllowAll: false,
      mode: 'records',
    }"
    @on-row-dblclick="onRowDoubleClick"
  >
    <template slot="table-row" slot-scope="props">
      <span v-if="props.column.field == 'full_name'" class="full-name-column">
        <span>
          {{ props.row.full_name }}
        </span>
      </span>
      <span v-else>
        {{ props.formattedRow[props.column.field] }}
      </span>
    </template>
  </vue-good-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PersonnelInformationTable',
  data() {
    return {
      searchText: '',
    }
  },

  computed: {
    ...mapGetters('user', ['columns', 'personnelList']),
  },

  mounted() {
    this.getPersonnelList()
  },

  methods: {
    ...mapActions('user', ['getPersonnelList', 'onRowDoubleClick']),
  },
}
</script>

<style></style>
