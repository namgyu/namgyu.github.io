---
layout: post
title:  "브라우저 렌더링"
date:   2016-11-15
categories: browser
---

## 렌더링 과정
![렌더링 도식화](http://www.mateoclarke.com/public/images/browser-rendering.png)

## HTML -> DOM
* 바이트->문자->토큰->노드->객체 모델
* HTML 마크업을 문서 객체 모델(DOM:Document Object Model)로 변환
* DOM과 CSSOM은 서로 별개로 존재하는 데이터 구조

## CSS -> CSSOM
* 바이트->문자->토큰->노드->객체 모델
* CSS 마크업을 CSS 객체 모델(CSSOM:CSS Object Model)로 변환
* DOM과 CSSOM은 서로 별개로 존재하는 데이터 구조

## Render Tree
* DOM과 CSSOM 트리를 결합해서 렌더 트리를 생성
* 렌더 트리는 화면에 출력할 노드만 가짐

## Layout
* 레이아웃은 객체의 정확한 위치와 크기를 계산하는 과정

## Paint
* 다 만들어진 렌더 트리를 가져다 화면에 픽셀을 그리는 마지막 단계
