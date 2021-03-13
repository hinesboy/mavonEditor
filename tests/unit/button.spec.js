import { mount } from '@vue/test-utils'
import MavonEditor from '@/mavon-editor.vue'
import autoTextarea from 'auto-textarea/auto-textarea.vue'

/*eslint-disable */
const factory = (propsData, mocks) => {
    return mount(MavonEditor, {
        propsData: {
            ...propsData
        },
        mocks: {
            ...mocks
        },
        stubs: {
            "v-autoTextarea": autoTextarea
        }
    })
}
let wrapper,
    buttonClass,
    textValue,
    htmlValue,
    textValueClass = '.auto-textarea-block',
    htmlValueClass = '.v-show-content-html.scroll-style.scroll-style-border-radius'

function checkButton(buttonClass, textValue, htmlValue) {
    expect(wrapper.find(buttonClass).exists()).toBe(true)
    wrapper.find(buttonClass).trigger('click')
    wrapper.vm.$nextTick(() => {
        expect(wrapper.find(textValueClass).text()).toEqual(textValue)
        expect(wrapper.find(htmlValueClass).text()).toEqual(htmlValue)
    })
}
describe('left-toolbars测试', () => {
    beforeEach(() => {
        wrapper = new factory({ d_words: null, value: " " })
    })
    afterEach(() => {
        wrapper.destroy()
    })

    it('粗体按钮', async () => {
        buttonClass = '.op-icon.fa.fa-mavon-bold'
        textValue = '**粗体**'
        htmlValue = '<p><strong>粗体</strong></p>'
        expect.assertions(6)
        await checkButton(buttonClass, textValue, htmlValue)
        textValue = '粗体'
        htmlValue = '<p>粗体</p>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('斜体按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-italic'
        let textValue = '*斜体*'
        let htmlValue = '<p><em>斜体</em></p>'
        await checkButton(buttonClass, textValue, htmlValue)
        textValue = '斜体'
        htmlValue = '<p>斜体</p>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('标题按钮', async () => {
        let buttonClass = '.op-header.popup-dropdown.transition span'
        let textValue = '# 一级标题'
        let htmlValue = '<h1><a id="_0"></a>一级标题</h1>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('下划线按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-underline'
        let textValue = '++下划线++'
        let htmlValue = '<p><ins>下划线</ins></p>'
        await checkButton(buttonClass, textValue, htmlValue)
        textValue = '下划线'
        htmlValue = '<p>下划线</p>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('下划线按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-underline'
        let textValue = '++下划线++'
        let htmlValue = '<p><ins>下划线</ins></p>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('中划线按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-strikethrough'
        let textValue = '~~中划线~~'
        let htmlValue = '<p><s>中划线</s></p>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('标记按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-thumb-tack'
        let textValue = '==标记=='
        let htmlValue = '<p><mark>标记</mark></p>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('上角标按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-superscript'
        let textValue = '^上角标^'
        let htmlValue = '<p><sup>上角标</sup></p>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('下角标按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-subscript'
        let textValue = '~下角标~'
        let htmlValue = '<p><sub>下角标</sub></p>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('居左按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-align-left'
        let textValue = '::: hljs-left\n\n居左\n\n:::'
        let htmlValue = '<div class="hljs-left">\n<p>居左</p>\n</div>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('居中按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-align-center'
        let textValue = '::: hljs-center\n\n居中\n\n:::'
        let htmlValue = '<div class="hljs-center">\n<p>居中</p>\n</div>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('居右按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-align-right'
        let textValue = '::: hljs-right\n\n居右\n\n:::'
        let htmlValue = '<div class="hljs-right">\n<p>居右</p>\n</div>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('段落引用', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-quote-left'
        let textValue = '> 段落引用'
        let htmlValue = '<blockquote>\n<p>段落引用</p>\n</blockquote>'
        await checkButton(buttonClass, textValue, htmlValue)
        textValue = '段落引用'
        htmlValue = '<p>段落引用</p>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('有序列表', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-list-ol'
        let textValue = '1.'
        let htmlValue = '<ol>\n<li></li>\n</ol>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('无序列表', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-list-ul'
        let textValue = '-'
        let htmlValue = '<ul>\n<li></li>\n</ul>'

        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('链接', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-link'
        let linktext = '.link-text.input-wrapper input'
        let linkaddr = '.link-addr.input-wrapper input'
        let surebutten = '.op-btn.sure'
        let textValue = '[mylink](http://xxx.com)'
        let htmlValue = '<p><a href=\"http://xxx.com\" target=\"_blank\">mylink</a></p>'

        await wrapper.find(buttonClass).trigger('click')
        wrapper.find(linktext).setValue('mylink')
        wrapper.find(linkaddr).setValue('http://xxx.com')
        await wrapper.find(surebutten).trigger('click')

        expect(wrapper.find(textValueClass).text()).toEqual(textValue)
        expect(wrapper.find(htmlValueClass).text()).toEqual(htmlValue)
    })

    it('图片链接添加', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-picture-o.dropdown.dropdown-wrapper'
        let addimagelink = '.op-image.popup-dropdown.transition div span'
        let linktext = '.link-text.input-wrapper input'
        let linkaddr = '.link-addr.input-wrapper input'
        let surebutten = '.op-btn.sure'
        let textValue = '![mylink](http://xxx.com)'
        let htmlValue = '<p><img src="http://xxx.com" alt="mylink" /></p>'

        await wrapper.find(buttonClass).trigger('click')
        await wrapper.find(addimagelink).trigger('click')
        wrapper.find(linktext).setValue('mylink')
        wrapper.find(linkaddr).setValue('http://xxx.com')
        await wrapper.find(surebutten).trigger('click')

        expect(wrapper.find(textValueClass).text()).toEqual(textValue)
        expect(wrapper.find(htmlValueClass).text()).toEqual(htmlValue)
    })

    it('代码块', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-code'
        let textValue = '```language\n\n```'
        let htmlValue = '<pre><code class="lang-language">\n</code></pre>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('表格', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-table'
        let textValue = `|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|`
        let htmlValue = '<table>\n' +
            '<thead>\n' +
            '<tr>\n' +
            '<th>column1</th>\n' +
            '<th>column2</th>\n' +
            '<th>column3</th>\n' +
            '</tr>\n' +
            '</thead>\n' +
            '<tbody>\n' +
            '<tr>\n' +
            '<td>content1</td>\n' +
            '<td>content2</td>\n' +
            '<td>content3</td>\n' +
            '</tr>\n' +
            '</tbody>\n' +
            '</table>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('上一步/下一步', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-undo'
        let textValue = 'first'
        let htmlValue = '<p>first</p>'
        await wrapper.setData({
            d_history: ['first', 'second', 'third'],
            d_history_index: 1
        })

        await checkButton(buttonClass, textValue, htmlValue)
        buttonClass = '.op-icon.fa.fa-mavon-repeat'
        textValue = 'second'
        htmlValue = '<p>second</p>'
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('清空', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-trash-o'
        let textValue = ''
        let htmlValue = ''
        await wrapper.setData({ d_value: 'first' })
        await checkButton(buttonClass, textValue, htmlValue)
    })

    it('保存', () => {
        let buttonClass = '.op-icon.fa.fa-mavon-trash-o'
        expect(wrapper.find(buttonClass).exists()).toBe(true)
    })
})
