import React from 'react';
import { Container, Card, Segment } from 'semantic-ui-react';

import { Search, Filters, AdvertiseCard, SortPanel } from "../../components";
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
        advType: "home",
        title: "",
        minPrice: 0,
        maxPrice: 300,
        unlimitedDate: false,
        startDate: Date.now(),
        endDate: Date.now() + 1000*60*60*24*120,
        apartmentsType: "any",
        rentType: "any",
        benefitList: []
      }
    };

    this.sortChanged = this.sortChanged.bind(this);
    this.searchChanged = debounce(this.searchChanged.bind(this), 1000);
    this.typeChanged = debounce(this.typeChanged.bind(this), 1000);
    this.filtersChanged = debounce(this.filtersChanged.bind(this), 1000);
  }

  async componentDidMount() {
    const { filters } = this.state;
    const posts = await getDataByPrice("posts", filters);
    this.setState({
      posts,
      filters,
      filteredPosts: filterPostsByParameters(posts, filters)
    })
  }

  searchChanged(searchString) {
    const filters = {
      ...this.state.filters,
      title: searchString || ""
    }
    this.setState({
      filters,
      filteredPosts: filterPostsByParameters(this.state.posts, filters)
    })
  }

  typeChanged(type) {
    const filters = {
      ...this.state.filters,
      advType: type || ""
    }
    this.setState({
      filteredPosts: filterPostsByParameters(this.state.posts, filters),
      filters
    })
  }

  async filtersChanged(filters) {
    const { minPrice, maxPrice, title, advType } = this.state.filters;
    filters = {
      ...filters,
      title,
      advType
    }
    if (filters.minPrice !== minPrice || filters.maxPrice !== maxPrice) {
      const posts = await getDataByPrice("posts", filters);
      this.setState({
        posts: posts,
        filteredPosts: filterPostsByParameters(posts, filters),
        filters
      })
    } else {
      this.setState({
        filteredPosts: filterPostsByParameters(this.state.posts, filters),
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
      filteredPosts
    } = this.state;
    const {
      langPack
    } = this.props;

    console.log(langPack);

    return (
      <Container
        className="header-compensator min-height-viewport"
      >
        <Segment
          basic
        >
          <Search
            onChange={this.searchChanged}
            onChangeType={this.typeChanged}
            langPack={langPack}
          />
          <Filters
            onChange={this.filtersChanged}
            langPack={langPack}
          />
          <SortPanel
            onChange={this.sortChanged}
            langPack={langPack}
          />
        </Segment>
        <Segment basic textAlign="center" padded>
          <Card.Group centered stackable itemsPerRow={4}>
            {filteredPosts && Object.keys(filteredPosts).sort((a, b) => this.sortHandler(a, b, filteredPosts)).map(id => (
              <AdvertiseCard
                key={id}
                langPack={langPack}
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