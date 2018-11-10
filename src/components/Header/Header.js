import React from 'react';
import './Header.scss';

const ANIMATION_SPEED = 1;

export default class Header extends React.Component {

  componentDidMount() {
    window.addEventListener("scroll", this.moveBg.bind(this))
  }

  componentWillUnmount() {

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
          <a href="/search-rent">Search house</a>
          <a href="/post-rent">Post house</a>
          <a href="/support">Support</a>
          <a href="/profile">Profile</a>
        </nav>
      </header>
    )
  }
}