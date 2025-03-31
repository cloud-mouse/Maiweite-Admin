# TableSelect 组件使用文档

## 1. 组件介绍

TableSelect 是一个基于 Element Plus Select 组件封装的表格选择器组件，提供了以下特性：
- 支持单选和多选模式
- 内置表格搜索功能
- 支持自定义表格列配置
- 支持数据回显
- 支持清空和重置
- 支持自定义宽度
- 支持折叠标签
- 支持远程数据加载

## 2. 基础用法

```vue
<template>
  <TableSelect
    v-model="selectedValue"
    :request-api="getTableData"
    :columns="columns"
    :table-props="{ label: 'name', value: 'id' }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TableSelect from '@/components/TableSelect/index.vue'

const selectedValue = ref(null)
const columns = ref([
  {
    prop: 'id',
    label: 'ID',
    width: 80
  },
  {
    prop: 'name',
    label: '名称',
    width: 120
  }
])

const getTableData = async (params: any) => {
  // 这里调用你的接口
  return {
    records: [],
    total: 0
  }
}
</script>
```

## 3. Props 配置项

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| requestApi | 请求表格数据的 API | (params: any) => Promise<any> | - |
| placeholder | 占位符 | string | '请选择' |
| size | 尺寸 | string | 'default' |
| clearable | 是否可清空 | boolean | true |
| multiple | 是否多选 | boolean | false |
| collapseTags | 多选时是否将选中值按文字的形式展示 | boolean | false |
| collapseTagsTooltip | 是否在多选模式下将选中值按文字的形式展示 | boolean | false |
| fitInputWidth | 是否将下拉框的宽度设置为与选择框一致 | boolean | true |
| disabled | 是否禁用 | boolean | false |
| teleported | 是否将弹出框 teleport 到 body | boolean | true |
| selectWidth | 选择框的宽度 | string | - |
| tableWidth | 表格的宽度 | string | '100%' |
| columns | 表格列配置 | any[] | [] |
| initTableParam | 表格初始化查询参数 | any | {} |
| tableProps | 表格数据映射配置 | { label: string, value: string } | { label: 'id', value: 'name' } |
| needClose | 是否需要关闭按钮 | boolean | false |

## 4. 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| change | 选择值变化时触发 | value: any |
| reset | 重置时触发 | - |

## 5. 使用示例

### 5.1 单选模式

```vue
<template>
  <TableSelect
    v-model="selectedValue"
    :request-api="getTableData"
    :columns="columns"
    :table-props="{ label: 'name', value: 'id' }"
  />
</template>

<script setup lang="ts">
const selectedValue = ref(null)
</script>
```

### 5.2 多选模式

```vue
<template>
  <TableSelect
    v-model="selectedValues"
    :request-api="getTableData"
    :columns="columns"
    :multiple="true"
    :collapse-tags="true"
    :table-props="{ label: 'name', value: 'id' }"
  />
</template>

<script setup lang="ts">
const selectedValues = ref([])
</script>
```

### 5.3 自定义宽度

```vue
<template>
  <TableSelect
    v-model="selectedValue"
    :request-api="getTableData"
    :columns="columns"
    select-width="300px"
    table-width="600px"
  />
</template>
```

### 5.4 带搜索的表格

```vue
<template>
  <TableSelect
    v-model="selectedValue"
    :request-api="getTableData"
    :columns="columns"
    :init-table-param="{ keyword: '' }"
  />
</template>

<script setup lang="ts">
const columns = ref([
  {
    prop: 'name',
    label: '名称',
    search: {
      el: 'input',
      props: { placeholder: '请输入名称' }
    }
  }
])
</script>
```

## 6. 注意事项

1. 组件内部使用了 ProTable 组件，确保项目中已正确引入。

2. 使用 `requestApi` 时，需要返回符合格式的数据：
```typescript
{
  records: any[], // 表格数据
  total: number // 总条数
}
```

3. 多选模式下，选中值会自动处理成 `{ value, label, ...row }` 的格式。

4. 表格数据回显时，会自动处理选中状态。

5. 组件支持自定义表格列配置，可以添加搜索、排序等功能。

## 7. 样式说明

组件使用了以下样式类：
- `select-box`: 选择框容器
- `tip-dropdown`: 下拉框容器
- `select-close`: 关闭按钮
- `select-empty`: 空数据容器
- `select-table`: 表格容器

## 8. 最佳实践

1. 建议根据实际需求设置合适的表格宽度和选择框宽度。

2. 多选模式下，建议使用 `collapseTags` 属性优化显示效果。

3. 对于大数据量的场景，建议实现分页加载。

4. 使用 `tableProps` 配置正确的数据映射字段。

5. 注意处理数据回显时的选中状态。
