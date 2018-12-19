import React from 'react';
import { Button, Label, Menu, Image } from 'semantic-ui-react';

import LogoSrc from "../../attachments/images/logo.png";
import './Header.scss';

const ANIMATION_SPEED = 1;

export default class HeaderComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      showSidebar: true
    }

    this.moveBg = this.moveBg.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.moveBg);
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
    const { toggleSidebar, toggleChat,  user } = this.props;
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
          className="header-navigation"
        >
          <Menu.Item
            link
            color="blue"
            href="/search"
            content={"SEARCH"}
          />
          {
            user &&
            <Menu.Item
              link
              color="blue"
              href="/posts/my"
              content={"POSTS"}
            />
          }
          <Menu.Item
            link
            color="blue"
            href="/profile"
            content={user? "PROFILE": "LOGIN"}
          />
          <Menu.Item
            link
            color="blue"
            href="/support"
            content={"SUPPORT"}
          />
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
        {
          user &&
          <Button
            className="messages-button-mobile"
            as='div'
            labelPosition='right'
            size="tiny"
            onClick={toggleChat}
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
        <Button
          className="hamburger-navigation"
          floated="right"
          icon="content"
          basic
          onClick={toggleSidebar}
        />
      </header>
    )
  }
}