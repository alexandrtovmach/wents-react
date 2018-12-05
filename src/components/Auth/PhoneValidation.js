import React from 'react';
import { Button, Step, Modal, Segment, Input } from "semantic-ui-react";

import { linkWithPhoneNumber, phoneCodeVerification } from '../../services/auth';

export default class PhoneLoginComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      stepIdx: 0,
      verificationCode: ""
    };

    this.codeChange = this.codeChange.bind(this);
    this.setStep = this.setStep.bind(this);
    this.signInPhone = this.signInPhone.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
  }

  codeChange(event, value) {
    if (event === null || !event.target.validationMessage) {
      this.setState({
        verificationCode: value
      });
    }
  }

  signInPhone() {
    const { phoneToVerify } = this.props;
    linkWithPhoneNumber(phoneToVerify, "phone-verification-captcha", this.props.lang)
      .then(confirmationResult => {
        this.confirmationResult = confirmationResult;
      })
      .catch(error => {
        const { code, message, email, credential } = error;
        console.log(code, message, email, credential);
      });
  }

  verifyCode() {
    phoneCodeVerification(this.confirmationResult, this.state.verificationCode)
      .then(user => {
        console.log(user);
        // window.location.href = "/profile";
      })
  }

  setStep(newIndex) {
    if (newIndex === 1) {
      setTimeout(() => this.signInPhone(), 0);
    }
    this.setState({
      stepIdx: newIndex
    })
  }

  render() {
    const { children, phoneToVerify } = this.props;
    const { stepIdx, verificationCode } = this.state;
    return (
      <Modal
        size="small"
        trigger={children}
      >
        <Modal.Header>
          <Step.Group ordered fluid>
            <Step
              active={stepIdx === 0}
              completed={stepIdx > 0}
            >
              <Step.Content>
                <Step.Title>Check</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={stepIdx === 1}
              completed={stepIdx > 1}
            >
              <Step.Content>
                <Step.Title>Captcha</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={stepIdx === 2}
              completed={stepIdx > 2}
            >
              <Step.Content>
                <Step.Title>Verify</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </Modal.Header>
        <Modal.Content
          content={[
            <Segment
              basic
              content={`We will send verification code to ${phoneToVerify} by SMS. Please make sure what is correct phone number.`}
            />,
            <Segment
              basic
              id="phone-verification-captcha"
            />,
            <Segment
              basic
            >
              <Input
                icon="key"
                maxLength={6}
                value={verificationCode}
                onChange={(event, data) => this.codeChange(event, data.value)}
              />
              <Button
                disabled={ !verificationCode || verificationCode.length < 6 }
                content="Verify"
                onClick={this.verifyCode}
              />
            </Segment>
          ][stepIdx]}
        />
        <Modal.Actions>
          {
            stepIdx > 0 &&
            <Button
              icon="arrow left"
              // content="Back"
              onClick={() => this.setStep(stepIdx - 1)}
            />
          }
          {
            stepIdx <= 2 &&
            <Button
              icon="arrow right"
              // content="Next"
              onClick={() => this.setStep(stepIdx + 1)}
            />
          }
        </Modal.Actions>
        
      </Modal>
    )
  }

}