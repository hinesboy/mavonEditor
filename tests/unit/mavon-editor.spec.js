import { mount } from '@vue/test-utils'
import MavonEditor from '@/mavon-editor.vue'
import autoTextarea from 'auto-textarea/auto-textarea.vue'

/*eslint-disable */
const factory = (propsData) => {
  return mount(MavonEditor, {
    propsData: {
      ...propsData
    },
    stubs: {
      "v-autoTextarea": autoTextarea
    }
  })
}

describe('snapshot', () => {
  it('snapshot', () => {
    const wrapper = new factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})

