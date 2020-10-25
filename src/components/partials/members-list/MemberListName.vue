<template>
  <FlexContainer>
    <FlexItem class="bg-success rounded-circle mr-2 p-3" />
    <FlexItem :grow="true">
      {{ value }}
    </FlexItem>
  </FlexContainer>
</template>

<script>
import FlexContainer from '@/components/ui/FlexContainer.vue'
import FlexItem from '@/components/ui/FlexItem.vue'

export default {
  name: 'MemberListName',
  components: { FlexContainer, FlexItem },
  props: ['value']
}
</script>
