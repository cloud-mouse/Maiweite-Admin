<template>
  <div :id="id" :class="className" :style="{ height, width }" />
</template>

<script lang="ts">
import { defineComponent, nextTick, onActivated, onBeforeUnmount, onDeactivated, onMounted } from 'vue'
import type { EChartsOption } from 'echarts'
import { getInstanceByDom, init } from 'echarts'
import * as echarts from 'echarts'
import resize from '@/components/charts/mixins/resize'

const unwarp = (obj: any) => obj && (obj.__v_raw || obj.valueOf() || obj)

export default defineComponent({
  props: {
    className: {
      type: String,
      default: 'NewPatientsLineCart',
    },
    id: {
      type: String,
      default: 'NewPatientsLineCart',
    },
    width: {
      type: String,
      default: '200px',
      required: true,
    },
    height: {
      type: String,
      default: '200px',
      required: true,
    },
    chartData: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { mounted, chart, beforeDestroy, activated, deactivated } = resize()

    const setOptions = () => {
      if (chart.value) {
        unwarp(chart.value).setOption({
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            textStyle: {
              color: '#fff',
            },
            formatter(params: any) {
              return `<span> ${params[0].data.date} </span><br/>
                <span> 新增用户：<span >${params[0].data.count}</span>人</span>`
            },
            padding: 8,
          },
          grid: {
            top: '5%',
            left: '2%',
            right: '3%',
            bottom: '18%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              axisLine: {
                lineStyle: {
                  color: 'rgba(130, 145, 169, .25)',
                },
              },
              axisLabel: {
                color: 'var(--g-text-color)',
                fontSize: 13,
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(130, 145, 169, .25)',
                  type: 'dashed',
                },
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '',
              axisTick: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  color: '#57617B',
                },
              },
              axisLabel: {
                margin: 10,
                fontSize: 14,
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(130, 145, 169, .25)',
                  type: 'dashed',
                },
              },
            },
          ],
          dataZoom: [
            {
              type: 'inside',
              show: true,
              realtime: true,
              start: 80,
              end: 100,
            },
            {
              start: 80,
              end: 100,
            },
          ],
          dataset: {
            // 数据集
            // 自定义数据维度
            dimensions: ['count', 'date'],
            source: props.chartData, // 数据源，可以动态赋值
          },
          series: [
            {
              name: '',
              type: 'line',
              smooth: false,
              symbol: 'emptyCircle',
              symbolSize: 8,
              showSymbol: true,
              lineStyle: {
                width: 2,
              },
              areaStyle: {
                color: new (echarts as any).graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(33,112,240,0.06)',
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(255,255,255,0.5)',
                    },
                  ],
                  false,
                ),
              },
              itemStyle: {
                color: '#1689FA',
                borderWidth: 99,
              },
              encode: {
                x: 'date',
                y: 'count',
              },
            },
          ],
        } as EChartsOption)
      }
    }

    const initChart = () => {
      let lineChart = getInstanceByDom(document.getElementById(props.id) as HTMLDivElement)

      if (!lineChart) {
        // 如果不存在，就进行初始化
        lineChart = init(document.getElementById(props.id) as HTMLDivElement, 'macarons')
      }
      setOptions()
      chart.value = lineChart
    }

    watchEffect(() => {
      if (props.chartData && props.chartData.length) {
        setOptions()
      }
    })

    onMounted(() => {
      mounted()
      nextTick(() => {
        initChart()
      })
    })

    onBeforeUnmount(() => {
      beforeDestroy()
    })

    onActivated(() => {
      activated()
    })

    onDeactivated(() => {
      deactivated()
    })

    return {}
  },
})
</script>
