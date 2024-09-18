<template>
  <VTooltip v-if="enable" :popper-triggers="['hover']" v-bind="$attrs">
    <slot />
    <template #popper>
      <slot name="text">
        {{ text }}
      </slot>
    </template>
  </VTooltip>
  <div v-else>
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string | undefined
    enable?: boolean
  }>(),
  {
    text: '',
    enable: true,
  },
)
</script>
