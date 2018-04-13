import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';

class Login extends Component {
constructor(){
  super();
  this.state = {
    username: '',
    password: ''
  }
  this.SubmitForm = this.SubmitForm.bind(this);
  this.getUSername = this.getUSername.bind(this);
  this.getPassword = this.getPassword.bind(this);
}

SubmitForm (event){
  self = this;
  axios({
    method: 'post',
    url: 'http://localhost:3000/login',
    data: {
      user: this.state.username,
      password: this.state.password
    }
  }).then(function(res) {
    if(res.data.success){
      const cookies = new Cookies();
      cookies.remove('token_login',{path:'/'});
      //var d = new Date();
      //d.setTime(d.getTime() + 600);
      cookies.set('token_login', res.data.access_token, { path: '/' });
      return self.props.history.push("/dashboard");
    }else{
      alert(res.data.message);
    }
  });
}
getUSername(event){
  this.setState({username:event.target.value});
}
getPassword(event){
  this.setState({password:event.target.value});
}
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" value={this.state.username} placeholder="Username" onChange={this.getUSername} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" value={this.state.password} placeholder="Password" onChange={this.getPassword}/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.SubmitForm}>Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active onClick={()=>{this.props.history.push("/register");}}>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
