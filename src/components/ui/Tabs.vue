<template>
  <ul class="nav">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="nav-item"
      :class="itemClass(index)"
    >
      <a
        href="#"
        class="nav-link"
        :class="linkClass(index)"
        :active="index == activeTab"
        :disabled="'index != activeTab'"
        @click.prevent="setActive(item, index)"
        >{{ item.name }}</a
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    items: Array
  },
  data: () => ({
    activeTab: 0
  }),
  methods: {
    itemClass(index) {
      if (this.activeTab === index) {
        return 'border-bottom-1 border-primary'
      }
      return 'border-bottom'
    },
    linkClass(index) {
      if (this.activeTab === index) {
        return 'active'
      }
      if (this.items[index].disabled) {
        return 'disabled'
      }
    },
    setActive(item, index) {
      if (item.disabled) return
      this.activeTab = index
      this.$emit('change', index)
    }
  }
}
</script>

<style scoped>
a {
  font-weight: bold;
}
</style>
