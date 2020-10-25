<template>
  <div>
    <b-badge v-if="value == 'enabled'" variant="success" class="text-white">{{
      value
    }}</b-badge>
    <b-badge v-else variant="danger">{{ value }}</b-badge>
  </div>
</template>

<script>
export default {
  name: 'MemberListTimeTracking',
  props: ['value']
}
</script>

<style scoped>
div {
  font-size: 1.3rem;
}
</style>
