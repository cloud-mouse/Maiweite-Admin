<template>
  <div />
</template>

<script setup lang="ts">
const router = useRouter()

onMounted(() => {
  router.go(-1)
})
</script>
