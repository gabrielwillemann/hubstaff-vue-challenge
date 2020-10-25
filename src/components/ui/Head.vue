<template>
  <h2 class="title">{{ title }}</h2>
</template>

<script>
export default {
  name: 'Head',
  props: ['title'],
  metaInfo() {
    return {
      title: `Hubstaff - ${this.title}`
    }
  }
}
</script>

<style>
.title {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
</style>
