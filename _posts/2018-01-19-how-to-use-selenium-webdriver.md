---
layout: post
title:  "Seleinum Webdriver 예제"
date:   2018-01-19
categories: testing
---

> [지난 포스팅](https://github.com/pinkstarfish/pinkstarfish.github.io/blob/master/posts/testing/2018/01/10/what-is-selenium-webdriver.md)에서 Selenium 자체에 대한 소개를 하였고, 이번 포스팅에서는 실제로 어떻게 사용할 수 있는지 설명하겠다

## 테스트 환경
* Java
* Node.js

## Vendor별 Webdriver

|Browser|Component|
|-------|---------|
|Chrome|[chromedriver(.exe)](http://chromedriver.storage.googleapis.com/index.html)|
|Internet Explorer|[IEDriverServer.exe](http://selenium-release.storage.googleapis.com/index.html)|
|Edge|[MicrosoftWebDriver.msi](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)|
|Firefox|[geckodriver(.exe)](https://github.com/mozilla/geckodriver/releases/)|
|Safari|[safaridriver](https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_0.html#//apple_ref/doc/uid/TP40014305-CH11-DontLinkElementID_28)|

* 테스팅할 브라우저의 webdriver는 위 표에서 각각 다운로드 받으면 된다
* safaridriver는 OS X El Capitan 및 macOS Sierra 용 Safari 10과 함께 제공되기 때문에 테스트하기 전에 Safari 10의 개발 메뉴에서 원격 자동화를 활성화하면 사용 가능하다

## 시나리오
1. Chrome을 연다
1. http://www.google.com 에 접속한다
1. 검색창을 찾는다 (google에서는 검색 input요소의 name 속성이 q로 되어있음)
1. 검색창에 'webdriver'를 입력한다
1. 입력한 검색어를 제출(submit)한다
1. 10초 동안 title이 입력한 검색어인 'webdriver'로 시작하는지 검사한다 (google에서는 검색 시 title이 '검색어 - Google 검색'로 변경됨)
1. 열려있는 Chrome을 닫는다

## Java
* Chrome 브라우저에서 테스팅을 하기 위해서 webdriver/chrome경로에 chromedriver를 다운로드 받는다 (경로는 적절한 곳에 받으면 된다)
* 이 예제에서는 Dependency 관리를 편하게 하기 위해 maven을 사용하였고, test는 JUnit을 사용하였다
* 다음과 같이 pom.xml에 선언하여 selenium-webdriver를 받는다

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>

        <groupId>com.org.seleniumTest</groupId>
        <artifactId>seleniumWithJava</artifactId>
        <version>1.0-SNAPSHOT</version>

        <properties>
            <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        </properties>

        <dependencies>
            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>4.12</version>
                <scope>test</scope>
            </dependency>

            <dependency>
                <groupId>org.seleniumhq.selenium</groupId>
                <artifactId>selenium-server</artifactId>
                <version>3.0.1</version>
            </dependency>
        </dependencies>
</project>
```
* src/test/java/SeleniumTest.java
```java
    import org.junit.Test;
    import org.openqa.selenium.By;
    import org.openqa.selenium.WebDriver;
    import org.openqa.selenium.WebElement;
    import org.openqa.selenium.chrome.ChromeDriver;
    import org.openqa.selenium.support.ui.ExpectedCondition;
    import org.openqa.selenium.support.ui.WebDriverWait;

    public class SeleniumTest {

        @Test
        public void searchWebdriver() {
            // 테스트할 브라우저인 Chrome을 가져온다
            WebDriver driver;
            System.setProperty("webdriver.chrome.driver", "webdriver/chrome/chromedriver");

            // 1) Chrome을 연다
            driver = new ChromeDriver();
            // 2) http://www.google.com 에 접속한다
            driver.get("http://www.google.com");

            System.out.println("[Prev] Page title is: " + driver.getTitle());

            // 3) 검색창을 찾는다
            WebElement element = driver.findElement(By.name("q"));
            // 4) 검색창에 'webdriver'를 입력한다
            element.sendKeys("webdriver");
            // 5) 입력한 검색어를 제출(submit)한다
            element.submit();

            System.out.println("[Next] Page title is: " + driver.getTitle());

            // 6) 10초 동안 title에 검색어인 'webdriver'로 시작하는지 검사한다
            (new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
                public Boolean apply(WebDriver d) {
                    return d.getTitle().toLowerCase().startsWith("webdriver");
                }
            });

            // 7) 열려있는 Chrome을 닫는다
            driver.quit();
        }
    }
```
* 다음과 같이 실행을 하면 Chrome 브라우저를 띄워 위에 시나리오대로 동작한다.
```
$ mvn test
```
* 성공 시 콘솔 화면

![selenium-with-java console 1](/assets/img/testing/selenium-with-java.1.png)

* 실패 시 콘솔 화면

![selenium-with-java console 2](/assets/img/testing/selenium-with-java.2.png)


## Node.js
* Chrome 브라우저에서 테스팅을 하기 위해 위에 있는 링크를 통해 chromedriver를 직접 npm을 통해 [chromedriver](https://www.npmjs.com/package/chromedriver)를 받는다
```
$ npm install chromedriver
```
* npm을 통해 [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver)를 받는다
```
$ npm install selenium-webdriver
```
* seleniumTest.js

```javascript
// 테스트할 브라우저인 Chrome을 가져온다
require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
// 1) Chrome을 연다
const driver = new Builder().forBrowser('chrome').build();

try {
    // 2) http://www.google.com 에 접속한다
    driver.get('http://www.google.com');

    driver.getTitle().then(title => {
        console.log(`[Prev] Page title is: ${title}`);
    });

    // 3) 검색창을 찾는다
    const element = driver.findElement(By.name('q'));   // driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN); 와 동일
    // 4) 검색창에 'webdriver'를 입력한다
    element.sendKeys('webdriver');
    // 5) 입력한 검색어를 제출(submit)한다
    element.submit();

    driver.getTitle().then(title => {
        console.log(`[Next] Page title is: ${title}`);
    });

    // 6) 10초 동안 title에 검색어인 'webdriver'로 시작하는지 검사한다
    driver.wait(until.titleMatches(/^asdf/g), 10000);
} finally {
    // 7) 열려있는 Chrome을 닫는다
    driver.quit();
}
```

* 다음과 같이 실행을 하면 Chrome 브라우저를 띄워 위에 시나리오대로 동작한다.
```
$ node seleniumTest.js
```
* 성공 시 콘솔 화면

![selenium-with-node console 1](/assets/img/testing/selenium-with-node.1.png)

* 실패 시 콘솔 화면

![selenium-with-node console 2](/assets/img/testing/selenium-with-node.2.png)

