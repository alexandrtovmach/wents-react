import React from 'react';
import { Header } from 'semantic-ui-react';

import './Footer.scss';
export default class FooterComponent extends React.Component {
  render () {
    return (
      <footer
        className="footer main-wrapper-padding"
      >
        <a
          href="/"
          className="footer-logo"
          title="Home"
        > </a>
        <nav
          className="footer-navigation"
        >
          <Header as="a" color="blue" href="/search-rent">Search house</Header>
          <Header as="a" color="blue" href="/post-rent">Post house</Header>
          <Header as="a" color="blue" href="/support">Support</Header>
          <Header as="a" color="blue" href="/profile">Profile</Header>
        </nav>
      </footer>
    )
  }
}