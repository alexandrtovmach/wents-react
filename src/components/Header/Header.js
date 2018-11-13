import React from 'react';
import { Header, Button, Label } from 'semantic-ui-react';

import { getUser } from '../../services/auth';
import './Header.scss';

const ANIMATION_SPEED = 1;

export default class HeaderComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    }

    this.moveBg = this.moveBg.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.moveBg);
    getUser().then(user => this.setState({user}))
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.moveBg)
  }

  moveBg() {
    if (this.headerEl) {
      requestAnimationFrame(() => {
        const curr = this.headerEl.style.backgroundPosition || `0% 0%`;
        this.headerEl.style.backgroundPosition = curr.replace(/(\d+)/, (str, p1) => Number(p1) + ANIMATION_SPEED);
      })
    }
  }

  render () {
    const { user } = this.state;
    return (
      <header
        ref={el => this.headerEl = el}
        className="header main-wrapper-padding"
      >
        <a
          href="/"
          className="header-logo"
          title="Home"
        > </a>
        <nav
          className="header-navigation"
        >
          <Header as="a" color="blue" href="/search-rent">Search house</Header>
          <Header as="a" color="blue" href="/post-rent">Post house</Header>
          <Header as="a" color="blue" href="/support">Support</Header>
          {
            user &&
            <Header as="a" color="blue" href="/profile">Profile</Header>
          }
          {
            user &&
            <Button
              as='div'
              labelPosition='right'
              size="tiny"
            >
              <Button 
                primary
                icon="mail"
                size="tiny"
              />
              <Label basic color="blue" pointing='left'>
                {user.newMessages || 0}
              </Label>
            </Button>
          }
        </nav>
      </header>
    )
  }
}