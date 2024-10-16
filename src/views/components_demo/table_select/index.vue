<template>
  <div>
    <PageHeader title="表格选择器" content="表格选择器示例" />
    <PageMain class="mb-10px">
      <div>表格选择器多选</div>
      <div class="w-240px flex py-20px">
        <TableSelect
          v-model="formData.selectArr"
          multiple
          :columns="tableSelectMultipleColumns"
          :request-api="getSysUserListApi"
          :fit-input-width="false"
          :table-props="{
            label: 'name',
            value: 'id',
          }"
        />
      </div>
    </PageMain>
    <PageMain>
      <div>表格选择器单选</div>
      <div class="w-240px flex py-20px">
        <TableSelect
          v-model="formData.selectObj"
          :columns="tableSelectColumns"
          :request-api="getSysUserListApi"
          :fit-input-width="false"
          :table-props="{
            label: 'name',
            value: 'id',
          }"
        />
      </div>
    </PageMain>
  </div>
</template>

<script setup lang="ts">
import type { ColumnProps } from '@/components/ProTable/interface'
import { getSysUserListApi } from '@/api/modules/user'

defineOptions({
  name: 'TableSelectDemo',
})
// selectTable表格配置项
const tableSelectMultipleColumns = reactive<ColumnProps[]>(
  [
    { type: 'selection', fixed: 'left', width: 80 },
    { prop: 'name', label: '用户名称', minWidth: 100, search: { el: 'input' } },
  ],
)
const tableSelectColumns = reactive<ColumnProps[]>(
  [
    { type: 'radio', fixed: 'left', width: 80 },
    { prop: 'name', label: '用户名称', minWidth: 100, search: { el: 'input' } },
  ],
)
const formData = ref<any>({
  selectObj: {
    value: 1,
    label: '张三',
  },
  selectArr: [{
    value: 1,
    label: '张三',
  }],
})
</script>
