import React from 'react'
import { Header, Icon, Segment} from 'semantic-ui-react'
import UserSearchField from './UserSearchField'

class Home extends React.Component {

  render(){
    return (
      <Segment placeholder textAlign="center">
        <Header icon>
          <Icon name='github' />
            Buscar usuário do GitHub
        </Header>
        <UserSearchField />
      </Segment>
    )
  }
}

export default Home
