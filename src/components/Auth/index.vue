<template>
  <div class="mx-[5px] inline">
    <slot v-if="check()" />
    <slot v-else name="no-auth" />
  </div>
</template>

<script lang="ts" setup name="Auth">
const props = defineProps<{
  value: string | string[]
}>()

function check() {
  return useAuth().auth(props.value)
}
</script>
