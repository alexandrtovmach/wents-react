import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';

export default ({ id }) => (
  <Card as="a" href={`/rent/${id}`} target="_blank" >
    <Image src={`https://source.unsplash.com/random/37${id}x37${id}`} />
    <Card.Content>
      <Card.Header>Hostel #{id}</Card.Header>
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
);