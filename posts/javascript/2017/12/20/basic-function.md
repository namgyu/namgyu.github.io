# 함수 (Functions)
> JavaScript에서, 함수는 다른 객체처럼 속성 및 메서드를 가질 수 있기에 일급(first-class) 객체입니다. 다른 객체와 함수를 구별하는 것은 함수는 호출될 수 있다는 것입니다. 간단히 말해, 함수는 Function 객체입니다.
## 일급 시민(first-class citizens)
1. 변수나 데이터에 할당할 수 있어야 한다.
1. 객체의 인자로 넘길 수 있어야 한다.
1. 객체의 리턴값으로 리턴할 수 있어야 한다.

```javascript
/* 함수 'myFunc' 선언 */
function myFunc(theObject) {
   theObject.brand = "Toyota";
 }

 /*
  * 변수 'mycar' 선언;
  * 새 객체를 만들고 초기화;
  * 'mycar'에 객체 참조를 할당
  */
 var mycar = {
   brand: "Honda",
   model: "Accord",
   year: 1998
 };

 /* Logs 'Honda' */
 console.log(mycar.brand);

 /* 객체 참조를 함수에 전달 */
 myFunc(mycar);

 /*
  * 함수에 의해 바뀌었기에 객체의
  * 'brand' 속성의 값으로 'Toyota' 출력.
  */
 console.log(mycar.brand);
```

## arguments 객체
* arguments : 현재 실행 중인 함수에 전달된 인수를 포함하는 배열 같은 객체
* arguments.callee : 현재 실행 중인 함수
  >경고: ECMAScript 제5판(ES5) 은 엄격 모드에서 arguments.callee()의 사용을 금합니다.    >function 식(expression)에 이름을 주거나 함수 자체를 호출해야 하는 곳에 function 선언을   >사용하여 arguments.callee() 사용을 피하세요.
* arguments.caller : 현재 실행 중인 함수를 호출한 함수
  >이전의 arguments.caller 속성은 현재 실행한 함수를 적용하여 제공했었습니다. 이 속성은 >삭제되었으며 더 이상 작동하지 않습니다
* arguments.length : 함수에 전달된 인수의 수

### arguments
```javascript
function foo(...args) {
  return arguments;
}
foo(1, 2, 3); // { "0": 1, "1": 2, "2": 3 }

function bar(a=1) {
  arguments[0] = 100;
  return a;
}
bar(10); // 10

function zoo(a) {
  arguments[0] = 100;
  return a;
}
zoo(10); // 100
```

### callee
```javascript
// 유명(named) 함수 식 사용
function factorial (n) {
    return !(n > 1) ? 1 : factorial(n - 1) * n;
}
[1,2,3,4,5].map(factorial);

// callee 사용
[1,2,3,4,5].map(function (n) {
    return !(n > 1) ? 1 : arguments.callee(n - 1) * n;
});
```

### callee보다 유명(named) 함수 식을 사용하자.
* 함수는 코드 내부에서 다른 함수처럼 호출될 수 있습니다
* 외부 범위(outer scope)에서 변수를 만들지 않습니다 (IE 8 아래는 제외하고)
* arguments 객체에 액세스하는 것보다 성능이 더 낫습니다

## getter와 setter
* get : 객체 속성을 그 속성이 검색되는 경우 호출되는 함수에 바인딩합니다.
  > * 숫자나 문자열로 구성된 식별자를 이용할 수 있습니다.
  > * getter는 절대로 매개변수를 가져서는 안 됩니다. (Incompatible ES5 change: literal getter and setter functions must now have exactly zero or one arguments 를 참조하세요.)
  > * 하나의 객체 리터럴에 또다른 getter나 데이터 바인딩은 불가능합니다. ({ get x() { }, get x() { } } 나 { x: ..., get x() { } } 는 사용할 수 없습니다.)
* set : 객체 속성을 그 속성을 설정하려는 시도가 있는 경우 호출되는 함수에 바인딩합니다.

### get
```javascript
var log = ['test'];
var obj = {
  get latest () {
    if (log.length == 0) return undefined;
    return log[log.length - 1]
  }
}
console.log (obj.latest); // "test"를 반환.

// delete연산자를 이용해 getter 삭제하기
delete obj.latest;
```

### set
```javascript
var language = {
  set current(name) {
    this.log.push(name);
  },
  log: []
}

language.current = 'EN';
console.log(language.log); // ['EN']

language.current = 'FA';
console.log(language.log); // ['EN', 'FA']

// delete연산자를 이용해 setter 삭제하기
delete o.current;
```

## 블록 레벨 함수
* ES2015 (ES6)를 시작으로 엄격 모드에서, 블록 내부 함수는 이제 그 블록 범위가 됩니다. ES6 이전에, 블록 레벨 함수는 엄격 모드에서 금지됐습니다.

```javascript
'use strict';

function f() { 
  return 1; 
}

{  
  function f() { 
    return 2; 
  }
}

f() === 1; // true

// 비엄격 모드에서는 f() === 2
```

### 비엄격 코드에서 블록 레벨 함수
* 한 마디로: 안됩니다. 비엄격 코드에서, 블록 내부 function 선언은 이상하게 동작합니다. 

```javascript
if (shouldDefineZero) {
   function zero() {     // 위험: 호환성 위험
      console.log("This is zero.");
   }
}
```

* ES2015는 shouldDefineZero가 false인 경우, 그러면 zero는 결코 정의되어서는 안된다고 합니다, 그 블록이 실행된 적이 없기에. 그러나, 이는 표준의 새로운 일부입니다. 역사상, 이는 지정되지 않은 채 방치되었고 일부 브라우저는 블록이 실행됐든 아니든 zero를 정의할 겁니다.

* 엄격 모드에서, ES2015를 지원하는 모든 브라우저는 이를 같은 식으로 다룹니다: zero는 shouldDefineZero가 true이고 if 블록 범위인 경우에만 정의됩니다.

* 조건부 함수를 정의하는 더 안전한 방법은 function 식을 변수에 할당하는 것입니다

```javascript
var zero;
if (0) {
   zero = function() {
      console.log("This is zero.");
   };
}
```

