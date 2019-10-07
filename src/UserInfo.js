import React from 'react'

class UserInfo extends React.Component {

  render(){
    const {match} = this.props
    return (
      <>
        {JSON.stringify(match.params)}
      </>
    )
  }
}

export default UserInfo
