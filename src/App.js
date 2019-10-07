import React from 'react';
import {Segment} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import NavBar from './NavBar'
import UserPage from './UserPage'
import Home from './Home'

class App extends React.Component {

  render() {
    return (
      <Router>
        <Segment basic>
          <NavBar />
          <Segment attached="bottom">
            <Switch>
              <Route path="/user" component={UserPage} />
              <Route path="/" component={Home} />
            </Switch>
          </Segment>
        </Segment>
      </Router>
    );
  }
}

export default App;
