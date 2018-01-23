---
layout: post
title:  "HTML 잊기 쉬운 기본 정리"
date:   2016-09-25
categories: html/css
---

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
## HTML 4.0.1
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Strict//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">

## XHTML 1.0
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 4.01 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 4.01 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">

## XHTML 1.1
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

## HTML 5
    <!DOCTYPE html>

# 사용하지 말아야 할 태그
## font
* CSS에서 color, font-size, font-family로 지정

## center
* CSS의 'text-align:center'를 사용

# 사용을 지양하는 태그
## iframe
* 검색엔진과 접근성에 있어서 좋지 않다.

## big, small
* small요소는 HTML5에 남아 있지만, 둘다 CSS에서 font-size로 지정

## i, b, s
* i : Italic(이텔릭), b : Bold (굵게), s : Strike (취소 선)
* em(i에 대응), strong(b에 대응), del(s에 대응)으로 사용
