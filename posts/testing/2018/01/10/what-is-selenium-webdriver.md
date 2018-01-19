# Selenium
> Selenium is a browser automation library. <br>
> Most often used for testing web-applications, Selenium may be used for any task that requires automating interaction with the browser.
* 직접 사람이 브라우저에서 조작을 하는 것이 아닌, 작성된 테스트 명령에 의해 브라우저에서 자동으로 조작이 이루어지게 한다

## Selenium Projects
|Logo|Desc|
|----|----|
|![Selenium IDE](http://www.seleniumhq.org/images/selenium-ide-logo.png)|[Selenium IDE](http://www.seleniumhq.org/projects/ide/)|
|![Selenium RC](http://www.seleniumhq.org/images/selenium-rc-logo.png)|[Selenium Remote Control](http://www.seleniumhq.org/docs/05_selenium_rc.jsp)|
|![Selenium Grid](http://www.seleniumhq.org/images/selenium-grid-logo.png)|[Selenium Grid](https://github.com/SeleniumHQ/selenium/wiki/Grid2)|
|![Selenium Webdriver](http://www.seleniumhq.org/images/selenium-logo.png)|[Selenium Webdriver](http://www.seleniumhq.org/docs/03_webdriver.jsp)|


## Selenium IDE
> Firefox 2 이상에서 테스트를 기록하고 재생할 수있게 해주는 Firefox 부가 기능입니다. Selenium Remote Control을 사용하여 테스트를 실행하는 코드를 생성하는데도 사용할 수 있습니다.


## Selenium RC
> 거의 모든 프로그래밍 언어와 테스트 프레임 워크를 사용하여 웹 브라우저를 로컬 또는 다른 컴퓨터에서 제어 할 수있는 클라이언트 / 서버 시스템입니다.

![Selenium RC 구성](http://www.seleniumhq.org/docs/_images/chapt5_img01_Architecture_Diagram_Simple.png)
* Selenium 1.0 = Selenium RC
* Selenium RC 구성
    * **Selenium Server**: 브라우저를 시작하고 죽이고 전달된 [Selenese 명령](http://www.seleniumhq.org/docs/05_selenium_rc.jsp#selenese-as-programming-code)을 해석하고 실행하며, HTTP 프록시 역할로 브라우저와 AUT(테스트중인 응용 프로그램<sup>Application Under Test</sup>)간에 전달되는 HTTP 메시지를 가로 채고 확인
    * **Client Libraries**: 각 프로그래밍 언어(Java, Python, .NET, Ruby)와 Selenium RC 서버 간의 인터페이스를 제공
* Selenium Server 실행
    ```
    $ java -jar selenium-server-standalone-\<version-number\>.jar
    ```
    * selenium-server-standalone 패키지에는 Grid를 실행하는데 필요한 hub, Webdriver(node), legacy RC(node)가 포함되어 있다


## Selenium Grid
> 여러 서버에서 동시에 여러 테스트를 실행하여 여러 브라우저 또는 운영 체제를 테스트하는 데 소요되는 시간을 줄여서 Selenium Remote Control을 다른 수준으로 끌어 올립니다.

![Selenium Grid 구성](http://docs.seleniumhq.org/selenium-grid.png)
* Selenium 1.0에서는 Selenium RC Server와 별도의 프로그램으로 Selenium Grid가 있었다 (Selenium Grid 1)
* Selenium 2.0(아래에 설명할 Selenium Webdriver를 일컫는다)이 나오면서 Selenium RC Server와 Selenium Grid가 병합되었다 (Selenium Grid 2)
    * [\[참고\]](https://www.guru99.com/introduction-to-selenium-grid.html) Grid 1 vs Grid 2

    |**Grid 1**|**Grid 2**|
    |------|------|
    |Selenium Grid 1 has its own remote control that is different from the Selenium RC server. They are two different programs.|Selenium Grid 2 is now bundled with the Selenium Server jar file|
    |You need to install and configure Apache Ant first before you can use Grid 1.|You do not need to install Apache Ant in Grid 2.|
    |Can only support Selenium RC commands/scripts.|Can support both Selenium RC and WebDriver scripts.|
    |You can only automate one browser per remote control.|One remote control can automate up to 5 browsers.|

* 여러 컴퓨터<sup>machine</sup>에 배포하여 병렬 실행한다
* 중앙 지점(hub)에서 여러 환경을 관리할 수 ​​있으므로 방대한 브라우저/OS 조합(node)에 대한 테스트를 쉽게 실행할 수 있다
* 가상 인프라를 활용할 수 있도록 사용자 지정 후크(~~뭘 말하는걸까~~)를 구현할 수 있으므로 그리드의 유지 관리 시간을 최소화 할 수 있다


## Selenium Webdriver
> 로컬 또는 원격 시스템에서 기본적으로 브라우저를 구동 할 수 있습니다.

* Selenium 1.0 + WebDriver = Selenium 2.0
* [WebDriver](https://github.com/w3c/webdriver)란?
    * User Agent의 제어<sup>control</sup>와 인트로스펙션<sup>introspection</sup>(객체의 메타데이터를 조사하는 과정)을 가능케하는 원격 제어 인터페이스<sup>remote control interface</sup>
* Webdriver의 통합으로 인해 일반적으로 **Selenium Webdriver**라고 부르며 Grid가 Selenium RC Server에 병합을 기준으로 보고 **Selenium Grid 2.0**이라고 부르기도 한다
* Selenium RC와 동일한 역할을 하며 Selenium RC API의 일부 제한 사항을 해결하면서, 더 간단하고 간결한 인터페이스로 되어있다
* Selenium Webdriver는 Selenium RC의 [동일 출처 정책](http://www.seleniumhq.org/docs/05_selenium_rc.jsp#the-same-origin-policy)(Same-origin Policy) 한계를 극복하였다
* vs. Selenium RC
    * Selenium RC는 브라우저가 로드되었을 때, 브라우저에 자바스크립트 함수들을 주입한 후에 AUT를 구동하기 위해 이 자바스크립트를 사용했다
    * 하지만 Selenium Webdriver는 이 테크닉을 사용하지 않고, 자동화를 지원하도록 구축된 브라우저를 사용하여 직접 브라우저를 구동한다
* Selenium Webdriver는 브라우저를 직접 실행하기 때문에, 브라우저와 테스트가 모두 동일한 시스템에서 실행되고 테스트에서 WebDriver API 만 사용하는 경우 Selenium Server를 실행할 필요가 없다
* Selenium Server를 사용하는 몇가지 이유
    * Selenium Grid를 사용하여 여러 물리적 또는 가상 컴퓨터<sup>machine</sup>(VM)에 테스트를 분배
    * 현재 시스템에 없는 특정 브라우저 버전의 원격 컴퓨터<sup>machine</sup>에 연결하려는 경우
    * You are not using the Java bindings (i.e. Python, C#, or Ruby) and would like to use [HtmlUnit Driver](http://www.seleniumhq.org/docs/03_webdriver.jsp#htmlunit-driver)


## Usage
1. Selenium Server([selenium-server-standalone](http://selenium-release.storage.googleapis.com/index.html)) 다운로드
1. hub 시작
    * hub는 모든 테스트 요청을 받고 알맞는 node에 분배하는 중심점
    * 다운로드받은 selenium-server-standalone 패키지 디렉토리 내에서 다음과 같이 실행
    ```
    $ java -jar selenium-server-standalone-\<version\>.jar -role hub
    ```
    * hub는 기본적으로 port 4444를 사용하여 자동으로 시작된다. 기본 port를 변경하려면 옵션으로 -port를 주어 실행하면 된다
    ```
    $ java -jar selenium-server-standalone-\<version\>.jar -role hub -port 1111
    ```
    * http://localhost:4444/grid/console 로 들어가면 hub의 상태를 볼 수 있다

1. node 시작
    * 새로운 Selenium Webdriver 기능을 사용하여 그리드를 실행할 것인지, Selenium RC 기능을 사용하여 그리드를 실행할지 또는 둘 모두를 동시에 실행할 것인지에 관계없이 다음과 같이 실행
    ```
    $ java -jar selenium-server-standalone-\<version\>.jar -role node -hub http://localhost:4444/grid/register
    ```
    * -role 옵션이 주어지고 hub가 아닌 경우에는 기본적으로 port는 5555가 된다

## 명령어로 node 설정
* [예시](https://github.com/SeleniumHQ/selenium/wiki/Grid2#optional-parameters)
```
-browser browserName=firefox,version=3.6,maxInstances=5,platform=LINUX
```

## JSON으로 hub 설정
* [hubconfig sample](https://github.com/SeleniumHQ/selenium/blob/master/java/server/src/org/openqa/grid/common/defaults/DefaultHub.json)
```
$ java -jar selenium-server-standalone.jar -role hub -hubConfig hubconfig.json
```


## JSON으로 node 설정
* 서버 버전 3.xx (>= beta4) [nodeconfig sample](https://github.com/SeleniumHQ/selenium/blob/master/java/server/src/org/openqa/grid/common/defaults/DefaultNodeWebDriver.json)
* 서버 버전 2.xx [nodeconfig sample](https://github.com/SeleniumHQ/selenium/blob/master/java/server/src/org/openqa/grid/common/defaults/DefaultHub.json)
```
$ java -jar selenium-server-standalone.jar -role node -nodeConfig nodeconfig.json
```
