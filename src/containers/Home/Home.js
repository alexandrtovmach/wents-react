import React from 'react';
import { Header, Container, Card, Button, Segment } from 'semantic-ui-react';

import { Search, Filters, RentCard } from "../../components";
import { getLatestData } from '../../services/database';

import './Home.scss';

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  async componentDidMount() {
    const lastPosts = await getLatestData("posts", 6);
    console.log(lastPosts);
    this.setState({
      posts: lastPosts
    })
  }

  render() {
    const { posts } = this.state;
    return (
      <Container
        fluid
        className="no-margin-mobile"
      >
        <Segment
          basic
          className="header-compensator viewport flex-center flex-column main-bg"
        >
          <Header as="h1" size="huge" inverted>
            RENTWENS
          </Header>
  
          <Container>
            <Search />
            <Filters
              // onChange={console.log}
            />
          </Container>
        </Segment>
        <Segment basic textAlign="center" padded>
          <Container>
            <Header as="h1" size="huge">
              Search results:
            </Header>
            <Card.Group centered>
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
            <Button
              className="margin-2"
              as="a"
              href="/search-rent"
            >
              More
            </Button>
          </Container>
        </Segment>
      </Container>
    );
  }
}