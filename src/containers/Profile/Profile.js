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
  Label,
  Form,
  Modal
} from 'semantic-ui-react';
import { RentCard, Loader, AddressInput, ImageInput } from "../../components";
import { advertStatusList } from '../../services/constants';
import { getUser, signOut } from '../../services/auth';
import { dateToInputFormat } from '../../services/utils';


export default class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      loading: true,
      edit: false,
      avatarChanging: false
    };

    this.filterPostsByStatus = this.filterPostsByStatus.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.avatarChange = this.avatarChange.bind(this);
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
      this.setState({
        fullUser: user,
        user: {
          displayName: user.displayName,
          photoURL: user.photoURL || 'https://react.semantic-ui.com/images/wireframe/square-image.png',
          rating: Math.round(Math.random() * 5),
          address: user.address,
          birth: user.birth,
          phoneNumber: user.phoneNumber,
          email: user.email,
          description: user.description
        },
        loading: false
      });
    } else {
      window.location.href = "/login";
    }
  }

  toggleEdit() {
    const { edit } = this.state;
    if (edit) {
      this.setState({
        edit: false
      });
    } else {
      this.setState({
        edit: true
      });
    }
  }

  avatarChange() {
    this.setState({
      avatarChanging: true
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
          birth: value
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

  filterPostsByStatus(posts, status) {
    // filtration
    return (
      <Card.Group>
        <RentCard id={status.length} />
      </Card.Group>
    )
  };

  generateAdvertTabs() {
    return advertStatusList.map(status => {
      return {
        menuItem: status,
        render: () => <Tab.Pane>{this.filterPostsByStatus([], status)}</Tab.Pane>
      };
    });
  }

  generateUserPhotoAndRating(user, edit) {
    return (
      <Segment
        basic
        size="tiny"
        textAlign="center"
      >
        <Image
          src={user.photoURL}
          centered
          size="medium"
          label={
            edit &&
            <Label
              as='a'
              corner='right'
              icon='configure'
              onClick={this.avatarChange}
            />
          }
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
              value={dateToInputFormat(user.birth)}
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
              user.birth &&
              <List.Item>
                <List.Icon name='calendar check outline' />
                <List.Content>{user.birth}</List.Content>
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
    const { user, loading, edit, avatarChanging } = this.state;

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
            size="small"
          >
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content>
              <ImageInput />
            </Modal.Content>
          </Modal>
          <Grid stackable divided>
            <Grid.Column
              width={4}
            >
              {this.generateUserPhotoAndRating(user, edit)}
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
                <Header size="large">My Adverts</Header>
                <Tab panes={this.generateAdvertTabs()} />
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      )
    }
    }
};
