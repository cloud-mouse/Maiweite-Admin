# PageMain 组件使用文档

## 1. 组件介绍

PageMain 是一个页面主容器组件，提供了以下特性：
- 支持标题栏
- 支持折叠/展开功能
- 支持自定义背景色
- 支持自定义内边距
- 支持自定义高度
- 响应式布局
- 圆角边框
- 渐变过渡效果

## 2. 基础用法

```vue
<template>
  <PageMain title="页面标题">
    <div>页面内容</div>
  </PageMain>
</template>

<script setup lang="ts">
import PageMain from '@/components/PageMain/index.vue'
</script>
```

## 3. Props 配置项

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 页面标题 | string | '' |
| collaspe | 是否折叠 | boolean | false |
| height | 折叠时的高度 | string | '' |
| background | 背景颜色 | string | '' |
| padding | 内边距 | string | '10px' |

## 4. 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 页面主要内容 |
| title | 自定义标题内容 |

## 5. 使用示例

### 5.1 基础用法

```vue
<template>
  <PageMain title="基础页面">
    <div>这是页面内容</div>
  </PageMain>
</template>
```

### 5.2 自定义标题

```vue
<template>
  <PageMain>
    <template #title>
      <div class="flex items-center">
        <el-icon><Document /></el-icon>
        <span class="ml-2">自定义标题</span>
      </div>
    </template>
    <div>这是页面内容</div>
  </PageMain>
</template>
```

### 5.3 折叠功能

```vue
<template>
  <PageMain
    title="可折叠页面"
    :collaspe="true"
    height="200px"
  >
    <div>这是可折叠的页面内容</div>
  </PageMain>
</template>
```

### 5.4 自定义样式

```vue
<template>
  <PageMain
    title="自定义样式"
    background="#f5f7fa"
    padding="20px"
  >
    <div>这是自定义样式的页面内容</div>
  </PageMain>
</template>
```

## 6. 注意事项

1. 组件使用了 Tailwind CSS 的样式类，确保项目中已正确配置 Tailwind CSS。

2. 背景色支持 CSS 变量，默认使用 `var(--g-container-bg)`。

3. 折叠功能会显示一个渐变过渡的展开按钮。

4. 组件会自动处理标题栏的边框样式，使用 CSS 变量 `var(--g-bg)`。

5. 当提供 `title` 插槽时，会优先使用插槽内容而不是 `title` 属性。

## 7. 样式变量

组件使用了以下 CSS 变量：
- `--g-container-bg`: 容器背景色
- `--g-bg`: 边框颜色

## 8. 最佳实践

1. 建议在页面布局中使用此组件作为主要内容容器。

2. 对于需要折叠功能的页面，建议设置合适的 `height` 值。

3. 使用插槽自定义标题时，可以添加图标或其他元素增强视觉效果。

4. 根据实际需求调整 `padding` 值，确保内容布局合理。

5. 在深色模式下，注意调整背景色和边框颜色。
