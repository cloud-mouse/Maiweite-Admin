import { ref, watch, watchEffect } from 'vue'
import useWebSocket, { SocketStatus } from './useWebSocket'
// import { useAdminStore } from '@stores/adminStore'
export default function useSocket() {
  const { status, message, connect, disconnect } = useWebSocket({
    url: 'your webosckt url',
    heartBeatData: 'your heart data',
  })
  const retryConnect = () => {
    if (status.value !== SocketStatus.Connected) {
      connect()
    }
  }
  const isLogin = ref(false)
  // const { isLogin } = storeToRefs(useAdminStore())
  const chatMessage = ref(null)
  const socketStatusText = ref('')
  window.addEventListener('offline', () => {
    console.log('网络连接已断开')
  })
  window.addEventListener('online', () => {
    console.log('网络连接已恢复') // 在网络连接恢复后执行的操作
    retryConnect()
  })
  watch(
    () => status.value,
    (newVal) => {
      if (newVal != SocketStatus.Connected) {
        socketStatusText.value = newVal
      }
    },
  )
  watch(
    () => message.value,
    (newVal) => {
      if (newVal) {
        chatMessage.value = newVal
      }
    },
  )
  watchEffect(() => {
    if (isLogin.value) {
      connect()
    }
    else {
      disconnect()
    }
  })

  return {
    socketStatusText,
    chatMessage,
    retryConnect,
  }
}
