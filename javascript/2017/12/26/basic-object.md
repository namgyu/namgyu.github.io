# 객체 (Objects)
## 객체
* 객체는 선언적(literal) 형식과 생성자(constructor) 형식, 두 가지로 정의
```javascript
// Object initialiser or literal
var myObj = {
    key: value
}

// Called as a constructor
var myObj = new Object();
myObj.key = value;
```

## literal vs. constructor
* literal 형식은 한 번의 선언으로 다수의 키/값 쌍을 프로퍼티로 추가할 수 있지만, constructor 형식은 한 번에 한 프로퍼티만 추가할 수 있다.

## 객체의 값 접근
* Property Access vs. Key Access
```javascript
var myObject = {
    a: 2
};

myObject.a;    // 2 (Property Access)
myObject["a"]; // 2 (Key Access)
```

* 객체 프로퍼티명은 언제나 문자열이다.
```javascript
var myObject = {};
myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";

myObject["true"];            // "foo"
myObject["3"];               // "bar"
myObject["[object Object]"]; // "baz"
```

* Computed Property Names (계산된 프로퍼티명 or 속성 계산명)
  * es6(ECMAScript 2015)에 추가
```javascript
var prefix = "foo";
var myObject = {
    [prefix + "bar"]: "hello",
    [prefix + "baz"]: "world"
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world
```

## 프로퍼티 서술자 (=데이터 서술자)
* ES5부터 모든 프로퍼티는 프로퍼티 서술자(Property Descriptor = Data Descriptor)로 표현된다.
```javascript
var myObject = {
    a: 2
};

// or

var myObject = {};
Object.defineProperty(myObject, "a", {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true
});

Object.getOwnPropertyDescriptor(myObject, "a");
// {
//     value: 2,
//     writable: true,
//     enumerable: true,
//     configurable: true
// }
```

* 쓰기 가능 (writable)
```javascript
var myObject = {};
Object.defineProperty(myObject, "a", {
    value: 2,
    writable: false,    // 쓰기 금지!
    configurable: true,
    enumerable: true
});

myObject.a = 3;
myObject.a; // 2
```

```javascript
'use strict';   // 엄격 모드
var myObject = {};
Object.defineProperty(myObject, "a", {
    value: 2,
    writable: false,    // 쓰기 금지!
    configurable: true,
    enumerable: true
});

myObject.a = 3; // TypeError
```

* 설정 가능 (configurable)
```javascript
var myObject = {
    a: 2
};
myObject.a = 3;
myObject.a; // 3

Object.defineProperty(myObject, "a", {
    value: 4,
    writable: true,
    configurabel: false,    // 설정 불가!
    enumerable: true
});

myObject.a: // 4
myObject.a = 5;
myObject.a; // 5

Object.defineProperty(myObject, "a", {
    value: 6,
    writable: true,
    configurable: true,
    enumerable: true
}); // TypeError

delete myObject.a;  // 삭제도 불가능!
myObject.a; // 5
```

* 열거 가능성 (enumerable)
    * enumerable의 true/false에 따라 for in 루프처럼 객체 프로퍼티를 열거하는 구문에서 해당 프로퍼티의 표출 여부를 결정하게 된다.

## 불변성(Immutabliity)
* 객체 자신과 직속 프로퍼티 특성만 불변으로 만들 뿐 다른 객체(배열, 객체, 함수 등)를 가리키는 레퍼런스가 있을 때 해당 객체의 내용까지 불변으로 만들지는 못한다.
```javascript
myImmutableObject.foo; // [1, 2, 3]
myImmutableObject.foo.push(4);
myImmutableObject.foo; // [1, 2, 3, 4]
```

* 객체 상수
```javascript
var myObject = {};
Object.defineProperty(myObject, "FAVORITE_NUMBER", {
    value: 42,
    writable: false,
    configurable: false
});
```

* 확장 금지
    * 객체에 더는 프로퍼티를 추가할 수 없게 차단하고 현재 프로퍼티는 있는 그대로 놔둠
```javascript
var myObject = {
    a: 2
};

Object.preventExtentions(myObject);

myObject.b = 3;
myObject.b; // undefined
```

```javascript
'use strict';
var myObject = {
    a: 2
};

Object.preventExtentions(myObject);

myObject.b = 3;
myObject.b; // TypeError
```

* 봉인
    * Object.seal()는 봉인된 객체를 생성한다.
    * 즉, 어떤 객체에 대해 Object.preventExtensions()를 실행하고 프로퍼티를 전부 configurable:false 처리한다.
    * 결과적으로는 더는 프로퍼티를 추가할 수 없을뿐더러 기존 프로퍼티를 재설정하거나 삭제할 수도 없다.
    * 물론 값은 얼마든지 바꿀 수 있다.

* 동결
    * Object.freeze()를 사용
    * Object.seal()을 적용하고 프로퍼티를 모두 writable:false 처리한다.

## [[Get]]과 [[Put]]
* [[Get]]
    * [[Get]]연산은 주어진 이름의 프로퍼티를 먼저 찾아보고 있으면 그 값을 반환한다.
    * 프로퍼티를 찾아보고 없으면 이 객체의 [[Prototype]]링크를 따라서 찾게된다.
    * 주어진 프로퍼티 값을 어떻게 해도 찾을 수 없으면 undefined를 반환한다.
```javascript
var myObject = {
    a: 2
};
myObject.b // undefined
```
* [[Put]]
    * [[Put]]을 실행하면 주어진 객체에 프로퍼티가 존재하는지 등 여러 가지 요소에 따라 이후 작동 방식이 달라진다.
        1. 프로퍼티가 접근 서술자이면 세터를 호출한다.
        1. 프로퍼티가 writable:false인 데이터 서술자이면 비엄격 모드에서 조용히 실패하고, 엄격모드는 TypeError가 발생한다.
        1. 이외에는 프로퍼티에 해당 값을 세팅한다.

```javascript
var myObject = {
    get a() {
        return 2;
    }
};

Object.defineProperty(
    myObject,   // 타깃
    "b",        // 프로퍼티명
    {           // 서술자
        get: function(){ return this.a * 2}
    }
);
myObject.a; // 2
myObject.b; // 4
```
## getter와 setter
```javascript
var myObject = {
    get a() {
        return this._a_;
    },
    set a(val) {
        this._a_ = val * 2;
    }
};

myObject.a = 2;
myObject.a; // 4
```