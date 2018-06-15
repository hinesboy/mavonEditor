@[toc](Catalogue)

Guide Markdown
==============
> Détail : [http://commonmark.org/help/](http://commonmark.org/help/)

## **Bold**
```
**bold**
__bold__
```
## *Italic*
```
*italic*
_italic_
```
## Header
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
## Dividing line
```
***
---
```
****
## ^Super^script & ~Sub~script
```
super x^2^
sub H~2~0
```
## ++Underline++ & ~~Strikethrough~~
```
++underline++
~~strikethrough~~
```
## ==Mark==
```
==mark==
```
## Quote

```
> quote 1
>> quote 2
>>> quote 3
...
```

## List
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
## Link

## Todo List

- [x] Équipe 1
- [ ] Équipe 2

```
- [x] Équipe 1
- [ ] Équipe 2
```

```
Text Link
[Text](www.baidu.com)

Image Link
![Text](http://www.image.com)
```
## Code
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

## Table
```
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
```
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
| ---------------------- | ------------- | ----------------- |
## Footnote
```
hello[^hello]
```

Look at the bottom[^hello]

[^hello]: footnote

## Emojis
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

## Layout

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
