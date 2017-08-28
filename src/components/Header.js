import React, { Component } from 'react'
import './Header.css'
import logo from '../static/images/logo.png'

class Header extends Component {
  render() {
    return (
      <div className="components-header row">
        <img className="-col-auto" src={logo} alt="logo" width="40"/>
        <h1 className="caption">React Music Player</h1>
      </div>
    )
  }
}

export default Header