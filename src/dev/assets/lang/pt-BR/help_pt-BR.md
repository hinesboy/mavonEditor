@[toc](Directory)

Guia Markdown
===
> Detalhes: [http://commonmark.org/help/](http://commonmark.org/help/)

## **Negrito**
```
**negrito**
__negrito__
```
## *Itálico*
```
*itálico*
_itálico_
```
## Cabeçalho
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
## Linha Divisora
```
***
---
```
****
## ^Sobre^scrito & ~Sub~scrito
```
sobre x^2^
sub H~2~0
```
## ++Sublinhar++ & ~~Tachar~~
```
++sublinhar++
~~tachar~~
```
## ==Marcador==
```
==marcador==
```
## Citação

```
> citação 1
>> citação 2
>>> citação 3
...
```

## Listas
```
lista Numerada
1.
2.
3.
...

lista com marcadores
-
-
...
```

## Todo Listas

- [x] Tarefa 1
- [ ] Tarefa 2

```
- [x] Tarefa 1
- [ ] Tarefa 2
```

## Link
```
Link Texto
[Text](www.baidu.com)

Link Imagem
![Text](http://www.image.com)
```
## Código
\``` tipo

bloco de código

\```

\` código \`

```c++
int main()
{
    printf("hello world!");
}
```
`code`

## Tabela
```
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| esquerda | centro | direita |
```
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| esquerda | centro | direita |
| ---------------------- | ------------- | ----------------- |
## Rodapé
```
olá[^olá]
```

Olhe para baixo[^olá]

[^olá]: rodapé

## Emojis
Detalhes: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
```
:laughing:
:blush:
:smiley:
:)
...
```
:laughing::blush::smiley::)

## $\KaTeX$ Mathematics

Podemos mostrar fórmulas por exemplo：$x_i + y_i = z_i$ and $\sum_{i=1}^n a_i=0$
Podemos também mostrar em uma única linha:
$$\sum_{i=1}^n a_i=0$$
Detalhes: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## Layout

::: hljs-left
`::: hljs-left`
`esquerda`
`:::`
:::

::: hljs-center
`::: hljs-center`
`centro`
`:::`
:::

::: hljs-right
`::: hljs-right`
`direita`
`:::`
:::

## Definições

Termo 1

:   Definição 1

Termo 2 com *markup inline*

:   Definição 2

        { um pouco de código, parte da Definição 2 }

    Terceiro parágrafo da definição 2.

```
Termo 1

:   Definição 1

Termo 2 com *markup inline*

:   Definição 2

        { um pouco de código, parte da Definição 2 }

    Terceiro parágrafo da definição 2.

```

## Abreviações
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
A especificação HTML
é mantida pela W3C.
```
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
é mantida pela W3C.
```
