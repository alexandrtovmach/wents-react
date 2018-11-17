import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

import { RentPost, Loader } from '../../components';
import { getData } from '../../services/database';

export default class Rent extends React.Component {
  constructor() {
    super();

    this.state = {
      post: null,
      loading: true
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
            },
            loading: false
          });
        })
    } else {
      this.setState({
        loading: false
      })
    }
  }
  

  
  render() {
    const {
      post,
      loading
    } = this.state;
    return (
      <Container
        text
        className="header-compensator min-height-viewport"
      >
        {
          loading &&
          <Loader />
        }
        <Segment
          basic
        >
          <RentPost
            data={post}
            onChange={() => window.location.href = "/post-rent"}
          />
        </Segment>
      </Container>
    )
  }
}