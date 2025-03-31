# ProTable 组件使用文档

## 1. 组件介绍

ProTable 是一个功能强大的表格组件，基于 Element Plus 的 Table 组件封装，提供了以下特性：
- 内置搜索表单
- 表格工具栏（刷新、列设置、搜索）
- 支持多选/单选
- 支持列拖拽排序
- 支持自定义列显示
- 支持分页
- 支持静态数据和动态数据
- 支持自定义空数据展示

## 2. 基础用法

```vue
<template>
  <ProTable
    :columns="columns"
    :request-api="getTableList"
    :init-param="initParam"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ColumnProps } from '@/components/ProTable/interface'

// 定义表格列配置
const columns = ref<ColumnProps[]>([
  {
    type: 'selection',
    width: 50,
    align: 'center'
  },
  {
    prop: 'name',
    label: '姓名',
    width: 120
  },
  {
    prop: 'age',
    label: '年龄',
    width: 80
  }
])

// 初始化参数
const initParam = ref({
  pageNum: 1,
  pageSize: 10
})

// 获取表格数据的方法
const getTableList = async (params: any) => {
  // 这里调用你的接口
  return {
    data: [],
    total: 0
  }
}
</script>
```

## 3. Props 配置项

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| columns | 列配置项 | ColumnProps[] | [] |
| data | 静态表格数据 | any[] | - |
| requestApi | 请求表格数据的 API | (params: any) => Promise<any> | - |
| requestAuto | 是否自动执行请求 API | boolean | true |
| requestError | 表格 API 请求错误监听 | (params: any) => void | - |
| dataCallback | 返回数据的回调函数 | (data: any) => any | - |
| title | 表格标题 | string | - |
| isShowPageable | 是否需要分页组件 | boolean | true |
| isShowSearch | 是否显示搜索组件 | boolean | true |
| pageLayout | 分页组件参数 | string | 'total, sizes, prev, pager, next, jumper' |
| initParam | 初始化请求参数 | any | {} |
| border | 是否带有纵向边框 | boolean | true |
| toolButton | 是否显示表格功能按钮 | ('refresh' \| 'setting' \| 'search')[] \| boolean | true |
| rowKey | 行数据的 Key | string | 'id' |
| searchCol | 表格搜索项每列占比配置 | number \| Record<BreakPoint, number> | { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 } |

## 4. 列配置（ColumnProps）

```typescript
interface ColumnProps {
  type?: 'selection' | 'radio' | 'index' | 'expand' | 'sort' // 列类型
  prop?: string // 字段名
  label?: string // 列标题
  width?: number | string // 列宽度
  align?: 'left' | 'center' | 'right' // 对齐方式
  isShow?: boolean // 是否显示
  isFilterEnum?: boolean // 是否过滤枚举
  enum?: any[] | (() => Promise<any>) // 枚举数据
  search?: {
    el?: string // 搜索项组件类型
    props?: any // 搜索项组件属性
    order?: number // 搜索项排序
    defaultValue?: any // 搜索项默认值
    key?: string // 搜索项字段名
    render?: any // 自定义搜索项渲染
  }
}
```

## 5. 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| search | 搜索事件 | - |
| reset | 重置事件 | - |
| dargSort | 拖拽排序事件 | { newIndex?: number, oldIndex?: number } |
| select | 选择事件 | selecteds: any, row: any |
| selectAll | 全选事件 | selecteds: any |

## 6. 插槽

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| tableHeader | 表格头部操作按钮 | { selectedList, selectedListIds, isSelected } |
| toolButton | 工具栏按钮 | - |
| append | 插入表格最后一行之后的内容 | - |
| empty | 空数据展示 | - |
| pagination | 分页组件 | - |

## 7. 方法

组件暴露了以下方法供外部使用：

```typescript
{
  element: tableRef, // 表格实例
  tableData: processTableData, // 处理后的表格数据
  radio, // 单选值
  pageable, // 分页参数
  searchParam, // 搜索参数
  searchInitParam, // 搜索初始参数
  getTableList, // 获取表格数据
  search, // 搜索方法
  reset, // 重置方法
  handleSizeChange, // 处理每页条数变化
  handleCurrentChange, // 处理页码变化
  clearSelection, // 清空选择
  toggleRowSelection, // 切换行选择状态
  enumMap, // 枚举映射
  isSelected, // 是否选中
  selectedList, // 选中列表
  selectedListIds // 选中列表 ID
}
```

## 8. 使用示例

### 8.1 基础表格

```vue
<template>
  <ProTable
    :columns="columns"
    :request-api="getTableList"
    :init-param="initParam"
  />
</template>
```

### 8.2 带搜索的表格

```vue
<template>
  <ProTable
    :columns="columns"
    :request-api="getTableList"
    :init-param="initParam"
    :is-show-search="true"
  />
</template>

<script setup lang="ts">
const columns = ref<ColumnProps[]>([
  {
    prop: 'name',
    label: '姓名',
    search: {
      el: 'input',
      props: { placeholder: '请输入姓名' }
    }
  }
])
</script>
```

### 8.3 自定义工具栏

```vue
<template>
  <ProTable
    :columns="columns"
    :request-api="getTableList"
  >
    <template #toolButton>
      <el-button type="primary">自定义按钮</el-button>
    </template>
  </ProTable>
</template>
```

### 8.4 自定义空数据展示

```vue
<template>
  <ProTable
    :columns="columns"
    :request-api="getTableList"
  >
    <template #empty>
      <div>暂无数据</div>
    </template>
  </ProTable>
</template>
```

## 9. 注意事项

1. 使用 `requestApi` 时，需要返回符合格式的数据：
```typescript
{
  data: any[], // 表格数据
  total: number // 总条数
}
```

2. 列配置中的 `search` 属性用于配置搜索表单，支持 Element Plus 的所有表单组件。

3. 使用 `enum` 属性时，可以传入静态数组或异步函数，组件会自动处理数据格式化和搜索下拉选择。

4. 组件支持响应式布局，可以通过 `searchCol` 配置不同屏幕尺寸下的搜索项布局。

5. 使用拖拽排序功能时，需要确保列配置中包含 `type: 'sort'` 的列。
