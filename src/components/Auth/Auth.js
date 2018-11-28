import React from 'react';
import { Button, Segment, Header, Image, Form, Input, Icon, Message } from "semantic-ui-react";

import { signInFacebook, signInGoogle, signIn, signUp } from '../../services/auth';
import CircleLogoSrc from '../../attachments/images/circle-logo.png';

export default class AuthComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      email: null,
      password: null,
      emailError: null,
      passwordError: null
    };

    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signInGoogle = this.signInGoogle.bind(this);
    this.signInFacebook = this.signInFacebook.bind(this);
  }

  onEnterCredential(name, value) {
    this.setState({
      [name]: value,
      emailError: false,
      passwordError: false
    });
  }

  signUp(e) {
    e.preventDefault(); // semantic handle all button clicks like 'submit', and because it need to preventDefault
    const { email, password } = this.state;
    if (email && password) {
      signUp(email, password, this.props.lang)
        .then(() => {
          window.location.href = "/profile";
        })
        .catch(error => {
          const { code, message } = error;
          console.log(code);
          this.setState({
            emailError: message,
            passwordError: message
          })
        });
    }
  }

  signIn() {
    const { email, password } = this.state;
    if (email && password) {
      signIn(email, password, this.props.lang)
        .then(() => {
          window.location.href = "/profile";
        })
        .catch(error => {
          const { code, message } = error;
          console.log(code);
          this.setState({
            emailError: message,
            passwordError: message
          })
        });
    }
  }

  signInGoogle() {
    signInGoogle(this.props.lang)
      .then(() => {
        // window.location.href = "/profile";
      })
      .catch(error => {
        const { code, message, email, credential } = error;
        console.log(code, message, email, credential);
      });
  }

  signInFacebook() {
    signInFacebook(this.props.lang)
      .then(() => {
        // window.location.href = "/profile";
      })
      .catch(error => {
        const { code, message, email, credential } = error;
        console.log(code, message, email, credential);
      });
  }

  render() {
    const { emailError, passwordError } = this.state;
    return (
      <Segment
        padded="very"
      >
        <Image
          src={CircleLogoSrc}
          centered
        />
        <Header
          textAlign="center"
        >
          Login
        </Header>
        <Form onSubmit={this.signIn}>
          <Form.Field>
            <Input
              error={emailError}
              iconPosition='left'
              placeholder='Email'
              type="email"
              onChange={(e, data) => this.onEnterCredential("email", data.value)}
            >
              <Icon name='at' />
              <input />
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              error={passwordError}
              iconPosition='left'
              placeholder='Password'
              type="password"
              onChange={(e, data) => this.onEnterCredential("password", data.value)}
            >
              <Icon name='key' />
              <input />
            </Input>
          </Form.Field>
          <Button.Group
            fluid
          >
            <Button
              type='submit'
            >
              Login
            </Button>
            <Button.Or text="/"/>
            <Button
              onClick={this.signUp}
            >
              Register
            </Button>
          </Button.Group>
        </Form>
        <Message error hidden={!emailError}>
          <Message.Header>Login failed</Message.Header>
          <p>{emailError}</p>
        </Message>
        <Segment
          basic
          textAlign="center"
        >
          <Header
            textAlign="center"
          >
            or:
          </Header>
          <Button
            className="margin-v-1"
            color="google plus"
            icon="google"
            content="Login with Google"
            onClick={this.signInGoogle}
          />
          <Button
            className="margin-v-1"
            color="facebook"
            icon="facebook"
            content="Login with Facebook"
            onClick={this.signInFacebook}
          />
        </Segment>
      </Segment>
    )
  }

}