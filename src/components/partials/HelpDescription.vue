<template>
  <div class="text-help">
    <span class="mr-1"
      >{{ ownersCount }} of {{ membersCount }} members counts towards your
      princing plan</span
    >
    <b-badge pill id="test">i</b-badge>
    <b-popover target="test" triggers="hover" placement="top"
      >Viewers don't count towards your Team of 10 (Premium) plan
    </b-popover>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HelpDescription',
  computed: {
    ...mapState({
      membersCount: state => state.membersCount
    }),
    ownersCount() {
      return this.$store.getters.membersOwner.length
    }
  }
}
</script>

<style scoped>
.text-help {
  color: rgb(101, 116, 135);
  font-size: 0.9rem;
}
</style>
