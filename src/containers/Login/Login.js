import React from 'react';
import { Container } from 'semantic-ui-react';

import { Auth } from "../../components";

export default (props) => {
  return (
    <Container
      text
      className="header-compensator min-height-viewport"
    >
      <Auth
        langPack={props.langPack}
      />
    </Container>
  );
}