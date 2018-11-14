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
  Tab
} from 'semantic-ui-react';
import { RentCard, Loader } from "../../components";
import { lorem } from '../../services/utils';
import { advertStatusList } from '../../services/constants';
import { getUser } from '../../services/auth';


export default class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      loading: true
    };

    this.filterPostsByStatus = this.filterPostsByStatus.bind(this);
    this.editUserOn = this.editUserOn.bind(this);
  }
  
  async componentDidMount() {
    const user = await getUser();
    this.setState({
      fullUser: user,
      user: {
        name: user.displayName || "User Name",
        photo: user.photoURL || 'https://react.semantic-ui.com/images/wireframe/square-image.png',
        rating: Math.round(Math.random() * 5),
        address: user.address || 'Ukraine, Lviv',
        birth: user.birth || "Immortal",
        phone: user.phoneNumber || "095-666-66-66",
        email: user.email || "devil@hell.net"
      },
      loading: false
    });
  }

  editUserOn() {
    // turn on edit
    console.log(this.state.fullUser);
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

  generateUserPhotoAndRating(user) {
    return (
      <Segment
        basic
        size="tiny"
        textAlign="center"
      >
        <Image
          src={user.photo}
          centered
          avatar
          size="medium"
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

  generateUserMetaInfo(user) {
    return (
      <Segment
        basic
        padded
      >
        <Header size="huge">
          {user.name}
        </Header>
        <List>
          <List.Item>
            <List.Icon name='map marker alternate' />
            <List.Content>{user.address}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='calendar check outline' />
            <List.Content>{user.birth}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='mail' />
            <List.Content>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='phone' />
            <List.Content>{user.phone}</List.Content>
          </List.Item>
        </List>
      </Segment>
    )
  }

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return <Loader />
    } else {
      return (
        <Container
          className="header-compensator min-height-viewport"
        >
          <Grid stackable divided>
            <Grid.Column
              width={4}
            >
              {this.generateUserPhotoAndRating(user)}
              {this.generateUserMetaInfo(user)}
              <Button
                basic
                primary
                fluid
                onClick={this.editUserOn}
              >
                Edit Profile
              </Button>
            </Grid.Column>
            <Grid.Column width={12}>
              <Segment basic>
                <Header size="large">About</Header>
                <Item>{lorem}</Item>
              </Segment>
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

