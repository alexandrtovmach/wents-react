import React from 'react';
import { Modal, Segment, Button, Icon, Item, Dropdown, Sidebar, Label } from "semantic-ui-react";
import { 
  // SystemMessage,
  MessageList, ChatList, Input } from 'react-chat-elements'

import { subscribeToRef, createConversation, postMessageToConversation, getConversationDetails } from '../../services/chat';
import './Chat.scss';

export default class RentAdvertise extends React.Component {
  constructor() {
    super();

    this.state = {
      show: true,
      showConversationList: true,
      conversationList: [],
      conversationMessages: {}
    }

    this.onConversationUpdated = this.onConversationUpdated.bind(this);
    this.onClickConversation = this.onClickConversation.bind(this);
    this.toggleConversationList = this.toggleConversationList.bind(this);
    this.toggleUploadFile = this.toggleUploadFile.bind(this);
    this.toggleEmodji = this.toggleEmodji.bind(this);
    this.shareContactDetails = this.shareContactDetails.bind(this);
    this.makeDeal = this.makeDeal.bind(this);
  }

  async componentDidMount() {
    const { user } = this.props;
    // postMessageToConversation("lrjHZUhCqZd6Mr9goLMJ", "y6cm3Yl4oARrjRQsszH9ADvu9xl1", "5Vq2Ss00A8f2WBJ1P6xakJbJZDT2");
    // createConversation("y6cm3Yl4oARrjRQsszH9ADvu9xl1", "5Vq2Ss00A8f2WBJ1P6xakJbJZDT2")
      // .then(console.log)
    if (user && user.uid && user.conversations) {
      Promise.all(
        user.conversations.map(convId => {
          subscribeToRef(convId, this.onConversationUpdated);
          return getConversationDetails(convId)
            .then(details => {
              if (details) {
                const notMe = Object.keys(details.participants).find(id => id !== user.uid)
                const participant = details.participants[notMe];
                return {
                  id: convId,
                  avatar: participant.photoURL,
                  alt: participant.displayName,
                  title: participant.displayName,
                  subtitle: details.subject,
                  // date: new Date(),
                  // unread: 5,
                }
              }
            })
          })
      ).then(conversationList => this.setState({conversationList}))
    } else {
      console.warn("Chat: provided 'user' object is not valid");
    }
  }

  componentDidUpdate(prevProps) {
    const { chatData, user } = this.props;

    console.log(prevProps.chatData, chatData);
    if ((!prevProps.chatData && chatData) || Object.keys(prevProps.chatData).length !== Object.keys(chatData).length) {
      this.setState({
        conversationMessages: Object.keys(chatData).reduce((prev, el) => {
          return {
            ...prev,
            [el]: chatData[el].map(m => ({
              position: m.sender === user.uid? 'right': "left",
              type: 'text',
              text: m.text,
              date: new Date(m.createdAt),
            }))
          }
        }, {})
      })
    }
    // {
    //   position: 'right',
    //   type: 'text',
    //   text: 'How are you?',
    //   date: new Date(Date.now() - 1000*60*0.1),
    // },
    // {
    //   position: 'left',
    //   type: 'file',
    //   text: 'react.svg',
    //   data: {
    //     uri: 'https://react.semantic-ui.com/images/wireframe/image.png',
    //     status: {
    //         click: false,
    //         loading: 0,
    //     }
    //   }
    // }
  }

  onClickConversation() {
    console.log(arguments);
  }

  toggleConversationList() {
    this.setState({
      showConversationList: !this.state.showConversationList
    })
  }

  toggleUploadFile() {
    console.log(arguments);
  }

  toggleEmodji() {
    console.log(arguments);
  }
  
  shareContactDetails() {
    console.log(arguments);
  }

  makeDeal() {
    console.log(arguments);
  }

  onConversationUpdated(newData) {
    const { onUpdated } = this.props;
    onUpdated && onUpdated(newData);
    console.log("updated", newData);
  }

  // transformChatData(chatData, userId) {


  // }


  render() {
    const { open, toggleChat } = this.props;
    const { showConversationList, conversationList, conversationMessages } = this.state;
    console.log("conversationList", conversationList);
    console.log("conversationMessages", conversationMessages["lrjHZUhCqZd6Mr9goLMJ"]);

    return (
      <Modal
        open={open}
        size="large"
        onClose={toggleChat}
      >
        <Modal.Header>
          <Label
            basic
            as="a"
            onClick={this.toggleConversationList}
          >
            <Icon name='angle left' size="large" flipped={showConversationList? null: "horizontally" } />
            <Icon name='users' size="large" fitted/>
          </Label>
        </Modal.Header>
        <Sidebar.Pushable
          className='chat-modal'
        >
          <Sidebar
            animation='push'
            icon='labeled'
            onHide={this.handleSidebarHide}
            visible={showConversationList}
            width='wide'
          >
            <ChatList
              className='chat-user-list'
              dataSource={conversationList}
              onClick={this.onClickConversation}
            />
          </Sidebar>

          <Sidebar.Pusher>
            <Item
              className='chat-messages-block'
            >
              <MessageList
                className='chat-message-list'
                toBottomHeight={"100%"}
                dataSource={conversationMessages["lrjHZUhCqZd6Mr9goLMJ"]}
              />
              <Segment>
                <Input
                  placeholder="Type here..."
                  multiline
                  autofocus
                  leftButtons={
                    <Dropdown
                      upward
                      value={null}
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
                          icon: <Icon link name='file' size="large" />,
                          onClick: this.toggleUploadFile
                        },
                        {
                          key: "dropdown-emodgi",
                          text: "Smile",
                          icon: <Icon link name='smile' size="large" />,
                          onClick: this.toggleEmodji
                        },
                        {
                          key: "dropdown-share-contact-button",
                          text: "Share contact details with user",
                          icon: <Icon link name='user' size="large" />,
                          onClick: this.shareContactDetails
                        },
                        {
                          key: "dropdown-deal-button",
                          text: "Make a deal with user",
                          icon: <Icon link name='handshake' size="large" />,
                          onClick: this.makeDeal
                        }
                      ]}
                    /> 
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
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Modal>
    );
  }
}