import React from 'react'
import { Form, Icon, Popup } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

class UserSearchField extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      value: "",
      loading: false,
      showMsg: false,
      msgText: "",
      redirect: false
    }
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  handleOpen = () => {
    this.setState({showMsg: true})
  }

  handleClose = () => {
    this.setState({showMsg: false})
  }

  handleSearch = () => {
    this.setState({loading: true})
    if(this.state.value.length > 2){
      this.setState({redirect: true, loading: false}, () => this.setState({redirect: false}))
    }else{
      this.setState({
        showMsg: true,
        msgText: "O nome do usuário deve conter no mínimo 3 caracteres",
        loading: false,
      })
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={'/user/' + this.state.value} />
    }
  }

  render() {
    return(
      <Form onSubmit={this.handleSearch}>
        {this.renderRedirect()}
        <Popup
          trigger={
            <Form.Input
              {...this.props}
              icon={<Icon name="search" link onClick={this.handleSearch} />}
              placeholder='Usuário GitHub'
              onChange={this.handleChange}
              value={this.state.value}
              loading={this.state.loading}
            />
          }
          content={this.state.msgText}
          disabled={!this.state.showMsg}
          open={this.state.showMsg}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          position='bottom left'
         />
      </Form>
    )
  }
}

export default UserSearchField
