import React, { Component } from 'react'
import $ from 'jquery'
import 'jplayer'
import Progress from '../components/Progress'
import './Player.css'

let duration = null
export default class Player extends Component {
  constructor() {
    super()
    this.state = {
      progress: 0,
      volume: 80,
      isPlay: true
    }
  }

  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, e => {
      duration = e.jPlayer.status.duration
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        volume: e.jPlayer.options.volume * 100
      })
    })
  }

  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate)
  }

  handleOnProgressChange(progress) {
    // console.log(`form root: ${progress}`)
    $('#player').jPlayer(this.state.isPlay ? 'play' : 'pause', duration * progress)
  }

  handleOnVolumeChange(progress) {
    // console.log(`form root: ${progress}`)
    $('#player').jPlayer('volume', progress)
    this.setState({
      volume: progress * 100
    })
  }

  handlePlayChange() {
    $('#player').jPlayer(this.state.isPlay ? 'pause' : 'play')
    this.setState({
      isPlay: !this.state.isPlay
    })
  }

  render() {
    return (
      <div className="container-player">
        <h1 className="caption">我的私人音乐坊 &gt;</h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
            <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
            <div className="row mt20">
              <div className="left-time -col-auto">-2:00</div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{ top: 5, left: -5 }}></i>
                <div className="volume-wrapper">
                  <Progress progress={this.state.volume} onProgressChange={this.handleOnVolumeChange.bind(this)} barColor='green' />
                </div>
              </div>
            </div>
            <div style={{ height: 10, lineHeight: '10px', marginTop: '20px' }}>
              <Progress progress={this.state.progress} onProgressChange={this.handleOnProgressChange.bind(this)} barColor='red' />
            </div>
            <div className="mt35 row">
              <div>
                <i className="icon prev"></i>
                <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={() => this.handlePlayChange()}></i>
                <i className="icon next ml20"></i>
              </div>
              <div className="-col-auto">
                <i className="icon repeat-cycle"></i>
              </div>
            </div>
          </div>
          <div className="-col-auto cover">
            <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title} />
          </div>
        </div>
      </div>



    )
  }
}