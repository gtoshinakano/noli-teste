import React from 'react'
import { Switch, Route } from "react-router-dom"
import Home from './Home'
import UserInfo from './UserInfo'

class UserPage extends React.Component {

  render(){
    return (
      <Switch>
        <Route path={'/user/:username'} component={UserInfo}/>
        <Route path="/user" component={Home} />
      </Switch>
    )
  }
}

export default UserPage
