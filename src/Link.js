import React, { Component } from 'react'

class Link extends Component {
  render() {
    return (
      <div className='link-container'>
          <div>
            {this.props.link.description}
          </div>
          <a href={this.props.link.url} target='_blank' rel='noopener noreferrer'>
            {this.props.link.url}
          </a>
      </div>
    )
  } 
}

export default Link
