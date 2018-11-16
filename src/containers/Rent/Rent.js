import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

import { RentPost } from '../../components';
import { getData } from '../../services/database';

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
      getData("posts")
        .then(rentPost => {
          this.setState({
            post: {
              ...rentPost[match.params.id],
              id: match.params.id,
            }
          });
        })
    }
  }
  

  
  render() {
    const {
      post,
      // user
    } = this.state;
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
            onChange={console.log}
            // edit={user.id === post.ownerId}
          />
        </Segment>
      </Container>
    )
  }
}