import React from 'react'
import { Input } from 'semantic-ui-react'

class UserSearchField extends React.Component{

  render() {
    return(
      <Input
        {...this.props}
        icon={{ name: 'search', link: true }}
        placeholder='Buscar usuário GitHub...'

      />
    )
  }
}

export default UserSearchField
