<template>
  <div class="elegant-breadcrumb h-40px flex items-center truncate py-2 pl-4">
    <span v-for="(item, index) in designer.state.matched" :key="index">
      <span v-if="index > (designer.state.matched.length - 4)" class="flex items-center">
        <span v-if="designer.state.matched.length > 3 && index === (designer.state.matched.length - 3)">...</span>
        <EIcon v-if="index !== 0" class="m-1" name="icon--elegant--arrow-forward-ios-rounded" />
        <span
          class="node-item cursor-pointer" @click="handleSelect(item)" @mouseenter.stop="designer.setHoverNode(item)"
          @mouseleave.stop="designer.setHoverNode(null)"
        >
          {{ pluginManager.getComponentConfingByType(item?.type
            ?? '')?.defaultSchema.label }}
        </span>
      </span>

    </span>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { pluginManager } from '../../../../../../utils'
import type { ComponentSchema, Designer } from '../../../../../../core'
import EIcon from '../../../../icon'

const designer = inject('designer') as Designer
/**
 * 选中点击节点元素
 * @param schema
 */
function handleSelect(schema: ComponentSchema) {
  designer.setCheckedNode(schema)
}
</script>
