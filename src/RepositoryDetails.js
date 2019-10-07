import React from 'react'

class RepositoryDetails extends React.Component {

  render(){
    const {match} = this.props
    return (
      <>
        {match.params.repo}
      </>
    )
  }
}

export default RepositoryDetails
