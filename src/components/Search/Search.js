import React from 'react';
import { Input } from "semantic-ui-react";

export default props => {
  return (
    <Input
      fluid
      icon={{
        name: 'search',
        circular: true,
        link: true
      }}
      placeholder="Search..."
      onChange={(e, data) => props.onChange && props.onChange(data.value)}
    />
  );
}
        