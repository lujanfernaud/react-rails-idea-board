import React, { Component } from 'react'

class Idea extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this._handleClick.bind(this)
    this.handleDelete = this._handleDelete.bind(this)
  }

  render() {
    return (
      <div className="tile">
        <span className="deleteButton" onClick={this.handleDelete}>
          x
        </span>

        <h4 onClick={this.handleClick}>
          {this.props.idea.title}
        </h4>

        <p onClick={this.handleClick}>
          {this.props.idea.body}
        </p>
      </div>
    )
  }

  // private

  _handleClick() {
    this.props.onClick(this.props.idea.id)
  }

  _handleDelete() {
    this.props.onDelete(this.props.idea.id)
  }
}

export default Idea
