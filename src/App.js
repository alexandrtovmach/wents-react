import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  HomeContainer,
  LoginContainer,
  SupportContainer,
  SearchRentContainer,
  PostRentContainer,
  ProfileContainer,
  RentContainer
} from "./containers";
import {
  Header,
  // PageNotFound,
  Footer
} from './components';
import './App.scss';

class App extends React.Component {
  state = {
    user: null
  };

  render() {
    return (
      <>
        <Header />
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
            path="/search-rent"
            exact
            component={SearchRentContainer}
          />
          <Route
            path="/post-rent"
            exact
            component={PostRentContainer}
          />
          <Route
            path="/rent/:id"
            component={RentContainer}
          />
          <Route
            path="/rent"
            component={RentContainer}
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
          {/* <Route component={PageNotFound} /> */}
        </Switch>
        <Footer />
      </>
    );
  }
}

export default App;
