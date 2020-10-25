<template>
  <b-input-group class="border rounded-pill py-1 px-3 ">
    <b-input-group-prepend>
      <span>
        <b-icon class="text-dark mt-2" icon="search" font-scale="1.3" />
      </span>
    </b-input-group-prepend>
    <b-form-input
      class="border-0 outline-none"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event)"
    />
  </b-input-group>
</template>

<script>
export default {
  name: 'SearchInput',
  props: ['value', 'placeholder']
}
</script>

<style scoped>
.outline-none:focus {
  outline: none;
  border-color: inherit;
  outline: 0;
  box-shadow: none;
}
</style>
