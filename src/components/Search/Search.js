import React from 'react';
import { Input } from "semantic-ui-react";

export default () => {
  return (
    <Input
      fluid
      icon={{
        name: 'search',
        circular: true,
        link: true
      }}
      placeholder="Search..."
    />
  );
}
        