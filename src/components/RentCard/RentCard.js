import React from 'react';
import { Card, Image, Icon, Segment, Header } from 'semantic-ui-react';

export default ({ id, add }) => {
  if (add) {
    return (
      <Card
        as="a"
        href={`/rent`}
        target="_blank"
      >
        <Card.Content as={Segment} placeholder>
          <Header icon>
            <Icon name='add' />
            Add post
          </Header>
        </Card.Content>
      </Card>
    )
  } else {
    return (
      <Card as="a" href={`/rent/${id}`} target="_blank" >
        <Image src={`https://source.unsplash.com/random/370x370`} />
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
    )
  }
}