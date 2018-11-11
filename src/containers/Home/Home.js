import React from 'react';
import { Header, Container, Card, Image, Icon } from 'semantic-ui-react';
import { Search, Filters } from "../../components";

import './Home.scss';

export default () => {
  return (
    <main className="home-container">
      <section
        className="header-compensator viewport flex-center"
      >
        <Header as="h1" size="huge" inverted>
          RENTWENS
        </Header>

        <Container>
          <Search />
          <Filters />
        </Container>
      </section>
      <section
        className="header-compensator flex-center"
      >
        <Container>
          <Header as="h1" size="huge">
            Results
          </Header>
          <Card.Group centered>
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(a => (
              <Card>
                <Image src={`https://source.unsplash.com/random/37${a}x37${a}`} />
                <Card.Content>
                  <Card.Header>Hostel #{a}</Card.Header>
                  <Card.Meta>
                    <span className='date'>Lviv, Ukraine</span>
                  </Card.Meta>
                  <Card.Description>Beautiful and cheap hostel for students</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Icon name='like' />
                  {Math.random().toString().slice(-2)} Likes
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Container>
      </section>
    </main>
  );
}