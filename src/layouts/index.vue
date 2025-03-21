<template>
  <div class="layout">
    <!-- 全局水印 -->
    <!-- <div
      v-waterMarker="{
        data: { text: '--' },
        textColor: 'rgba(180, 180, 180, 0.3)',
      }"
      class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-[9999]"
    /> -->
    <div id="app-main">
      <Header />
      <div class="wrapper">
        <div class="sidebar-container" :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.settings.menu.subMenuCollapse }">
          <MainSidebar />
          <SubSidebar />
        </div>
        <div class="sidebar-mask" :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.settings.menu.subMenuCollapse }" @click="settingsStore.toggleSidebarCollapse()" />
        <div class="main-container">
          <Topbar />
          <div class="main">
            <RouterView v-slot="{ Component, route }">
              <Transition name="slide-right" mode="out-in" appear>
                <KeepAlive :include="keepAliveStore.list">
                  <component :is="Component" v-show="!isIframe" :key="route.fullPath" />
                </KeepAlive>
              </Transition>
            </RouterView>
            <!-- isIframe -->
            <IframeLink v-if="isIframe" />
          </div>
        </div>
      </div>
    </div>
    <template v-if="enableAppSetting">
      <div class="app-setting" @click="eventBus.emit('global-app-setting-toggle')">
        <SvgIcon name="uiw:setting-o" class="icon" />
      </div>
      <AppSetting />
    </template>
  </div>
</template>

<script setup lang="ts">
import hotkeys from 'hotkeys-js'
import Header from './modules/Header/index.vue'
import MainSidebar from './modules/MainSidebar/index.vue'
import SubSidebar from './modules/SubSidebar/index.vue'
import AppSetting from './modules/AppSetting/index.vue'
import Topbar from './modules/Topbar/index.vue'
import IframeLink from './modules/views/iframe.vue'
import useSettingsStore from '@/store/modules/settings'
import useKeepAliveStore from '@/store/modules/keepAlive'
import eventBus from '@/utils/eventBus'
import useMenuStore from '@/store/modules/menu'

const keepAliveStore = useKeepAliveStore()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()
const routeInfo = useRoute()
const mainPage = useMainPage()
const menu = useMenu()

const isIframe = computed(() => !!routeInfo.meta.iframe)
watch(() => routeInfo.path, () => {
  if (settingsStore.mode === 'mobile') {
    settingsStore.$patch((state) => {
      state.settings.menu.subMenuCollapse = true
    })
  }
})

watch(() => settingsStore.settings.menu.subMenuCollapse, (val) => {
  if (settingsStore.mode === 'mobile') {
    if (!val) {
      document.body.classList.add('overflow-hidden')
    }
    else {
      document.body.classList.remove('overflow-hidden')
    }
  }
})
onMounted(() => {
  hotkeys('f5', (e) => {
    if (settingsStore.settings.toolbar.pageReload) {
      e.preventDefault()
      mainPage.reload()
    }
  })
  hotkeys('alt+`', (e) => {
    if (settingsStore.settings.menu.enableHotkeys) {
      e.preventDefault()
      menu.switchTo(menuStore.actived + 1 < menuStore.allMenus.length ? menuStore.actived + 1 : 0)
    }
  })
})
onUnmounted(() => {
  hotkeys.unbind('f5')
  hotkeys.unbind('alt+`')
})
const enableAppSetting = import.meta.env.VITE_APP_SETTING === 'true'
</script>

<style lang="scss" scoped>
[data-mode="mobile"] {
  .sidebar-container {
    transform: translateX(calc((var(--g-main-sidebar-width) + var(--g-sub-sidebar-width)) * -1));

    &.show {
      transform: translateX(0);
    }
  }

  .main-container {
    padding: 16px;
    margin-left: 0 !important;
  }

  &[data-menu-mode="single"] {
    .sidebar-container {
      transform: translateX(calc(var(--g-sub-sidebar-width) * -1));

      &.show {
        transform: translateX(0);
      }
    }
  }
}

.layout {
  height: 100%;
  overflow: -moz-scrollbars-none;
  overflow-y: auto;
  -ms-overflow-style: none;
}

.layout::-webkit-scrollbar {
  width: 0 !important;
}

#app-main {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  transition: padding-top 0.3s;

  .sidebar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 1010;
    display: flex;
    width: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
    box-shadow: -1px 0 0 0 var(--g-border-color), 1px 0 0 0 var(--g-border-color);
    transition: width 0.3s, transform 0.3s, box-shadow 0.3s, top 0.3s;

    &:has(> .main-sidebar-container.main-sidebar-enter-active),
    &:has(> .main-sidebar-container.main-sidebar-leave-active) {
      overflow: hidden;
    }
  }

  .sidebar-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    visibility: hidden;
    background-image: radial-gradient(transparent 1px, rgb(0 0 0 / 30%) 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
    opacity: 0;
    transition: all 0.2s;

    &.show {
      visibility: visible;
      opacity: 1;
    }
  }

  .main-sidebar-container:not(.main-sidebar-leave-active) + .sub-sidebar-container {
    left: var(--g-main-sidebar-width);
  }

  .main-container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding: 16px;
    margin-left: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
    background-color: var(--g-bg);
    box-shadow: -1px 0 0 0 var(--g-border-color), 1px 0 0 0 var(--g-border-color);
    transition: margin-left 0.3s, background-color 0.3s, box-shadow 0.3s;

    .main {
      position: relative;
      display: flex;
      flex: auto;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      transition: 0.3s;
    }

    .topbar-container.has-tabbar + .main {
      margin: var(--g-tabbar-height) 0 0;
    }

    .topbar-container.has-toolbar + .main {
      margin: var(--g-toolbar-height) 0 0;
    }

    .topbar-container.has-tabbar.has-toolbar + .main {
      margin: calc(var(--g-tabbar-height) + var(--g-toolbar-height)) 0 0;
    }
  }
}

header:not(.header-leave-active) + .wrapper {
  padding-top: var(--g-header-height);

  .sidebar-container {
    top: var(--g-header-height);

    :deep(.sidebar-logo) {
      display: none;
    }
  }

  .main-container {
    .topbar-container {
      top: var(--g-header-height);
    }
  }
}

.app-setting {
  --at-apply: text-white bg-ui-primary;

  position: fixed;
  top: calc(50% + 250px);
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

  .icon {
    animation: rotate 5s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
}

// 主内容区动画
.slide-right-enter-active {
  transition: 0.2s;
}

.slide-right-leave-active {
  transition: 0.15s;
}

.slide-right-enter-from {
  margin-left: -20px;
  opacity: 0;
}

.slide-right-leave-to {
  margin-left: 20px;
  opacity: 0;
}
</style>
