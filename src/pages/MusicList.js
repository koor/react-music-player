import React, { Component } from 'react'
import MusicListItem from '../components/MusicListItem'

export default class MusicList extends Component {
  render() {
    let listEle = null
    listEle = this.props.musicList.map((item) => <li key={item.id}>{item.title}</li>)

    return (
      <ul>
        {listEle}
      </ul>
    )
  }
}