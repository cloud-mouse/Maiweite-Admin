import SparkMD5 from './spark-md5'
// 创建切片
export function createChunk(file, index, chunkSize) {
  return new Promise((resolve) => {
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
  })
}
