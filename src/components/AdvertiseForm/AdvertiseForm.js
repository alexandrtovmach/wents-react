import React from 'react';
import classNames from 'classnames';
import { Segment, Form, Header, Button, Modal, Dimmer, Icon, Image, ButtonGroup } from "semantic-ui-react";

import { Map, AddressInput, ImageInput, Loader } from '..';
import { dateToInputFormat } from '../../services/utils';
import { appartmentsTypes, rentTypes, benefits } from '../../services/constants';
import { uploadImage, deleteImage } from '../../services/storage';
import { pushData, updateData } from '../../services/database';
import { getUser } from '../../services/auth';


export default class AdvertiseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      advType: "home",
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

    this.fieldChange = this.fieldChange.bind(this);
    this.photoRemoveByUrl = this.photoRemoveByUrl.bind(this);
    this.photoAdded = this.photoAdded.bind(this);
    this.photoRemoved = this.photoRemoved.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  async componentDidMount() {
    const owner = await getUser();
    console.log(owner)
    this.setState({
      ...this.props.data,
      ownerId: (await getUser()).uid
    })
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.data && this.props.data) {
      this.setState({
        ...this.props.data
      })
    }
  }

  handleImageDimmerShow(i) {
    this.setState({ imageDimmerShow: i });
  }

  handleImageDimmerHide(i) {
    this.setState({ imageDimmerShow: -1 });
  }

  fieldChange(event, value, name) {
    if (event === null || !event.target.validationMessage) {
      this.setState({
        [name]: value
      });
    }
  }

  photoAdded(file) {
    this.setState({
      photosData: [
        ...this.state.photosData,
        file
      ]
    });
  }

  photoRemoved(file) {
    console.log(file);
  }

  photoRemoveByUrl(urlToRemove) {
    this.setState({
      photos: this.state.photos.filter(url => url !== urlToRemove),
      urlsToRemove: [...this.state.urlsToRemove, urlToRemove]
    })
  }

  validForm() {
    return true;
  }

  async saveChanges(publish) {
    this.setState({
      loading: true
    })
    const rentData = this.state;
    const { onChange } = this.props;
    const photosData = rentData.photosData || [];
    const urlsToRemove = rentData.urlsToRemove || [];
    rentData.price = Number(rentData.price);
    delete rentData.photosData;
    delete rentData.urlsToRemove;
    delete rentData.imageDimmerShow;
    delete rentData.loading;
    rentData.publish = Boolean(publish);
    rentData.status = Boolean(publish)? "active": "pending";

    if (onChange && this.validForm()) {
      const { data } = this.props;
      const id = (data && data.id) || await pushData("posts", rentData);

      Promise.all([
        ...urlsToRemove.map(urlToRemove => deleteImage(urlToRemove)),
        ...photosData.map(photo => uploadImage("posts", id, photo.data, photo.extension)),
      ])
        .then(photoURLs => {
          const finalRentData = {
            ...rentData,
            photos: [...photoURLs, ...(rentData.photos || [])].filter(Boolean)
          };
          updateData("posts", id, finalRentData)
            .then(() => onChange(finalRentData))
        })
    }
  }

  render() {
    const {
      loading,
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
      photos,
      advType,
      imageDimmerShow
    } = this.state;
    const isHomeType = advType === "home";
    return (
      <Segment padded>
        {
          loading &&
          <Loader />
        }
        <Form widths="equal" >
          <Form.Group>
            <Header>
              Advertise type
            </Header>
          </Form.Group>
          <Form.Group>
            <Button.Group
              fluid
              size="tiny"
              label="Type"
            >
              <Button
                animated="vertical"
                onClick={() => this.fieldChange(null, "home", "advType")}
                color={isHomeType? "blue": null}
              >
                <Button.Content hidden>
                  <Icon name="home" />
                </Button.Content>
                <Button.Content visible>Home</Button.Content>
              </Button>
              <Button
                animated="vertical"
                onClick={() => this.fieldChange(null, "rent", "advType")}
                color={!isHomeType? "blue": null}
              >
                <Button.Content hidden>
                  <Icon name="share square" />
                </Button.Content>
                <Button.Content visible>Rent</Button.Content>
              </Button>
            </Button.Group>
          </Form.Group>
          <Form.Group>
            <Header>
              Main
            </Header>
          </Form.Group>
          <Form.Group>
            <Form.Input
              width={1}
              label="Title"
              minLength="1"
              maxLength="50"
              placeholder='Name for post...'
              value={title}
              onChange={(event, data) => this.fieldChange(event, data.value, "title")}
            />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              width={1}
              autoHeight
              label="Description"
              maxLength="500"
              placeholder='Tell more about your post...'
              value={description}
              onChange={(event, data) => this.fieldChange(event, data.value, "description")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field width={1}>
              <label>Address</label>
              <AddressInput
                setLocation={(data) => this.fieldChange(null, data, "location")}
                value={location && location.address}
                center={location}
                placeholder="Address"
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Map
                setLocation={(data) => this.fieldChange(null, data, "location")}
                location={location}
                placeholder="Type in an address to see a map"
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Select
              label="Apartments type"
              options={appartmentsTypes.slice(-3)}
              value={apartmentsType}
              width={4}
              onChange={(event, data) => this.fieldChange(null, data.value, "apartmentsType")}
            />
            <Form.Select
              label="Rent type"
              options={rentTypes.slice(-2)}
              value={rentType}
              width={4}
              onChange={(event, data) => this.fieldChange(null, data.value, "rentType")}
            />
          </Form.Group>
          <Form.Group>
            <Header>Date</Header>
          </Form.Group>
          <Form.Group>
            <Form.Checkbox
              label="Without end date"
              toggle
              checked={unlimitedDate}
              width={1}
              onChange={() => {
                this.fieldChange(null, !unlimitedDate, "unlimitedDate");
                this.fieldChange(null, new Date(startDate).valueOf() + 1000*60*60*24*365*Number(!unlimitedDate), "endDate");
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              width={1}
              label="Start date"
              placeholder='From'
              type="date"
              value={dateToInputFormat(startDate)}
              max={dateToInputFormat(endDate)}
              onChange={(event, data) => this.fieldChange(event, new Date(data.value).valueOf(), "startDate")}
            />
            <Form.Input
              width={1}
              label="End date"
              placeholder='To'
              type="date"
              disabled={unlimitedDate}
              value={dateToInputFormat(endDate)}
              min={dateToInputFormat(startDate)}
              onChange={(event, data) => this.fieldChange(event, new Date(data.value).valueOf(), "endDate")}
            />
          </Form.Group>
          <Form.Group>
            <Header>Budget</Header>
          </Form.Group>
          <Form.Group>
            <Form.Input
              width={1}
              label="Price"
              placeholder='100$'
              type="number"
              min={0}
              value={price}
              onChange={(event, data) => this.fieldChange(event, data.value, "price")}
            />
          </Form.Group>
          <Form.Group>
            <Header>Additional</Header>
          </Form.Group>
          <Form.Group>
            <Form.Select
              label="Benefits"
              options={benefits}
              multiple
              value={benefitList}
              width={8}
              onChange={(event, data) => this.fieldChange(null, data.value, "benefitList")}
            />
          </Form.Group>
          <Form.Group
            className={classNames({
              "hidden-element": !isHomeType
            })}
          >
            <Header>Photos</Header>
          </Form.Group>
          <Form.Group
            className={classNames({
              "hidden-element": !isHomeType
            })}
          >
            <Form.Field
              width={1}
            >
              {
                (photos && photos.length)? 
                  <Segment basic>
                    {
                      photos.map((url, i) => (
                        <Dimmer.Dimmable
                          key={url}
                          as={Image}
                          className="margin-1"
                          src={url}
                          size="tiny"
                          dimmer={{
                            active: imageDimmerShow === i,
                            content: <Icon name='trash' size="large"/>,
                            onClick: () => this.photoRemoveByUrl(url)
                          }}
                          onMouseEnter={() => this.handleImageDimmerShow(i)}
                          onMouseLeave={() => this.handleImageDimmerHide(i)}
                        />
                      ))
                    }
                  </Segment>
                : null
              }
              <ImageInput
                onAddedFile={this.photoAdded}
                onRemovedFile={this.photoRemoved}
              />
            </Form.Field>
          </Form.Group>
        </Form>
        

        <Modal
          size="tiny"
          trigger={
            <Button
              primary
              fluid
              content="Save"
            />
          }
          header='Are you sure?'
          actions={[
            'Cancel',
            <ButtonGroup
              key="yes-button"
            >
              <Button
                positive
                basic
                content="Save"
                onClick={() => this.saveChanges()}
              />
              <Button
                positive
                content="Save&Publish"
                onClick={() => this.saveChanges(true)}
              />
            </ButtonGroup>
          ]}
        />
      </Segment>
    );
  }
}