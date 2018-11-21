import React from 'react';
import { Card, Icon, Segment, Header, Button, Image, Label } from 'semantic-ui-react';

import { benefits } from '../../services/constants';
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
      apartmentsType,
      rentType,
      startDate,
      endDate,
      benefits,
      photos,
      price
    } = data || {};
    return (
      <Card
        as="a"
        href={`/rent/${id}`}
        // target="_blank"
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
            // as='a'
            color='blue'
            content={`${price}$`}
          />
          <Label
            ribbon
            basic
            key={`info-${id}`}
            // as='a'
            color='blue'
          >
            <Icon name="hotel"/>
            {apartmentsType}
            &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
            <Icon name="clock"/>
            {rentType}
          </Label>
        </Image>
        {/* <Image src={(photos && photos[0]) || placeholderImg} fluid/> */}
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
        {/* <Label
          attached='bottom'
          key={`rentType-${id}`}
          as='a'
          inverted
          color="blue"
          content={`${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`}
          icon='clock'
        /> */}
      </Card>
    )
  }
}