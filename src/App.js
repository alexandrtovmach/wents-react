import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { debounce } from './services/utils';
import { getUser } from './services/auth';
import {
  getLanguage,
  getTranslations,
  updateLangTag
} from "./services/lang";
import {
  HomeContainer,
  LoginContainer,
  // SupportContainer,
  SearchRentContainer,
  ProfileContainer,
  AdvertiseListContainer,
  AdvertiseContainer
} from "./containers";
import {
  Header,
  Sidebar,
  PageNotFound,
  Footer,
  Chat,
  Loader
} from './components';
import './App.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      locale: getLanguage(),
      showSidebar: false,
      showChat: false,
      chatData: null,
      user: null,
      isLoaded: false
    };
    this.toggleSidebar = debounce(this.toggleSidebar.bind(this), 100);
    this.toggleChat = debounce(this.toggleChat.bind(this), 100);
    this.onChatUpdated = this.onChatUpdated.bind(this);
  }

  componentDidMount() {
    getUser()
      .then(user => {
        this.setState({
          user: user,
          isLoaded: true
        })
      })
    updateLangTag(this.state.locale);
  }

  componentDidUpdate() {
    updateLangTag(this.state.locale);
  }

  onChatUpdated(newData) {
    const { user, chatData } = this.state;
    this.setState({
      chatData: {
        ...chatData,
        ...newData.full
      },
      unreadCount: newData.changes.filter(el => el.doc.data().receiver === user.uid).length
    })
  }

  toggleChat() {
    this.setState({
      showChat: !this.state.showChat,
      unreadCount: 0
    })
  }

  toggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar
    })
  }

  render() {
    const { showSidebar, showChat, user, chatData, unreadCount, locale, isLoaded } = this.state;
    const langPack = getTranslations(locale);
    if (isLoaded) {
      return (
        <>
          <Header
            user={user}
            unreadCount={unreadCount}
            toggleChat={this.toggleChat}
            toggleSidebar={this.toggleSidebar}
            langPack={langPack["Header"]}
          />
          <Sidebar
            user={user}
            toggleSidebar={this.toggleSidebar}
            showSidebar={showSidebar}
          >
            {
              user &&
              <Chat
                user={user}
                open={showChat}
                chatData={chatData}
                onUpdated={this.onChatUpdated}
                toggleChat={this.toggleChat}
                langPack={langPack["Chat"]}
              />
            }
            <Switch>
              <Route
                path="/"
                exact
                render={({match}) => (
                  <HomeContainer
                    match={match}
                    user={user}
                    langPack={langPack["HomeContainer"]}
                  />
                )}
              />
              <Route
                path="/login"
                exact
                render={({match}) => (
                  <LoginContainer
                    match={match}
                    langPack={langPack["LoginContainer"]}
                  />
                )}
              />
              <Route
                path="/search"
                exact
                render={({match}) => (
                  <SearchRentContainer
                    match={match}
                    langPack={langPack["SearchRentContainer"]}
                  />
                )}
              />
              <Route
                path="/posts/my"
                exact
                render={({match}) => (
                  <AdvertiseListContainer
                    match={match}
                    user={user}
                    langPack={langPack["AdvertiseListContainer"]}
                  />
                )}
              />
              <Route
                path="/rent/:id"
                render={({match}) => (
                  <AdvertiseContainer
                    match={match}
                    user={user}
                    toggleChat={this.toggleChat}
                    langPack={langPack["AdvertiseContainer"]}
                  />
                )}
              />
              <Route
                path="/rent"
                render={({match}) => (
                  <AdvertiseContainer
                    match={match}
                    user={user}
                    langPack={langPack["AdvertiseContainer"]}
                  />
                )}
              />
              <Route
                path="/profile"
                exact
                render={({match}) => (
                  <ProfileContainer
                    match={match}
                    user={user}
                    langPack={langPack["ProfileContainer"]}
                  />
                )}
              />
              <Route
                path="/login"
                exact
                render={({match}) => (
                  <LoginContainer
                    match={match}
                    langPack={langPack["LoginContainer"]}
                  />
                )}
              />
              <Route
                path="/support"
                exact
                // render={({match}) => (
                //   <SupportContainer
                //     match={match}
                //     langPack={langPack["SupportContainer"]}
                //   />
                // )}
                component={PageNotFound}
              />
              <Route component={PageNotFound} />
            </Switch>
          </Sidebar>
          <Footer />
        </>
      );
    } else {
      return <Loader langPack={langPack} />
    }
  }
}

export default App;
