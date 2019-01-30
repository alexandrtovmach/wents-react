import React from 'react';
import { Button, Segment, Header, Image, Form, Input, Icon, Message } from "semantic-ui-react";

import { signInFacebook, signInGoogle, signInWithEmailAndPassword, signUpWithEmailAndPassword } from '../../services/auth';
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

    this.signUpWithEmailAndPassword = this.signUpWithEmailAndPassword.bind(this);
    this.signInWithEmailAndPassword = this.signInWithEmailAndPassword.bind(this);
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

  signUpWithEmailAndPassword(e) {
    e.preventDefault(); // semantic handle all button clicks like 'submit', and because it need to preventDefault
    const { email, password } = this.state;
    if (email && password) {
      signUpWithEmailAndPassword(email, password, this.props.langPack["_locale"])
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
    } else {
      this.setState({
        emailError: this.props.langPack["this_field_is_required"],
        passwordError: this.props.langPack["this_field_is_required"]
      })
    }
  }

  signInWithEmailAndPassword() {
    const { email, password } = this.state;
    if (email && password) {
      signInWithEmailAndPassword(email, password, this.props.langPack["_locale"])
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
    } else {
      this.setState({
        emailError: this.props.langPack["this_field_is_required"],
        passwordError: this.props.langPack["this_field_is_required"]
      })
    }
  }

  signInGoogle() {
    signInGoogle(this.props.langPack["_locale"])
      .then(() => {
        window.location.href = "/profile";
      })
      .catch(error => {
        const { code, message, email, credential } = error;
        console.log(code, message, email, credential);
      });
  }

  signInFacebook() {
    signInFacebook(this.props.langPack["_locale"])
      .then(() => {
        window.location.href = "/profile";
      })
      .catch(error => {
        const { code, message, email, credential } = error;
        console.log(code, message, email, credential);
      });
  }

  render() {
    const { emailError, passwordError } = this.state;
    const { langPack } = this.props;
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
          {langPack["login"]}
        </Header>
        <Form onSubmit={this.signInWithEmailAndPassword}>
          <Form.Field>
            <Input
              error={emailError}
              iconPosition='left'
              placeholder={langPack["email"]}
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
              placeholder={langPack["password"]}
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
              {langPack["login"]}
            </Button>
            <Button.Or text="/"/>
            <Button
              onClick={this.signUpWithEmailAndPassword}
            >
              {langPack["register"]}
            </Button>
          </Button.Group>
        </Form>
        <Message error hidden={!emailError}>
          <Message.Header>{langPack["login_failed"]}</Message.Header>
          <p>{emailError}</p>
        </Message>
        <Segment
          basic
          textAlign="center"
        >
          <Header
            textAlign="center"
          >
            {langPack["or"]}
          </Header>
          <Button
            className="margin-v-1"
            color="google plus"
            icon="google"
            content={langPack["login_with_google"]}
            onClick={this.signInGoogle}
          />
          <Button
            className="margin-v-1"
            color="facebook"
            icon="facebook"
            content={langPack["login_with_facebook"]}
            onClick={this.signInFacebook}
          />
        </Segment>
      </Segment>
    )
  }

}