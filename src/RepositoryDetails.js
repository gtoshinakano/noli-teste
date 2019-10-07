import React from 'react'
import {Segment, Breadcrumb, Grid, Header, Icon, List} from 'semantic-ui-react'
import { Link } from "react-router-dom"
import axios from 'axios'
import moment from 'moment'

class RepositoryDetails extends React.Component {

  constructor(props){
    super(props)
    this.state={
      loading: true,
      error: false,
      errorMsg: "",
      data: {}
    }
  }

  componentDidMount(){
    if(this.props.match.params.username && this.props.match.params.repository) this.fetchRepoInfo()
  }

  fetchRepoInfo = () => {
    const {username, repository} = this.props.match.params
    axios.get('https://cors-anywhere.herokuapp.com/http://api.github.com/repos/' + username + '/' + repository)
    .then(res => {
      this.setState({
        loading:false,
        error: false,
        data: res.data
      })
    }).catch(error => this.setState({
      error: true,
      errorMsg: "Repositório não encontrado",
      loading: false
    }))
  }

  renderError = () => {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name='github' color="red" />
          {this.state.errorMsg}
        </Header>
      </Segment>
    )
  }

  render(){
    const {match} = this.props
    const {data, error} = this.state
    if(error) return this.renderError()
    else return (
      <Segment basic loading={this.state.loading}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Breadcrumb size="big">
                <Breadcrumb.Section link as={Link} to="/">Página Inicial</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section link as={Link} to={"/user/" + match.params.username}>{match.params.username}</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>{match.params.repository}</Breadcrumb.Section>
              </Breadcrumb>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as='h1'>
                <Icon name='file code outline' />
                <Header.Content>{data.name}</Header.Content>
                <Header.Subheader>Repositório criado em :{moment(data.created_at).format("DD/MM/YYYY - HH:mm:ss")}</Header.Subheader>
              </Header>
              <List size="huge">
                <List.Item icon='github' content={data.owner ? "Desenvolvedor: " +  data.owner.login : ""} />
                <List.Item icon='code' content={data.language} />
                <List.Item icon='time' content={"Última atualização: " + moment(data.updated_at).format("DD/MM/YYYY - HH:mm:ss")} />
                <List.Item  icon='info circle' content={data.description ? data.description : "Repositório sem descrição"} />
                <List.Item  icon={data.private ? 'lock' : 'lock open'} content={data.private ? "Repositório Privado" : "Repositório Público"} />
                <List.Item icon="clone" as="i" content={"git clone " + data.html_url + ".git " + data.name} />


              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default RepositoryDetails
