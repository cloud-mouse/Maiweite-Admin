<template>
  <div class="Workbench flex justify-between p-16px !w-full">
    <div class="Workbench-wrap-left">
      <div class="mb-[10px] rounded-[8px] bg-[#fff] p-[20px] text-[16px] text-[#333] font-[550]">
        您好，管理员~
      </div>
      <div class="mb-[10px] rounded-[8px] bg-[#fff]">
        <div class="wrap-bock-title">
          系统看板
        </div>
        <div class="user-manage-board flex justify-between">
          <div class="user-manage-item">
            <div class="user-manage-name">
              昨日新增用户
            </div>
            <div class="user-manage-num">
              {{ panelData.yesterdayAddUserNumber || 0 }}
            </div>
          </div>
          <div class="user-manage-item">
            <div class="user-manage-name">
              今日新增用户
            </div>
            <div class="user-manage-num">
              {{ panelData.todayUserNumber || 0 }}
            </div>
          </div>
          <div class="user-manage-item">
            <div class="user-manage-name">
              总用户数
            </div>
            <div class="user-manage-num">
              {{ panelData.totalUserNumber || 0 }}
            </div>
          </div>
        </div>
        <div class="px-[10px]">
          <div class="text-right">
            <el-date-picker
              v-model="timeRange"
              type="daterange"
              value-format="YYYY-MM-DD HH:mm:ss"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :shortcuts="shortcuts"
              @change="handleTimeChange"
            />
          </div>
          <div class="py-[18px] !w-full">
            <NewUsersLineChart width="100%" :chart-data="lineChartData" height="255px" />
          </div>
        </div>
      </div>
      <div class="mb-[10px] rounded-[8px] bg-[#fff]">
        <div class="wrap-bock-title">
          待处理
        </div>
        <div class="todo-list flex justify-between">
          <div class="todo-item bg-orange" @click="jumpPage('/user/center')">
            <div class="todo-item-name">
              模块一
            </div>
            <div class="todo-item-num">
              {{ panelData.module1 || 0 }}
            </div>
            <el-icon class="todo-item-icon text-[48px]">
              <svg-icon name="workbench-audit" />
            </el-icon>
          </div>
          <div class="todo-item bg-green" @click="jumpPage('/user/chat')">
            <div class="todo-item-name">
              模块二
            </div>
            <div class="todo-item-num">
              {{ panelData.module2 || 0 }}
            </div>
            <el-icon class="todo-item-icon text-[48px]">
              <svg-icon name="workbench-chat-room-message" />
            </el-icon>
          </div>
          <div class="todo-item bg-pink" @click="jumpPage('/abnormal/list')">
            <div class="todo-item-name">
              模块三
            </div>
            <div class="todo-item-num">
              {{ panelData.module3 || 0 }}
            </div>
            <el-icon class="todo-item-icon text-[48px]">
              <svg-icon name="workbench-abnormal" />
            </el-icon>
          </div>
          <div class="todo-item bg-pink" @click="jumpPage('/abnormal/list')">
            <div class="todo-item-name">
              模块四
            </div>
            <div class="todo-item-num">
              {{ panelData.module4 || 0 }}
            </div>
            <el-icon class="todo-item-icon text-[48px]">
              <svg-icon name="workbench-questionnaire-abnormal" />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="rounded-[8px] bg-[#fff]">
        <div class="wrap-bock-title">
          数据统计
        </div>
        <div class="relative">
          <div class="flex items-center p-[15px] pl-0 text-[16px] font-[550]">
            <span class="title-left-line" />
            日程处理量统计
          </div>
          <div class="absolute right-[15px] top-[54px] z-10">
            <el-date-picker
              v-model="scheduleTimes"
              type="daterange"
              value-format="YYYY-MM-DD HH:mm:ss"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :shortcuts="shortcuts"
              @change="scheduleTimeChange"
            />
          </div>
          <div class="pb-[18px] !w-full">
            <ScheduleProcessBarChart width="100%" height="280px" :chart-data="barChartData" />
          </div>
        </div>
      </div>
    </div>
    <div class="Workbench-wrap-right">
      <div class="mb-[10px] rounded-[8px] bg-[#fff]">
        <div class="wrap-bock-title">
          我的日程
        </div>
        <div class="pt-[18px]">
          <el-calendar ref="calendar" v-model="calendarDay" class="custom-calendar">
            <template #header="header">
              <div class="w-full flex items-center justify-between">
                <el-icon class="cursor-pointer text-[15px]" @click="selectDate('prev-month')">
                  <svg-icon name="workbench-arrow-left" />
                </el-icon>
                <span class="text-[16px] text-[#666]">
                  {{ dayjs(header.date.replace('年', '').replace('月', '')).format('YYYY-MM') }}
                </span>
                <el-icon class="cursor-pointer text-[15px]" @click="selectDate('next-month')">
                  <svg-icon name="workbench-arrow-right" />
                </el-icon>
              </div>
            </template>
            <template #date-cell="{ data }">
              <div class="relative">
                <div class="text-[14px]">
                  {{ data.day.split('-')[2] }}
                </div>
                <div class="dot-box">
                  <span v-if="scheduleDayStatus(data.day).haveUncompleted" class="dot-item red-dot" />
                  <span v-if="scheduleDayStatus(data.day).haveUnstarted" class="dot-item gray-dot" />
                </div>
              </div>
            </template>
          </el-calendar>
        </div>
        <div class="mb-[15px] mt-[10px] flex items-center px-[15px] text-[14px] text-[#333] font-[400]">
          <div class="flex flex-1 items-center">
            <el-icon class="text-[28px]">
              <svg-icon name="workbench-server-user" />
            </el-icon>
            <span class="ml-[10px]">服务用户数</span>
          </div>
          <div class="w-[80px]">
            {{ calendarDayData.serviceUserNumber || 0 }}
          </div>
        </div>
        <div class="flex items-center px-[15px] pb-[24px] text-[14px] text-[#333] font-[400]">
          <div class="flex items-center">
            <el-icon class="text-[28px]">
              <svg-icon name="workbench-schedule" />
            </el-icon>
            <span class="ml-[10px]">日程</span>
          </div>
          <div class="flex-1 pl-[15px] pr-[17px]">
            <el-progress
              type="line"
              :percentage="
                calendarDayData?.scheduleNumber
                  ? (calendarDayData?.scheduleCompleteNumber / (calendarDayData?.scheduleNumber || 1)) * 100
                  : 0
              "
              color="linear-gradient( 90deg, #2D68F4 0%, #268AFF 100%)"
              :show-text="false"
              :stroke-width="7"
            />
          </div>
          <div class="w-[80px] flex items-center justify-between">
            <span>{{ calendarDayData.scheduleCompleteNumber }}/{{ calendarDayData.scheduleNumber }}</span>
            <el-icon class="cursor-pointer text-[14px] text-[#666]" @click="jumpPage('/flow/schedule')">
              <svg-icon name="workbench-schedule-right" />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="mb-[10px] rounded-[8px] bg-[#fff]">
        <div class="wrap-bock-title">
          系统排名
        </div>
        <div class="relative">
          <div class="flex items-center p-[15px] pl-0 text-[16px] font-[550]">
            <span class="title-left-line" />
            <span>用户热度排行</span>
            <el-icon v-if="userPlanList?.length" class="ml-[12px] cursor-pointer text-[16px]" @click="handleSortChange">
              <svg-icon v-if="sortUp" name="workbench-sort-up" />
              <svg-icon v-else name="workbench-sort-down" />
            </el-icon>
            <el-icon v-if="!userPlanList?.length" class="ml-[12px] cursor-pointer text-[16px]">
              <svg-icon name="workbench-sort-default" />
            </el-icon>
            <el-popover
              placement="bottom"
              title=""
              :width="350"
              effect="dark"
              trigger="hover"
              content="用于用户在系统中的活跃度排名（没有实际意义）"
            >
              <template #reference>
                <el-icon class="ml-[10px] text-[16px]">
                  <svg-icon name="workbench-question-mark" />
                </el-icon>
              </template>
            </el-popover>
          </div>

          <div v-if="userPlanList?.length" class="compliance-rate">
            <div v-for="(item, index) in userPlanList" :key="index" class="compliance-item flex items-center">
              <span class="sort-index" :class="{ 'top-sort': index < 3 }">
                {{ index + 1 + (pageInfo.pageIndex - 1) * 10 }}
              </span>
              <span class="compliance-item-name">{{ item.name }}</span>
              <span>{{ item.createTime }}</span>
            </div>
          </div>
          <div v-else class="compliance-rate text-center !h-[610px]">
            <div class="pt-[100px]">
              <el-icon class="ml-[10px] text-[160px]">
                <svg-icon name="workbench-empty" />
              </el-icon>
            </div>
            <div class="mt-[10] text-[15px] text-[#B8C4D1]">
              暂无数据
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div v-if="userPlanList?.length" class="px-[30px] py-[40px]">
          <el-pagination
            background
            size="small"
            layout="prev, pager, next"
            :total="pageInfo.total"
            :page-size="pageInfo.pageSize"
            :pager-count="3"
            :current-page="pageInfo.pageIndex"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="Dashboard">
