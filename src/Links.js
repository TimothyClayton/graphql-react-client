import React, { Component } from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const LINKS = gql`
  query {
    links {
      id
      url
      description
    }
  }
`

const NEW_LINKS = gql`
  subscription {
    newLink {
      id
      url
      description
    }
  }
`

class Links extends Component {
  _subscribeToNewLinks = subscribeToMore => {
    subscribeToMore({
      document: NEW_LINKS,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const newLink = subscriptionData.data.newLink

        return Object.assign({}, prev, {
          links: [newLink, ...prev.links],
          __typename: prev.links.__typename
        })
      }
    })
  }

  render() {
    return (
      <Query query={LINKS}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <div>Error</div>

          this._subscribeToNewLinks(subscribeToMore)

          const linksToRender = data.links

          return (
            <div>
              <h3>Neat Links</h3>
              <div>
                {linksToRender.map(link => <Link key={link.id} link={link} />)}
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Links
