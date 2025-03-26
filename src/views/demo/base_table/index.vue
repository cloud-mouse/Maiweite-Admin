<template>
  <div class="base-table">
    <PageHeader title="基础表格">
      <template #content>
        <p>基于 ProTable 的表格组件封装示例</p>
      </template>
    </PageHeader>

    <PageMain>
      <ProTable
        ref="proTableRef"
        height="100%"
        highlight-current-row
        :border="false"
        :columns="columns"
        :request-api="getTableList"
        :init-param="initParam"
        :data-callback="dataCallback"
        :tool-button="['refresh', 'search']"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader>
          <div class="flex">
            <el-button type="primary" :icon="CirclePlus" @click="handleAdd()">
              新增
            </el-button>
          </div>
        </template>
        <!-- 表格操作列 -->
        <template #operation="{ row }">
          <el-button type="primary" link @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button type="primary" link @click="handleView(row)">
            查看
          </el-button>
          <el-button type="danger" link @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </ProTable>
    </PageMain>

    <!-- 编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'edit' ? '编辑用户' : '查看用户'"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="80px"
        :disabled="dialogType === 'view'"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number v-model="form.age" :min="0" :max="150" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" type="textarea" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="form.status"
            active-value="1"
            inactive-value="0"
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button v-if="dialogType !== 'view'" type="primary" @click="handleSubmit">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { CirclePlus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import type { ColumnProps } from '@/components/ProTable/interface'
import PageHeader from '@/components/PageHeader/index.vue'
import PageMain from '@/components/PageMain/index.vue'
import ProTable from '@/components/ProTable/index.vue'

defineOptions({
  name: 'BaseTable',
})

// 表格列配置
const columns: ColumnProps[] = [
  { type: 'selection', width: 55 },
  { type: 'index', label: '序号', width: 80 },
  { prop: 'name', label: '姓名', search: { el: 'input' } },
  { prop: 'age', label: '年龄', width: 100, sortable: true },
  { prop: 'address', label: '地址', showOverflowTooltip: true },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    search: {
      el: 'select',
      props: {
        options: [
          { label: '启用', value: '1' },
          { label: '禁用', value: '0' },
        ],
      },
    },
    enum: [
      { label: '启用', value: '1', type: 'success' },
      { label: '禁用', value: '0', type: 'danger' },
    ],
  },
  { prop: 'operation', label: '操作', width: 200, fixed: 'right' },
]

// 初始化请求参数
const initParam = reactive({
  name: '',
  status: '',
})

// 对话框相关
const dialogVisible = ref(false)
const dialogType = ref<'edit' | 'view' | 'add'>('edit')
const formRef = ref<FormInstance>()
const form = reactive({
  id: '',
  name: '',
  age: 0,
  address: '',
  status: '1',
})

// 表单验证规则
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
  ],
  address: [
    { required: true, message: '请输入地址', trigger: 'blur' },
  ],
})

// 获取表格数据
const getTableList = async (params: any) => {
  // 这里模拟接口调用
  await new Promise(resolve => setTimeout(resolve, 1000))
  // 实际项目中替换为真实的接口调用
  // const res = await api.getTableData(params)
  return {
    code: 200,
    data: {
      list: [
        {
          id: 1,
          name: '张三',
          age: 18,
          address: '北京市朝阳区',
          status: '1',
        },
        {
          id: 2,
          name: '李四',
          age: 20,
          address: '上海市浦东新区',
          status: '0',
        },
      ],
      total: 100,
    },
  }
}

// 数据处理回调
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total,
  }
}
// 编辑
const handleAdd = () => {
  dialogType.value = 'add'
  dialogVisible.value = true
}
// 编辑
const handleEdit = (row: any) => {
  dialogType.value = 'edit'
  Object.assign(form, row)
  dialogVisible.value = true
}

// 查看
const handleView = (row: any) => {
  dialogType.value = 'view'
  Object.assign(form, row)
  dialogVisible.value = true
}

// 删除
const handleDelete = (row: any) => {
  ElMessageBox.confirm('确认删除该条数据吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    try {
      // 这里模拟接口调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      // 实际项目中替换为真实的接口调用
      // await api.deleteData(row.id)
      ElMessage.success('删除成功')
      // 刷新表格数据
      proTableRef.value?.getTableList()
    }
    catch (error) {
      console.error('删除失败:', error)
    }
  })
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value)
    return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // 这里模拟接口调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        // 实际项目中替换为真实的接口调用
        // await api.updateData(form)
        ElMessage.success('保存成功')
        dialogVisible.value = false
        // 刷新表格数据
        proTableRef.value?.getTableList()
      }
      catch (error) {
        console.error('保存失败:', error)
      }
    }
  })
}

// 表格实例
const proTableRef = ref()
</script>
