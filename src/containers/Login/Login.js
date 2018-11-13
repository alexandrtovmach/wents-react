import React from 'react';
import { Container } from 'semantic-ui-react';

import { Auth } from "../../components";

export default () => {
  return (
    <Container
      text
      className="header-compensator min-height-viewport"
    >
      <Auth />
    </Container>
  );
}