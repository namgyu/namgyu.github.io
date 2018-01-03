# 프로토타입 (Prototype)
## [[Prototype]]
* 명세에 따르면 자바스크립트 객체는 [[Prototype]]이라는 내부 프로퍼티가 있고 다른 객체를 참조하는 단순 레퍼런스로 사용한다.

```javascript
var anotherObject = {
    a: 2
};

// 'anotherObject'에 연결된 객체를 생성한다.
var myObject = Object.create(anotherObject);
myObject.a // 2;
```

![prototype 설명 1](https://pinkstarfish.github.io/img/javascript/prototype.1.png)

1. myObject는 anotherObject와 [[Prototype]]이 링크됐다.
1. myObject.a란 프로퍼티는 없지만 anoterhObject에서 2라는 값을 대신 찾아 프로퍼티 접근의 결과값으로 반환한다.
1. 만약, anotherObject에서도 못 찾으면 [[Prototype]] 연쇄를 다시 따라 올라간다.
1. 연쇄 끝에 이르러서도 프로퍼티가 발견되지 않으면 [[Get]]은 결과값으로 undefined를 반환한다.

## Object.prototype
* [[Prototype]] 연쇄가 끝나는 지점은 내장 프로토타입 Object.prototype에서 끝난다.

## 프로퍼티 세팅과 가려짐(shadowing)
```javascript
var anotherObject = {
    a: 2
};

var myObject = Object.create(anotherObject);

anotherObject.a; // 2
myObject.a;      // 2

anotherObject.hasOwnProperty("a"); // true
myObject.hasOwnProperty("a");      // false

myObject.a++;   // shadowing

anotherObject.a; // 2
myObject.a;      // 3

myObject.hasOwnProperty("a");      // true
```

* 겉보기엔 myObject.a++가 anotherObject.a 프로퍼티를 찾아 1만큼 값을 증가시킬 것 같지만 ++ 연산자는 결국 myObject.a = myObject.a + 1을 의미한다.
* 따라서 [[Prototype]]을 경유하여 [[Get]]을 먼저 찾고 anotherObject.a에서 현재 값 2를 얻은 뒤 1만큼 증가시킨 후, 그 결과값 3을 다시 [[Put]]으로 myObject에 새로운 가려짐 프로퍼티 a를 생성한 뒤 할당한다.

## 클래스 함수
```javascript
function Foo() {
    // something
}

Foo.prototype; // 객체 생성됨

var a = new Foo();
Object.getPrototypeOf(a) === Foo.prototype; // true
```

* new Foo()로 새 객체 a가 만들어지고, 이 객체는 Foo.prototype 객체와 내부적으로 [[Prototype]]과 연결이 맺어진다.

## 생성자

```javascript
function Foo() {
    // something
}

Foo.prototype.constructor === Foo;  //true

var a = new Foo();
a.consturctor === Foo; //true
```

|Foo||
| ---- | ---- |
|   prototype   | * |

<br>

|Foo.prototype|| 
| ---- | ---- |
|  constructor  | - |
| [[prototype]] | * |

<br>

|a||
| ---- | ---- |
| [[prototype]] | * |      

* Foo.prototype 객체에는 기본적으로 공용 프로퍼티 constructor가 세팅되는데, 이는 객체 생성과 관련된 함수(Foo)를 다시 참조하기 위한 레퍼런스다.


```javascript
function Foo() { /* */ }
Foo.prototype = { /**/ }; // 새 프로토타입 객체를 생성한다.

var a = new Foo();
a.constructor === Foo;    //false
a.constructor === Object; //true
```

* 결론적으로 a.constructor 같은 임의의 객체 프로퍼티는 실제로 기본 함수를 참조하는 레퍼런스라는 보장이 전혀 없다.
* 이를 통해 객체간의 상속을 만들 수 있다. (프로토타입 상속)