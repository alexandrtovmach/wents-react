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

const Profile = React.memo(({ user }) => {
  if (!user) {
    return (
      <Loader />
    )
  }

  const filterPostsByStatus = (posts, status) => {
    // filtration
    return (
      <Card.Group>
        <RentCard id={status.length} />
      </Card.Group>
    )
  };

  const userMeta = {
    name: user.displayName || "User Name",
    photo: user.photoURL || 'https://react.semantic-ui.com/images/wireframe/square-image.png',
    rating: Math.round(Math.random() * 5),
    address: user.address || 'Ukraine, Lviv',
    birth: user.birth || "Immortal",
    phone: user.phoneNumber || "095-666-66-66",
    email: user.email || "devil@hell.net"
  };

  const adverts = advertStatusList.map(status => {
    return {
      menuItem: status,
      render: () => <Tab.Pane>{filterPostsByStatus([], status)}</Tab.Pane>
    };
  });

  const UserPhoto = (
    <Segment
      basic
      size="tiny"
      textAlign="center"
    >
      <Image
        src={userMeta.photo}
        centered
        avatar
        size="medium"
      />
      <Header>
        <Header.Content>
          <Rating
            disabled
            rating={userMeta.rating}
            maxRating={5}
            size="massive"
          />
        </Header.Content>
        <Header.Subheader>
          {userMeta.rating}/5
        </Header.Subheader>
      </Header>
    </Segment>
  );

  const UserMeta = (
    <Segment
      basic
      padded
    >
      <Header size="huge">
        {userMeta.name}
      </Header>
      <List>
        <List.Item>
          <List.Icon name='map marker alternate' />
          <List.Content>{userMeta.address}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='calendar check outline' />
          <List.Content>{userMeta.birth}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='mail' />
          <List.Content>
            <a href={`mailto:${userMeta.email}`}>{userMeta.email}</a>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='phone' />
          <List.Content>{userMeta.phone}</List.Content>
        </List.Item>
      </List>
    </Segment>
  );

  return (
    <Container
      className="header-compensator min-height-viewport"
    >
      <Grid stackable divided>
        <Grid.Column
          width={4}
        >
          {UserPhoto}
          {UserMeta}
          <Button
            basic
            primary
            fluid
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
            <Tab panes={adverts} />
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  )
});

export default Profile;
