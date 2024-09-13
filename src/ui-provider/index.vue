<template>
  <ElConfigProvider :locale="currentLocale" :button="{ autoInsertSpace: true }">
    <slot />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useTheme } from './useElementTheme'
import useSettingsStore from '@/store/modules/settings'

const settingsStore = useSettingsStore()
const { changePrimary } = useTheme()

watch(
  () => settingsStore.settings.app.themeColor,
  () => {
    changePrimary(settingsStore.settings.app.themeColor)
  },
  {
    deep: true,
  },
)
const currentLocale = computed(() => {
  return settingsStore.settings.app.translationLang === 'zh'
    ? { ...zhCn }
    : { ...en }
})
onMounted(() => {
})
</script>
