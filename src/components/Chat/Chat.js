import React from 'react';
import isEqual from 'lodash.isequal';
import { Modal, Segment, Button, Icon, Item, Dropdown, Sidebar, Label, Header } from "semantic-ui-react";
import {
  MessageList,
  ChatList,
  Input
} from 'react-chat-elements'

import {
  subscribeToRef,
  // createConversation,
  postMessageToConversation,
  getConversationDetails
} from '../../services/chat';
import './Chat.scss';

export default class RentAdvertise extends React.Component {
  constructor() {
    super();

    this.state = {
      show: true,
      showConversationList: true,
      conversationList: [],
      conversationMessages: {},
      selectedConversation: ""
    }

    this.onConversationUpdated = this.onConversationUpdated.bind(this);
    this.onClickConversation = this.onClickConversation.bind(this);
    this.toggleConversationList = this.toggleConversationList.bind(this);
    this.toggleUploadFile = this.toggleUploadFile.bind(this);
    this.toggleEmodji = this.toggleEmodji.bind(this);
    this.shareContactDetails = this.shareContactDetails.bind(this);
    this.makeDeal = this.makeDeal.bind(this);
    this.onMessageInput = this.onMessageInput.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  async componentDidMount() {
    const { user } = this.props;
    if (user && user.uid && user.conversations) {
      Promise.all(
        user.conversations.map(convId => {
          subscribeToRef(convId, this.onConversationUpdated);
          return getConversationDetails(convId)
            .then(details => {
              if (details) {
                const notMeId = Object.keys(details.participants).find(id => id !== user.uid);
                const participant = details.participants[notMeId];
                return {
                  id: convId,
                  senderId: user.uid,
                  receiverId: notMeId,
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
    if (!isEqual(prevProps.chatData, chatData)) {
      this.setState({
        conversationMessages: Object.keys(chatData).reduce((prev, el) => ({
          ...prev,
          [el]: chatData[el]
            .map(m => ({
              position: m.sender === user.uid? 'right': "left",
              type: m.type || 'text',
              systemMessageId: m.systemMessageId,
              text: m.text,
              date: new Date(m.createdAt),
            }))
            .sort((a, b) => a.date - b.date)
        }), {})
      })
    }
  }

  shouldComponentUpdate(prevProp, prevState) {
    if (prevState.messageText !== this.state.messageText) {
      return false;
    } else {
      return true;
    }
  }

  onClickConversation(item) {
    this.setState({
      selectedConversation: item.id,
      showConversationList: false
    })
  }

  toggleConversationList() {
    this.setState({
      showConversationList: !this.state.showConversationList
    })
  }

  toggleUploadFile() {
    console.warn("In development");
  }

  toggleEmodji() {
    console.warn("In development");
  }
  
  shareContactDetails(isAlreadySharedContacts) {
    const { langPack } = this.props;
    const { selectedConversation, conversationList } = this.state;

    if (isAlreadySharedContacts) {
      console.warn("Already shared contacts. Action skipped");
    } else {
      const { senderId, receiverId } = conversationList.find(el => el.id === selectedConversation);
      postMessageToConversation(selectedConversation, senderId, receiverId, langPack["congratulations_you_shared_your_contacts"], 2);
    }
  }

  makeDeal(isAlreadyHasDeal) {
    const { langPack } = this.props;
    const { selectedConversation, conversationList } = this.state;

    if (isAlreadyHasDeal) {
      console.warn("Already have deal. Action skipped");
    } else {
      const { senderId, receiverId } = conversationList.find(el => el.id === selectedConversation);
      postMessageToConversation(selectedConversation, senderId, receiverId, langPack["congratulations_you_accepted_the_deal"], 1);
    }
  }

  onMessageInput(e) {
    if (e) {
      this.setState({
        messageInputRef: e.target, // yah, bad practice but I really not found good solution for this case
        messageText: e.target.value
      })
    } else {
      const { messageInputRef } = this.state;
      messageInputRef.value = "";
      this.setState({
        messageText: ""
      })
    }
  }

  sendMessage() {
    const { messageText, selectedConversation, conversationList } = this.state;
    const { senderId, receiverId } = conversationList.find(el => el.id === selectedConversation);
    messageText && postMessageToConversation(selectedConversation, senderId, receiverId, messageText)
      .then(() => {
        this.onMessageInput(null);
      })
  }

  onConversationUpdated(newData) {
    const { onUpdated } = this.props;
    onUpdated && onUpdated(newData);
  }


  render() {
    const { open, toggleChat, langPack } = this.props;
    const { showConversationList, conversationList, conversationMessages, selectedConversation } = this.state;

    const isAlreadyHasDeal = (conversationMessages[selectedConversation] || []).some(el => el.type === "system" && el.systemMessageId === 1);
    const isAlreadySharedContacts = (conversationMessages[selectedConversation] || []).some(el => el.type === "system" && el.systemMessageId === 2);

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
            {
              conversationMessages[selectedConversation]? (
                <Item
                  className='chat-messages-block'
                >
                  <MessageList
                    className='chat-message-list'
                    toBottomHeight={"100%"}
                    dataSource={conversationMessages[selectedConversation]}
                  />
                  <Segment>
                    <Input
                      placeholder={langPack["type_here"]}
                      multiline
                      autofocus
                      onChange={this.onMessageInput}
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
                              text: `${langPack["upload_file"]} (${langPack["in_development"]})`,
                              icon: <Icon link name='file' size="large" />,
                              onClick: this.toggleUploadFile
                            },
                            {
                              key: "dropdown-emodgi",
                              text: `${langPack["smile"]} (${langPack["in_development"]})`,
                              icon: <Icon link name='smile' size="large" />,
                              onClick: this.toggleEmodji
                            },
                            {
                              key: "dropdown-share-contact-button",
                              disabled: isAlreadySharedContacts,
                              text: langPack["share_contact_details_with_user"],
                              icon: isAlreadySharedContacts? <Icon link name='check' size="large" color="green" />: <Icon link name='user' size="large" />,
                              onClick: () => this.shareContactDetails(isAlreadySharedContacts)
                            },
                            {
                              key: "dropdown-deal-button",
                              disabled: isAlreadyHasDeal,
                              text: langPack["make_a_deal_with_user"],
                              icon: isAlreadyHasDeal? <Icon link name='check' size="large" color="green" />: <Icon link name='handshake' size="large" />,
                              onClick: () => this.makeDeal(isAlreadyHasDeal)
                            }
                          ]}
                        /> 
                      }
                      rightButtons={
                        <Button
                          primary
                          content={langPack["send"]}
                          onClick={this.sendMessage}
                        />
                      }
                    />
                  </Segment>
                </Item>
              ) : (
                <Segment
                  placeholder
                >
                  <Header icon>
                    <Icon name='arrow left' />
                    {langPack["please_select_conversation"]}
                  </Header>
                </Segment>
              )
            }
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Modal>
    );
  }
}