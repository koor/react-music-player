import React, { Component } from 'react'
import './Header.css'
// import logo from '../static/images/logo.png'

class Header extends Component {
  // constructor() {
  //     super();
  // }

  render() {
    return (
      <div className="components-header row">
        <img className="-col-auto" src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" width="40"/>
        <h1 className="caption">React Music Player</h1>
      </div>
    )
  }
}

export default Header