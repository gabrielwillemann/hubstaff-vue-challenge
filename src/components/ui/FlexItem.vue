<template>
  <div :class="classList">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FlexItem',
  props: {
    grow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList() {
      return this.grow ? 'flex-grow-1' : ''
    }
  }
}
</script>
