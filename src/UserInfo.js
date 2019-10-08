import React from 'react'
import {Segment, Header, Icon, Grid, Card, Image, List, Breadcrumb} from 'semantic-ui-react'
import { Link } from "react-router-dom"
import axios from 'axios'
import moment from 'moment'
import UserSearchField from './UserSearchField'

class UserInfo extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      loading: false,
      error: false,
      errorMsg: "",
      userInfo: {},
      userRepos: []
    }
  }

  componentDidMount(){
    if(this.props.match.params.username) this.fetchGithubUser()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      this.fetchGithubUser()
    }
  }

  fetchGithubUser = () => {
    this.setState({loading: true})
    const username = this.props.match.params.username
    axios.all([
      axios.get('https://cors-anywhere.herokuapp.com/http://api.github.com/users/' + username),
      axios.get('https://cors-anywhere.herokuapp.com/http://api.github.com/users/' + username + '/repos') //REMOVE CORS EVERYWHERE
    ])
    .then(res => {
      this.setState({
        loading:false,
        error: false,
        userInfo: res[0].data,
        userRepos: res[1].data
      })
    }).catch(error => this.setState({
      error: true,
      errorMsg: "Usuário do GitHub não encontrado.",
      loading: false
    }))

  }

  renderError = () => {
    return (
      <Segment placeholder textAlign="center">
        <Header icon>
          <Icon name='user x' color="red" />
          {this.state.errorMsg}
          <Header.Subheader>Tente buscar usuário novamente</Header.Subheader>
        </Header>
        <UserSearchField />
      </Segment>
    )
  }

  renderRepoList = () => {
    return this.state.userRepos.map((repo, i) =>
       (
        <List.Item key={i} >
          <List.Icon name='github' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header as={Link} to={"/user/"+repo.full_name}>{repo.name}</List.Header>
            <List.Description as='a'>Atualizado em: {moment(repo.updated_at).format("DD/MM/YYYY - HH:mm:ss")}</List.Description>
          </List.Content>
        </List.Item>
      )
    )
  }

  render(){
    const {userInfo} = this.state
    if(this.state.error) return this.renderError()
    else return (
        <Segment basic loading={this.state.loading}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Breadcrumb size="big">
                <Breadcrumb.Section link as={Link} to="/">Página Inicial</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>{userInfo.login}</Breadcrumb.Section>
              </Breadcrumb>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column widescreen={4} largeScreen={4} mobile={16}>
              <Card fluid>
                <Image src={userInfo.avatar_url} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{userInfo.name}</Card.Header>
                  <Card.Meta>
                    {userInfo.login} | ID: {userInfo.id}
                  </Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column widescreen={12} largeScreen={12} mobile={16}>
              <List divided relaxed>
                {this.renderRepoList()}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default UserInfo
