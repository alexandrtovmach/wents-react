import React from 'react';
import { Container, Card, Segment, Header } from 'semantic-ui-react';

import { AdvertiseCard, Loader } from "../../components";
import { getUser } from '../../services/auth';
import { getData } from '../../services/database';

export default class AdvertiseList extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      loading: true
    };
  }

  async componentDidMount() {
    const user = await getUser();
    if (user) {
      const posts = await getData("posts", "", user.uid);
      this.setState({
        user,
        posts,
        loading: false
      })
    } else {
      window.location.href = "/login";
    }
  }

  
  render() {
    const { loading, posts } = this.state;
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
              {posts && Object.keys(posts).map(id => (
                <AdvertiseCard
                  key={id}
                  data={{
                    ...posts[id],
                    id
                  }}
                />
              ))}
              <AdvertiseCard
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