@[toc](Catalog)  
  
Markdown помощь  
===  
> Подробнее: [http://commonmark.org/help/](http://commonmark.org/help/)  
  
## **Полужирный**  
```  
**Полужирный**  
__Полужирный__  
```  
## *Курсив*  
```  
*Курсив*  
_Курсив_  
```  
## Заголовок  
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
## Разделительная линия  
```  
***  
---  
```  
****  
## ^Верхний^индекс & ~Нижний~индекс  
```  
верхний x^2^  
нижний H~2~0  
```  
## ++Подчеркнутый++ & ~~Зачеркнутый~~  
```  
++Подчеркнутый++  
~~Зачеркнутый~~  
```  
## ==Отметка==  
```  
==Отметка==  
```  
## Цитата  
  
```  
> Цитата  
>> Цитата 2  
>>> Цитата 3  
...  
```  
  
## Список  
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
  
## Список задач  
  
- [x] Задача 1  
- [ ] Задача 2  
  
```  
- [x] Задача 1  
- [ ] Задача 2  
```  
  
## Ссылка  
```  
Ссылка  
[Текст](www.baidu.com)  
  
Ссылка изображения  
![Текст](http://www.image.com)  
```  
## Код  
\``` type  
  
code block  
  
\```  
  
\` code \`  
  
```c++  
int main()  
{  
 printf("hello world!");}  
```  
`code`  
  
## Таблица  
```  
| th1 | th2 | th3 |  
| :--  | :--: | ----: |  
| left | center | right |  
```  
| th1 | th2 | th3 |  
| :--  | :--: | ----: |  
| left | center | right |  
| ---------------------- | ------------- | ----------------- |  
## Сноска  
```  
Привет[^Привет]  
```  
  
Тут что-то непонятное[^Привет]  
  
[^Привет]: А тут объяснение  
  
## Emojis  
Подробнее: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)  
```  
:laughing:  
:blush:  
:smiley:  
:)  
...  
```  
:laughing::blush::smiley::)  
  
## $\KaTeX$ Mathematics  
  
Можно выводить такие формулы：$x_i + y_i = z_i$ and $\sum_{i=1}^n a_i=0$  
А также в одну строку:
$$\sum_{i=1}^n a_i=0$$  
Подробнее: 
- [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)
- [katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)
- [latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)  
  
## Разметка
  
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
  
## Список определений
  
Термин 1  
  
:   Определение 1  
  
Термин  2 с использованием *разметки*
  
:   Определение 2  
  
 { Какой-нибудь код, часть определения 2 }  
 Третий параграф определения 2.  
```  
Термин 1  
  
:   Определение 1  
  
Термин  2 с использованием *разметки*
  
:   Определение 2  
  
 { Какой-нибудь код, часть определения 2 }  
 Третий параграф определения 2.  
```  
  
## Сокращения
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
