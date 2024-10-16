import type { ComponentConfigModel } from '../../../utils'

export default {
  component: () => import('./radio'),
  groupName: '表单',
  icon: 'icon--elegant--radio-button-checked-outline',
  sort: 850,
  defaultSchema: {
    label: '单选框',
    type: 'radio',
    field: 'radio',
    input: true,
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '选项1',
        },
        {
          label: '选项2',
          value: '选项2',
        },
      ],
      size: 'default',
    },
  },
  config: {
    attribute: [
      {
        label: '字段名',
        type: 'input',
        field: 'field',
      },
      {
        label: '标题',
        type: 'input',
        field: 'label',
      },
      {
        label: '默认值',
        type: 'radio',
        field: 'componentProps.defaultValue',
      },
      {
        label: '尺寸',
        type: 'select',
        componentProps: {
          placeholder: '请选择',
          clearable: true,
          options: [
            {
              label: '大号',
              value: 'large',
            },
            {
              label: '中等',
              value: 'default',
            },
            {
              label: '小型',
              value: 'small',
            },
          ],
        },
        field: 'componentProps.size',
      },
      {
        label: '按钮模式',
        type: 'switch',
        field: 'componentProps.radioButton',
      },
      {
        label: '选项文本颜色',
        type: 'color-picker',
        layout: 'horizontal',
        field: 'componentProps.textColor',
        show: ({ values }) => {
          return values.componentProps.radioButton
        },
        describe: '按钮模式下生效',
      },
      {
        label: '选项按钮颜色',
        type: 'color-picker',
        layout: 'horizontal',
        field: 'componentProps.fill',
        show: ({ values }) => {
          return values.componentProps.radioButton
        },
        describe: '按钮模式下生效',
      },
      {
        label: '禁用',
        type: 'switch',
        field: 'componentProps.disabled',
      },
      {
        label: '隐藏',
        type: 'switch',
        field: 'componentProps.hidden',
      },
      {
        label: '选项管理',
        type: 'EOptionsEditor',
        layout: 'vertical',
        field: 'componentProps.options',
      },
      {
        label: '表单校验',
        type: 'ERuleEditor',
        layout: 'vertical',
        field: 'rules',
        describe: '校验规则需要配合表单使用',
      },
    ],
    event: [
      {
        type: 'change',
        describe: '值变化时',
      },
    ],
  },
} as ComponentConfigModel
