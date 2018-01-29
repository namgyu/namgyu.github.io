---
layout: post
title:  "Karma"
date:   2018-01-04
categories: testing
---

## Karma란

<img src="https://karma-runner.github.io/assets/img/banner.png" width="144px">

* [Karma](https://github.com/karma-runner/karma)에 따르면 다음과 같이 설명을 한다.

    A simple tool that allows you to execute JavaScript code in multiple
    _real_ browsers.

    > The main purpose of Karma is to make your test-driven development easy,
    >  fast, and fun.

* 여러 브라우저 환경에서 JS를 실행시켜 주어, TDD를 편하고 빠르게 그리고 재밌게(~~뭐가 재밌는지는 모르겟지만~~) 할 수 있게 해준다.
* Karma는 [Jasmine](https://github.com/jasmine/jasmine), [Mocha](https://github.com/mochajs/mocha)와 같은 JS Testing Framework를 통해 만든 Test Code를 실행시키는 Test Runner이다.

## Karma는 어떻게 동작하는가
* Karma Version은 2.0으로 Testing Framework는 Jasmine으로 사용하여 설명하겠다.
* Karma는 [Node.js](https://nodejs.org/ko/) 환경에서 실행된다.
* [Karma 설치 및 실행](https://karma-runner.github.io/latest/intro/installation.html)은 다음과 같다.

```
# Install Karma:
$ npm install karma --save-dev

# Install plugins that your project needs:
$ npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev

# Run Karma:
$ ./node_modules/karma/bin/karma start

# If it sucks
$ npm install -g karma-cli
$ karma start
```

## karma init
* 다음과 같이 karma init을 통해 문답형으로 간단히 설정 파일을 생성할 수 있다.

![karma init](/assets/img/testing/karma-init.png)

## Configuration File
* karma init을 통해 문답형으로 간단히 세팅이 가능하나 각각 어떻게 설정파일에 들어가는지 알아보겠다.
* karma.conf.js에 세팅한 설정 값을 기반으로 실행하게 된다.
    * argument로 전달하지 않는 한 다음과 같은 순서로 Karma CLI는 설정 파일을 찾는다.
        * ./karma.conf.js
        * ./karma.conf.coffee
        * ./karma.conf.ts
        * ./.config/karma.conf.js
        * ./.config/karma.conf.coffee
        * ./.config/karma.conf.ts
* 자세한 설명은 [여기](https://karma-runner.github.io/2.0/config/configuration-file.html) 참고

### port
    * Karma는 자체적으로 웹서버를 띄운다. (일반적으로, http://localhost:9876/)
```javascript
module.exports = function(config) {
    config.set({
        ...
        // web server port
        port: 9876,
        ...
    })
}
```

### files
* source files와 test files이 있는 경로를 지정한다.(내부적으로 [minimatch](https://github.com/isaacs/minimatch) library를 사용한다)
```javascript
module.exports = function(config) {
    config.set({
        ...
        // list of files / patterns to load in the browser
        files: [
            '*.js',
            'test/**/*.js'
        ],
        ...
    })
}
```

### frameworks
* 사용할 Testing Framework를 지정한다.
```javascript
module.exports = function(config) {
    config.set({
        ...
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],
        ...
    })
}
```

### autoWatch
* true일 경우 파일 중 하나가 변경되면 다시 test를 실행한다.
```javascript
module.exports = function(config) {
    config.set({
        ...
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        ...
    })
}
```

### browsers
* 테스트를 실행하고 캡쳐할 브라우저들을 지정한다.
    * 기본적으로 다음과 같은 value를 사용할 수 있다.
        * Chrome (launcher requires karma-chrome-launcher plugin)
        * ChromeCanary (launcher requires karma-chrome-launcher plugin)
        * PhantomJS (launcher requires karma-phantomjs-launcher plugin)
        * Firefox (launcher requires karma-firefox-launcher plugin)
        * Opera (launcher requires karma-opera-launcher plugin)
        * IE (launcher requires karma-ie-launcher plugin)
        * Safari (launcher requires karma-safari-launcher plugin)
* 추가한 브라우저 value에 따라 브라우저 마다 http://localhost:9876를 띄워준다.
```javascript
module.exports = function(config) {
    config.set({
        ...
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome', 'Firefox'],
        ...
    })
}
```

### singleRun
* true이면 실행과 캡쳐가 끝나면 열었던 브라우저를 닫는다.
```javascript
module.exports = function(config) {
    config.set({
        ...
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
        ...
    })
}
```

### reporters
* 테스트한 결과를 다양한 리포터를 통해 확인할 수 있다.
```javascript
module.exports = function(config) {
    config.set({
        ...
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            'progress',
            'coverage',     // karma-coverage
            'kjhtml'        // karma-jasmine-html-reporter
        ],
        ...
    })
}
```

## Karma 실행 화면
* console

![karma console](/assets/img/testing/karma-console.png)

* karma-chrome-launcher

![karma chrome launcher](/assets/img/testing/karma-chrome-launcher.png)

* karma-coverage (reporter)

![karma coverage 1](/assets/img/testing/karma-coverage.1.png)

![karma coverage 2](/assets/img/testing/karma-coverage.2.png)

![karma coverage 3](/assets/img/testing/karma-coverage.3.png)

* karma-jasmine-html-reporter (reporter)

![karma jasmine html reporter](/assets/img/testing/karma-jasmine-html-reporter.png)
