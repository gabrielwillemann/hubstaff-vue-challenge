<template>
  <b-link class="table-link" href="#" @click.prevent>
    <FlexContainer>
      <FlexItem class="mr-2">
        <div>
          <span v-if="value.weekly">{{
            `${formatTime(value.weekly)} / week`
          }}</span>
          <span v-else class="text-muted">No weekly limit</span>
        </div>
        <div>
          <span v-if="value.daily">{{
            `${formatTime(value.daily)} / day`
          }}</span>
          <span v-else class="text-muted">No daily limit </span>
        </div>
      </FlexItem>
      <FlexItem>
        <span v-if="hovered">
          <b-icon icon="pencil" />
        </span>
      </FlexItem>
    </FlexContainer>
  </b-link>
</template>

<script>
import FlexContainer from '@/components/ui/FlexContainer.vue'
import FlexItem from '@/components/ui/FlexItem.vue'

export default {
  name: 'MemberListLimits',
  components: { FlexContainer, FlexItem },
  props: ['value', 'hovered'],
  methods: {
    formatTime(time) {
      // How works factional hours? 08:30 or 8.5?
      return `${time}:00`
    }
  }
}
</script>

<style></style>
