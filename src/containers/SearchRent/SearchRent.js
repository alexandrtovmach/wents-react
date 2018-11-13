import React from 'react';
import { Container, Card, Segment } from 'semantic-ui-react';
import { Search, Filters, RentCard, SortPanel } from "../../components";

export default () => {
  return (
    <Container
      fluid
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
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map(a => <RentCard key={a} a={a}/>)}
        </Card.Group>
      </Segment>
    </Container>
  );
}