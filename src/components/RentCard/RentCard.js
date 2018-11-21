import React from 'react';
import { Card, Image, Icon, Segment, Header } from 'semantic-ui-react';

import { placeholderImg } from '../../services/constants';
import './RentCard.scss';

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
      photos,
      price
    } = data || {};
    return (
      <Card as="a" href={`/rent/${id}`} target="_blank" >
        <div
          style={{
            backgroundImage: `url(${(photos && photos[0]) || placeholderImg})`
          }}
          className="card-cover-photo"
        />
        {/* <Image src={(photos && photos[0]) || placeholderImg} fluid/> */}
        <Card.Content>
          <Card.Header>{title || "Untitled"}</Card.Header>
          <Card.Meta>{location && location.address}</Card.Meta>
          <Card.Description>{description && description.slice(0, 100)}...</Card.Description>
        </Card.Content>
        <Card.Content extra>
          {price}$
        </Card.Content>
      </Card>
    )
  }
}