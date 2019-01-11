import React from 'react';
import { Segment, Header, Button, Modal, Image, Grid, List, Card, Icon, Item } from "semantic-ui-react";

import { createConversation } from '../../services/chat';
import { benefits } from '../../services/constants';


export default class RentAdvertise extends React.Component {
  constructor() {
    super();

    this.state = {
      ownerId: "",
      title: "",
      description: "",
      price: 100,
      unlimitedDate: false,
      startDate: Date.now(),
      endDate: Date.now() + 1000*60*60*24,
      apartmentsType: "apartment",
      rentType: "short",
      benefitList: ["wifi", "furniture"],
      photosData: [],
      urlsToRemove: [],
      imageDimmerShow: -1
    }

    this.toggleChat = this.toggleChat.bind(this);
  }

  async componentDidMount() {
    this.setState({
      ...this.props.data
    })
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.data && this.props.data) {
      this.setState({
        ...this.props.data
      })
    }
  }

  toggleChat() {
    const { user, toggleChat } = this.props;
    const { ownerId, title } = this.state;
    if (user && user.uid && toggleChat) {
      createConversation(user.uid, ownerId, title)
        .then(toggleChat);
    } else {
      window.location.href = "/login";
    }
  }


  render() {
    const { user } = this.props;
    const {
      id,
      ownerId,
      advType,
      title,
      description,
      location,
      apartmentsType,
      rentType,
      unlimitedDate,
      startDate,
      endDate,
      price,
      benefitList,
      photos
    } = this.state;

    const isHome = advType && advType === "home";
    return (
      <Grid stackable divided>
        <Grid.Column
          width={isHome? 4: 16}
        >
          <Header>
            {title || "Untitled"}
            <Header.Subheader
              content={description || "Description is empty..."}
            />
          </Header>
          {
            location &&
            <Modal
              header="Location of this rent"
              content="In development"
              trigger={(
                <List.Item>
                  <Segment
                    as={Button}
                    fluid
                    basic
                  >
                    <Icon name="map marker alternate"/>
                    {(location && location.address) || "Look on map"}
                  </Segment>
                </List.Item>
              )}
              closeOnEscape={true}
              closeOnDimmerClick={true}
              onClose={this.toggleAvatarChange}
              size="small"
            />
          }
          <Segment
            basic
            textAlign="center"
            size="large"
          >
            {new Date(startDate).toLocaleDateString()}
            &nbsp;&nbsp;-&nbsp;&nbsp;
            {unlimitedDate? "unlimited": new Date(endDate).toLocaleDateString()}
          </Segment>
          {
            apartmentsType && rentType &&
              <Segment
                basic
                key={`info-${id}`}
                color='blue'
                textAlign="center"
              >
                <Item className="margin-v-1" color="grey" >
                  <Icon name="hotel" size="large"/>
                  {apartmentsType}
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <Icon name="clock" size="large"/>
                  {rentType}
                </Item>
                <Item>
                  {
                    benefitList &&
                    benefitList.map(val => {
                      const { icon, text } = (benefits.find(b => b.value === val) || {});
                      return (
                        <Icon
                          key={val}
                          name={icon}
                          title={text}
                          size="large"
                        />
                      )
                    })
                  }
                </Item>
              </Segment>
          }

          {
            (user && user.uid) !== ownerId &&
            <Button
              fluid
              primary
              animated="vertical"
              size="large"
              onClick={this.toggleChat}
            >
              <Button.Content hidden>
                Contact with owner
              </Button.Content>
              <Button.Content visible>
                {price}$
              </Button.Content>
            </Button>
          }
        </Grid.Column>
        {
          isHome &&
          <Grid.Column width={12}>
            {
              photos &&
              <Card.Group
                centered
                content={
                  photos.map(photoURL => (
                    <Modal
                      key={photoURL}
                      trigger={(
                        <Card
                          as="a"
                          key={photoURL}
                          image={photoURL}
                        />
                      )}
                      closeOnEscape={true}
                      closeOnDimmerClick={true}
                      onClose={this.toggleAvatarChange}
                      size="small"
                    >
                      <Modal.Content>
                        <Image
                          key={photoURL}
                          className="rent-photo-preview margin-1"
                          src={photoURL}
                        />
                      </Modal.Content>
                    </Modal>
                  ))
                }
              />
            }
          </Grid.Column>
        }
      </Grid>
    );
  }
}