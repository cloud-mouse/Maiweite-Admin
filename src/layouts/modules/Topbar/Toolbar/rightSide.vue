<template>
  <div class="flex items-center">
    <Fullscreen v-if="settingsStore.settings.toolbar.fullscreen" />
    <PageReload v-if="settingsStore.settings.toolbar.pageReload" />
    <ColorScheme v-if="settingsStore.settings.toolbar.colorScheme" />
    <HDropdownMenu
      :items="[
        [
          { label: settingsStore.settings.home.title, handle: () => router.push({ path: settingsStore.settings.home.fullPath }), hide: !settingsStore.settings.home.enable },
        ],
        [
          { label: '退出登录', handle: () => userStore.logout() },
        ],
      ]" class="flex-center cursor-pointer px-2"
    >
      <div
        class="flex-center gap-1 text-inherit"
      >
        <img v-if="userStore.avatar && !avatarError" :src="userStore.avatar" :onerror="() => (avatarError = true)" class="h-[24px] w-[24px] rounded-full">
        <SvgIcon v-else name="carbon:user-avatar-filled-alt" :size="24" />
        {{ userStore.account }}
        <SvgIcon name="ep:caret-bottom" />
      </div>
    </HDropdownMenu>
  </div>
</template>

<script setup lang="ts">
import Fullscreen from './Fullscreen/index.vue'
import PageReload from './PageReload/index.vue'
import ColorScheme from './ColorScheme/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'

defineOptions({
  name: 'Tools',
})

const router = useRouter()

const settingsStore = useSettingsStore()
const userStore = useUserStore()

const avatarError = ref(false)
watch(() => userStore.avatar, () => {
  if (avatarError.value) {
    avatarError.value = false
  }
})
</script>
