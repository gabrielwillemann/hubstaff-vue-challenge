<template>
  <b-link class="table-link" href="#" @click.prevent>
    <span class="mr-1">{{ value }}</span>
    <span v-if="hovered">
      <b-icon icon="pencil" />
    </span>
  </b-link>
</template>

<script>
export default {
  name: 'MemberListRole',
  props: ['value', 'hovered']
}
</script>
