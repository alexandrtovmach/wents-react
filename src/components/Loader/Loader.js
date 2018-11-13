import * as React from 'react';
import { Container, Loader as SemanticLoader } from 'semantic-ui-react';

const Loader = () => (
  <Container
    fluid
    className="loader-wrap header-compensator min-height-viewport"
  >
    <SemanticLoader active inline="centered" />
  </Container>
);

export default Loader;
