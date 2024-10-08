<template>
  <div class="tabbar-container">
    <div ref="tabsRef" class="tabs" @wheel.prevent="handlerMouserScroll">
      <TransitionGroup ref="tabContainerRef" name="tabbar" tag="div" class="tab-container">
        <div
          v-for="(element, index) in tabbarStore.list" :key="element.tabId"
          ref="tabRef" :data-index="index" class="tab" :class="{
            actived: element.tabId === activedTabId,
          }" :title="typeof element?.title === 'function' ? element.title() : element.title" @click="router.push(element.fullPath)" @contextmenu="onTabbarContextmenu($event, element)"
        >
          <div class="tab-dividers" />
          <div class="tab-background" />
          <div class="tab-content">
            <div :key="element.tabId" class="tab-title">
              <SvgIcon v-if="settingsStore.settings.tabbar.enableIcon && element.icon" :name="element.icon" class="icon" />
              <span class="title">{{ element.title }}</span>
            </div>
            <div v-if="tabbarStore.list.length > 1" class="action-icon">
              <SvgIcon name="ri:close-fill" @click.stop="tabbar.closeById(element.tabId)" />
            </div>
            <div v-show="keys.alt && index < 9" class="hotkey-number">
              {{ index + 1 }}
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContextMenu from '@imengyu/vue3-context-menu'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import Message from 'vue-m-message'
import { useMagicKeys } from '@vueuse/core'
import useSettingsStore from '@/store/modules/settings'
import useTabbarStore from '@/store/modules/tabbar'
import type { Tabbar } from '#/global'

defineOptions({
  name: 'Tabbar',
})

const route = useRoute()
const router = useRouter()

const settingsStore = useSettingsStore()
const tabbarStore = useTabbarStore()

const tabbar = useTabbar()
const mainPage = useMainPage()

const keys = useMagicKeys({ reactive: true })

const activedTabId = computed(() => tabbar.getId())

const tabsRef = ref()
const tabContainerRef = ref()
const tabRef = shallowRef<HTMLElement[]>([])
onBeforeUpdate(() => {
  tabRef.value = []
})

watch(() => route, (val) => {
  if (settingsStore.settings.tabbar.enable) {
    tabbarStore.add(val).then(() => {
      const index = tabbarStore.list.findIndex(item => item.tabId === activedTabId.value)
      if (index !== -1) {
        scrollTo(tabRef.value[index].offsetLeft - 0)
        tabbarScrollTip()
      }
    })
  }
}, {
  immediate: true,
  deep: true,
})
function tabbarScrollTip() {
  if (tabContainerRef.value.$el.clientWidth > tabsRef.value.clientWidth && localStorage.getItem('tabbarScrollTip') === undefined) {
    localStorage.setItem('tabbarScrollTip', '')
    Message.info('标签栏数量超过展示区域范围，可以将鼠标移到标签栏上，通过鼠标滚轮滑动浏览', {
      title: '温馨提示',
      duration: 5000,
      closable: true,
      zIndex: 2000,
    })
  }
}
function handlerMouserScroll(event: WheelEvent) {
  if (event.deltaY || event.detail !== 0) {
    tabsRef.value.scrollBy({
      left: (event.deltaY || event.detail) > 0 ? 50 : -50,
    })
  }
}
function scrollTo(offsetLeft: number) {
  tabsRef.value.scrollTo({
    left: offsetLeft - 130,
    behavior: 'smooth',
  })
}
function onTabbarContextmenu(event: MouseEvent, routeItem: Tabbar.recordRaw) {
  event.preventDefault()
  ContextMenu.showContextMenu({
    x: event.x,
    y: event.y,
    zIndex: 1000,
    iconFontClass: '',
    customClass: 'tabbar-contextmenu',
    items: [
      {
        label: '重新加载',
        icon: 'i-ri:refresh-line',
        disabled: routeItem.tabId !== activedTabId.value,
        onClick: () => mainPage.reload(),
      },
      {
        label: '关闭标签页',
        icon: 'i-ri:close-line',
        disabled: tabbarStore.list.length <= 1 || routeItem.tabId === settingsStore.settings.home.fullPath,
        divided: true,
        onClick: () => {
          tabbar.closeById(routeItem.tabId)
        },
      },
      {
        label: '关闭其他标签页',
        icon: 'i-ant-design:column-width-outlined',
        disabled: !tabbar.checkCloseOtherSide(routeItem.tabId),
        onClick: () => {
          tabbar.closeOtherSide(routeItem.tabId)
        },
      },
      {
        label: '关闭左侧标签页',
        icon: 'i-mdi:format-horizontal-align-left',
        disabled: !tabbar.checkCloseLeftSide(routeItem.tabId),
        onClick: () => {
          tabbar.closeLeftSide(routeItem.tabId)
        },
      },
      {
        label: '关闭右侧标签页',
        icon: 'i-mdi:format-horizontal-align-right',
        disabled: !tabbar.checkCloseRightSide(routeItem.tabId),
        onClick: () => {
          tabbar.closeRightSide(routeItem.tabId)
        },
      },
    ],
  })
}
</script>

