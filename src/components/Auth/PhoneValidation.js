import React from 'react';
import { Button, Input, Modal } from "semantic-ui-react";

import { signInPhone } from '../../services/auth';

export default class PhoneLoginComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      phoneNumber: null
    };

    this.phoneChanged = this.phoneChanged.bind(this);
    this.signInPhone = this.signInPhone.bind(this);
  }

  phoneChanged(event, value) {
    if (!event.target.validationMessage) {
      this.setState({
        phoneNumber: value
      });
    }
  }

  signInPhone() {
    const { phoneNumber } = this.state;
    signInPhone(phoneNumber, "testing", this.props.lang)
      .then(() => {
        // window.location.href = "/profile";
      })
      .catch(error => {
        const { code, message, email, credential } = error;
        console.log(code, message, email, credential);
      });
  }

  render() {
    const { children, phoneToValidate } = this.props;
    const { phoneNumber } = this.state;
    return (
      <Modal
        open={phoneToValidate}
        trigger={children}
        header=""
        content={
          <>
            <Input
              fluid
              type="tel"
              maxLength={13}
              pattern="[\+]\d{0,12}"
              placeholder="+380XXXXXXXXX"
              value={phoneNumber}
              icon='phone'
              iconPosition='left'
              onChange={(event, data) => this.phoneChanged(event, data.value)}
            />
            <div id="testing"></div>
            <Button
              content="Send SMS"
              onClick={this.signInPhone}
            />
          </>
        }
      />
    )
  }

}