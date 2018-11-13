import * as React from 'react';
import { Container, Loader, Dimmer } from 'semantic-ui-react';

export default () => (
  <Container
    fluid
    className="header-compensator min-height-viewport"
  >
    <Dimmer active inverted>
      <Loader inverted content='Loading' />
    </Dimmer>
  </Container>
);
