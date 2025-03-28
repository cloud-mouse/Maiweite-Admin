<template>
  <draggable
    v-model="innerValue" item-key="id" :component-data="{
      type: 'transition-group',
    }" group="option-list" handle=".handle" :animation="200"
  >
    <template #item="{ element: option, index }">
      <div>
        <div
          :class="tree ? 'grid-cols-[16px_auto_auto_16px_16px]' : 'grid-cols-[16px_auto_auto_16px]'"
          class="option-item grid mb-2 items-center gap-2 text-16px text-$elegant-text-secondary"
        >
          <EIcon class="handle mr-2 cursor-move" name="icon--elegant--drag" />
          <Input v-model="option.label" v-model:value="option.label" placeholder="label" />
          <Input v-model="option.value" v-model:value="option.value" placeholder="value" />
          <EIcon v-if="tree" class="cursor-pointer text-lg!" name="icon--elegant--add-rounded" @click="handleAddChildren(option)" />
          <EIcon class="cursor-pointer hover:text-red" name="icon--elegant--delete-outline-rounded" @click="handleRemove(index)" />
        </div>
        <div v-if="option.children" class="pl-4">
          <EOptionItem v-model="option.children" />
        </div>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
import { inject } from 'vue'
import { useVModel } from '@vueuse/core'
import { pluginManager } from '../../../utils'
import EIcon from '../../components/icon'

interface Option {
  label: string
  value: string
  children?: Option[]
}

defineOptions({
  name: 'EOptionItem',
})

const props = defineProps<{
  modelValue: Option[]
}>()
const emit = defineEmits(['update:modelValue'])
const Input = pluginManager.getComponent('input')
const tree = inject('tree', false)
const innerValue = useVModel(props, 'modelValue', emit)

/**
 *  添加选项子选项
 */
function handleAddChildren(option: Option) {
  const childrenOption: Option = {
    label: '',
    value: '',
  }

  if (option.children) {
    option.children.push(childrenOption)
  }
  else {
    option.children = [childrenOption]
  }
}

/**
 * 删除选项
 * @param index
 */
function handleRemove(index: number) {
  innerValue.value = innerValue.value.filter((_item, i) => i !== index)
}
</script>
