<template>
  <div class="p-10px">
    <PageHeader title="上传">
      <template #content>
        <p>ImageUpload / ImagesUpload / FileUpload</p>
        <p style="margin-bottom: 0;">
          进行了上传大小的限制
        </p>
      </template>
    </PageHeader>
    <PageMain title="单图上传">
      <div class="py-2">
        <ImageUpload
          v-model="image" action="https://mock.apipost.net/mock/33b58cb934de000/?apipost_id=3b58d9a4fe6001" name="image" :width="250" :height="150" @on-success="handleSuccess1"
        />
      </div>
    </PageMain>
    <PageMain title="多图上传（默认最多3张）">
      <div class="py-2">
        <ImagesUpload v-model="images" action="https://mock.apipost.net/mock/33b58cb934de000/?apipost_id=3b58d9a4fe6001" name="image" @on-success="handleSuccess2" />
      </div>
    </PageMain>
    <PageMain title="文件上传（默认最多3个）">
      <div class="py-2">
        <FileUpload :files="files" action="https://mock.apipost.net/mock/33b58cb934de000/?apipost_id=3b58d9a4fe6001" @on-success="handleSuccess3" />
      </div>
    </PageMain>
  </div>
</template>

<script setup lang='ts'>
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'FileUpload',
})
const image = ref('')
const handleSuccess1 = (res: any) => {
  if (res.code === 200) {
    image.value = res.data.path
  }
  else {
    ElMessage.warning(res.message)
  }
}
const images = ref([
  'https://picsum.photos/400',
  'https://picsum.photos/600',
  'https://picsum.photos/500',
])
const files = ref([
  {
    name: 'xxxx文件.zip',
    url: 'http://images.lookbi.com/uploads/apply/96/d8521fc691e472eec91a170201866e7d.zip',
  },
])
function handleSuccess2(res: any) {
  if (res.code === 200) {
    images.value.push(res.data.path)
  }
  else {
    ElMessage.warning(res.message)
  }
}
function handleSuccess3(res: any, file: any, fileList: any) {
  if (res.code === 200) {
    files.value.push({
      name: file.name,
      url: res.code === 200 ? res.data.path : '',
    })
  }
  else {
    fileList.pop()
    ElMessage.warning(res.error)
  }
}
</script>
