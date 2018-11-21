import React from 'react';
import { Button, Label, Menu, Image } from 'semantic-ui-react';

import { getUser } from '../../services/auth';
import './Header.scss';
import LogoSrc from "../../attachments/images/logo.png";

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
        <Image
          as="a"
          href="/"
          title="Home"
          size="small"
          src={LogoSrc}
        />
        <Menu
          text
          stackable
          className="header-navigation"
        >
          <Menu.Item
            link
            color="blue"
            href="/search-rent"
            content="Search house"
          />
          <Menu.Item
            link
            color="blue"
            href="/post-rent"
            content="Post house"
          />
          <Menu.Item
            link
            color="blue"
            href="/support"
            content="Support"
          />
          {
            user &&
            <Menu.Item
              link
              color="blue"
              href="/profile"
              content="Profile"
            />
          }
          {
            user &&
            <Menu.Item>
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
            </Menu.Item>
          }
        </Menu>
        {/* <nav
          className="header-navigation"
        >
          
        </nav> */}
      </header>
    )
  }
}