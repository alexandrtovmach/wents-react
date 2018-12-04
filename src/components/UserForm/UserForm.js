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
  Responsive
} from 'semantic-ui-react';

import { AddressInput, AvatarUploader, PhoneValidation } from "../../components";
import { placeholderImg, EMAIL_REGEX } from '../../services/constants';
import { dateToInputFormat } from '../../services/utils';


export default class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      loading: true,
      avatarChanging: false,
      avatarDimmerShow: false
    };

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
    const { avatarChanging, avatarDimmerShow, user: newUser, showSMSModal } = this.state;
    const { saveChanges, user: currentUser } = this.props;

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
                  size="medium"
                  dimmed
                  dimmer={{
                    active: avatarDimmerShow,
                    content: <Icon name='configure' size="huge"/>,
                    onClick: this.toggleAvatarChange
                  }}
                  onMouseEnter={this.handleAvatarDimmerShow}
                  onMouseLeave={this.handleAvatarDimmerHide}
                  src={currentUser.photoURL || placeholderImg}
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
                    value={currentUser.displayName || ""}
                    onChange={(event, data) => this.userFieldChange(event, data.value, "displayName")}
                  />
                  <Form.Input
                    fluid
                    type="date"
                    value={dateToInputFormat(currentUser.birthday || "")}
                    min="1950-01-01"
                    max={dateToInputFormat(Date.now() - 1000*60*60*24*365*18)}
                    icon='calendar check outline'
                    iconPosition='left'
                    onChange={(event, data) => this.userFieldChange(event, data.value, "birthday")}
                  />
                  <Form.Field>
                    <AddressInput
                      setLocation={data => this.userFieldChange(null, data.address, "address")}
                      value={currentUser.address || ""}
                      icon='map marker alternate'
                      placeholder="Your location"
                    />
                  </Form.Field>
                  <Form.TextArea
                    autoHeight
                    label="About"
                    maxLength={500}
                    value={currentUser.description}
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
            <Form
              as={Segment}
              basic
            >
              {/* <Form.Field>
                <Form.Input
                  fluid
                  placeholder='user@mail.com'
                  type="email"
                  maxLength={40}
                  value={(newUser && newUser.email) || ""}
                  label="Email"
                  icon={
                    currentUser &&
                    currentUser.emailVerified &&
                    newUser.email === currentUser.email &&
                    {
                      color: "green",
                      name: 'check'
                    }
                  }
                  onChange={(event, data) => this.userFieldChange(null, data.value, "email")}
                />
                {
                  (
                    !currentUser ||
                    !currentUser.emailVerified ||
                    newUser.email !== currentUser.email
                  ) &&
                  <Button
                    size="mini"
                    color="orange"
                    onClick={this.sendEmailModal}
                    content="Send email to confirm"
                  />
                }
              </Form.Field> */}
              <Form.Field>
                <Form.Input
                  fluid
                  type="tel"
                  maxLength={13}
                  pattern="\+\d{0,12}"
                  placeholder="+380XXXXXXXXX"
                  value={(newUser && newUser.phoneNumber) || ""}
                  label="Phone"
                  icon={
                    currentUser &&
                    currentUser.phoneVerified &&
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
                    !currentUser.phoneVerified ||
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
              </Form.Field>
            </Form>
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
        panes={this.generatePanes()}
      />
    )
  }
};

