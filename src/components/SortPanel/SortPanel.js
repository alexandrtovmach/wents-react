import React from 'react';
import { Segment, Icon, Button, Header } from "semantic-ui-react";

export default (props) => {
  return (
    <Segment>
      <Header>
        Sort by:
      </Header>
      <Button.Group>
        <Button active={false}>
          Name
        </Button>
        <Button icon onClick={() => props.onChange && props.onChange("title", 1)}>
          <Icon name='sort alphabet down' />
        </Button>
        <Button icon onClick={(e, data) => props.onChange && props.onChange("title", -1)}>
          <Icon name='sort alphabet up' />
        </Button>
      </Button.Group>
      {/* temporary fix for mobile devices */}
      <br />
      <br />
      <Button.Group>
        <Button active={false}>
          Price
        </Button>
        <Button icon onClick={(e, data) => props.onChange && props.onChange("price", 1)}>
          <Icon name='arrow down' />
        </Button>
        <Button icon onClick={(e, data) => props.onChange && props.onChange("price", -1)}>
          <Icon name='arrow up' />
        </Button>
      </Button.Group>
    </Segment>
  );
}
        