import React from 'react';
import { Input, Dropdown } from "semantic-ui-react";

const options = [
  { key: 'home', text: 'Home', value: 'home' },
  { key: 'rent', text: 'Rent', value: 'rent' },
]

export default props => {
  return (
    <Input
      fluid
      label={<Dropdown
        defaultValue={options[0].value}
        options={options}
        onChange={(e, data) => props.onChange && props.onChangeType(data.value)}
      />}
      labelPosition='left'
      // icon={{
      //   name: 'search',
      //   circular: true,
      //   link: true
      // }}
      placeholder="Search..."
      onChange={(e, data) => props.onChange && props.onChange(data.value)}
    />
  );
}
        