import React from 'react';
import { Container, Card, Segment } from 'semantic-ui-react';

import { Search, Filters, RentCard, SortPanel } from "../../components";
import { getLatestData } from '../../services/database';

export default class SearchRent extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  async componentDidMount() {
    const lastPosts = await getLatestData("posts", 20);
    this.setState({
      posts: lastPosts
    })
  }

  render() {
    const { posts } = this.state;
    return (
      <Container
        className="header-compensator min-height-viewport"
      >
        <Segment
          basic
        >
          <Search />
          <Filters
            onChange={console.log}
          />
          <SortPanel
            onChange={console.log}
          />
        </Segment>
        <Segment basic textAlign="center" padded>
          <Card.Group centered stackable itemsPerRow={4}>
            {posts && Object.keys(posts).map(id => (
              <RentCard
                key={id}
                data={{
                  ...posts[id],
                  id
                }}
              />
            ))}
          </Card.Group>
        </Segment>
      </Container>
    );
  }
}