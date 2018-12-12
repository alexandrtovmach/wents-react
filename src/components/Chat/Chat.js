import React from 'react';
import { Segment, Header, Button, Modal, Image, Grid, List, Card, Icon, Label } from "semantic-ui-react";

import { subscribeToRef } from '../../services/chat';

export default class RentAdvertise extends React.Component {
  constructor() {
    super();

    this.state = {}
  }

  async componentDidMount() {
    const { user } = this.props;
    if (user && user.uid && user.conversations) {
      user.conversations.forEach(convId => subscribeToRef(user.uid, convId, this.onConversationUpdated));
    } else {
      console.warn("Chat: provided 'user' object is not valid");
    }
  }

  onConversationUpdated(newData) {
    const { onUpdated } = this.props;
    onUpdated && onUpdated(newData);
  }

  componentDidUpdate(prevProps) {
    // if (!prevProps.data && this.props.data) {
    //   this.setState({
    //     ...this.props.data
    //   })
    // }
  }



  render() {
    const { open } = this.props;
    const {} = this.state;
    return (
      <Modal
        open={open}
        size="fullscreen"
      />
    );
  }
}