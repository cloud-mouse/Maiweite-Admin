// 每个分片的大小
const CHUNK_SIZE = 5 * 1024 * 1024
// 获取计算机进程数，最大化利用进程进行处理
const WORK_COUNT = navigator.hardwareConcurrency || 4
export async function cutFile(file: File, chunkSize: number = CHUNK_SIZE) {
  return new Promise((resolve, reject) => {
    try {
      const result: any = []
      const chunkCount = Math.ceil(file.size / chunkSize)
      // 每一个线程，需要处理的分片数量
      const WORK_CHUNK_COUNT = Math.ceil(chunkCount / WORK_COUNT)
      let finishCount = 0
      for (let i = 0; i < WORK_COUNT; i++) {
        const worker = new Worker(new URL('./webworker.js', import.meta.url), {
          type: 'module',
        })
        const startIndex = i * WORK_CHUNK_COUNT
        let endIndex = startIndex + WORK_CHUNK_COUNT
        if (endIndex > chunkCount) {
          endIndex = chunkCount
        }
        worker.postMessage({ file, chunkSize, startIndex, endIndex })
        worker.onmessage = (e) => {
          for (let i = startIndex; i < endIndex; i++) {
            result[i] = e.data[i - startIndex]
          }
          worker.terminate() // 执行完成结束线程
          finishCount++ // 计算完成数量
          // 结束计算，返回结果
          if (finishCount === WORK_COUNT) {
            resolve(result)
          }
        }
      }
    }
    catch (error) {
      reject(error)
    }
  })
}
