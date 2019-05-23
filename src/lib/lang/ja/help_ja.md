@[toc](目次)

Markdown 文法ガイド
===
> Detailed: [http://commonmark.org/help/](http://commonmark.org/help/)

## **太字**
```
**太字**
__太字__
```
## *斜体*
```
*斜体*
_斜体_
```
## 見出し
```
# h1 #
h1
====
## h2 ##
h2
----
### h3 ###
#### h4 ####
##### h5 #####
###### h6 ######
```
## 横線
```
***
---
```
****
## ^上付き^文字 & ~下付き~文字
```
super x^2^
sub H~2~0
```
## ++下線++ & ~~取り消し線~~
```
++underline++
~~strikethrough~~
```
## ==蛍光ペン==
```
==mark==
```
## 引用

```
> quote 1
>> quote 2
>>> quote 3
...
```

## リスト
```
番号付きリスト
1.
2.
3.
...

箇条書きリスト
-
-
...
```

## Todoリスト

- [x] task 1
- [ ] task 2

```
- [x] task 1
- [ ] task 2
```

## リンク
```
Text Link
[Text](www.baidu.com)

Image Link
![Text](http://www.image.com)
```
## コード
\``` type

code block

\```

\` code \`

```c++
int main()
{
    printf("hello world!");
}
```
`code`

## 表
```
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
```
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
| ---------------------- | ------------- | ----------------- |

## 脚注
```
hello[^hello]
```

Look at the bottom[^hello]

[^hello]: footnote

## 絵文字
> Detailed: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
```
:laughing:
:blush:
:smiley:
:)
...
```
:laughing::blush::smiley::)

## $\KaTeX$ 数式
> Detailed: [KaTeXマニュアル](http://www.intmath.com/cg5/katex-mathjax-comparison.php)、[KaTeX function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)、[LaTeXマニュアル](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

We can render formulas for example：$x_i + y_i = z_i$ and $\sum_{i=1}^n a_i=0$  
We can also single-line rendering
$$\sum_{i=1}^n a_i=0$$

## レイアウト

::: hljs-left
`::: hljs-left`
`left`
`:::`
:::

::: hljs-center
`::: hljs-center`
`center`
`:::`
:::

::: hljs-right
`::: hljs-right`
`right`
`:::`
:::

## 定義リスト

Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

```
Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

```

## abbr
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
```
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
```
