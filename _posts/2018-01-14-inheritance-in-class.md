---
layout: post
title:  "상속 in Class"
date:   2018-01-14
categories: javascript
---

* 클래스 (Class)
    * Object Oriented (OO)
* 작동위임 (Behavior Delegation)
    * Ojects Linking to Other Objects (OLOO)

## 클래스 Object Oriented (OO)
* prototype을 이용한 클래스 상속

```javascript
function Widget(width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
}

Widget.prototype.render = function($where) {
    if (this.$elem) {
        this.$elem.css({
            width: this.width + 'px',
            height: this.height + 'px'
        }).appendTo($where);
    }
};

function Button(width, height, label) {
    // super
    Widget.call(this, width, height);
    this.label = label || 'Default';
    this.$elem = $('<button>').text(this.label);
}

Button.prototype = Object.create(Widget.prototype);

// overriding (shadowing)
Button.prototype.render = function($where) {
    // super
    Widget.prototype.render.call(this, $where);
    this.$elem.click(this.onClick.bind(this));
}

BUtton.prototype.onClick = function(evt) {
    console.log(this.label + ' 버튼이 클릭됨!');
}

$(document).ready(function() {
    var $body = $(document.body);
    var btn1 = new Button(125, 30, 'Hello');
    var btn2 = new Button(150, 40, 'World');

    btn1.render($body);
    btn2.render($body);
});
```

* ES6 class를 이용한 클래스 상속

```javascript
class Widget {
    constructor(width, height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    }

    // Widget.prototype.render와 같음
    render($where) {
        if (this.$elem) {
            this.$elem.css({
                width: this.width + 'px',
                height: this.height + 'px'
            }).appendTo($where);
        }
    }
}

// 파생 클래스 (derived class)
class Button extends Widget {
    constructor(width, height, label) {
        super(width, height);
        this.label = label || 'Default';
        this.$elem = $('<button>').text(this.label);
    }

    // Button.prototype.render와 같음
    // overriding (shadowing)    
    render($where) {
        super($where);  // TODO : 다시 확인
        this.$elem.click(this.onClick.bind(this));
    }
    
    // Button.prototype.onClick와 같음    
    onClick(evt) {
        console.log(this.label + ' 버튼이 클릭됨!');
    }
}

$(document).ready(
    // 위와 동일
);
```

* super()
    * 파생 클래스 생성자에서만 super()를 사용할 수 있다
    * 만약 파생 클래스가 아닌 클래스(extends를 사용하지 않은 클래스)나 함수에서 사용하려면 에러가 발생한다
    * 생성자 내의 this에 접근하기 전에 super()를 호출해야만 한다
    * super()는 this를 초기화하는 역할을 하기 때문에, super()를 호출하기 전에 this에 접근하려면 에러가 발생한다.
    * super()를 호출하지 않는 유일한 방법은 클래스 생성자에서 객체를 반환하는 것이다.

    ```javascript
    // 파생 클래스 (derived class)
    class Button extends Widget {
        // 생성자(constructor) 없음
    }

    // 위와 같음
    class Button extends Widget {
        // 파생 클래스에서 생성자(constructor)를 명시하려면 반드시 super()를 사용해야만 하고, 그렇지 않으면 에러가 발생한다
        // 클래스 선언에서 생성자를 사용하지 않는 경우, 클래스의 새 인스턴스를 만들 때 전달된 모든 인자와 함께 super()가 자동으로 호출된다
        constructor(...args) {
            super(...args);
        }
    }
    ```

## 작동위임 Ojects Linking to Other Objects (OLOO)
```javascript
var Widget = {
    init: function(width, height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    },
    insert: function($where) {
        if (this.$elem) {
            this.$elem.css({
                width: this.width + 'px',
                height: this.height + 'px'
            }).appendTo($where);
        }
    }
};

var Button = Object.create(Widget);

Button.setup = function(width, heigth, label) {
    // delegation
    this.init(width, height);
    this.label = label || 'Default';
    this.$elem = $('<button>').text(this.label);
};

Button.build = function($where) {
    // delegation
    this.insert($where);
    this.$elem.click(this.onClick.bind(this));
};

Button.onClick = function(evt) {
    console.log(this.label + ' 버튼이 클릭됨!');    
};

$(document).ready(function() {
    var $body = $(document.body);
    
    var btn1 = Object.create(Button);
    btn1.setup(125, 30, 'Hello');

    var btn2 = Object.create(Button);
    btn2.setup(150, 40, 'World');

    btn1.build($body);
    btn2.build($body);    
});
```
* OLOO 관점에서는 Widget이 부모도, Button이 자식도 아니다.
* Widget은 보통 객체로 갖가지 유형의 위젯이 위임하여 사용할 수 있는 유틸리티 창고 역할을 맡는다.
* Button은 단독으로 존재하는 객체일 뿐이다(Widget과 위임 링크를 맺은)
* 클래스 스타일에서처럼 render()와 같이 같은 이름의 메서드를 공유할 필요가 없다. (overriding 필요없어짐)
* 생성자, .prototype, new 등이 불필요하게 되어 훨씬 더 간단하게 디자인할 수 있다.
