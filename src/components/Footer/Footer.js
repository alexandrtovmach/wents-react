import React from 'react';
import { Header } from 'semantic-ui-react';

import './Footer.scss';

const ANIMATION_SPEED = 1;

export default class FooterComponent extends React.Component {
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
      <footer
        ref={el => this.headerEl = el}
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