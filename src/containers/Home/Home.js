import React from 'react';
import { Header, Container, Card, Button, Segment, Accordion, Icon } from 'semantic-ui-react';

import { Search, Filters, AdvertiseCard } from "../../components";
import { getDataByPrice } from '../../services/database';
import { debounce, filterPostsByParameters } from '../../services/utils';

import './Home.scss';

const LIMIT_CARDS = 6;

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      showFilters: false,
      filters: {
        advType: "home",
        minPrice: 0,
        maxPrice: 2000,
        // unlimitedDate: false,
        // startDate: Date.now(),
        // endDate: Date.now() + 1000*60*60*24*120,
        // apartmentsType: "any",
        // rentType: "any",
        // benefitList: []
      },
      searchString: ""
    };

    this.toggleFiltersShow = this.toggleFiltersShow.bind(this);
    this.searchChanged = debounce(this.searchChanged.bind(this), 1000);
    this.typeChanged = debounce(this.typeChanged.bind(this), 1000);
    // this.filtersChanged = debounce(this.filtersChanged.bind(this), 1000);
  }

  async componentDidMount() {
    const posts = await getDataByPrice("posts", this.state.filters);
    this.setState({
      posts,
      filteredPosts: filterPostsByParameters(posts, {
        ...this.state.filters,
        title: this.state.searchString
      })
    })
  }

  searchChanged(searchString) {
    const filters = {
      ...this.state.filters,
      title: searchString || ""
    }
    this.setState({
      filteredPosts: filterPostsByParameters(this.state.posts, filters),
      filters
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

  // async filtersChanged(filters) {
  //   const { minPrice, maxPrice } = this.state.filters;
  //   if (filters.minPrice !== minPrice || filters.maxPrice !== maxPrice) {
  //     const posts = await getDataByPrice("posts", filters);
  //     this.setState({
  //       posts: posts,
  //       filteredPosts: filterPostsByParameters(posts, {
  //         ...filters,
  //         title: this.state.searchString
  //       }),
  //       filters
  //     })
  //   } else {
  //     this.setState({
  //       filteredPosts: filterPostsByParameters(this.state.posts, {
  //         ...filters,
  //         title: this.state.searchString
  //       }),
  //       filters
  //     })
  //   }
  // }

  toggleFiltersShow() {
    this.setState({
      showFilters: !this.state.showFilters
    })
  }

  render() {
    const {
      filteredPosts,
      showFilters,
      advType
    } = this.state;
    return (
      <Container
        fluid
        className="no-margin-mobile min-height-viewport"
      >
        <Segment
          basic
          className="header-compensator viewport flex-center flex-column main-bg"
        >
          <Header as="h1" size="huge" inverted>
            RENTWENS
          </Header>
          <Container
            className="min-width-2"
          >
            
            <Search
              onChange={this.searchChanged}
              onChangeType={this.typeChanged}
            />
            {/* <Accordion
              fluid
              styled
              className="margin-v-1"
            >
              <Accordion.Title active={showFilters} onClick={this.toggleFiltersShow}>
                <Icon name='dropdown' />
                Filters
              </Accordion.Title>
              <Accordion.Content active={showFilters}>
                <Filters
                  basic
                  onChange={this.filtersChanged}
                />
              </Accordion.Content>
            </Accordion> */}
          </Container>
        </Segment>
        <Segment basic textAlign="center" padded>
          <Container>
            <Header size="medium">
              Search results:
            </Header>
            <Card.Group centered>
              {filteredPosts && Object.keys(filteredPosts).slice(0, LIMIT_CARDS).map(id => (
                <AdvertiseCard
                  key={id}
                  data={{
                    ...filteredPosts[id],
                    id
                  }}
                />
              ))}
            </Card.Group>
            <Button
              className="margin-2"
              as="a"
              href="/search"
            >
              More
            </Button>
          </Container>
        </Segment>
      </Container>
    );
  }
}