import React from 'react';
import { Modal, Segment, Button, Icon, Item, Dropdown } from "semantic-ui-react";
import { 
  // SystemMessage,
  MessageList, ChatList, Input } from 'react-chat-elements'

import { subscribeToRef } from '../../services/chat';
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
    const { open, toggleChat,
      // chatData
    } = this.props;
    // const {} = this.state;
    return (
      <Modal
        open={open}
        size="large"
        onClose={toggleChat}
      >
        <Modal.Header>Chat</Modal.Header>
        <Segment
          basic
          className='chat-modal'
        >
          <ChatList
            className='chat-user-list'
            dataSource={chats}
          />
          <Item
            className='chat-messages-block'
          >
            <MessageList
              className='chat-message-list'
              // lockable={true}
              // toBottomHeight={"100%"}
              dataSource={messages}
            />
            <Segment>
              <Input
                placeholder="Type here..."
                multiline
                autofocus
                leftButtons={
                  <Dropdown
                    upward
                    trigger={
                      <Button
                        circular
                        icon="plus"
                      />
                    }
                    options={[
                      {
                        key: "dropdown-file",
                        text: "Upload file",
                        icon: <Icon link name='file' size="large" />
                      },
                      {
                        key: "dropdown-emodgi",
                        text: "Smile",
                        icon: <Icon link name='smile' size="large" />
                      },
                      {
                        key: "dropdown-share-contact-button",
                        text: "Share contact details with user",
                        icon: <Icon link name='user' size="large" />
                      },
                      {
                        key: "dropdown-deal-button",
                        text: "Make a deal with user",
                        icon: <Icon link name='handshake' size="large" />
                      }
                    ]}
                  >
                    {/* <Icon link name='file' size="large" />
                    <Icon link name='smile outline' size="large" /> */}
                  </Dropdown>    
                }
                rightButtons={
                  <Button
                    primary
                    content='Send'
                  />
                }
              />
            </Segment>
          </Item>
        </Segment>
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