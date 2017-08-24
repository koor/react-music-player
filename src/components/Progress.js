import React, { Component } from 'react'
import './Progress.css'

export default class Progress extends Component {
  changeProgress(e) {
    let progressBar = this.refs.progressBar
    let progress = (e.pageX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth
    // console.log(progress)
    
    this.props.onProgressChange && this.props.onProgressChange(progress)
  }
  
  render() {
    return (
      <div ref="propgressBar" className="components-progress" ref="progressBar" onClick={e=>this.changeProgress(e)}>
        <div className="progress" style={{width: `${this.props.progress}%`}}></div>
      </div>
    )
  }
}