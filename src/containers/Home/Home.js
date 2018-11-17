import React from 'react';
import { Header, Container, Card, Button, Segment, Accordion, Icon } from 'semantic-ui-react';

import { Search, Filters, RentCard } from "../../components";
import { getLatestData } from '../../services/database';

import './Home.scss';

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      showFilters: false
    };

    this.toggleFiltersShow = this.toggleFiltersShow.bind(this);
  }

  async componentDidMount() {
    const lastPosts = await getLatestData("posts", 6);
    this.setState({
      posts: lastPosts
    })
  }

  toggleFiltersShow() {
    this.setState({
      showFilters: !this.state.showFilters
    })
  }

  render() {
    const {
      posts,
      showFilters
    } = this.state;
    return (
      <Container
        fluid
        className="no-margin-mobile min-height-viewport"
      >
        <Segment
          basic
          className="header-compensator half-viewport flex-center flex-column main-bg"
        >
          <Header as="h1" size="huge" inverted>
            RENTWENS
          </Header>
          <Container
            className="min-width-2"
          >
            <Search />
            <Accordion
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
                  // onChange={console.log}
                />
              </Accordion.Content>
            </Accordion>
          </Container>
        </Segment>
        <Segment basic textAlign="center" padded>
          <Container>
            <Header size="medium">
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