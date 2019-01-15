import React from 'react';
import { Card, Icon, Segment, Header, Image, Label } from 'semantic-ui-react';

import { placeholderImg } from '../../services/constants';
import './AdvertiseCard.scss';

export default ({ data, add, langPack }) => {
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
              {langPack["add_post"]}
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
      apartmentsType,
      rentType,
      startDate,
      endDate,
      photos,
      price
    } = data || {};
    return (
      <Card
        as="a"
        href={`/rent/${id}`}
      >
        <Image
          style={{
            backgroundImage: `url(${(photos && photos[0]) || placeholderImg})`
          }}
          className="card-cover-photo"
        >
          <Label
            attached='bottom right'
            key={`price-${id}`}
            color='blue'
            content={`${price}$`}
          />
          <Label
            ribbon
            basic
            key={`info-${id}`}
            color='blue'
          >
            <Icon name="hotel"/>
            {apartmentsType}
            &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
            <Icon name="clock"/>
            {rentType}
          </Label>
        </Image>
        <Card.Content>
          <Card.Header>
            {title || "Untitled"}
          </Card.Header>
          <Card.Meta>{location && location.address}</Card.Meta>
          <Card.Description>{description && description.slice(0, 100)}...</Card.Description>
        </Card.Content>
        <Card.Content extra>
          {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
        </Card.Content>
      </Card>
    )
  }
}