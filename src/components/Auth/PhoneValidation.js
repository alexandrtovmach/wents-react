import React from 'react';
import { Button, Step, Modal, Segment } from "semantic-ui-react";

import { signInPhone } from '../../services/auth';

export default class PhoneLoginComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      stepIdx: 0
    };

    this.setStep = this.setStep.bind(this);
    this.signInPhone = this.signInPhone.bind(this);
  }

  signInPhone() {
    const { phoneToVerify } = this.props;
    signInPhone(phoneToVerify, "phone-verification-captcha", this.props.lang)
      .then(confirmationResult => {
        // window.location.href = "/profile";
        confirmationResult.confirm();
      })
      .catch(error => {
        const { code, message, email, credential } = error;
        console.log(code, message, email, credential);
      });
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
    const { stepIdx } = this.state;
    return (
      <Modal
        size="small"
        trigger={children}
      >
        <Modal.Header>
          <Step.Group stackable ordered fluid>
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
          basic
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
              content={
                <Button
                  icon="mail"
                  content="Send SMS"
                  onClick={this.signInPhone}
                />
              }
            />
          ][stepIdx]}
        />
        <Modal.Actions
          textAlign="center"
        >
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