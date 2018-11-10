import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  HomeContainer,
  LoginContainer,
  SupportContainer,
  SearchRentContainer,
  PostRentContainer,
  ProfileContainer
} from "./containers";
import {
  Header,
  PageNotFound
} from './components';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route
            path="/"
            component={HomeContainer}
          />
          <Route
            path="/login"
            component={LoginContainer}
          />
          <Route
            path="/search-rent"
            component={SearchRentContainer}
          />
          <Route
            path="/post-rent"
            component={PostRentContainer}
          />
          <Route
            path="/profile"
            component={ProfileContainer}
          />
          <Route
            path="/login"
            component={LoginContainer}
          />
          <Route
            path="/support"
            component={SupportContainer}
          />
          {/* <Route component={PageNotFound} /> */}
        </Switch>
      </>
    );
  }
}

export default App;
