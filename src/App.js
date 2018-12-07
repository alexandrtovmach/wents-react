import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { debounce } from './services/utils';
import { getUser } from './services/auth';

import {
  HomeContainer,
  LoginContainer,
  SupportContainer,
  SearchRentContainer,
  ProfileContainer,
  AdvertiseListContainer,
  AdvertiseContainer
} from "./containers";
import {
  Header,
  Sidebar,
  PageNotFound,
  Footer,
  Chat
} from './components';
import './App.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      showSidebar: false,
      user: null
    };
    this.toggleSidebar = debounce(this.toggleSidebar.bind(this), 100);
  }

  async componentDidMount() {
    this.setState({
      user: await getUser()
    })
  }

  toggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar
    })
  }

  render() {
    const { showSidebar, user } = this.state;
    return (
      <>
        <Header
          user={user}
          toggleSidebar={this.toggleSidebar}
        />
        <Sidebar
          user={user}
          toggleSidebar={this.toggleSidebar}
          showSidebar={showSidebar}
        >
          <Chat
            user={user}
          />
          <Switch>
            <Route
              path="/"
              exact
              component={HomeContainer}
            />
            <Route
              path="/login"
              exact
              component={LoginContainer}
            />
            <Route
              path="/search"
              exact
              component={SearchRentContainer}
            />
            <Route
              path="/posts/my"
              exact
              component={AdvertiseListContainer}
            />
            <Route
              path="/rent/:id"
              component={AdvertiseContainer}
            />
            <Route
              path="/rent"
              component={AdvertiseContainer}
            />
            <Route
              path="/profile"
              exact
              component={ProfileContainer}
            />
            <Route
              path="/login"
              exact
              component={LoginContainer}
            />
            <Route
              path="/support"
              exact
              component={SupportContainer}
            />
            <Route component={PageNotFound} />
          </Switch>
        </Sidebar>
        <Footer />
      </>
    );
  }
}

export default App;
