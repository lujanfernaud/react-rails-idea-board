import React, { Component } from 'react'
import axios from 'axios'

import Idea from './Idea'
import IdeaForm from './IdeaForm'

class IdeasContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ideas: [],
      editingIdeaId: null,
      notification: ''
    }

    this.addNewIdea = this._addNewIdea.bind(this)
    this.updateIdea = this._updateIdea.bind(this)
    this.resetNotification = this._resetNotification.bind(this)
    this.enableEditing = this._enableEditing.bind(this)
    this.deleteIdea = this._deleteIdea.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/ideas.json')
      .then(response => {
        this.setState({ ideas: response.data })
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <div>
          <button className="newIdeaButton" onClick={this.addNewIdea}>
            New Idea
          </button>
          <span className="notification">
            {this.state.notification}
          </span>
        </div>

        {
          this.state.ideas.map(idea => {
            if (this.state.editingIdeaId === idea.id) {
              return (
                <IdeaForm
                  idea={idea}
                  key={idea.id}
                  updateIdea={this.updateIdea}
                  titleRef={input => this.title = input}
                  resetNotification={this.resetNotification} />
              )
            } else {
              return (
                <Idea
                  idea={idea}
                  key={idea.id}
                  onClick={this.enableEditing}
                  onDelete={this.deleteIdea} />
              )
            }
          })
        }
      </div>
    )
  }

  // private

  _addNewIdea() {
    axios.post('http://localhost:3001/api/v1/ideas',
      {
        idea: {
          title: '',
          body: ''
        }
      })
      .then(response => {
        const ideas = [response.data].concat([...this.state.ideas])

        this.setState({ ideas: ideas, editingIdeaId: response.data.id })
      })
      .catch(error => console.log(error))
  }

  _updateIdea(idea) {
    const ideaIndex = this.state.ideas.findIndex(i => i.id === idea.id)
    const ideas = [...this.state.ideas]

    ideas[ideaIndex] = idea

    this.setState({ ideas: ideas, notification: 'All changes saved.' })
  }

  _resetNotification() {
    this.setState({ notification: '' })
  }

  _enableEditing(id) {
    this.setState({ editingIdeaId: id }, () => { this.title.focus() })
  }

  _deleteIdea(id) {
    axios.delete(`http://localhost:3001/api/v1/ideas/${id}`)
      .then(response => {
        const ideas = [...this.state.ideas]
        const filteredIdeas = ideas.filter(idea => idea.id !== id)

        this.setState({ ideas: filteredIdeas })
      })
      .catch(error => console.log(error))
  }
}

export default IdeasContainer
