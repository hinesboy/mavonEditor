@[toc](目錄)

Markdown 語法簡介
=============
> [語法詳解](http://commonmark.org/help/)

## **粗體**
```
**粗體**
__粗體__
```
## *斜體*
```
*斜體*
_斜體_
```
## 標題
```
# 一級標題 #
一級標題
====
## 二級標題 ##
二級標題
----
### 三級標題 ###
#### 四級標題 ####
##### 五級標題 #####
###### 六級標題 ######
```
## 分割線
```
***
---
```
****
## ^上^角~下~標
```
上角標 x^2^
下角標 H~2~0
```
## ++下劃線++ ~~中劃線~~
```
++下劃線++
~~中劃線~~
```
## ==標記==
```
==標記==
```
## 段落引用
```
> 一級
>> 二級
>>> 三級
...
```

## 列表
```
有序列表
1.
2.
3.
...
無序列表
-
-
...
```

## 任務列表

- [x] 已完成任務
- [ ] 未完成任務

```
- [x] 已完成任務
- [ ] 未完成任務
```

## 鏈接
```
[鏈接](www.baidu.com)
![圖片描述](http://www.image.com)
```
## 代碼段落
\``` type

代碼段落

\```

\` 代碼塊 \`

```c++
int main()
{
    printf("hello world!");
}
```
`code`
## 表格(table)
```
| 標題1 | 標題2 | 標題3 |
| :--  | :--: | ----: |
| 左對齊 | 居中 | 右對齊 |
| ---------------------- | ------------- | ----------------- |
```
| 標題1 | 標題2 | 標題3 |
| :--  | :--: | ----: |
| 左對齊 | 居中 | 右對齊 |
| ---------------------- | ------------- | ----------------- |
## 腳註(footnote)
```
hello[^hello]
```

見底部腳註[^hello]

[^hello]: 一個註腳

## 表情(emoji)
[參考網站: https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
```
:laughing:
:blush:
:smiley:
:)
...
```
:laughing::blush::smiley::)

## $\KaTeX$公式

我們可以渲染公式例如：$x_i + y_i = z_i$和$\sum_{i=1}^n a_i=0$
我們也可以單行渲染
$$\sum_{i=1}^n a_i=0$$
具體可參照[katex文檔](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex支持的函數](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex文檔](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## 布局

::: hljs-left
`::: hljs-left`
`居左`
`:::`
:::

::: hljs-center
`::: hljs-center`
`居中`
`:::`
:::

::: hljs-right
`::: hljs-right`
`居右`
`:::`
:::

## 定義

術語一

:   定義一

包含有*行內標記*的術語二

:   定義二

        {一些定義二的文字或代碼}

    定義二的第三段

```
術語一

:   定義一

包含有*行內標記*的術語二

:   定義二

        {一些定義二的文字或代碼}

    定義二的第三段

```

## abbr
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
HTML 規範由 W3C 維護
```
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
HTML 規範由 W3C 維護
```

