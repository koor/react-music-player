import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Pubsub from 'pubsub-js'
import $ from 'jquery'
import 'jplayer'
import '../static/css/reset.css'
import '../static/css/common.css'
import Header from './Header'
import Player from '../pages/Player'
import MusicList from '../pages/MusicList'
import { MUSIC_LIST } from '../config/musiclist'

export default class Root extends Component {
  constructor() {
    super()
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0],
      cycleModel: 'cycle'
    }
  }

  componentDidMount() {
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window',
      useStateClassSkin: true
    })

    this.playMusic(this.state.currentMusicItem)

    $('#player').bind($.jPlayer.event.ended, (e) => {
      switch (this.state.cycleModel) {
        case 'cycle':
          this.playNext('cycle')
          break
        case 'once':
          this.playNext('once')
          break
        case 'random':
          this.playNext('random')
          break
        default:
          
      }
    })

    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.setState({
        currentMusicItem: musicItem
      })
      this.playMusic(musicItem)
    })

    Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter(item => musicItem !== item)
      })
      this.playNext('next')
    })

    Pubsub.subscribe('PLAY_PREV', (msg, musicItem) => {
      this.playNext('prev')
    })

    Pubsub.subscribe('PLAY_NEXT', (msg, musicItem) => {
      this.playNext()
    })

    Pubsub.subscribe('CHANGE_CYCLE_MODEL', (msg) => {
      const MODEL = ['cycle', 'once', 'random']
      let currentModel = MODEL.indexOf(this.state.cycleModel)
      let newModel = (currentModel + 1) % 3
      this.setState({
        cycleModel: MODEL[newModel]
      })
    })
  }

  componentWillUnmount() {
    Pubsub.unSubscribe('PLAY_MUSIC')
    Pubsub.unSubscribe('DELETE_MUSIC')
    $('#player').unbind($.jPlayer.event.ended)
    Pubsub.unSubscribe('PLAY_PREV')
    Pubsub.unSubscribe('PLAY_NEXT')
    Pubsub.unSubscribe('CHANGE_CYCLE_MODEL')
  }

  playMusic() {
    $('#player').jPlayer('setMedia', {
      mp3: this.state.currentMusicItem.file
    }).jPlayer('play')
  }

  playNext(type = 'next') {
    let index = this.findMusicIndex(this.state.currentMusicItem)
    let newIndex = null
    let musicListLength = this.state.musicList.length
    switch (type) {
      case 'cycle':
        newIndex = (index + 1) % musicListLength
        break
      case 'once':
        newIndex = index
        break
      case 'random':
        newIndex = Math.floor(Math.random() * musicListLength)
        break
      case 'prev':
        newIndex = (index - 1 + musicListLength) % musicListLength
        break
      default:
        newIndex = (index + 1) % musicListLength
    }

    this.setState({
      currentMusicItem: this.state.musicList[newIndex]
    })
    this.playMusic()
  }

  findMusicIndex(musicItem) {
    return this.state.musicList.indexOf(musicItem)
  }

  render() {
    const player = () => (<Player currentMusicItem={this.state.currentMusicItem} cycleModel={this.state.cycleModel} />)
    const list = () => (<MusicList currentMusicItem={this.state.currentMusicItem} musicList={this.state.musicList} />)

    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={player} />
          <Route path="/list" component={list} />
        </div>
      </Router>
    )
  }
}