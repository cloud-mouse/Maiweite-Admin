<template>
  <ElFormItem
    ref="form"
    v-bind="attrs"
    :prop="attrs.field"
  >
    <slot />
  </ElFormItem>
</template>

<script lang="ts" setup>
import { ref, useAttrs } from 'vue'
import { ElFormItem } from 'element-plus'

const attrs = useAttrs() as any
const form = ref<any>(null)
</script>
