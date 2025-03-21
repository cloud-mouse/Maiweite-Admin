<template>
  <Modal
    v-model="visible"
    class="w-1200px"
    width="1200px"
    title="动作配置"
    @close="handleClose"
    @ok="handleSave"
  >
    <div class="elegant-modal-action-main rounded">
      <div class="elegant-modal-left-panel h-full flex flex-col">
        <!-- 动作所属对象 start -->
        <div class="h-0 flex flex-1 flex-col">
          <div
            class="fun-btn"
            :class="{ checked: state.actionItem.type === 'custom' }"
            @click="toggleMethod('custom')"
          >
            自定义函数
          </div>
          <div
            class="fun-btn"
            :class="{ checked: state.actionItem.type === 'public' }"
            @click="toggleMethod('public')"
          >
            公共函数
          </div>
          组件
          <div class="h-0 flex-1">
            <ETree
              v-model:selected-keys="selectedKeys"
              :options="pageSchema.schemas"
              @node-click="handleNodeClick"
            />
          </div>
        </div>
        <!-- 动作选择 start -->
        <div class="elegant-action-select h-30/100 flex flex-col">
          <div class="mb-2">
            动作选择
          </div>
          <div class="flex-1 overflow-auto pr-8px">
            <div
              v-for="item in methodOptions"
              :key="item.value"
              :class="{ checked: item.value === state.actionItem.methodName }"
              class="elegant-action-item"
              @click="handleCheckedMethod(item.value)"
            >
              <span>{{ item.label }}</span>
            </div>
            <div
              v-show="!methodOptions?.length"
              class="pt-42px text-center text-gray-400"
            >
              当前组件暂无动作
            </div>
          </div>
        </div>
        <!-- 动作所属对象 end -->
        <!-- 动作选择 end -->
      </div>
      <!-- 动作配置 start -->
      <div class="elegant-modal-right-panel">
        <EScriptEdit v-if="state.actionItem.type === 'custom'" />
        <div
          v-else-if="actionArgsConfigs.length === 0"
          class="pt-42px text-center text-gray-400"
        >
          暂无配置
        </div>
        <EArgsEditor
          v-else
          v-model="state.actionItem.args"
          :action-args-configs="actionArgsConfigs"
        />
      </div>
      <!-- 动作配置 end -->
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { computed, inject, nextTick, reactive, ref, toRaw } from 'vue'
import type { PageManager } from '../../../../utils'
import { deepClone, findSchemaById, getUUID, pluginManager } from '../../../../utils'
import ETree from '../../../components/tree'
import type { ComponentSchema, FormDataModel, PageSchema } from '../../../../core'
import EScriptEdit from './EScriptEdit.vue'
import EArgsEditor from './EArgsEditor.vue'

const emit = defineEmits(['add', 'edit'])
const Modal = pluginManager.getComponent('modal')
const isAdd = ref(true)
const pageSchema = inject('pageSchema') as PageSchema
const pageManager = inject('pageManager', {}) as PageManager
const visible = ref(false)
const selectedKeys = ref<string[]>([])
const componentSchema = ref<ComponentSchema | null>(null)
const state = reactive({
  actionItem: {
    type: 'custom',
    methodName: 'test',
    componentId: null,
  } as FormDataModel,
  cacheData: {},
})
const methodOptions = computed(() => {
  // 组件动作列表
  if (state.actionItem.type === 'component') {
    if (componentSchema.value) {
      return pluginManager
        .getComponentConfings()[componentSchema.value.type].config.action?.map(item => ({
          label: item.describe,
          value: item.type,
        }))
    }
    return []
  }

  // 自定义函数列表
  if (state.actionItem.type === 'custom') {
    return Object.entries(pageManager.funcs.value)
      .filter(([_key, value]) => typeof value === 'function')
      .map(([label]) => ({ label, value: label }))
  }

  // 公共函数列表
  if (state.actionItem.type === 'public') {
    return Object.entries(pluginManager.publicMethods).map(([label]) => ({
      label,
      value: label,
    }))
  }

  return []
})

const actionArgsConfigs = computed(() => {
  if (state.actionItem.type === 'component') {
    if (componentSchema.value) {
      const action = pluginManager.getComponentConfings()[componentSchema.value.type]
        .config.action
      const actionItem = action?.find(
        item => item.type === state.actionItem.methodName,
      )

      if (actionItem?.argsConfigs) {
        const index = actionItem.argsConfigs.findIndex(
          item => item.label === '设置数据',
        )
        index !== -1
        && (actionItem.argsConfigs[index] = {
          ...componentSchema.value,
          label: '设置数据',
          field: '0',
          id: getUUID(),
        } as ComponentSchema)
      }

      return actionItem?.argsConfigs ?? []
    }
  }
  return []
})

function handleOpen() {
  visible.value = true
  isAdd.value = true
  state.actionItem.type = 'custom'
  state.actionItem.componentId = null
  if (methodOptions.value?.length) {
    handleCheckedMethod(methodOptions.value[0].value)
  }
}
function handleOpenEdit(action: any) {
  visible.value = true
  isAdd.value = false
  componentSchema.value = null

  if (action.componentId) {
    componentSchema.value = findSchemaById(pageSchema.schemas, action.componentId)
    selectedKeys.value = [action.componentId]
  }

  nextTick(() => {
    state.actionItem.componentId = action.componentId
    state.actionItem.methodName = action.methodName
    state.actionItem.type = action.type
    state.actionItem.args = action.args
  })
}
function handleSave() {
  if (!state.actionItem.methodName) {
    // eslint-disable-next-line no-alert
    alert('请先选择动作方法')
    return
  }
  emit(isAdd.value ? 'add' : 'edit', deepClone(toRaw(state.actionItem)))
  handleClose()
}

function handleClose() {
  visible.value = false
  selectedKeys.value = []
  // 清空缓存数据
  state.cacheData = {}
}

function toggleMethod(type: string) {
  state.actionItem.componentId = null
  state.actionItem.type = type
  componentSchema.value = null
  state.actionItem.methodName = null

  selectedKeys.value = []
  if (methodOptions.value?.length) {
    handleCheckedMethod(methodOptions.value[0].value)
  }
}
function handleNodeClick(e: any) {
  if (state.actionItem.args) {
    // 存在参数配置，缓存参数配置数据
    state.cacheData[state.actionItem.componentId + state.actionItem.methodName]
      = state.actionItem.args
  }

  state.actionItem.componentId = e.id
  state.actionItem.type = 'component'
  state.actionItem.methodName = null
  componentSchema.value = e.componentSchema

  if (methodOptions.value?.length) {
    handleCheckedMethod(methodOptions.value[0].value)
  }
}

function handleCheckedMethod(value: string) {
  // activeTab.value = '脚本编辑'
  state.actionItem.methodName = value

  // 获取缓存参数配置
  state.actionItem.args
    = state.cacheData[state.actionItem.componentId + state.actionItem.methodName]
}

defineExpose({
  handleOpen,
  handleOpenEdit,
})
</script>
