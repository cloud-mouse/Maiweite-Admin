<template>
  <div class="elegant-attribute-view">
    <div v-for="item in props.actionArgsConfigs" :key="item.field + item.type">
      <div v-show="isShow(item)" class="elegant-attr-item" :class="item.layout">
        <div class="elegant-attr-label" :title="item.label">
          {{ item.label }}
        </div>
        <div class="elegant-attr-input">
          <ENode
            :component-schema="{ ...item, componentProps: { ...item.componentProps, input: false, field: undefined, hidden: false }, show: true, noFormItem: true }"
            :model-value="valueRef[item.field!]" @update:model-value="handleSetValue($event, item.field!)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import ENode from '../../../components/node'
import type { ComponentSchema } from '../../../../core'

const props = defineProps<{
  modelValue: string | null | undefined
  actionArgsConfigs: ComponentSchema[]
}>()
const emits = defineEmits(['update:modelValue'])

const valueRef = computed<any>(() => {
  if (props.modelValue) {
    return JSON.parse(props.modelValue)
  }
  return []
})

function isShow(item: ComponentSchema) {
  // show属性为boolean类型则直接返回
  if (typeof item.show === 'boolean') {
    return item.show
  }

  // show属性为function类型则执行
  if (typeof item.show === 'function') {
    return item.show?.({ values: valueRef.value! })
  }
  return true
}

/**
 * 设置属性值
 */
function handleSetValue(value: any, field: string) {
  const values = [
    ...JSON.parse(props.modelValue ?? '[]'),
  ]
  values[field] = value
  emits('update:modelValue', JSON.stringify(values))
  // 将修改过的组件属性推入撤销操作的栈中
}
</script>
