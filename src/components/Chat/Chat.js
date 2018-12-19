import React from 'react';
import { Grid, Modal } from "semantic-ui-react";

import { subscribeToRef } from '../../services/chat';
import ChatControls from './ChatControls';

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
    const { open, toggleChat, chatData } = this.props;
    const {} = this.state;
    return (
      <Modal
        open={open}
        size="large"
        onClose={toggleChat}
      >
        <Grid>
          <Grid.Column width={4}>
            Last
          </Grid.Column>
          <Grid.Column width={12}>
            <ChatControls />
          </Grid.Column>
        </Grid>
      </Modal>
    );
  }
}