<style lang="scss">
.tabbar-contextmenu {
  z-index: 1000;

  .mx-context-menu {
    --at-apply: fixed ring-1 ring-stone-2 dark:ring-stone-7 shadow-2xl;

    background-color: var(--g-container-bg);

    .mx-context-menu-items .mx-context-menu-item {
      --at-apply: transition-background-color;

      &:not(.disabled):hover {
        --at-apply: cursor-pointer bg-stone-1 dark:bg-stone-9;
      }

      span {
        color: initial;
      }

      .icon {
        width: 1em;
        margin-right: 10px;
        color: initial;
      }

      &.disabled span,
      &.disabled .icon {
        opacity: 0.25;
      }
    }

    .mx-context-menu-item-sperator {
      background-color: var(--g-container-bg);

      &::after {
        --at-apply: bg-stone-2 dark:bg-stone-7;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.tabbar-container {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--g-tabbar-height);
  background-color: var(--g-tabbar-tab-bg);
  box-shadow: 0 1px 0 0 var(--g-border-color);
  transition: background-color 0.3s;

  .tabs {
    position: absolute;
    right: 0;
    left: 0;
    overflow-y: hidden;
    white-space: nowrap;
    // firefox隐藏滚动条
    scrollbar-width: none;

    // chrome隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    .tab-container {
      display: inline-block;

      .tab {
        position: relative;
        display: inline-block;
        width: 130px;
        height: var(--g-tabbar-item-height);
        overflow: hidden;
        font-size: 14px;
        line-height: calc(var(--g-tabbar-item-height) - 2px);
        vertical-align: bottom;
        pointer-events: none;
        cursor: pointer;

        &:not(.actived):hover {
          z-index: 3;

          &::before,
          &::after {
            content: none;
          }

          & + .tab .tab-dividers::before {
            opacity: 0;
          }

          .tab-dividers::before {
            opacity: 0;
          }

          .tab-content {
            .tab-title,
            .action-icon {
              color: var(--g-tabbar-tab-hover-color);
            }
          }

          .tab-background {
            width: 100%;
            background-color: var(--g-tabbar-tab-hover-bg);
            border-bottom: 3px solid var(--g-tabbar-tab-hover-border-color);
            transition: width 0.3s ease;
          }
        }

        * {
          user-select: none;
        }

        &.actived {
          z-index: 5;

          &::before,
          &::after {
            content: none;
          }

          & + .tab .tab-dividers::before {
            opacity: 0;
          }

          .tab-dividers::before {
            opacity: 0;
          }

          .tab-content {
            .tab-title,
            .action-icon {
              color: var(--g-tabbar-tab-active-color);
            }
          }

          .tab-background {
            width: 100%;
            background-color: var(--g-tabbar-tab-active-bg);
            border-bottom: 3px solid var(--g-tabbar-tab-active-border-color);
          }
        }

        .tab-dividers {
          position: absolute;
          top: 50%;
          right: -1px;
          left: -1px;
          z-index: 0;
          height: 14px;
          transform: translateY(-50%);

          &::before {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 1px;
            display: block;
            width: 1px;
            content: "";
            background-color: var(--g-tabbar-dividers-bg);
            opacity: 1;
            transition: opacity 0.2s ease, background-color 0.3s;
          }
        }

        &:first-child .tab-dividers::before {
          opacity: 0;
        }

        .tab-background {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
          width: 0;
          height: 100%;
          pointer-events: none;
          background-color: var(--g-tabbar-tab-bg);
        }

        .tab-content {
          display: flex;
          width: 100%;
          height: 100%;
          pointer-events: all;

          .tab-title {
            display: flex;
            flex: 1;
            align-items: center;
            height: 100%;
            padding: 0 6px;
            padding-left: 14px;
            overflow: hidden;
            color: var(--g-tabbar-tab-color);
            white-space: nowrap;
            mask-image: linear-gradient(to right, #000 calc(100% - 20px), transparent);
            transition: margin-right 0.3s;

            .title {
              padding-left: 6px;
            }

            &:has(+ .action-icon) {
              margin-right: 24px;
            }

            .icon {
              flex-shrink: 0;
            }
          }

          .action-icon {
            position: absolute;
            top: 50%;
            right: 0.5em;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.3em;
            height: 1.3em;
            font-size: 14px;
            color: var(--g-tabbar-tab-color);
            border-radius: 50%;
            transform: translateY(-50%);

            &:hover {
              --at-apply: ring-1 ring-stone-3 dark:ring-stone-7;

              background-color: var(--g-bg);
            }
          }

          .hotkey-number {
            --at-apply: ring-1 ring-stone-3 dark:ring-stone-7;

            position: absolute;
            top: 50%;
            right: 0.5em;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.5em;
            height: 1.5em;
            font-size: 12px;
            color: var(--g-tabbar-tab-color);
            background-color: var(--g-bg);
            border-radius: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
}

// 标签栏动画
.tabs {
  .tabbar-move,
  .tabbar-enter-active,
  .tabbar-leave-active {
    transition: all 0.3s;
  }

  .tabbar-enter-from,
  .tabbar-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .tabbar-leave-active {
    position: absolute !important;
  }
}
</style>
