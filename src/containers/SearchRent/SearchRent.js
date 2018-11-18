import React from 'react';
import { Container, Card, Segment } from 'semantic-ui-react';

import { Search, Filters, RentCard, SortPanel } from "../../components";
import { getDataByPrice } from '../../services/database';
import { debounce, filterPostsByParameters } from '../../services/utils';

export default class SearchRent extends React.Component {
  constructor() {
    super();

    this.state = {
      sortBy: {
        name: "title",
        type: -1
      },
      filters: {
        minPrice: 0,
        maxPrice: 300
      },
      searchString: ""
    };

    this.sortChanged = this.sortChanged.bind(this);
    this.searchChanged = debounce(this.searchChanged.bind(this), 1000);
    this.filtersChanged = debounce(this.filtersChanged.bind(this), 1000);
  }

  async componentDidMount() {
    this.setState({
      posts: await getDataByPrice("posts", this.state.filters)
    })
  }

  searchChanged(searchString) {
    // if (searchString) {
    //   getDataByParameters("posts", {title: searchString})
    //     .then(posts => this.setState(posts))
    // }
    // this.setState({
    //   sortBy: {
    //     name,
    //     type
    //   }
    // })
  }

  async filtersChanged(filters) {
    const { minPrice, maxPrice } = this.state.filters;
    if (filters.minPrice !== minPrice || filters.maxPrice !== maxPrice) {
      const posts = await getDataByPrice("posts", filters);
      this.setState({
        posts: posts,
        filteredPosts: filterPostsByParameters(posts, {
          ...filters,
          title: this.state.searchString
        }),
        filters
      })
    } else {
      this.setState({
        filteredPosts: filterPostsByParameters(this.state.posts, {
          ...filters,
          title: this.state.searchString
        }),
        filters
      })
    }
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
      // posts,
      filteredPosts
    } = this.state;
    console.log("render", filteredPosts);
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
            {filteredPosts && Object.keys(filteredPosts).sort((a, b) => this.sortHandler(a, b, filteredPosts)).map(id => (
              <RentCard
                key={id}
                data={{
                  ...filteredPosts[id],
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