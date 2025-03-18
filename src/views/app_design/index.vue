<template>
  <div class="app-design">
    <div class="app-design__left">
      <components-select />
    </div>
    <div class="app-design__center">
      <preview />
    </div>
    <div class="app-design__right">
      <components-edit />
    </div>
    <div class="app-design__bottom">
      <el-button type="primary" @click="handleSave">
        保存
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import componentsEdit from './components/components-edit.vue'
import componentsSelect from './components/components-select.vue'
import preview from './components/preview.vue'

const handleSave = () => {
  console.log('保存')
}
</script>

<style lang="scss" scoped>
.app-design {
  display: flex;
  height: 100vh;

  &__left {
    width: 400px;
    border-right: 1px solid #ccc;
  }

  &__center {
    flex: 1;
    border-right: 1px solid #ccc;
  }

  &__right {
    width: 350px;
    border-right: 1px solid #ccc;
  }

  &__bottom {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
  }
}
</style>
