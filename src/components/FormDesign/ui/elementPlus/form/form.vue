<template>
  <div v-if="visible" class="form-main" style="height: 100%;">
    <ElForm ref="form" :model="formData" v-bind="componentProps" style="height: 100%;">
      <slot name="edit-node">
        <slot v-for="item in children" name="node" :component-schema="item" />
      </slot>
    </ElForm>
  </div>
</template>

<script lang="ts" setup>
import type { PropType, Ref } from 'vue'
import { computed, inject, onMounted, provide, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import type { ComponentSchema, FormDataModel } from '../../../core'
import type { PageManager } from '../../../utils'

interface FormInstance extends InstanceType<typeof ElForm> {
  getData?: () => FormDataModel
  setData?: (FormDataModel) => void
}

const props = defineProps({
  componentSchema: {
    type: Object as PropType<ComponentSchema>,
    require: true,
    default: () => ({}),
  },
})

const pageManager = inject('pageManager', {}) as PageManager
const form = ref<FormInstance | null>(null)
const forms = inject('forms', {}) as Ref<{ [name: string]: FormInstance }>
const visible = ref(true)
const formData = reactive<FormDataModel>({})
pageManager.addFormData(formData, props.componentSchema?.componentProps?.name)
provide('formData', formData)

/**
 * 获取表单数据
 */
function getData(): FormDataModel {
  return formData
}

/**
 * 设置表单数据
 * @param data
 */
function setData(data: FormDataModel) {
  Object.assign(formData, data)
}

/**
 * 校验表单数据
 */
function validate() {
  return form.value?.validate()
}

// form组件需要特殊处理
onMounted(async () => {
  if (props.componentSchema?.type === 'form' && forms.value && form.value) {
    const name = props.componentSchema?.componentProps?.name
      ?? props.componentSchema?.name ?? 'default' as string

    forms.value[name] = form.value as any
    form.value.getData = getData
    form.value.setData = setData
    return false
  }
})

const componentProps = computed(() => {
  const recordProps = props.componentSchema!.componentProps
  let labelCol = recordProps.labelCol
  let wrapperCol = recordProps.wrapperCol
  if (recordProps.labelLayout === 'fixed') {
    labelCol = { style: `width:${typeof recordProps.labelWidth === 'number' ? `${recordProps.labelWidth}px` : recordProps.labelWidth}` }
    wrapperCol = { style: 'width:auto;flex:1' }
  }
  return {
    ...recordProps,
    labelCol,
    wrapperCol,

  }
})

const children = computed(() => {
  return props.componentSchema!.children ?? []
})

defineExpose({
  form,
  getData,
  setData,
  validate,
})
</script>
