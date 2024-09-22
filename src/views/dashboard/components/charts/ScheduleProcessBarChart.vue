<template>
  <div :id="id" :class="className" :style="{ height, width }" />
</template>

<script lang="ts">
import { defineComponent, nextTick, onActivated, onBeforeUnmount, onDeactivated, onMounted } from 'vue'
import type { EChartsOption } from 'echarts'
import { getInstanceByDom, init } from 'echarts'
import resize from '@/components/charts/mixins/resize'

const unwarp = (obj: any) => obj && (obj.__v_raw || obj.valueOf() || obj)

export default defineComponent({
  props: {
    className: {
      type: String,
      default: 'ScheduleProcessBarChart',
    },
    id: {
      type: String,
      default: 'ScheduleProcessBarChart',
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
            axisPointer: {
              type: 'shadow',
            },
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            textStyle: {
              color: '#fff',
            },
          },
          legend: {
            left: 24,
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 16,
            data: ['宣教', '表单', '消息提醒', '文本提醒'],
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '18%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              axisLine: {
                lineStyle: {
                  color: 'rgba(130, 145, 169, .25)',
                },
              },
              axisLabel: {
                color: '#000',
                fontSize: 13,
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
          dataset: {
            // 数据集
            // 自定义数据维度
            dimensions: ['formNumber', 'messageNumber', 'missionNumber', 'paperworkNumber', 'date'],
            source: props.chartData, // 数据源，可以动态赋值
          },
          series: [
            {
              name: '宣教',
              type: 'bar',
              stack: 'Ad',
              emphasis: {
                focus: 'series',
              },
              itemStyle: {
                color: '#588AFF',
              },
              encode: {
                x: 'date',
                y: 'missionNumber',
              },
            },
            {
              name: '表单',
              type: 'bar',
              stack: 'Ad',
              emphasis: {
                focus: 'series',
              },
              itemStyle: {
                color: '#67CC81',
              },
              encode: {
                x: 'date',
                y: 'formNumber',
              },
            },
            {
              name: '消息提醒',
              type: 'bar',
              stack: 'Ad',
              emphasis: {
                focus: 'series',
              },
              itemStyle: {
                color: '#FFBD29',
              },
              encode: {
                x: 'date',
                y: 'messageNumber',
              },
            },
            {
              name: '文本提醒',
              type: 'bar',
              stack: 'Ad',
              emphasis: {
                focus: 'series',
              },
              itemStyle: {
                color: '#7267A7',
              },
              encode: {
                x: 'date',
                y: 'paperworkNumber',
              },
            },
          ],
        } as EChartsOption)
      }
    }
    const initChart = () => {
      let barChart = getInstanceByDom(document.getElementById(props.id) as HTMLDivElement)

      if (!barChart) {
        // 如果不存在，就进行初始化
        barChart = init(document.getElementById(props.id) as HTMLDivElement, 'macarons')
      }
      setOptions()
      chart.value = barChart
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
