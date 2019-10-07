import React from 'react'
import { Input } from 'semantic-ui-react'

class UserSearchField extends React.Component{

  render() {
    return(
      <Input
        {...this.props}
        icon={{ name: 'search', link: true }}
        placeholder='Usuário GitHub'
      />
    )
  }
}

export default UserSearchField
