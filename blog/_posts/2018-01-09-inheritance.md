---
layout: post
title:  "상속 (Inheritance)"
date:   2018-01-09
categories: javascript
---

## 프로토타입 상속
* 자바스크립트 객체 간의 관계는 복사되는게 아니라 위임 연결이 맺어진 것
* 전형적인 프로토타입 스타일 코드

```javascript
function Foo(name) {
    this.name = name;
}

Foo.prototype.myName = function() {
    return this.name;
}

function Bar(name, label) {
    Foo.call(this, name);
    this.label = label;
}

Bar.prototype = Object.create(Foo.prototype); // 'Bar.prototype'를 'Foo.prototype'에 연결한다.

Bar.prototype.myLabel = funciton() {
    return this.label;
}

var a = new Bar("a", "obj a");
a.myName(); // "a"
a.myLabel(); // "obj a"
```

## ES6 이전과 이후

```javascript
// ES6 이전
Bar.prototype = Object.create(Foo.prototype); // 기존 'Bar.prototype'을 던져 버린다.

// ES6 이후
Object.setPrototypeOf(Bar.prototype, Foo.prototype); // 기존 'Bar.prototype'을 수정한다.

//polyfill
// Only works in Chrome and FireFox, does not work in IE:
Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
  obj.__proto__ = proto;
  return obj; 
}

```
* Object.create()를 쓰는 편이 사소하게 성능은 떨어지지만(던져 버린 객체를 나중에 가비지 콜렉트해야 하므로) 코드만 놓고 보면 ES6 이후 기법보다 오히려 더 짧고 가독성은 좋다.

## 클래스 관계 조사
* 보통 전통적인 클래스 지향 언어에서는 인스턴스(자바스크립트에서는 객체)의 상속 계통<sup>Inheritance Ancestry</sup>(위임 링크)을 살펴보는 것을 인트로스펙션<sup>Introspection</sup>(리플렉션<sup>Reflection</sup>)이라고 한다.

```javascript
function Foo() {
    // ...
}

Foo.prototype.blah = ...;

var a = new Foo();
```

```javascript
a instanceof Foo; //true
```
* 왼쪽에 일반 객체, 오른쪽에 함수를 피연산자로 둔 instanceof 연산자는 a의 [[Prototype]] 연쇄를 순회하면서 Foo.prototype가 가리키는 객체가 있는지 조사한다.
* 이 말은 대상 함수(.prototype 레퍼런스가 붙은 Foo)에 대해 주어진 객체 a의 계통만 살펴볼 수 있다.
* 2개의 객체 a, b가 있으면 instanceof 만으로는 두 객체가 서로 [[Prototype]] 연쇄를 통해 연결되어 있는지 알 수 없다.

```javascript
Foo.prototype.isPrototypeOf(a); //true
```
* Foo가 어떤 함수든 상관없이 다른 객체 테스트 시 사용할 객체(예제에선 Foo.prototype)만 있으면 된다.
* isPrototypeOf()는 a의 전체 [[Prototype]] 연쇄에 Foo.prototype이 있는지 찾는다.
* 다음과 같이 관계를 확인하고 싶은 객체를 2개 적어주기만 하면된다.
```javascript
// c의 [[Prototype]] 연쇄 어딘가에 b가 존재하는가
b.isPrototypeOf(c);
```

* ES5부터 지원하는 표준 메서드를 사용하면 다음과 같이 객체 [[Prototype]]을 곧바로 조회할 수도 있다.
```javascript
Object.getPrototypeOf(a) === Foo.prototype; //true
```

* 거의 모든 브라우저에서 내부의 [[Prototype]]을 들여다볼 수 있는 비표준 접근 방법
```javascript
a.__proto__ === Foo.prototype; //true
```

## Object.create()
```javascript
Object.create = function(o) {
    function F(){}
    F.prototype = o;
    return new F();
};
```
* 임시 함수 F를 이용하여 F.prototype 포로퍼티가 링크하려는 객체를 가리키도록 오버라이드한다.
* 그런 다음 new F()로 원하는 연결이 수립된 새 객체를 반환한다.