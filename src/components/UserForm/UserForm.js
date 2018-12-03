import React from 'react';
import {
  Container,
  Segment,
  Label,
  Image,
  Header,
  Button,
  Menu,
  Icon,
  Form,
  Modal,
  Dimmer,
  Tab,
  Responsive
} from 'semantic-ui-react';

import { Loader, AddressInput, AvatarUploader, PhoneValidation } from "../../components";
import { placeholderImg } from '../../services/constants';
import { dateToInputFormat } from '../../services/utils';


export default class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      loading: true,
      avatarChanging: false,
      avatarDimmerShow: false
    };

    this.toggleAvatarChange = this.toggleAvatarChange.bind(this);
    this.handleAvatarDimmerShow = this.handleAvatarDimmerShow.bind(this);
    this.handleAvatarDimmerHide = this.handleAvatarDimmerHide.bind(this);
    this.avatarChanged = this.avatarChanged.bind(this);
    this.userFieldChange = this.userFieldChange.bind(this);
  }

  toggleAvatarChange() {
    this.setState({
      avatarChanging: !this.state.avatarChanging
    });
  }


  handleAvatarDimmerShow() {
    this.setState({ avatarDimmerShow: true });
  }

  handleAvatarDimmerHide() {
    this.setState({ avatarDimmerShow: false });
  }

  avatarChanged(value) {
    this.setState({
      user: {
        ...this.state.user,
        photoURL: value
      },
      avatarChanging: false
    });
  }

  userFieldChange(event, value, name) {
    if (event === null || !event.target.validationMessage) {
      this.setState({
        user: {
          ...this.state.user,
          [name]: value
        }
      });
    }
  }

  generatePanes() {
    const { avatarChanging, avatarDimmerShow, phoneToValidate } = this.state;
    const { saveChanges, user } = this.props;

    return [
      {
        menuItem: (
          <Menu.Item
            key="user"
          >
            <Responsive
              minWidth={640}
            >
              Main
            </Responsive>
            <Responsive
              maxWidth={639}
            >
              <Icon name="user"/>
            </Responsive>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <Modal
              open={avatarChanging}
              closeOnEscape={true}
              closeOnDimmerClick={true}
              onClose={this.toggleAvatarChange}
              size="small"
              header="Select a Photo"
              content={
                <AvatarUploader
                  src={user.photoURL}
                  onChange={this.avatarChanged}
                  onCancel={this.toggleAvatarChange}
                />
              }
            />
            <Segment
                basic
                size="tiny"
                textAlign="center"
              >
                <Dimmer.Dimmable
                  as={Image}
                  centered
                  size="medium"
                  dimmed
                  dimmer={{
                    active: avatarDimmerShow,
                    content: <Icon name='configure' size="huge"/>,
                    onClick: this.toggleAvatarChange
                  }}
                  onMouseEnter={this.handleAvatarDimmerShow}
                  onMouseLeave={this.handleAvatarDimmerHide}
                  src={user.photoURL || placeholderImg}
                />
              </Segment>
              <Segment
                basic
              >
                <Form>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder="Your name"
                    maxLength={30}
                    value={user.displayName || ""}
                    onChange={(event, data) => this.userFieldChange(event, data.value, "displayName")}
                  />
                  <Form.Input
                    fluid
                    type="date"
                    value={dateToInputFormat(user.birthday || "")}
                    min="1950-01-01"
                    max={dateToInputFormat(Date.now() - 1000*60*60*24*365*18)}
                    icon='calendar check outline'
                    iconPosition='left'
                    onChange={(event, data) => this.userFieldChange(event, data.value, "birthday")}
                  />
                  <Form.Field>
                    <AddressInput
                      setLocation={data => this.userFieldChange(null, data.address, "address")}
                      value={user.address || ""}
                      icon='map marker alternate'
                      placeholder="Your location"
                    />
                  </Form.Field>
                  <Form.TextArea
                    autoHeight
                    label="About"
                    maxLength={500}
                    value={user.description}
                    onChange={(event, data) => this.userFieldChange(event, data.value, "description")}
                  />
                </Form>
              </Segment>
              <Button
                primary
                fluid
                onClick={saveChanges}
                content="Save Changes"
              />
          </Tab.Pane>
        )
      },
      {
        menuItem: (
          <Menu.Item
            key="contacts"
          >
            <Responsive
              minWidth={640}
            >
              Contacts
            </Responsive>
            <Responsive
              maxWidth={639}
            >
              <Icon name="phone"/>
            </Responsive>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <PhoneValidation
              phoneToValidate={phoneToValidate}
            />
            <Segment
              basic
            >
              <Form>
                <Form.Field>
                  <Form.Input
                    fluid
                    placeholder='user@mail.com'
                    type="email"
                    maxLength={30}
                    pattern="[\+]\d{0,12}"
                    value={user.email || ""}
                    label="Email"
                    iconPosition='right'
                    onChange={(event, data) => this.userFieldChange(event, data.value, "email")}
                  >
                    <input/>
                    {
                      user.emailVerified &&
                      <Icon
                        name='check'
                        color="green"
                      />
                    }
                  </Form.Input>
                  <Button
                    size="mini"
                    color="orange"
                    onClick={saveChanges}
                    content="Send email to confirm"
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    fluid
                    type="tel"
                    maxLength={13}
                    pattern="[\+]\d{0,12}"
                    placeholder="+380XXXXXXXXX"
                    value={user.phoneNumber || ""}
                    label="Phone"
                    iconPosition='right'
                    onChange={(event, data) => this.userFieldChange(event, data.value, "phoneNumber")}
                  >
                    <input/>
                    {
                      !user.phoneVerified &&
                      <Icon
                        disabled
                        name='check'
                        color="green"
                      />
                    }
                  </Form.Input>
                  {
                    !user.phoneVerified &&
                    <Button
                      size="mini"
                      color="orange"
                      onClick={saveChanges}
                      content="Send SMS to confirm"
                    />
                  }
                </Form.Field>
              </Form>
            </Segment>
            <Button
              primary
              fluid
              onClick={saveChanges}
              content="Save Changes"
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: (
          <Menu.Item
            key="settings"
          >
            <Responsive
              minWidth={640}
            >
              Settings
            </Responsive>
            <Responsive
              maxWidth={639}
            >
              <Icon name="configure"/>
            </Responsive>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <Segment
              placeholder
            >
              <Header icon>
                <Icon name='cogs' />
                In development
              </Header>
            </Segment>
          </Tab.Pane>
        )
      },
      {
        menuItem: (
          <Menu.Item
            key="support"
          >
            <Responsive
              minWidth={640}
            >
              Feedback
            </Responsive>
            <Responsive
              maxWidth={639}
            >
              <Icon name="feed"/>
            </Responsive>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <Segment
              placeholder
            >
              <Header icon>
                <Icon name='cogs' />
                In development
              </Header>
            </Segment>
          </Tab.Pane>
        )
      }
    ]
  }

  render() {
    return (
      <Tab
        renderActiveOnly
        menu={{
          fluid: true,
          vertical: true,
          tabular: true
        }}
        panes={this.generatePanes()}
      />
    )
  }
};

