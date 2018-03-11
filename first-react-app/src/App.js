import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Hello extends Component {
  render () {
    return (
      <p>hello, {this.props.name}</p>
    )
  }
}

class FormattedTime extends Component {
  render () {
    return (
      <p>formatted: {this.props.date.toLocaleTimeString()}</p>
    )
  }
}

class Clock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }

  componentDidMount () {
    this.timer = setInterval(() => this.tick(), 1000)
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  tick () {
    this.setState({
      date: new Date()
    })
  }

  render () {
    return (
      <div>
        <p>time: {this.state.date.toLocaleTimeString()}</p>
        <FormattedTime date={this.state.date} />
      </div>
    )
  }
}

class ToggleBtn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toggleStatus: true
    }
    // 绑定this的方法1
    // this.handleClick = this.handleClick.bind(this)
  }

  // 绑定this的方法2：xxx = () => {}
  // 方法传参：接收参数时，自定义参数在前，e在后
  handleClick (id, e) {
    // 箭头函数 () => ({})：因为返回的是一个对象，如果() => {xx: yy}会和普通函数体语法冲突，所以用括号包一层
    this.setState((prev) => ({
      toggleStatus: !prev.toggleStatus
    }))
    console.log(id)
  }

  render () {
    return (
      // 传参时：bind(this, 自定义参数)
      <button onClick={this.handleClick.bind(this, 1)}>{this.state.toggleStatus ? 'on' : 'off'}</button>
    )
  }
}

class ConditionalRendering extends Component {
  render () {
    let status = this.props.status
    if (status) {
      return (
        <p>props.status是true</p>
      )
    } else {
      return (
        <p>props.status是false</p>
      )
    }
  }
}

class Login extends Component {
  render () {
    return (
      <button onClick={this.props.onClick}>Login</button>
    )
  }
}
class Logout extends Component {
  render () {
    return (
      <button onClick={this.props.onClick}>Logout</button>
    )
  }
}
class LoginControl extends Component {
  constructor (props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.state = {
      loggedIn: false
    }
  }

  handleLogin () {
    this.setState({
      loggedIn: true
    })
  }

  handleLogout () {
    this.setState({
      loggedIn: false
    })
  }

  render () {
    let status = this.state.loggedIn
    let btn = null
    if (status) {
      btn = <Logout onClick={this.handleLogout}/>
    } else {
      btn = <Login onClick={this.handleLogin}/>
    }
    // {true && expression} 总是返回 expression，而 {false && expression} 总是返回 false
    // 因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。
    return (
      <div>
        {btn}
        <ConditionalRendering status={status}/>
        {
          status && 
          <p>status === true 时显示</p>
        }
      </div>
    )
  }
}

class WarningBanner extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {

    if (!this.props.warn) {
      return null
    } else {
      return (
        <span>warning!</span>
      )
    }
  }
}
class ToggleWarning extends Component {
  constructor (props) {
    super(props)
    this.state = {
      warn: true
    }
    this.toggleClick = this.toggleClick.bind(this)
  }

  toggleClick () {
    this.setState((prev) => ({
      warn: !prev.warn
    }))
  }

  render () {
    return (
      <div>
        <WarningBanner warn={this.state.warn}/>
        <button onClick={this.toggleClick}>{this.state.warn ? 'hide' : 'show'}</button>
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Hello name="lxf" />
        <Clock/> 
        <ToggleBtn />
        <ConditionalRendering status={true}/>
        <LoginControl/>
        <ToggleWarning/>
      </div>
    );
  }
}

export default App;
