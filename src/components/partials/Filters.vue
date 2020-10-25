<template>
  <b-form @submit.prevent inline>
    <b-form-group label="Role" class="mr-3">
      <b-form-select
        v-model="role"
        :options="roleOptions"
        style="width: 15rem"
      />
    </b-form-group>
    <b-form-group label="Time Tracking">
      <b-form-select
        v-model="timeTracking"
        :options="timeTrackingOptions"
        style="width: 15rem"
      />
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  name: 'Filters',
  data: () => ({
    roleOptions: [
      { value: null, text: 'All roles' },
      { value: 'Owner', text: 'Owner' },
      { value: 'Viewer', text: 'Viewer' }
    ],
    timeTrackingOptions: [
      { value: null, text: 'All time tracking' },
      { value: 'enabled', text: 'Enabled' },
      { value: 'disabled', text: 'Disabled' }
    ]
  }),
  computed: {
    role: {
      get() {
        return this.$store.state.filters.role
      },
      set(value) {
        this.$store.commit('setFilterRole', value)
      }
    },
    timeTracking: {
      get() {
        return this.$store.state.filters.timeTracking
      },
      set(value) {
        this.$store.commit('setFilterTimeTracking', value)
      }
    }
  }
}
</script>
