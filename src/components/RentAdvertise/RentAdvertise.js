import React from 'react';
import { Segment, Header, Button, Modal, Image, Grid, List, Card, Icon, Label } from "semantic-ui-react";

import { benefits } from '../../services/constants';
import './RentAdvertise.scss';
// import { Map, AddressInput, ImageInput, Loader } from '..';
// import { dateToInputFormat } from '../../services/utils';
// import { appartmentsTypes, rentTypes, benefits } from '../../services/constants';
// import { uploadImage, deleteImage } from '../../services/storage';
// import { pushData, updateData } from '../../services/database';


export default class RentAdvertise extends React.Component {
  constructor() {
    super();

    this.state = {
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



  render() {
    const {
      id,
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
    return (
      // <Container>
        <Grid stackable divided>
          <Grid.Column
            width={4}
          >
            <Header>
              {title || "Untitled"}
              <Header.Subheader
                content={description || "Description is empty..."}
              />
            </Header>

            <List>
              {
                apartmentsType && rentType &&
                <List.Item>
                  <Label
                    basic
                    key={`info-${id}`}
                    color='blue'
                  >
                    <Icon name="hotel"/>
                    {apartmentsType}
                    &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                    <Icon name="clock"/>
                    {rentType}
                  </Label>
                </List.Item>
              }
              {
                price &&
                <List.Item>
                  <Label as='a' color="red">
                    {price}$
                  </Label>
                </List.Item>
              }
              {
                startDate &&
                <List.Item>
                  <List.Content>Available from: {new Date(startDate).toLocaleDateString()}</List.Content>
                </List.Item>
              }
              {
                endDate &&
                <List.Item>
                  <List.Content>Available to: {unlimitedDate? "unlimited": new Date(endDate).toLocaleDateString()}</List.Content>
                </List.Item>
              }
              {
                benefitList &&
                <List.Item>
                  <List.Content>Benefits: {benefitList.map(val => {
                    const { icon, text } = (benefits.find(b => b.value === val) || {});
                    return (
                      <Icon
                        key={val}
                        name={icon}
                        title={text}
                      />
                    )
                  })}
                  </List.Content>
                </List.Item>
              }
              {
                location &&
                <Modal
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
                >
                  <Modal.Header>Location of this rent</Modal.Header>
                  <Modal.Content>
                    In development
                  </Modal.Content>
                </Modal>
              }
            </List>

            <Modal
              trigger={(
                <Button
                  primary
                  fluid
                >
                  Send message
                </Button>
              )}
              closeOnEscape={true}
              closeOnDimmerClick={true}
              onClose={this.toggleAvatarChange}
              size="small"
            >
              <Modal.Header>Contact with owner?</Modal.Header>
              <Modal.Content>
                In development
              </Modal.Content>
            </Modal>
          </Grid.Column>
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
        </Grid>
      // </Container>
    );
  }
}