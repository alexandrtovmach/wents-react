import React from 'react';
import { Container, Card, Segment } from 'semantic-ui-react';

import { Search, Filters, RentCard, SortPanel } from "../../components";
import { getLatestData } from '../../services/database';

export default class SearchRent extends React.Component {
  constructor() {
    super();

    this.state = {
      sortBy: {
        name: "title",
        type: -1
      }
    };

    this.sortChaged = this.sortChaged.bind(this);
  }

  async componentDidMount() {
    const lastPosts = await getLatestData("posts", 20);
    this.setState({
      posts: lastPosts
    })
  }

  sortChaged(name, type) {
    this.setState({
      sortBy: {
        name,
        type
      }
    })
  }

  sortHandler(a, b, posts) {
    const { name, type } = this.state.sortBy || {};
    if (!name || !type) return 0;
    a = name === "price"? Number(posts[a][name]): posts[a][name];
    b = name === "price"? Number(posts[b][name]): posts[b][name];
    if(a < b) return (-1 * type);
    if(a > b) return (1 * type);
    return 0;
  }

  render() {
    const {
      posts,
    } = this.state;
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
            onChange={this.sortChaged}
          />
        </Segment>
        <Segment basic textAlign="center" padded>
          <Card.Group centered stackable itemsPerRow={4}>
            {posts && Object.keys(posts).sort((a, b) => this.sortHandler(a, b, posts)).map(id => (
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