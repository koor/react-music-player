import React, { Component } from 'react'
import './Progress.css'

export default class Progress extends Component {
  static defaultProps = {
    barColor: '#2F9842'
  }
  
  changeProgress(e) {
    let progressBar = this.progressBar
    let progress = (e.pageX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth
    this.props.onProgressChange && this.props.onProgressChange(progress)
  }

  render() {
    return (
      <div className="components-progress" ref={(ref) => this.progressBar = ref} onClick={e => this.changeProgress(e)}>
        <div className="progress" style={{ width: `${this.props.progress}%`, background: this.props.barColor }}></div>
      </div>
    )
  }
}