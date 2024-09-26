import { creatChunk } from './createChunk.js'

console.log(11212)

onmessage = async (e) => {
  console.log('webworker', e.data)
  const promises = []
  const { file, CHUNCK_SIZE, startIndex, endIndex } = e.data
  for (let i = startIndex; i < endIndex; i++) {
    const chunk = creatChunk(file, i, CHUNCK_SIZE)
    promises.push(chunk)
  }
  const chunks = await Promise.all(promises)
  postMessage(chunks)
}
