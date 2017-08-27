import React, { Component } from 'react'
import MusicListItem from '../components/MusicListItem'

export default class MusicList extends Component {
  render() {
    let listEle = null
    listEle = this.props.musicList.map((item) => <MusicListItem
      key={item.id}
      musicItem={item}
      focus={item === this.props.currentMusicItem} >{item.title}</MusicListItem>)

    return (
      <ul>
        {listEle}
      </ul>
    )
  }
}