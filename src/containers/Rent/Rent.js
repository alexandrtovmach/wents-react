import React from 'react';
import { Container, Card, Segment, Dimmer, Loader, Header } from 'semantic-ui-react';

import { RentPost } from '../../components';

export default class Rent extends React.Component {
  constructor() {
    super();

    this.state = {
      post: null,
      user: null
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match && match.params && match.params.id) {
      // request post
      this.setState({
        post: {}
      });
    }
  }
  

  
  render() {
    const { post, user } = this.state;
    return (
      <Container
        text
        className="header-compensator min-height-viewport"
      >
        <Segment
          basic
        >
          <RentPost
            data={post}
            // edit={user.id === post.ownerId}
          />
        </Segment>
      </Container>
    )
  }
}