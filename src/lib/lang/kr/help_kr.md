@[toc](Catalog)


마크다운 가이드
===
> 자세히 보기: [http://commonmark.org/help/](http://commonmark.org/help/)

## **볼드체(굵게)**
```
**볼드체**
__볼드체__
```
## *이탈릭체(기울임꼴)*
```
*이탈릭체*
_이탈릭체_
```
## 헤더
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
## 구분선
```
***
---
```
****
## ^위^첨자 & ~아래~첨자
```
위첨자 x^2^
아래첨자 H~2~0
```
## ++밑줄++ & ~~취소선~~
```
++밑줄++
~~취소선~~
```
## ==마커==
```
==마커==
```
## 인용

```
> quote 1
>> quote 2
>>> quote 3
...
```

## 리스트
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

## 할일

- [x] task 1
- [ ] task 2

```
- [x] task 1
- [ ] task 2
```

## 링크
```
텍스트 링크
[Text](www.baidu.com)

이미지 링크
![Text](http://www.image.com)
```
## 코드블럭
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

## 테이블
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

## 이모티콘
Detailed: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
```
:laughing:
:blush:
:smiley:
:)
...
```
:laughing::blush::smiley::)

## $\KaTeX$ 수학공식

우리는 다음과 같이 함수를 만들 수 있습니다.：$x_i + y_i = z_i$ and $\sum_{i=1}^n a_i=0$
단일 항으로도 가능합니다.
$$\sum_{i=1}^n a_i=0$$
Detailed: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php) and [katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX) and [latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## 레이아웃

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
