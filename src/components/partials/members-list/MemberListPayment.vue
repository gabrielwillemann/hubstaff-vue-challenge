<template>
  <b-link class="table-link" href="#" @click.prevent>
    <span v-if="value" class="mr-1">value</span>
    <span v-else class="mr-1 text-muted">No pay rate / No bill rate</span>
    <span v-if="hovered">
      <b-icon icon="pencil" />
    </span>
  </b-link>
</template>

<script>
export default {
  name: 'MemberListPayment',
  props: ['value', 'hovered']
}
</script>
