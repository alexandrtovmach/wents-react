import React from 'react';
import {
  Container,
  Card,
  Segment,
  Tab
} from 'semantic-ui-react';

import { AdvertiseCard, Loader } from "../../components";
import { advertStatusList, advertTypeList } from '../../services/constants';
import { getUser } from '../../services/auth';
import { getData } from '../../services/database';

export default class AdvertiseList extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      loading: true
    };
    this.filterPostsByStatusAndType = this.filterPostsByStatusAndType.bind(this);
  }

  async componentDidMount() {
    const user = await getUser();
    if (user) {
      const posts = await getData("posts", "", user.uid);
      this.setState({
        user,
        posts,
        loading: false
      })
    } else {
      window.location.href = "/login";
    }
  }

  filterPostsByStatusAndType(posts, status, advType) {
    return (
      <Card.Group centered>
        {posts && Object.keys(posts).map(key => posts[key][status.key] === status.value && posts[key].advType === advType && <AdvertiseCard key={posts[key].id} data={posts[key]} />)}
        {
          status.value === "active" &&
          <AdvertiseCard
            key={0}
            add={true}
          />
        }
      </Card.Group>
    )
  };

  generateAdvertTabs(advType) {
    const { posts } = this.state;
    return advertStatusList.map(status => {
      return {
        menuItem: status.name,
        render: () => <Tab.Pane basic>{this.filterPostsByStatusAndType(posts, status, advType)}</Tab.Pane>
      };
    });
  }

  generateTypesTabs() {
    return advertTypeList.map(type => {
      return {
        menuItem: type.name,
        render: () => (
          <Tab.Pane>
            <Tab
              menu={{ secondary: true, pointing: true }}
              panes={this.generateAdvertTabs(type.value)}
            />
          </Tab.Pane>
        )
      };
    });
  }

  
  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <Loader />
      )
    } else {
      return (
        <Container
          className="header-compensator min-height-viewport"
        >
          <Segment basic textAlign="center" padded>
            <Tab
              panes={this.generateTypesTabs()}
            />
          </Segment>
          {/* <Segment basic textAlign="center" padded>
            <Card.Group stackable itemsPerRow={4}>
              {posts && Object.keys(posts).map(id => (
                <AdvertiseCard
                  key={id}
                  data={{
                    ...posts[id],
                    id
                  }}
                />
              ))}
              <AdvertiseCard
                key={0}
                add={true}
              />
            </Card.Group>
          </Segment> */}
        </Container>
      );
    }
  }
}