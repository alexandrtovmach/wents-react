import React from 'react';
import { Header } from 'semantic-ui-react';

import './Header.scss';

const ANIMATION_SPEED = 1;

export default class HeaderComponent extends React.Component {
  constructor() {
    super();

    this.moveBg = this.moveBg.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.moveBg)
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
          <Header as="a" color="blue" href="/profile">Profile</Header>
        </nav>
      </header>
    )
  }
}