import React from 'react';
import {Segment, Grid} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import NavBar from './NavBar'
import UserPage from './UserPage'
import Home from './Home'

class App extends React.Component {

  render() {
    return (
      <Router>
        <Grid centered>
          <Grid.Row>
            <Grid.Column widescreen={8} largeScreen={10} computer={10} mobile={16} tablet={16}>
              <Segment basic>
                <NavBar />
                <Segment attached="bottom">
                  <Switch>
                    <Route path="/user" component={UserPage} />
                    <Route path="/" component={Home} />
                  </Switch>
                </Segment>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Router>
    );
  }
}

export default App;
