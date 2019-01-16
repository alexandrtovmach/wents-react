import React from 'react';
import { Header, Container, Card, Button, Segment } from 'semantic-ui-react';

import {
  Search,
  AdvertiseCard
} from "../../components";
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
        title: "",
        minPrice: 0,
        maxPrice: 2000
      }
    };

    this.toggleFiltersShow = this.toggleFiltersShow.bind(this);
    this.searchChanged = debounce(this.searchChanged.bind(this), 1000);
    this.typeChanged = debounce(this.typeChanged.bind(this), 1000);
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

  toggleFiltersShow() {
    this.setState({
      showFilters: !this.state.showFilters
    })
  }

  render() {
    const {
      filteredPosts
    } = this.state;
    const { langPack } = this.props;
    return (
      <Container
        fluid
        className="no-margin-mobile min-height-viewport"
      >
        <Segment
          basic
          className="header-compensator viewport flex-center flex-column main-bg"
        >
          <Header size="huge" inverted>
            RENTWENS
          </Header>
          <Container
            text
            className="min-width-2"
          >
            <Search
              langPack={langPack}
              onChange={this.searchChanged}
              onChangeType={this.typeChanged}
            />
          </Container>
        </Segment>
        <Segment basic textAlign="center" padded>
          <Container>
            <Header size="medium">
              {langPack["search_results"]}
            </Header>
            <Card.Group centered>
              {filteredPosts && Object.keys(filteredPosts).slice(0, LIMIT_CARDS).map(id => (
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
            <Button
              className="margin-2"
              as="a"
              href="/search"
            >
              {langPack["more"]}
            </Button>
          </Container>
        </Segment>
      </Container>
    );
  }
}