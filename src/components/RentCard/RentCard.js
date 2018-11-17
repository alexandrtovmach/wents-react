import React from 'react';
import { Card, Image, Icon, Segment, Header } from 'semantic-ui-react';

import { placeholderImg } from '../../services/constants';

export default ({ data, add }) => {
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
    const {
      id,
      title,
      location,
      description,
      photos
    } = data || {};
    return (
      <Card as="a" href={`/rent/${id}`} target="_blank" >
        <Image src={(photos && photos[0]) || placeholderImg} />
        <Card.Content>
          <Card.Header>{title || "Untitled"}</Card.Header>
          <Card.Meta>{location && location.address}</Card.Meta>
          <Card.Description>{description && description.slice(0, 100)}...</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name='like' />
          {description && description.length} Likes
        </Card.Content>
      </Card>
    )
  }
}