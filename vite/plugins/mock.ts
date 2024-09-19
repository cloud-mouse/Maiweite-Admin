import { viteMockServe } from 'vite-plugin-mock'

export default function createMock(env, isBuild) {
  const { VITE_BUILD_MOCK } = env
  return viteMockServe({
    logger: !isBuild,
    mockPath: 'src/mock',
    enable: VITE_BUILD_MOCK === 'true',
  })
}
