@[toc](Catalog)

Markdown Handbuch
===
> Details: [http://commonmark.org/help/](http://commonmark.org/help/)

## **Fett**
```
**fett**
__fett__
```
## *Kursiv*
```
*kursiv*
_kursiv_
```
## Überschriften
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
## Trennlinien
```
***
---
```
****
## ^Hoch^gestellt & ~Tief~gestellt
```
hochgestellt x^2^
tiefgestellt H~2~0
```
## ++Unterstrichen++ & ~~Durchgestrichen~~
```
++unterstrichen++
~~durchgestrichen~~
```
## ==Markiert==
```
==markiert==
```
## Zitat

```
> zitat 1
>> zitat 2
>>> zitat 3
...
```

## Liste
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

## Todo Liste

- [x] aufgabe 1
- [ ] aufgabe 2

```
- [x] aufgabe 1
- [ ] aufgabe 2
```

## Link
```
Text Link
[Text](www.baidu.com)

Link mit Bild
![Text](http://www.image.com)
```
## Code
\``` Typ

Codeblock

\```

\` code \`

```c++
int main()
{
    printf("hello world!");
}
```
`code`

## Tabelle
```
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| links | mitte | rechts |
```
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| links | mitte | rechts |
| ---------------------- | ------------- | ----------------- |
## Fußnote
```
hallo[^hallo]
```

Schau zum unteren Rand[^hallo]

[^hallo]: fussnote

## Emojis
Details: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
```
:laughing:
:blush:
:smiley:
:)
...
```
:laughing::blush::smiley::)

## $\KaTeX$ Mathematik

Formeln lassen sich darstellen z.b. ：$x_i + y_i = z_i$ und $\sum_{i=1}^n a_i=0$
Formeln können auf einer eigenen Zeile gerendert werden
$$\sum_{i=1}^n a_i=0$$
Details: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## Layout

::: hljs-left
`::: hljs-left`
`links`
`:::`
:::

::: hljs-center
`::: hljs-center`
`mitte`
`:::`
:::

::: hljs-right
`::: hljs-right`
`rechts`
`:::`
:::

## Liste von Definitionen

Term 1

:   Definition 1

Term 2 mit *inline markup*

:   Definition 2

        { ein wenig code, teil von Definition 2 }

    Dritter Absatz von Definition 2.

```
Term 1

:   Definition 1

Term 2 mit *inline markup*

:   Definition 2

        { ein wenig code, teil von Definition 2 }

    Dritter Absatz von Definition 2.

```

## Abkürzungen
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
Die HTML Spezifikation
wird gepflegt vom W3C.
```
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
Die HTML Spezifikation
wird gepflegt vom W3C.
```
