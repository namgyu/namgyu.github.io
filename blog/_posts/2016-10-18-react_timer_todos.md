---
layout: post
title:  "React Timer & Todos"
date:   2016-10-18
categories: react
---

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class TimerAndTodos extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {items: [], text: '', secondsElapsed: 0};
    }

    tick() {
        /**
         *  Arrow function
         */
        // this.setState((prevState) => ({
        //     secondsElapsed: prevState.secondsElapsed + 1
        // }));

        this.setState(function(prevState){
            return {secondsElapsed: prevState.secondsElapsed + 1};
        });
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        var newItem = {
            text: this.state.text,
            id: Date.now()
        };

        /**
         *  Arrow function
         */
        // this.setState((prevState) => ({
        //     items: prevState.items.concat(newItem),
        //     text: ''
        // }));

        this.setState(function(prevState){
            return {
                items: prevState.items.concat(newItem),
                text: ''
            };
        });
    }

    /**
     *  React가 DOM에 삽입되기 직전에 실행된다.
     */
    componentWillMount() {

    }

    /**
     * React와 함께 제이쿼리 같은 다른 자바스크립트 라이브러리를 사용할 때 사용하는 React 메소드
     * AJAX 요청을 보내거나 setTimeout()이나 setInterval() 함수로 타이머를 설정할 때도 이 메소드를 사용
     * React 라이브러리와 React가 아닌 라이브러리를 통합하는데 주로 사용되는 컴포넌트 생명주기 메소드
     */
    componentDidMount() {
        /**
         *  Arrow function
         */
        // this.interval = setInterval(() => this.tick(), 1000);

        this.interval = setInterval(function(){
            this.tick();
        }.bind(this), 1000);
    }

    /**
     * React가 DOM에서 컴포넌트를 제거하고 소멸시키기 직전에 실행
     * componentDidMount() 메소드에서 초기화
     * componentWillUnmount() 메소드에서 해제
     */
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <h3>TIMER</h3>
                <SecondsElapsed seconds={this.state.secondsElapsed} />
                <h3>TODO</h3>
                <TodoList items={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} value={this.state.text} />
                <button>{'Add #' + (this.state.items.length + 1)}</button>
                </form>
            </div>
        );
    }
}

class SecondsElapsed extends React.Component {
    render() {
        return (
            <div>
                Seconds Elapsed: {this.props.seconds}
            </div>
        );
    }
}

class TodoList extends React.Component {
    render() {
        return (
            <ul>
            {this.props.items.map(item => (
                <li key={item.id}>{item.text}</li>
            ))}
            </ul>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('example'));

```