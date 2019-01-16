import React from 'react';
import { Input, Dropdown } from "semantic-ui-react";

import { advertiseTypes } from "../../services/constants";

export default props => {
  return (
    <Input
      fluid
      label={
        <Dropdown
          defaultValue={advertiseTypes[props.langPack["_locale"]][0].value}
          options={advertiseTypes[props.langPack["_locale"]]}
          onChange={(e, data) => props.onChangeType && props.onChangeType(data.value)}
        />
      }
      labelPosition='right'
      placeholder={props.langPack["search"]}
      onChange={(e, data) => props.onChange && props.onChange(data.value)}
    />
  );
}
        