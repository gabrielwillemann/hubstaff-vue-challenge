<template>
  <SearchInput v-model="name" placeholder="Search members" />
</template>

<script>
import SearchInput from '@/components/ui/SearchInput.vue'

export default {
  name: 'SearchMembers',
  components: { SearchInput },
  computed: {
    name: {
      get() {
        return this.$store.state.filters.name
      },
      set(value) {
        this.$store.commit('setFilterName', value)
      }
    }
  }
}
</script>
