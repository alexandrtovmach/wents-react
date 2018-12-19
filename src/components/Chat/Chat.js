import React from 'react';
import { Grid, Modal, Segment, Button, Responsive } from "semantic-ui-react";
import { SystemMessage, MessageList, ChatList, Input } from 'react-chat-elements'

import { subscribeToRef } from '../../services/chat';
import ChatControls from './ChatControls';
import './Chat.scss';

export default class RentAdvertise extends React.Component {
  constructor() {
    super();

    this.state = {
      show: true
    }
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
        className='chat-modal'
        onClose={toggleChat}
      >
        <Modal.Header>Chat</Modal.Header>
        <Grid as={Segment} basic>
          <Grid.Column width={6}>
            <ChatList
              className='chat-user-list'
              dataSource={chats}
            />
          </Grid.Column>
          <Grid.Column width={10} verticalAlign='bottom'>
            <Segment basic>
              <MessageList
                className='message-list'
                // lockable={true}
                toBottomHeight={'100%'}
                dataSource={messages}
              />
            </Segment>
            <Segment>
              <Input
                placeholder="Type here..."
                multiline
                autofocus
                rightButtons={
                  <Button
                    color='blue'
                    content='Send'
                  />
                }
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </Modal>
    );
  }
}

const messages = [
  {
    position: 'right',
    type: 'text',
    text: 'Hello',
    date: new Date(Date.now() - 1000*60*1.5),
  },
  {
    position: 'left',
    type: 'text',
    text: 'Hi man',
    date: new Date(Date.now() - 1000*60*1),
  },
  {
    position: 'right',
    type: 'text',
    text: 'How are you?',
    date: new Date(Date.now() - 1000*60*0.1),
  },
  {
    position: 'right',
    type: 'text',
    text: 'Hello',
    date: new Date(Date.now() - 1000*60*1.5),
  },
  {
    position: 'left',
    type: 'text',
    text: 'Hi man',
    date: new Date(Date.now() - 1000*60*1),
  },
  {
    position: 'right',
    type: 'text',
    text: 'How are you?',
    date: new Date(Date.now() - 1000*60*0.1),
  },
  {
    position: 'right',
    type: 'text',
    text: 'Hello',
    date: new Date(Date.now() - 1000*60*1.5),
  },
  {
    position: 'left',
    type: 'text',
    text: 'Hi man',
    date: new Date(Date.now() - 1000*60*1),
  },
  {
    position: 'right',
    type: 'text',
    text: 'How are you?',
    date: new Date(Date.now() - 1000*60*0.1),
  },
  {
    position: 'right',
    type: 'text',
    text: 'Hello',
    date: new Date(Date.now() - 1000*60*1.5),
  },
  {
    position: 'left',
    type: 'text',
    text: 'Hi man',
    date: new Date(Date.now() - 1000*60*1),
  },
  {
    position: 'right',
    type: 'text',
    text: 'How are you?',
    date: new Date(Date.now() - 1000*60*0.1),
  },
  {
    position: 'right',
    type: 'text',
    text: 'Hello',
    date: new Date(Date.now() - 1000*60*1.5),
  },
  {
    position: 'left',
    type: 'text',
    text: 'Hi man',
    date: new Date(Date.now() - 1000*60*1),
  },
  {
    position: 'right',
    type: 'text',
    text: 'How are you?',
    date: new Date(Date.now() - 1000*60*0.1),
  },
  {
    position: 'right',
    type: 'text',
    text: 'Hello',
    date: new Date(Date.now() - 1000*60*1.5),
  },
  {
    position: 'left',
    type: 'text',
    text: 'Hi man',
    date: new Date(Date.now() - 1000*60*1),
  },
  {
    position: 'right',
    type: 'text',
    text: 'How are you?',
    date: new Date(Date.now() - 1000*60*0.1),
  },
  {
    position: 'right',
    type: 'text',
    text: 'Hello',
    date: new Date(Date.now() - 1000*60*1.5),
  },
  {
    position: 'left',
    type: 'text',
    text: 'Hi man',
    date: new Date(Date.now() - 1000*60*1),
  },
  {
    position: 'right',
    type: 'text',
    text: 'How are you?',
    date: new Date(Date.now() - 1000*60*0.1),
  },
  {
    position: 'right',
    type: 'text',
    text: 'Hello',
    date: new Date(Date.now() - 1000*60*1.5),
  },
  {
    position: 'left',
    type: 'text',
    text: 'Hi man',
    date: new Date(Date.now() - 1000*60*1),
  },
  {
    position: 'right',
    type: 'text',
    text: 'How are you?',
    date: new Date(Date.now() - 1000*60*0.1),
  },
  {
    position: 'left',
    type: 'file',
    text: 'react.svg',
    data: {
      uri: 'https://react.semantic-ui.com/images/wireframe/image.png',
      status: {
          click: false,
          loading: 0,
      }
    }
  }
];

const chats = [
  {
    avatar: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
    alt: 'Steve',
    title: 'Steve',
    subtitle: 'Rent: "Квартира в Киеве"',
    date: new Date(),
    unread: 0,
  },
  {
    avatar: 'https://react.semantic-ui.com/images/avatar/large/molly.png',
    alt: 'Molly',
    title: 'Molly',
    subtitle: 'Rent: "Квартира во Львове"',
    date: new Date(),
    unread: 0,
  },
  {
    avatar: 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
    alt: 'Jenny',
    title: 'Jenny',
    subtitle: 'Rent: "Дом на берегу, Одесса"',
    date: new Date(),
    unread: 0,
  },
  {
    avatar: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
    alt: 'Steve',
    title: 'Steve',
    subtitle: 'Rent: "Квартира в Киеве"',
    date: new Date(),
    unread: 0,
  },
  {
    avatar: 'https://react.semantic-ui.com/images/avatar/large/molly.png',
    alt: 'Molly',
    title: 'Molly',
    subtitle: 'Rent: "Квартира во Львове"',
    date: new Date(),
    unread: 0,
  },
  {
    avatar: 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
    alt: 'Jenny',
    title: 'Jenny',
    subtitle: 'Rent: "Дом на берегу, Одесса"',
    date: new Date(),
    unread: 0,
  },
  {
    avatar: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
    alt: 'Steve',
    title: 'Steve',
    subtitle: 'Rent: "Квартира в Киеве"',
    date: new Date(),
    unread: 0,
  },
  {
    avatar: 'https://react.semantic-ui.com/images/avatar/large/molly.png',
    alt: 'Molly',
    title: 'Molly',
    subtitle: 'Rent: "Квартира во Львове"',
    date: new Date(),
    unread: 0,
  },
  {
    avatar: 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
    alt: 'Jenny',
    title: 'Jenny',
    subtitle: 'Rent: "Дом на берегу, Одесса"',
    date: new Date(),
    unread: 0,
  },
]