import dayjs from 'dayjs'
import { type CalendarDateType, type CalendarInstance, ElMessage } from 'element-plus'
import ScheduleProcessBarChart from './components/charts/ScheduleProcessBarChart.vue'
import NewUsersLineChart from './components/charts/NewUsersLineChart.vue'
import { getBarChartData, getLineChartData, getUserSort } from '@/api/modules/dashboard'

// 用户管理看板
const panelData: any = ref({
  yesterdayAddUserNumber: 40,
  todayUserNumber: 50,
  yesterdayAddPlanNumber: 40,
  totalUserNumber: 951,
  module1: 12,
  module2: 120,
  module3: 653,
  module4: 58,
})
// 柱状图数据
const barChartData = ref([])
const getBarData = () => {
  getBarChartData({}).then((res: any) => {
    barChartData.value = res.data.records || []
  })
}
// 折线图数据
const lineChartData = ref([])
const getLineData = () => {
  getLineChartData({}).then((res: any) => {
    lineChartData.value = res.data.records || []
  })
}
// 用户计划达标率
const userPlanList: any = ref([])
const getUserPlanList = () => {
  getUserSort({}).then((res) => {
    userPlanList.value = res.data.records || []
  })
}
onMounted(() => {
  getUserPlanList()
  getBarData()
  getLineData()
})
// 日历-日程数据(某一个日期)
const calendarDayData: any = ref({})
// 日期选择器快捷键
const shortcuts = [
  {
    text: '近一个周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 7)
      return [start, end]
    },
  },
  {
    text: '近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 1)
      return [start, end]
    },
  },
  {
    text: '近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 3)
      return [start, end]
    },
  },
  {
    text: '近半年',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 6)
      return [start, end]
    },
  },
  {
    text: '近一年',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 12)
      return [start, end]
    },
  },
]
// 日程处理筛选时间
const scheduleTimes: any = ref([])
function scheduleTimeChange() {
  console.log(scheduleTimes.value)
}

