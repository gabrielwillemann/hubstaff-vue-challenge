<template>
  <div>
    <b-table
      :items="members"
      :fields="fields"
      borderless
      hover
      @row-hovered="setHover"
      @row-unhovered="setHover"
    >
      <template #head(actions)><span></span></template>

      <template #head(selected)>
        <b-form-checkbox
          @input="selectRows"
          :value="true"
          :unchecked-value="false"
        />
      </template>

      <template #cell(selected)="data">
        <b-form-checkbox
          @input="selectRow($event, data.item)"
          :checked="data.item.selected"
          :value="true"
          :unchecked-value="false"
        />
      </template>

      <template #cell(name)="{value}">
        <MemberListName :value="value" />
      </template>

      <template #cell(role)="{item, value}">
        <MemberListRole :value="value" :hovered="item.hovered" />
      </template>

      <template #cell(projects)="{item, value}">
        <MemberListProjects :value="value" :hovered="item.hovered" />
      </template>

      <template #cell(payment)="{item, value}">
        <MemberListPayment :value="value" :hovered="item.hovered" />
      </template>

      <template #cell(limits)="{item, value}">
        <MemberListLimits :value="value" :hovered="item.hovered" />
      </template>

      <template #cell(time_tracking)="{value}">
        <MemberListTimeTracking :value="value" />
      </template>

      <template #cell(actions)>
        <MemberListActions />
      </template>
    </b-table>
    <div class="text-muted">
      Showing {{ members.length }} of {{ membersCount }} members
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MemberListName from './MemberListName.vue'
import MemberListRole from './MemberListRole.vue'
import MemberListProjects from './MemberListProjects.vue'
import MemberListPayment from './MemberListPayment.vue'
import MemberListLimits from './MemberListLimits.vue'
import MemberListTimeTracking from './MemberListTimeTracking.vue'
import MemberListActions from './MemberListActions.vue'

export default {
  name: 'MembersList',
  components: {
    MemberListName,
    MemberListRole,
    MemberListProjects,
    MemberListPayment,
    MemberListLimits,
    MemberListTimeTracking,
    MemberListActions
  },
  data() {
    return {
      membersFields: [
        { name: 'selected', width: '0-5' },
        { name: 'name', label: 'Member', width: '2' },
        { name: 'role', label: 'Role', width: '1' },
        { name: 'projects', label: 'Projects', width: '1' },
        { name: 'payment', label: 'Payment', width: '2' },
        { name: 'limits', label: 'Limits', width: '2' },
        { name: 'time_tracking', label: 'Time tracking', width: '2' },
        { name: 'actions', width: '0-5' }
      ]
    }
  },
  computed: {
    ...mapState({
      membersCount: state => state.membersCount
    }),
    members() {
      return this.$store.getters.membersFiltered
    },
    fields() {
      return this.membersFields.map(field => ({
        key: field.name,
        label: field.label,
        tdClass: `w-col-${field.width} align-middle`,
        thClass: 'py-4 border-bottom'
      }))
    }
  },
  methods: {
    selectRows(selected) {
      this.members.forEach(member => {
        const index = this.getMemberIndexById(member.id)
        this.$store.commit('setMemberSelected', { selected, index })
      })
    },
    selectRow(selected, member) {
      const index = this.getMemberIndexById(member.id)
      this.$store.commit('setMemberSelected', { selected, index })
    },
    setHover(member) {
      const index = this.getMemberIndexById(member.id)
      this.$store.commit('setMemberHovered', {
        hovered: !member.hovered,
        index
      })
    },
    getMemberIndexById(id) {
      for (let i = 0; i < this.$store.state.members.length; i++) {
        const member = this.$store.state.members[i]
        if (member.id === id) {
          return i
        }
      }
    }
  }
}
</script>
