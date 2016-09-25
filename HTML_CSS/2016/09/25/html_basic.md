HTML 기본
========

# HTML vs XHTML
HTML은 닫는 태그를 안해놓아도, 다음으로 블록 요소가 오면 자동으로 닫는다.
하지만 XHTML은 닫는 태그를 써줘야한다. 이 방법이 더 실수를 범하지 않고 요소 구분이 확실하다.
## HTML
    <img src="/~" alt="이미지" >
## XHTML
    <img src="/~" alt="이미지" />


# DOCTYPE 종류
## Strict
* 엄격한 규격을 의미한다. center요소와 font요소 등을 사용하지 못 한다.

## Transitional
* 과도기적인 규격을 의미한다. center요소와 font요소 등 사라질 요소들에 대한 사용을 허용한다.

## Frameset
* 프레임을 사용하는 페이지를 나타낸다. 예전 나모 웹에디터 시절에 head.html, body.html등으로 프레임을 나눴던 때 쓰던거라 이젠 안쓴다.


# DOCTYPE의 종류별 선언
