import React, { Component } from 'react'
import $ from 'jquery'
import 'jplayer'
import Header from './Header'
import Player from '../pages/Player'
import MusicList from '../pages/MusicList'
import { MUSIC_LIST } from '../config/musiclist'

export default class Root extends Component {
  constructor() {
    super()
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0]
    }
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
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <Header />
        {/* <Player currentMusicItem={this.state.currentMusicItem}/> */}
        <MusicList currentMusicItem={this.state.currentMusicItem} musicList={this.state.musicList} />
      </div>
    )
  }
}