import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import UserSearchField from './UserSearchField'

class NavBar extends React.Component {

  state = { activeItem: 'inicial' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return(
      <Menu attached='top' tabular>
        <Menu.Item
          name='inicial'
          as={Link}
          to="/"
          active={activeItem === 'inicial'}
          onClick={this.handleItemClick}
        >
          <Icon name='home' />
          Página Inicial
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <UserSearchField transparent />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar
