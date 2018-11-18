import React from 'react';
import { Container, Card, Segment } from 'semantic-ui-react';

import { Search, Filters, RentCard, SortPanel } from "../../components";
import { getLatestData } from '../../services/database';
import { debounce } from '../../services/utils';

export default class SearchRent extends React.Component {
  constructor() {
    super();

    this.state = {
      sortBy: {
        name: "title",
        type: -1
      }
    };

    this.sortChanged = this.sortChanged.bind(this);
    this.searchChanged = debounce(this.searchChanged.bind(this), 1000);
    this.filtersChanged = debounce(this.filtersChanged.bind(this), 1000);
  }

  async componentDidMount() {
    const lastPosts = await getLatestData("posts", 20);
    this.setState({
      posts: lastPosts
    })
  }

  searchChanged(searchString) {
    searchString && console.log(searchString);
    // this.setState({
    //   sortBy: {
    //     name,
    //     type
    //   }
    // })
  }

  filtersChanged(filters) {
    console.log(filters);
    // this.setState({
    //   sortBy: {
    //     name,
    //     type
    //   }
    // })
  }

  sortChanged(name, type) {
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
          <Search
            onChange={this.searchChanged}
          />
          <Filters
            onChange={this.filtersChanged}
          />
          <SortPanel
            onChange={this.sortChanged}
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