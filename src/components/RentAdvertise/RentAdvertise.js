import React from 'react';
import { Segment, Header, Button, Modal, Image, Grid, List, Card, Icon, Label, Item } from "semantic-ui-react";

import { benefits } from '../../services/constants';


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
          {
            apartmentsType && rentType &&
              <Segment
                basic
                key={`info-${id}`}
                color='blue'
                textAlign="center"
              >

                <Item>
                  <Label color="grey" basic size="large">
                    {new Date(startDate).toLocaleDateString()}
                    &nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;
                    {unlimitedDate? "unlimited": new Date(endDate).toLocaleDateString()}
                  </Label>
                </Item>
                <Item className="margin-v-1">
                  <Label color="grey" basic size="large">
                    <Icon name="hotel"/>
                    {apartmentsType}
                    &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                    <Icon name="clock"/>
                    {rentType}
                  </Label>
                </Item>
                <Item>
                  {
                    benefitList &&
                    <Label color="grey" basic>
                      {benefitList.map(val => {
                        const { icon, text } = (benefits.find(b => b.value === val) || {});
                        return (
                          <>
                            &nbsp;
                            <Icon
                              fitted
                              key={val}
                              name={icon}
                              title={text}
                              size="large"
                              color="grey"
                            />
                            &nbsp;&nbsp;
                          </>
                        )
                      })}
                    </Label>
                  }
                </Item>
              </Segment>
          }

          <Modal
            header="Contact with owner?"
            content="In development"
            trigger={(
              <Button
                fluid
                primary
                animated="vertical"
              >
                <Button.Content hidden>
                  Contact with owner
                </Button.Content>
                <Button.Content visible>
                  {price}$
                </Button.Content>
              </Button>
            )}
            closeOnEscape={true}
            closeOnDimmerClick={true}
            onClose={this.toggleAvatarChange}
            size="small"
          />
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