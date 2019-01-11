import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

import { AdvertiseForm, RentAdvertise, Loader } from '../../components';
import { getPublicData } from '../../services/database';

export default class Advertise extends React.Component {
  constructor() {
    super();

    this.state = {
      post: null,
      loading: true,
      isOwner: false
    };
  }

  async componentDidMount() {
    const { match, user } = this.props;
    if (match && match.params && match.params.id) {
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
    const {
      toggleChat,
      user
    } = this.props;
    return (
      <Container
        text={isOwner || !post}
        className="header-compensator min-height-viewport"
      >
        {
          loading? (
            <Loader />
          ) : (
            <Segment
              basic
            >
              {
                isOwner || !post? (
                  <AdvertiseForm
                    data={post}
                    user={user}
                    onChange={() => window.location.href = "/posts/my"}
                  />
                ) : (
                  <RentAdvertise
                    data={post}
                    user={user}
                    toggleChat={toggleChat}
                  />
                )
              }
            </Segment>
          )
        }
      </Container>
    )
  }
}