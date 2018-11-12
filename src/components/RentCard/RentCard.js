import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';

export default ({ a }) => (
  <Card as="a" href={`/rent/${a}`} target="_blank" >
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
);