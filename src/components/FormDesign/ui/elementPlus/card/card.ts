import { type PropType, defineComponent, h, renderSlot } from 'vue'
import { ElCard } from 'element-plus'
import type { ComponentSchema } from '../../../core'

export default defineComponent({
  props: {
    componentSchema: {
      type: Object as PropType<ComponentSchema>,
      required: true,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    return () => {
      const componentSchema = {
        ...props.componentSchema,
        header: props.componentSchema?.label ?? '',
      } as ComponentSchema
      const children = componentSchema.children ?? []
      delete componentSchema.children

      let vNodeClildren: any = null
      if (children.length) {
        vNodeClildren = () =>
          children.map((node: ComponentSchema) =>
            renderSlot(slots, 'node', { componentSchema: node }),
          )
      }
      else {
        vNodeClildren = () => [renderSlot(slots, 'default')]
      }
      return h(ElCard, componentSchema, {
        default: () => renderSlot(slots, 'edit-node', {}, vNodeClildren),
        header: () => renderSlot(slots, 'header'),
      })
    }
  },
})
