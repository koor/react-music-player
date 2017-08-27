import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Pubsub from 'pubsub-js'
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
      isPlay: true,
      leftTime: ''
    }
  }

  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, e => {
      duration = e.jPlayer.status.duration
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        volume: e.jPlayer.options.volume * 100,
        leftTime: this.formatTime(duration * ( 1 - this.state.progress / 100))
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

  playPrev() {
    Pubsub.publish('PLAY_PREV')
  }

  playNext() {
    Pubsub.publish('PLAY_NEXT')
  }

  changeCycleModel() {
    Pubsub.publish('CHANGE_CYCLE_MODEL')
  }

  formatTime(time) {
    let minute = Math.floor(time / 60)
    let second = Math.floor(time % 60)
    second = second < 10 ? `0${second}` : second
    return `${minute}:${second}`
  }

  render() {
    return (
      <div className="container-player">
        <h1 className="caption"><Link to="/list">播放列表 &gt;</Link></h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
            <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
            <div className="row mt20">
              <div className="left-time -col-auto">-{this.state.leftTime}</div>
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
                <i className="icon prev" onClick={this.playPrev.bind(this)}></i>
                <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={() => this.handlePlayChange()}></i>
                <i className="icon next ml20" onClick={this.playNext.bind(this)}></i>
              </div>
              <div className="-col-auto">
                <i className={`icon repeat-${this.props.cycleModel}`} onClick={this.changeCycleModel.bind(this)}></i>
              </div>
            </div>
          </div>
          <div className={`-col-auto cover spin ${this.state.isPlay ? 'running' : 'paused'}`}>
            <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title} />
          </div>
        </div>
      </div>



    )
  }
}