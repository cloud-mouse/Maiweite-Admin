<template>
  <div class="bg-[--g-container-bg] p-36px">
    <input type="file" name="" @change="handleFileChange">
    <hr>
    <el-button @click="handleUpload">
      点击上传
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { cutFile } from './file_utils/cutFile'

const uploadFile = ref<File | null>(null)
const handleFileChange = (e) => {
  const file = e.target.files[0]
  uploadFile.value = file
}

const handleUpload = async () => {
  if (!uploadFile.value)
    return
  console.log(Date.now())
  const result = await cutFile(uploadFile.value)
  console.log(Date.now())
  console.log(result)
}
</script>
