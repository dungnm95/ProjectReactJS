import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import axios from 'axios';

class Register extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      email:'',
      password: '',
      re_password: ''
    }
    this.SubmitForm = this.SubmitForm.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.getRePassword = this.getRePassword.bind(this);
  }
  getUsername(event){
    this.setState({username:event.target.value});
  }
  getPassword(event){
    this.setState({password:event.target.value});
  }
  getEmail(event){
    this.setState({email:event.target.value});
  }
  getRePassword(event){
    this.setState({re_password:event.target.value});
  }
  SubmitForm (event){
    self = this;
    if(this.state.password == this.state.re_password){
      axios({
        method: 'post',
        url: 'http://localhost:3000/register',
        data: {
          user: this.state.username,
          email: this.state.email,
          password: this.state.password
        }
      }).then(function(res) {
        alert(res.data.message);
        if(res.data.success){
          self.props.history.push("/login");
        }
      });
    }else {
      alert('These password do not matches');
    }
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Username" value={this.state.username} onChange={this.getUsername}/>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Email" value={this.state.email} onChange={this.getEmail}/>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Password" value={this.state.password} onChange={this.getPassword}/>
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Repeat password" value={this.state.re_password} onChange={this.getRePassword}/>
                  </InputGroup>
                  <Button color="success" block onClick={this.SubmitForm}>Create Account</Button>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
