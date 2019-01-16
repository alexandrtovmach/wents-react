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
    this.verifyPhone = this.verifyPhone.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
  }

  codeChange(event, value) {
    if (event === null || !event.target.validationMessage) {
      this.setState({
        verificationCode: value
      });
    }
  }

  verifyPhone() {
    const { phoneToVerify, lang } = this.props;
    linkWithPhoneNumber(phoneToVerify, "phone-verification-captcha", lang)
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
      .then(window.location.reload())
  }

  setStep(newIndex) {
    if (newIndex === 1) {
      setTimeout(() => this.verifyPhone(), 0);
    }
    this.setState({
      stepIdx: newIndex
    })
  }

  render() {
    const { children, phoneToVerify, langPack } = this.props;
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
                <Step.Title>{langPack["check"]}</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={stepIdx === 1}
              completed={stepIdx > 1}
            >
              <Step.Content>
                <Step.Title>{langPack["captcha"]}</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={stepIdx === 2}
              completed={stepIdx > 2}
            >
              <Step.Content>
                <Step.Title>{langPack["verify"]}</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </Modal.Header>
        <Modal.Content
          content={[
            <Segment
              basic
              content={langPack["phone_verification_message_1"] + phoneToVerify + langPack["phone_verification_message_2"]}
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
                content={langPack["verify"]}
                onClick={this.verifyCode}
              />
            </Segment>
          ][stepIdx]}
        />
        <Modal.Actions>
          {
            stepIdx < 2 &&
            <Button
              icon="arrow right"
              onClick={() => this.setStep(stepIdx + 1)}
            />
          }
        </Modal.Actions>
        
      </Modal>
    )
  }

}