@[toc](Catalog)

Markdown Guide
===
> Detailed: [http://commonmark.org/help/](http://commonmark.org/help/)

## **太字**
```
**太字**
__太字__
```
## *イタリック*
```
*イタリック*
_イタリック_
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
## ^上付き^文字 & ~添~文
```
super x^2^
sub H~2~0
```
## ++下線++ & ~~取り消し線~~
```
++underline++
~~strikethrough~~
```
## ==マーク==
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
ol
1.
2.
3.
...

ul
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
Detailed: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
```
:laughing:
:blush:
:smiley:
:)
...
```
:laughing::blush::smiley::)

## $\KaTeX$ Mathematics

We can render formulas for example：$x_i + y_i = z_i$ and $\sum_{i=1}^n a_i=0$
We can also single-line rendering
$$\sum_{i=1}^n a_i=0$$
Detailed: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

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

## deflist

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
