웹브라우저 엔진의 종류
================

# 웹브라우저 엔진이란 ?
* 위키피디아에서 웹브라우저 엔진 정의
    A web browser engine (sometimes called layout engine or rendering engine) is a program that renders marked up content (such as HTML, XML, image files, etc.) and formatting information (such as CSS, XSL, etc.).

* 다양한 웹브라우저 엔진을 알아둠으로써 크로스 브라우징을 할 수 있다.

# 웹브라우저 엔진의 종류
## 트라이던트(Trident)
* 마이크로소프트의 렌더링 엔진
* IE, 아웃룩, 윈도우 프로그램들의 미니 브라우저에 사용
* IE 8부터는 그나마 표준을 준수하였다.

## 게코 (Gecko)
* 모질라의 렌더링 엔진
* 파이어폭스, 썬더버드에 사용

## 웹킷 (Webkit)
* 애플에서 웹킷 프로젝트로 분리하여 개발한 렌더링 엔진
* 사파리, iOS, 안드로이드에서 사용 (크롬에서도 사용하였으나 블링크(Blink)로 변경)

## 블링크 (Blink)
* 구글의 렌더링 엔진
* 웹킷과 비슷하다

## 프레스토 (Presto)
* 오페라의 렌더링 엔진
* 오페라도 블링크로 변경, 더이상 사용하지 않는다

# 크로스 브라우징
* 렌더링 엔진이 다른 브라우저에서 제대로 된 페이지가 보이지 않는다. (IE가 늘 문제)
* IE 8은 어느정도 표준을 준수하고, IE 9이상부터는 CSS3를 지원한다.
* IE 7이하 버전에 대한 크로스 브라우징을 해야한다.

## IE를 버전 별로 대응하는 방법
### IE 핵(Hack)
    div {
        color: red;
        *color: blue; /* IE7이하 용 */
        _color : green; /* IE6 용 */
    }

### IE용 주석을 이용한 방법 (Conditional comments)
    <!--[if IE 7]>
    <link href="ie7.css" type="text/css" rel="stylesheet" />
    <![endif]-->

    <!--[if IE 6]>
    <p>당신은 구형 IE6을 사용하고 있습니다. 최신 브라우저를 통해 더 나은 웹을 경험해보세요.</p>
    <![endif]-->

    <!--[if lt IE 8]>
    <p>이 문구는 IE8이 포함되지않은 하위 브라우저, 즉 IE7,6에서 보여지게 됩니다.</p>
    <![endif]-->

* lt(less than) - 미만 (명시된 버전 미 포함)
* lte(less than or equal to) - 이하 (명시된 버전 포함)
* gt(greater than) - 초과 (명시된 버전 미 포함)
* gte(greater than or equal to) - 이상 (명시된 버전 포함)

### 메타를 이용한 IE모드
    <meta http-equiv="X-UA-Compatible" content="IE=7" />  <!-- IE 7로 렌더링 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />  <!-- 해당 브라우저가 할 수 있는 가장 최신 IE 버전으로 렌더링 -->
