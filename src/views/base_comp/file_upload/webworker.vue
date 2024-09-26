<template>
  <div class="bg-#fff p-36px">
    <input type="file" name="选择文件" @change="handleFileChange">
  </div>
</template>

<script lang="ts" setup>
import { cutFile } from './file_utils/cutFile'

const handleFileChange = async (e) => {
  console.log(e.target.files[0])
  const file = e.target.files[0]
  console.log(Date.now())
  const result = await cutFile(file)
  console.log(Date.now())
  console.log(result)
}
</script>
