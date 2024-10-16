// import { creatChunk } from './createChunk.js'
self.importScripts('spark-md5.js')

function createChunk(file, index, chunkSize) {
  try {
    return new Promise((resolve, reject) => {
      let start = index * chunkSize
      let end = start + chunkSize
      const spark = new SparkMD5.ArrayBuffer()
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        spark.append(e.target.result)
        resolve({
          start,
          end,
          index,
          hash: spark.end(),
        })
      }
      fileReader.readAsArrayBuffer(file.slice(start, end))
      fileReader.onerror = (err) => {
        reject(err) // 如果读取错误，则拒绝Promise
      }
    })
  }
  catch (error) {
    console.log(error)
  }
}

self.onmessage = async (e) => {
  try {
    const promises = []
    const { file, chunkSize, startIndex, endIndex } = e.data
    for (let i = startIndex; i < endIndex; i++) {
      const chunk = createChunk(file, i, chunkSize)
      promises.push(chunk)
    }
    const chunks = await Promise.all(promises)
    self.postMessage(chunks)
  }
  catch (error) {
    self.postMessage(error)
  }
}
