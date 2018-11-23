import React from 'react';
import { Button, Header, Menu, Sidebar, Segment } from 'semantic-ui-react';

export default class SidebarComponent extends React.Component {

  render () {
    const { children, showSidebar, user, toggleSidebar } = this.props;
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          className="header-compensator"
          as={Menu}
          animation='overlay'
          direction="right"
          onHide={toggleSidebar}
          vertical
          visible={showSidebar}
          width='thin'
        >
          <Menu.Item
            link
            color="blue"
            href="/search"
            content={<Header color="blue">Search</Header>}
          />
          {
            user &&
            <Menu.Item
              link
              color="blue"
              href="/posts/my"
              content={<Header color="blue">Posts</Header>}
            />
          }
          <Menu.Item
            link
            color="blue"
            href="/profile"
            content={<Header color="blue">{user? "Profile": "Login"}</Header>}
          />
          <Menu.Item
            link
            color="blue"
            href="/support"
            content={<Header color="blue">Support</Header>}
          />
        </Sidebar>

        <Sidebar.Pusher dimmed={showSidebar}>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}