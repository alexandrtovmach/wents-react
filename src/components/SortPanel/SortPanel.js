import React from 'react';
import { Segment, Icon, Button, Header } from "semantic-ui-react";

export default ({ langPack, onChange }) => {
  return (
    <Segment>
      <Header>
        {langPack["sort_by"]}:
      </Header>
      <Button.Group>
        <Button active={false}>
          {langPack["name"]}
        </Button>
        <Button icon onClick={() => onChange && onChange("title", 1)}>
          <Icon name='sort alphabet down' />
        </Button>
        <Button icon onClick={(e, data) => onChange && onChange("title", -1)}>
          <Icon name='sort alphabet up' />
        </Button>
      </Button.Group>
      {/* temporary fix for mobile devices */}
      <br />
      <br />
      <Button.Group>
        <Button active={false}>
          {langPack["price"]}
        </Button>
        <Button icon onClick={(e, data) => onChange && onChange("price", 1)}>
          <Icon name='arrow down' />
        </Button>
        <Button icon onClick={(e, data) => onChange && onChange("price", -1)}>
          <Icon name='arrow up' />
        </Button>
      </Button.Group>
    </Segment>
  );
}
        