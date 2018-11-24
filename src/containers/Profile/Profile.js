import React from 'react';
import {
  Container,
  Segment,
  Grid,
  Image,
  Rating,
  Item,
  Button,
  Header,
  Card,
  List,
  Tab,
  Icon,
  Form,
  Modal,
  Dimmer
} from 'semantic-ui-react';

import { AdvertiseCard, Loader, AddressInput, AvatarUploader } from "../../components";
import { advertStatusList, placeholderImg, advertTypeList } from '../../services/constants';
import { getUser, signOut } from '../../services/auth';
import { extendUserWithAdditionalData, getData } from '../../services/database';
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

    this.filterPostsByStatusAndType = this.filterPostsByStatusAndType.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleAvatarChange = this.toggleAvatarChange.bind(this);
    this.handleAvatarDimmerShow = this.handleAvatarDimmerShow.bind(this);
    this.handleAvatarDimmerHide = this.handleAvatarDimmerHide.bind(this);
    this.avatarChanged = this.avatarChanged.bind(this);
    this.nameChanged = this.nameChanged.bind(this);
    this.birthChanged = this.birthChanged.bind(this);
    this.addressChanged = this.addressChanged.bind(this);
    this.phoneChanged = this.phoneChanged.bind(this);
    this.descriptionChanged = this.descriptionChanged.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  async componentDidMount() {
    const user = await getUser();
    if (user) {
      const userPosts = await getData("posts", "", user.uid);
      this.setState({
        fullUser: user,
        user: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          rating: Math.round(Math.random() * 5),
          address: user.address,
          birthday: user.birthday,
          phoneNumber: user.phoneNumber,
          email: user.email,
          description: user.description
        },
        posts: userPosts || [],
        loading: false
      });
    } else {
      window.location.href = "/login";
    }
  }

  toggleEdit() {
    const { edit, user } = this.state;
    if (edit) {
      this.setState({
        loading: true
      });
      extendUserWithAdditionalData(user)
        .then(this.setState({
          edit: false,
          loading: false
        }))
    } else {
      this.setState({
        edit: true
      });
    }
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

  nameChanged(event, value) {
    if (!event.target.validationMessage) {
      this.setState({
        user: {
          ...this.state.user,
          displayName: value
        }
      });
    }
  }

  birthChanged(event, value) {
    if (!event.target.validationMessage) {
      this.setState({
        user: {
          ...this.state.user,
          birthday: value
        }
      });
    }
  }

  addressChanged({ address }) {
    this.setState({
      user: {
        ...this.state.user,
        address: address
      }
    });
  }

  phoneChanged(event, value) {
    if (!event.target.validationMessage) {
      this.setState({
        user: {
          ...this.state.user,
          phoneNumber: value
        }
      });
    }
  }

  descriptionChanged(event, value) {
    if (!event.target.validationMessage) {
      this.setState({
        user: {
          ...this.state.user,
          description: value
        }
      });
    }
  }

  logout() {
    signOut();
    window.location.reload();
  }

  filterPostsByStatusAndType(posts, status, advType) {
    return (
      <Card.Group centered>
        {Object.keys(posts).map(key => posts[key][status.key] === status.value && posts[key].advType === advType && <AdvertiseCard key={posts[key].id} data={posts[key]} />)}
      </Card.Group>
    )
  };

  generateAdvertTabs(advType) {
    const { posts } = this.state;
    return advertStatusList.map(status => {
      return {
        menuItem: status.name,
        render: () => <Tab.Pane>{this.filterPostsByStatusAndType(posts, status, advType)}</Tab.Pane>
      };
    });
  }

  generateTypesTabs() {
    return advertTypeList.map(type => {
      return {
        menuItem: type.name,
        render: () => (
          <Tab.Pane>
            <Tab
              menu={{ secondary: true, pointing: true }}
              panes={this.generateAdvertTabs(type.value)}
            />
          </Tab.Pane>
        )
      };
    });
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
              value={user.displayName}
              onChange={(event, data) => this.nameChanged(event, data.value)}
            />
            <Form.Field>
              <AddressInput
                setLocation={this.addressChanged}
                value={user.address}
                icon='map marker alternate'
                placeholder="Your location"
              />
            </Form.Field>
            <Form.Input
              fluid
              type="date"
              value={dateToInputFormat(user.birthday)}
              min="1950-01-01"
              icon='calendar check outline'
              iconPosition='left'
              onChange={(event, data) => this.birthChanged(event, data.value)}
            />
            <Form.Input
              fluid
              type="tel"
              maxLength={13}
              pattern="[\+]\d{0,12}"
              placeholder="+380XXXXXXXXX"
              value={user.phoneNumber}
              icon='phone'
              iconPosition='left'
              onChange={(event, data) => this.phoneChanged(event, data.value)}
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
              user.address &&
              <List.Item>
                <List.Icon name='map marker alternate' />
                <List.Content>{user.address}</List.Content>
              </List.Item>
            }
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
    const { user, loading, edit, avatarChanging, avatarDimmerShow } = this.state;

    if (loading) {
      return <Loader />
    } else {
      return (
        <Container
          className="header-compensator min-height-viewport"
        >
          <Modal
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
                      onChange={(event, data) => this.descriptionChanged(event, data.value)}
                    />
                  </Form>
                ) : (
                  <Segment basic>
                    <Header size="large">About</Header>
                    <Item>{user.description || "Nothing special"}</Item>
                  </Segment>
                )
              }
              <Segment basic>
                {/* <Header size="large">My Adverts</Header> */}
                <Tab
                  // menu={{ vertical: true, tabular: true }}
                  panes={this.generateTypesTabs()}
                />
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      )
    }
    }
};

