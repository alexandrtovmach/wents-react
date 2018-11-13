import React from 'react';
import { Container, Card, Segment, Header } from 'semantic-ui-react';

import { RentCard, Loader } from "../../components";
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
        <Loader />
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
            <Card.Group stackable itemsPerRow={4}>
              {[1,2].map(id => <RentCard key={id} id={id} />)}
              <RentCard
                key={0}
                add={true}
              />
            </Card.Group>
          </Segment>
        </Container>
      );
    }
  }
}