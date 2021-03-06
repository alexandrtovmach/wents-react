import React from 'react';
import { Container } from 'semantic-ui-react';

import { Loader, UserForm } from "../../components";
import { getUser } from '../../services/auth';


export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loading: true
    };
  }
  
  async componentDidMount() {
    const user = await getUser();
    if (user) {
      this.setState({
        user: user,
        loading: false
      });
    } else {
      window.location.href = "/login";
    }
  }

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return <Loader />
    } else {
      return (
        <Container
          text
          className="header-compensator min-height-viewport"
        >
          <UserForm
            user={user}
          />
        </Container>
      )
    }
  }
};