// 用户路径达标率 分页参数
const pageInfo = ref({
  pageIndex: 1,
  pageSize: 10,
  total: 0,
})
function handleCurrentChange(num: number) {
  pageInfo.value.pageIndex = num
}
// 排序方式 true: asc 升序  false: desc倒叙
const sortUp = ref(false)
function handleSortChange() {
  pageInfo.value.pageIndex = 1
  sortUp.value = !sortUp.value
}

const timeRange: any = ref([])
function handleTimeChange() {
  console.log(timeRange.value)
}

const calendarDay = ref(new Date()) // 日历值
const calendarRange: any = ref([]) // 日历时间范围
const scheduleList = ref([])

watch(
  () => calendarDay.value,
  (val: any) => {
    if (val) {
      const statrDate = dayjs(new Date(val)).startOf('month').format('YYYY-MM-DD HH:mm:ss')
      const endDate = dayjs(new Date(val)).endOf('month').format('YYYY-MM-DD HH:mm:ss')
      calendarRange.value = [statrDate, endDate]
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

const calendar = ref<CalendarInstance>()
function selectDate(val: CalendarDateType) {
  if (!calendar.value) {
    return
  }
  calendar.value.selectDate(val)
}
// 获取日历日期下面的数据
const scheduleDayStatus: any = computed(() => {
  return (day) => {
    if (day) {
      const date = dayjs(new Date(day)).format('YYYY-MM-DD')
      const obj = scheduleList.value.find((val: any) => val.date === date)
      return obj || {}
    }
  }
})

function jumpPage(path) {
  // router.push({ path })
  ElMessage.warning(`跳转${path}，待开发`)
}

onMounted(() => {
  // 页面初始化，时间选择器 范围默认一个月
  const lastMonth = dayjs().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss')
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

  timeRange.value = [lastMonth, now]
  scheduleTimes.value = [lastMonth, now]

  // getMySchedule();
})
</script>

<style lang="scss" scoped>
.Workbench {
  overflow-y: auto;

  .Workbench-wrap-left {
    flex: 1;
    padding-right: 10px;
  }

  .Workbench-wrap-right {
    width: 306px;
    min-width: 306px;
  }

  .wrap-bock-title {
    padding: 15px;
    font-size: 16px;
    font-weight: 550;
    border-bottom: 1px solid #eee;
  }

  .title-left-line {
    display: inline-block;
    width: 4px;
    height: 24px;
    margin-right: 11px;
    background: #2d68f4;
    border-radius: 4px;
  }

  .user-manage-board {
    padding: 10px;

    .user-manage-item {
      flex: 1;
      padding: 15px;
      margin-right: 10px;
      text-align: center;
      cursor: pointer;
      background: #f9f9f9;
      border: 1px solid #f2f2f2;
      border-radius: 8px;

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        background: #f5f5f5;
      }

      .user-manage-name {
        margin-bottom: 10px;
        font-size: 14px;
        color: #6f737f;
      }

      .user-manage-num {
        font-size: 32px;
        font-weight: bold;
        color: #333;
      }
    }
  }

  .todo-list {
    padding: 10px;

    .todo-item {
      position: relative;
      flex: 1;
      padding: 15px;
      margin-right: 10px;
      cursor: pointer;
      background: #f9f9f9;
      border-radius: 8px;

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        opacity: 0.8;
      }

      .todo-item-name {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 400;
        color: #6f737f;
      }

      .todo-item-num {
        font-size: 32px;
        font-weight: bold;
        color: #333;
      }

      .todo-item-icon {
        position: absolute;
        top: 15px;
        right: 15px;
      }

      &.bg-orange {
        background: #fefaef;
      }

      &.bg-green {
        background: #f5fbf7;
      }

      &.bg-pink {
        background: #fff5f6;
      }
    }
  }

  .compliance-rate {
    height: 500px;
    padding: 0 30px;

    .compliance-item {
      padding: 13px 0;

      .sort-index {
        display: inline-block;
        width: 24px;
        height: 24px;
        font-size: 13px;
        line-height: 24px;
        color: #333;
        text-align: center;
        background: #f5faff;
        border: 1px solid #dbeafe;
        border-radius: 24px;

        &.top-sort {
          color: #fff;
          background: #2d68f4;
          border: none;
        }
      }

      .compliance-item-name {
        display: inline-block;
        width: 120px;
        padding: 0 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .dot-box {
    position: absolute;
    right: 0;
    bottom: 2px;
    left: 0;
    height: 22px;

    .dot-item {
      display: inline-block;
      width: 6px;
      height: 6px;
      margin: 0 5px;
      border-radius: 50%;

      &.red-dot {
        background: #f99596;
      }

      &.gray-dot {
        background: #a6a6a6;
      }
    }
  }
}
</style>

<style lang="scss">
.Workbench {
  .custom-calendar {
    .current,
    .prev,
    .next {
      height: 32px;
      margin-right: 8px;
      border: none;
    }

    .current {
      color: #666;
    }

    .prev,
    .next {
      color: #ccc;
    }

    .is-today {
      .el-calendar-day {
        color: #2d68f4;
        background: #fff;
        border: 1px solid #2d68f4;
      }
    }

    .is-selected {
      background: transparent;

      .el-calendar-day {
        color: #fff;
        background: #2d68f4;
      }
    }

    .el-calendar__header {
      border: none;
    }

    .el-calendar__body {
      padding: 0 20px 14px;
    }

    .el-calendar-day {
      width: 32px;
      height: 32px;
      padding: 0;
      margin: 0 auto;
      line-height: 32px;
      text-align: center;
      border-radius: 4px;

      &:hover {
        color: #fff;
        background: #2d68f4;
      }
    }
  }
}
</style>
