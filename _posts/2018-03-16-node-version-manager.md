---
layout: post
title:  "NVM (Node Version Manager)"
date:   2018-03-16
categories: tool
---

## Node.js의 버전은 너무 다양하다.
* 시간이 흐르고 흘러 어느덧 Node.js(이하 Node)의 LTS가 8.10.0이 되었고, 9.8.0까지 나왔다. 새로운 버전이 계속 릴리즈되면서 그 사이에 진행되었던 프로젝트들은 다양한 버전을 통해 개발되었고, 이를 위해 Node의 버전을 변경하며 해당 프로젝트를 확인해야하는 상황이 생기게 되었다. 이런 고생을 줄여줄 아주 고마운 도구가 있어 소개하려 한다.

## NVM ?
* Node Version Manager의 줄임말로 여러 개의 Node 버전을 간단하고 쉽게 설치 및 변경할 수 있게 해주는 도구이다.

## NVM 설치하기
* 설치는 간단하게 cURL과 Wget을 통해 할 수 있으며, 다음과 같다.
* cURL

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

* Wget

```
$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

* 설치가 완료되면 nvm 저장소는 ~/.nvm에 clone이 되고, 사용하는 환경에 따라 profile<sub>(~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc)</sub>에 다음과 같은 코드가 추가된다.
* 나의 경우에는 ~/.bash_profile에 자동으로 추가되었다.

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

* 설치가 완료되면 nvm --version을 통해 설치가 완료된 것을 확인할 수 있다.

```
$ administratorui-MacBook-Pro-169:~ namgyu$ nvm --version
0.33.8
```

## NVM 실행하기

### nvm ls

* nvm을 통해 설치한 Node가 리스트로 나온다.
* nvm이 아닌 머신에 미리 설치해둔 Node는 목록에 system으로 표시가 되어있다.

![nvm 1](/assets/img/nvm/nvm.1.png)

### nvm install

* nvm install를 통해 원하는 Node 버전을 설치할 수 있다.
* nvm install node만 쓰면 최신 버전의 Node가 설치된다.

![nvm 2](/assets/img/nvm/nvm.2.png)

* 특정 Node 버전을 설치하고 싶다면 nvm install (version)을 입력하면 된다.
* major만 입력할 경우 major의 최신 버전으로 설치한다.

![nvm 3](/assets/img/nvm/nvm.3.png)

### nvm use

* nvm use를 통해 설치한 여러 개의 Node 중에 원하는 Node 버전으로 변경할 수 있다.

![nvm 4](/assets/img/nvm/nvm.4.png)

### nvm uninstall

* nvm uninstall을 통해 설치된 Node를 삭제할 수 있다.

![nvm 5](/assets/img/nvm/nvm.5.png)

* 현재 사용중인 Node 버전을 uninstall이 불가능하므로 uninstall을 하기전에 다른 버전으로 변경 후 해야한다.

![nvm 6](/assets/img/nvm/nvm.6.png)

## Reference
* [NVM GitHub 바로가기](https://github.com/creationix/nvm)