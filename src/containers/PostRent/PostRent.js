import React from 'react';
import { Container, Card, Segment, Dimmer, Loader, Header } from 'semantic-ui-react';

import { RentCard } from "../../components";
import { getUser } from '../../services/auth';

export default class PostRent extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      loading: true
    };
  }

  componentDidMount() {
    getUser()
      .then(user => {
        if (user) {
          this.setState({
            user: user,
            loading: false
          })
        } else {
          window.location.href = "/login";
        }
      })
  }

  
  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <Container
          fluid
          className="header-compensator min-height-viewport"
        >
          <Dimmer active inverted>
            <Loader inverted content='Loading' />
          </Dimmer>
        </Container>
      )
    } else {
      return (
        <Container
          className="header-compensator min-height-viewport"
        >
          <Header>
            My posts
          </Header>
          <Segment basic textAlign="center" padded>
            <Card.Group centered stackable itemsPerRow={4}>
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map(id => <RentCard key={id} id={id} />)}
            </Card.Group>
          </Segment>
        </Container>
      );
    }
  }
}