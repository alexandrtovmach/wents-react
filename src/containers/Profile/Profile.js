import React from 'react';
import {
  Container,
  Segment,
  Image,
  Rating,
  Header,
  List,
  Icon,
  Form,
  Dimmer
} from 'semantic-ui-react';

import { Loader, AddressInput, UserForm } from "../../components";
import { placeholderImg } from '../../services/constants';
import { getUser, signOut } from '../../services/auth';
import { extendUserWithAdditionalData } from '../../services/database';
import { dateToInputFormat } from '../../services/utils';


export default class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      loading: true,
      edit: false,
      avatarChanging: false,
      avatarDimmerShow: false,
      posts: []
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  async componentDidMount() {
    const user = await getUser();
    if (user) {
      this.setState({
        currentUser: user,
        user: user,
        loading: false
      });
    } else {
      window.location.href = "/login";
    }
  }

  toggleEdit() {
    const { edit, user, currentUser } = this.state;
    if (edit) {
      if (user.phoneNumber !== currentUser.phoneNumber) {
        console.log(user.phoneNumber);
      } else {
        // this.saveChanges(user);
      }
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

  logout() {
    signOut();
    window.location.reload();
  }

  generateUserPhotoAndRating(user, edit, avatarDimmerShow) {
    return (
      <Segment
        basic
        size="tiny"
        textAlign="center"
      >
        <Dimmer.Dimmable
          as={Image}
          centered
          fluid
          dimmed={edit}
          dimmer={{
            active: edit && avatarDimmerShow,
            content: <Icon name='configure' size="huge"/>,
            onClick: this.toggleAvatarChange
          }}
          onMouseEnter={this.handleAvatarDimmerShow}
          onMouseLeave={this.handleAvatarDimmerHide}
          src={user.photoURL || placeholderImg}
        />
        <Header>
          <Header.Content>
            <Rating
              disabled
              rating={user.rating}
              maxRating={5}
              size="massive"
            />
          </Header.Content>
          <Header.Subheader>
            {user.rating}/5
          </Header.Subheader>
        </Header>
      </Segment>
    )
  }

  generateUserMetaInfo(user, edit) {
    if (edit) {
      return (
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
            <Form.Input
              fluid
              type="tel"
              maxLength={13}
              pattern="[\+]\d{0,12}"
              placeholder="+380XXXXXXXXX"
              value={user.phoneNumber || ""}
              icon='phone'
              iconPosition='left'
              onChange={(event, data) => this.userFieldChange(event, data.value, "phoneNumber")}
            />
          </Form>
        </Segment>
      )
    } else {
      return (
        <Segment
          basic
          padded
        >
          <Header
            size="huge"
          >
            {user.displayName || "User Name"}
          </Header>
          <List>
            {
              user.birthday &&
              <List.Item>
                <List.Icon name='calendar check outline' />
                <List.Content>{user.birthday}</List.Content>
              </List.Item>
            }
            <List.Item>
              <List.Icon name='mail' />
              <List.Content>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </List.Content>
            </List.Item>
            {
              user.address &&
              <List.Item>
                <List.Icon name='map marker alternate' />
                <List.Content>{user.address}</List.Content>
              </List.Item>
            }
            {
              user.phoneNumber &&
              <List.Item>
                <List.Icon name='phone' />
                <List.Content>{user.phoneNumber}</List.Content>
              </List.Item>
            }
          </List>
        </Segment>
      )
    }
  }

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return <Loader />
    } else {
      return (
        <Container
          text
          className="header-compensator min-height-viewport"
        >
          <UserForm
            user={user}
          />
          {/* <Modal
            open={avatarChanging}
            closeOnEscape={true}
            closeOnDimmerClick={true}
            onClose={this.toggleAvatarChange}
            size="small"
          >
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content>
              <AvatarUploader
                src={user.photoURL}
                onChange={this.avatarChanged}
                onCancel={this.toggleAvatarChange}
              />
            </Modal.Content>
          </Modal>
          <PhoneValidation
            phoneToValidate={phoneToValidate}
          />
          <Grid stackable divided>
            <Grid.Column
              width={4}
            >
              {this.generateUserPhotoAndRating(user, edit, avatarDimmerShow)}
              {this.generateUserMetaInfo(user, edit)}
              <Button
                basic={!edit}
                primary
                fluid
                onClick={this.toggleEdit}
              >
                {edit? "Save Profile": "Edit Profile"}
              </Button>
              <Button
                fluid
                onClick={this.logout}
                className="margin-v-1"
              >
                Logout
              </Button>
            </Grid.Column>
            <Grid.Column width={12}>
              {
                edit? (
                  <Form
                    as={Segment}
                    basic
                  >
                    <Form.TextArea
                      autoHeight
                      label="About"
                      maxLength={500}
                      value={user.description}
                      onChange={(event, data) => this.userFieldChange(event, data.value, "description")}
                    />
                  </Form>
                ) : (
                  <Segment basic>
                    <Header size="large">About</Header>
                    <Item>{user.description || "Nothing special"}</Item>
                    <Header size="large">Tools</Header>
                    <Button
                      onClick={console.log}
                      // className="margin-v-1"
                    >
                      My Messages
                    </Button>
                    <Button
                      onClick={console.log}
                      // className="margin-v-1"
                    >
                      My Posts
                    </Button>
                  </Segment>
                )
              }
            </Grid.Column>
          </Grid> */}
        </Container>
      )
    }
    }
};

