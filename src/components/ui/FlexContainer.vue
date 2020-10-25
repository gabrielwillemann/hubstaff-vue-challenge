<template>
  <div class="d-flex flex-align-items-center">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FlexContainer'
}
</script>

<style scoped>
.flex-align-items-center {
  align-items: center;
}
</style>
