import React from 'react';
import { Header, Container, Card, Button, Segment } from 'semantic-ui-react';
import { Search, Filters, RentCard } from "../../components";

import './Home.scss';

export default () => {
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
            onChange={console.log}
          />
        </Container>
      </Segment>
      <Segment basic textAlign="center" padded>
        <Container>
          <Header as="h1" size="huge">
            Search results:
          </Header>
          <Card.Group centered>
            {[1,2,3,4,5,6].map(id => <RentCard key={id} id={id}/>)}
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