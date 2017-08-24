import React, { Component } from 'react'
import $ from 'jquery'
import 'jplayer'
import Header from './Header'
import Progress from './Progress'

let duration = null
export default class Root extends Component {
  static defaultProps = {

  }
  
  constructor() {
    super()
    this.state = {
      progress: 0
    }
  }

  handleOnProgressChange(progress) {
    // console.log(`form root: ${progress}`)
    $('#player').jPlayer('play', duration * progress)
  }

  componentDidMount() {
    $('#player').jPlayer({
      ready: function () {
        $(this).jPlayer('setMedia', {
          // mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
        }).jPlayer('play')
      },
      supplied: 'mp3',
      wmode: 'window',
      useStateClassSkin: true
    })

    $('#player').bind($.jPlayer.event.timeupdate, e => {
      duration = e.jPlayer.status.duration
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute
      })
    })
  }

  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate)
  }

  render() {
    return (
      <div>
        <Header />
        <Progress progress={this.state.progress} onProgressChange={this.handleOnProgressChange} />
      </div>
    )
  }
}