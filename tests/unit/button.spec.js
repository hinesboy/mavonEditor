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
let textValueClass = '.auto-textarea-block'
let htmlValueClass = '.v-show-content-html.scroll-style.scroll-style-border-radius'
describe.only('toolbars测试', () => {
    let wrapper
    function checkButton(buttonClass, inputValue, htmlValue) {
        expect(wrapper.find(buttonClass).exists()).toBe(true)
        wrapper.find(buttonClass).trigger('click')
        wrapper.vm.$nextTick(() => {
            expect(wrapper.find(textValueClass).text()).toEqual(inputValue)
            expect(wrapper.find(htmlValueClass).text()).toEqual(htmlValue)
        })
    }

    beforeEach(() => {
        wrapper = new factory({ d_words: null, value: " " })
    })
    afterEach(() => {
        wrapper.destroy()
    })

    it('粗体按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-bold'
        let eInputValue = '**粗体**'
        let eHtmlValue = '<p><strong>粗体</strong></p>'
        expect.assertions(6)
        await checkButton(buttonClass, eInputValue, eHtmlValue)
        eInputValue = '粗体'
        eHtmlValue = '<p>粗体</p>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('斜体按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-italic'
        let eInputValue = '*斜体*'
        let eHtmlValue = '<p><em>斜体</em></p>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
        eInputValue = '斜体'
        eHtmlValue = '<p>斜体</p>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('标题按钮', async () => {
        let buttonClass = '.op-header.popup-dropdown.transition span'
        let eInputValue = '# 一级标题'
        let eHtmlValue = '<h1><a id="_0"></a>一级标题</h1>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('下划线按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-underline'
        let eInputValue = '++下划线++'
        let eHtmlValue = '<p><ins>下划线</ins></p>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
        eInputValue = '下划线'
        eHtmlValue = '<p>下划线</p>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('下划线按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-underline'
        let eInputValue = '++下划线++'
        let eHtmlValue = '<p><ins>下划线</ins></p>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('中划线按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-strikethrough'
        let eInputValue = '~~中划线~~'
        let eHtmlValue = '<p><s>中划线</s></p>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('标记按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-thumb-tack'
        let eInputValue = '==标记=='
        let eHtmlValue = '<p><mark>标记</mark></p>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('上角标按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-superscript'
        let eInputValue = '^上角标^'
        let eHtmlValue = '<p><sup>上角标</sup></p>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('下角标按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-subscript'
        let eInputValue = '~下角标~'
        let eHtmlValue = '<p><sub>下角标</sub></p>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('居左按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-align-left'
        let eInputValue = '::: hljs-left\n\n居左\n\n:::'
        let eHtmlValue = '<div class="hljs-left">\n<p>居左</p>\n</div>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('居中按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-align-center'
        let eInputValue = '::: hljs-center\n\n居中\n\n:::'
        let eHtmlValue = '<div class="hljs-center">\n<p>居中</p>\n</div>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('居右按钮', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-align-right'
        let eInputValue = '::: hljs-right\n\n居右\n\n:::'
        let eHtmlValue = '<div class="hljs-right">\n<p>居右</p>\n</div>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('段落引用', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-quote-left'
        let eInputValue = '> 段落引用'
        let eHtmlValue = '<blockquote>\n<p>段落引用</p>\n</blockquote>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
        eInputValue = '段落引用'
        eHtmlValue = '<p>段落引用</p>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('有序列表', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-list-ol'
        let eInputValue = '1.'
        let eHtmlValue = '<ol>\n<li></li>\n</ol>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('无序列表', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-list-ul'
        let eInputValue = '-'
        let eHtmlValue = '<ul>\n<li></li>\n</ul>'

        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('链接', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-link'
        let linktext = '.link-text.input-wrapper input'
        let linkaddr = '.link-addr.input-wrapper input'
        let surebutten = '.op-btn.sure'
        let eInputValue = '[mylink](http://xxx.com)'
        let eHtmlValue = '<p><a href=\"http://xxx.com\" target=\"_blank\">mylink</a></p>'

        await wrapper.find(buttonClass).trigger('click')
        wrapper.find(linktext).setValue('mylink')
        wrapper.find(linkaddr).setValue('http://xxx.com')
        await wrapper.find(surebutten).trigger('click')

        expect(wrapper.find(textValueClass).text()).toEqual(eInputValue)
        expect(wrapper.find(htmlValueClass).text()).toEqual(eHtmlValue)
    })

    it('图片链接添加', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-picture-o.dropdown.dropdown-wrapper'
        let addimagelink = '.op-image.popup-dropdown.transition div span'
        let linktext = '.link-text.input-wrapper input'
        let linkaddr = '.link-addr.input-wrapper input'
        let surebutten = '.op-btn.sure'
        let eInputValue = '![mylink](http://xxx.com)'
        let eHtmlValue = '<p><img src="http://xxx.com" alt="mylink" /></p>'

        await wrapper.find(buttonClass).trigger('click')
        await wrapper.find(addimagelink).trigger('click')
        wrapper.find(linktext).setValue('mylink')
        wrapper.find(linkaddr).setValue('http://xxx.com')
        await wrapper.find(surebutten).trigger('click')

        expect(wrapper.find(textValueClass).text()).toEqual(eInputValue)
        expect(wrapper.find(htmlValueClass).text()).toEqual(eHtmlValue)
    })

    it('代码块', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-code'
        let eInputValue = '```\nlanguage\n\n```'
        let eHtmlValue = '<pre><code class="lang-">language\n\n</code></pre>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('表格', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-table'
        let eInputValue = `|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|`
        let eHtmlValue = '<table>\n' +
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
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('上一步/下一步', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-undo'
        let eInputValue = 'first'
        let eHtmlValue = '<p>first</p>'
        await wrapper.setData({
            d_history: ['first', 'second', 'third'],
            d_history_index: 1
        })

        await checkButton(buttonClass, eInputValue, eHtmlValue)
        buttonClass = '.op-icon.fa.fa-mavon-repeat'
        eInputValue = 'second'
        eHtmlValue = '<p>second</p>'
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('清空', async () => {
        let buttonClass = '.op-icon.fa.fa-mavon-trash-o'
        let eInputValue = ''
        let eHtmlValue = ''
        await wrapper.setData({ d_value: 'first' })
        await checkButton(buttonClass, eInputValue, eHtmlValue)
    })

    it('保存', () => {
        let buttonClass = '.op-icon.fa.fa-mavon-trash-o'
        //检查字体加粗元素是否渲染
        expect(wrapper.find(buttonClass).exists()).toBe(true)
    })
})