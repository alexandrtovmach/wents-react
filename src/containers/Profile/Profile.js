import * as React from 'react';
import {
  Container,
  Segment,
  Grid,
  Image,
  Rating,
  Item,
  Button,
  Label,
  Header,
  Card
} from 'semantic-ui-react';
import { Loader, RentCard } from "../../components";
import { lorem } from '../../services/utils';
import './Profile.scss';

const Profile = React.memo(({ user }) => {
  if (!user) {
    return <Loader />
  }

  const userMeta = {
    name: user.displayName,
    photo: user.photoURL,
    additional: [
      { title: "Country:", value: user.country || 'Ukraine' },
      { title: "City:", value: user.city || 'Lviv' },
      { title: "Age:", value: user.age || 28 },
      { title: "Phone:", value: user.phoneNumber || "095-666-66-66" },
      { title: "Email:", value: user.email || "devil@hell.net" }
    ]
  };

  const UserPhoto = (
    <Segment
      basic
      textAlign="center"
      className="profile-user-photo-wrap"
    >
      <Image
        src={userMeta.photo}
        className="user-photo"
        centered
        size="medium"
      />
      <Rating
        disabled
        rating={4.5}
        maxRating={5}
        size="huge"
      />
      <Item.Meta>
        Feedback: {Math.round(Math.random() * 10)}
      </Item.Meta>
    </Segment>
  );

  const UserMeta = (
    <Segment
      basic
      className="profile-user-meta-wrap"
    >
      <Item.Header>
        {userMeta.name}
      </Item.Header>
      <Item.Group>
        {userMeta.additional.map((infoItem) => (
          <Item.Content key={infoItem.title}>
            <Item.Header>
              {infoItem.title}
            </Item.Header>
            <Item.Description>
              {infoItem.value}
            </Item.Description>
          </Item.Content>
        ))}
      </Item.Group>
    </Segment>
  );

  return (
    <Container
      fluid
      className="profile-container header-compensator min-height-viewport"
    >
      <Grid stackable divided>
        <Grid.Column
          width={4}
          textAlign="center"
          className="summary-column"
        >
          {UserPhoto}
          {UserMeta}
          <Item className="buttons-wrap">
            <Button primary>
              Messages
              <Label
                basic
                floating
                circular
                content={user.newMessages || "3"}
              />
            </Button>
            <Button primary>New advert</Button>
          </Item>
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment className="about-column" basic>
            <Segment basic>
              <Button primary>Search House</Button>
              <Button primary>Post House</Button>
              <Button primary floated="right">Edit Profile</Button>
            </Segment>
            <Segment basic className="about-text-wrap">
              <Header size="large">About</Header>
              <Item>{lorem}</Item>
            </Segment>
            <Segment basic className="adverts-wrap">
              <Header size="large">My Adverts</Header>
              <Segment basic textAlign="center">
                <Button>Active</Button>
                <Button>Pending</Button>
                <Button>Archived</Button>
              </Segment>
              <Card.Group>
                <RentCard id={666} />
              </Card.Group>
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  )
});

export default Profile;
