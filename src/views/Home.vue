<template>
  <div>
    <Head title="Members" />
    <FlexContainer>
      <FlexItem :grow="true">
        <Tabs :items="tabs" />
      </FlexItem>
      <FlexItem>
        <SearchMembers />
      </FlexItem>
    </FlexContainer>

    <HelpDescription class="mt-2" />

    <div class="mt-4">
      <FlexContainer>
        <FlexItem :grow="true">
          <Filters />
        </FlexItem>
        <FlexItem>
          <b-button variant="primary" size="lg">Invite member</b-button>
        </FlexItem>
      </FlexContainer>
    </div>

    <MembersList class="mt-4" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Head from '@/components/ui/Head.vue'
import FlexContainer from '@/components/ui/FlexContainer.vue'
import FlexItem from '@/components/ui/FlexItem.vue'
import Tabs from '@/components/ui/Tabs.vue'

import SearchMembers from '@/components/partials/SearchMembers.vue'
import HelpDescription from '@/components/partials/HelpDescription.vue'
import Filters from '@/components/partials/Filters.vue'
import MembersList from '@/components/partials/members-list/MembersList.vue'

export default {
  name: 'Home',
  components: {
    Head,
    FlexContainer,
    FlexItem,
    Tabs,
    SearchMembers,
    HelpDescription,
    Filters,
    MembersList
  },
  computed: {
    ...mapState({
      membersCount: state => state.membersCount
    }),
    tabs() {
      return [
        { name: `MEMBERS (${this.membersCount})` },
        { name: 'INVITES', disabled: true }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('loadMembers')
  }
}
</script>
