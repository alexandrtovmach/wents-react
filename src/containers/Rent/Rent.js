import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

import { RentAdvertiseForm, RentAdvertise, Loader } from '../../components';
import { getPublicData } from '../../services/database';
import { getUser } from '../../services/auth';

export default class Rent extends React.Component {
  constructor() {
    super();

    this.state = {
      post: null,
      loading: true,
      isOwner: false
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    if (match && match.params && match.params.id) {
      const user = await getUser();
      const rentPost = await getPublicData("posts", match.params.id);
      this.setState({
        isOwner: user && user.uid === rentPost.ownerId,
        post: {
          ...rentPost,
          id: match.params.id,
        },
        loading: false
      });
    } else {
      this.setState({
        loading: false
      })
    }
  }
  

  
  render() {
    const {
      post,
      loading,
      isOwner
    } = this.state;
    console.log(isOwner);
    return (
      <Container
        text={isOwner}
        className="header-compensator min-height-viewport"
      >
        {
          loading &&
          <Loader />
        }
        <Segment
          basic
        >
          {
            isOwner? (
              <RentAdvertiseForm
                data={post}
                onChange={() => window.location.href = "/post-rent"}
              />
            ) : (
              <RentAdvertise
                data={post}
              />
            )
          }
        </Segment>
      </Container>
    )
  }
}