import React from 'react'
import { Switch, Route } from "react-router-dom"
import Home from './Home'
import UserInfo from './UserInfo'
import RepositoryDetails from './RepositoryDetails'

class UserPage extends React.Component {

  render(){
    return (
      <Switch>
        <Route exact path="/user" component={Home} />
        <Route path={'/user/:username/:repository'} component={RepositoryDetails}/>
        <Route path={'/user/:username'} component={UserInfo}/>
      </Switch>
    )
  }
}

export default UserPage
