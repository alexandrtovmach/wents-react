import React from 'react';
import {
  Segment,
  Image,
  Header,
  Button,
  Menu,
  Icon,
  Form,
  Modal,
  Dimmer,
  Tab,
  Responsive,
  List
} from 'semantic-ui-react';

import { AddressInput, AvatarUploader, PhoneValidation } from "../../components";
import { placeholderImg } from '../../services/constants';
import { dateToInputFormat } from '../../services/utils';
import { signOut, linkWithGoogle, linkWithFacebook } from '../../services/auth';
import { extendUserWithAdditionalData } from '../../services/database';


export default class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      edit: false,
      loading: true,
      avatarChanging: false,
      avatarDimmerShow: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.toggleAvatarChange = this.toggleAvatarChange.bind(this);
    this.handleAvatarDimmerShow = this.handleAvatarDimmerShow.bind(this);
    this.handleAvatarDimmerHide = this.handleAvatarDimmerHide.bind(this);
    this.avatarChanged = this.avatarChanged.bind(this);
    this.toggleSMSModal = this.toggleSMSModal.bind(this);
    this.userFieldChange = this.userFieldChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      user: this.props.user
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        user: this.props.user
      })
    }
  }

  toggleEdit() {
    const { edit, user } = this.state;
    if (edit) {
      this.saveChanges(user);
    } else {
      this.setState({
        edit: true
      });
    }
  }


  saveChanges(user) {
    this.setState({
      loading: true
    });
    extendUserWithAdditionalData(user)
      .then(
        this.setState({
          edit: false,
          loading: false
        })
      )
  }

  toggleAvatarChange() {
    this.setState({
      avatarChanging: !this.state.avatarChanging
    });
  }

  toggleSMSModal() {
    this.setState({
      showSMSModal: !this.state.showSMSModal
    });
  }

  handleAvatarDimmerShow() {
    this.setState({
      avatarDimmerShow: true
    });
  }

  handleAvatarDimmerHide() {
    this.setState({
      avatarDimmerShow: false
    });
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
    const { avatarChanging, avatarDimmerShow, user: newUser, edit } = this.state;
    const { user: currentUser } = this.props;

    const googleConnected = Boolean(currentUser && currentUser.email && currentUser.emailVerified);
    const facebookConnected = Boolean(currentUser && currentUser.providerData && currentUser.providerData.some(el => el && el.providerId === "facebook.com"));

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
                  src={currentUser.photoURL}
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
                  size="small"
                  dimmed={edit}
                  dimmer={{
                    active: edit && avatarDimmerShow,
                    content: <Icon name='configure' size="huge"/>,
                    onClick: this.toggleAvatarChange
                  }}
                  onMouseEnter={this.handleAvatarDimmerShow}
                  onMouseLeave={this.handleAvatarDimmerHide}
                  src={newUser.photoURL || placeholderImg}
                />
              </Segment>
              {
                edit? (
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
                        value={newUser.displayName || ""}
                        onChange={(event, data) => this.userFieldChange(event, data.value, "displayName")}
                      />
                      <Form.Input
                        fluid
                        type="date"
                        value={dateToInputFormat(newUser.birthday || "")}
                        min="1950-01-01"
                        max={dateToInputFormat(Date.now() - 1000*60*60*24*365*18)}
                        icon='calendar check outline'
                        iconPosition='left'
                        onChange={(event, data) => this.userFieldChange(event, data.value, "birthday")}
                      />
                      <Form.Field>
                        <AddressInput
                          setLocation={data => this.userFieldChange(null, data.address, "address")}
                          value={newUser.address || ""}
                          icon='map marker alternate'
                          placeholder="Your location"
                        />
                      </Form.Field>
                      <Form.TextArea
                        autoHeight
                        label="About"
                        maxLength={500}
                        value={newUser.description}
                        onChange={(event, data) => this.userFieldChange(event, data.value, "description")}
                      />
                    </Form>
                  </Segment>
                ) : (
                  <Segment
                    basic
                    padded
                  >
                    <List>
                      {
                        newUser.displayName &&
                        <List.Item>
                          <List.Header>Full name</List.Header>
                          <List.Content size="huge">{newUser.displayName}</List.Content>
                        </List.Item>
                      }
                      {
                        newUser.birthday &&
                        <List.Item>
                          <List.Header>Birthday</List.Header>
                          <List.Content size="huge">{newUser.birthday}</List.Content>
                        </List.Item>
                      }
                      {
                        newUser.address &&
                        <List.Item>
                          <List.Header>Location</List.Header>
                          <List.Content size="huge">{newUser.address}</List.Content>
                        </List.Item>
                      }
                      {
                        newUser.description &&
                        <List.Item>
                          <List.Header>About</List.Header>
                          <List.Content size="huge">{newUser.description || "Nothing special"}</List.Content>
                        </List.Item>
                      }
                    </List>
                  </Segment>
                )
              }
              <Button
                basic={!edit}
                primary
                fluid
                content={edit? "Save Profile": "Edit Profile"}
                onClick={this.toggleEdit}
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
            <Form
              as={Segment}
              basic
              widths="equal"
            >
              <Form.Group>
                <Header>
                  Socials
                </Header>
              </Form.Group>
              <Form.Group>
                <Form.Button
                  disabled={googleConnected}
                  fluid
                  color="google plus"
                  icon="google"
                  content={googleConnected? "Connected with Google": "Connect with Google"}
                  onClick={() => linkWithGoogle()}
                />
                <Form.Button
                  disabled={facebookConnected}
                  fluid
                  color="facebook"
                  icon="facebook"
                  content={googleConnected? "Connected with Facebook": "Connect with Facebook"}
                  onClick={() => linkWithFacebook()}
                />
              </Form.Group>

              <Form.Group>
                <Header>
                  Phone
                </Header>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  fluid
                  type="tel"
                  maxLength={13}
                  pattern="\+\d{0,12}"
                  placeholder="+380XXXXXXXXX"
                  value={(newUser && newUser.phoneNumber) || ""}
                  icon={
                    currentUser &&
                    currentUser.phoneNumber &&
                    newUser.phoneNumber === currentUser.phoneNumber &&
                    {
                      color: "green",
                      name: 'check'
                    }
                  }
                  onChange={(event, data) => this.userFieldChange(event, data.value, "phoneNumber")}
                />
                {
                  (
                    !currentUser ||
                    !currentUser.phoneNumber ||
                    newUser.phoneNumber !== currentUser.phoneNumber
                  ) &&
                  <PhoneValidation
                    phoneToVerify={(newUser && newUser.phoneNumber) || ""}
                  >
                    <Button
                      disabled={!newUser.phoneNumber || newUser.phoneNumber.toString().length !== 13}
                      size="mini"
                      color="orange"
                      onClick={this.toggleSMSModal}
                      content="Send SMS to confirm"
                    />
                  </PhoneValidation>
                }
              </Form.Group>
            </Form>
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
      },
      {
        menuItem: (
          <Menu.Item
            key="logout"
          >
            <Responsive
              minWidth={640}
            >
              Logout
            </Responsive>
            <Responsive
              maxWidth={639}
            >
              <Icon name="sign-out"/>
            </Responsive>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <Segment
              basic
            >
              <Button
                fluid
                onClick={() => signOut().then(window.location.reload())}
                content="Click to Logout"
              />
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
        panes={this.generatePanes()}
      />
    )
  }
};

