import React, { Component } from 'react'
import './MusicListItem.css'

export default class MusicListItem extends Component {
  render() {
    let musicItem = this.props.musicItem
    return (
      <li className="components-musiclistitem row">
        <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
        <p className="-col-auto delete"></p>
      </li>
    )
  }
}