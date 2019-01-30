import React from 'react';
import classNames from 'classnames';
import { Segment, Form, Header, Button, Modal, Dimmer, Icon, Image, ButtonGroup } from "semantic-ui-react";

import { Map, AddressInput, ImageInput, Loader } from '..';
import { dateToInputFormat } from '../../services/utils';
import { appartmentsTypes, rentTypes, benefits } from '../../services/constants';
import { uploadImage, deleteImage } from '../../services/storage';
import { pushData, updateData } from '../../services/database';


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
    const { user } = this.props;
    this.setState({
      ...this.props.data,
      ownerId: user.uid
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
    const { langPack } = this.props;
    const isHomeType = advType === "home";
    return (
      <Segment padded>
        {
          loading &&
          <Loader langPack={langPack} />
        }
        <Form widths="equal" >
          <Form.Group>
            <Header>
              {langPack["advertise_type"]}
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
                <Button.Content visible>{langPack["home"]}</Button.Content>
              </Button>
              <Button
                animated="vertical"
                onClick={() => this.fieldChange(null, "rent", "advType")}
                color={!isHomeType? "blue": null}
              >
                <Button.Content hidden>
                  <Icon name="share square" />
                </Button.Content>
                <Button.Content visible>{langPack["rent"]}</Button.Content>
              </Button>
            </Button.Group>
          </Form.Group>
          <Form.Group>
            <Header>
              {langPack["main"]}
            </Header>
          </Form.Group>
          <Form.Group>
            <Form.Input
              width={1}
              label={langPack["title"]}
              minLength="1"
              maxLength="50"
              placeholder={langPack["title_of_advertise"]}
              value={title}
              onChange={(event, data) => this.fieldChange(event, data.value, "title")}
            />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              width={1}
              autoHeight
              label={langPack["description"]}
              maxLength="500"
              placeholder={langPack["tell_more_details"]}
              value={description}
              onChange={(event, data) => this.fieldChange(event, data.value, "description")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field width={1}>
              <label>{langPack["address"]}</label>
              <AddressInput
                setLocation={(data) => this.fieldChange(null, data, "location")}
                value={location && location.address}
                center={location}
                placeholder={langPack["type_address_here"]}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Map
                setLocation={(data) => this.fieldChange(null, data, "location")}
                location={location}
                placeholder={langPack["type_address_to_see_a_map"]}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Select
              label={langPack["appartments_type"]}
              options={appartmentsTypes[langPack["_locale"] || "ru"].slice(-3)}
              value={apartmentsType}
              width={4}
              onChange={(event, data) => this.fieldChange(null, data.value, "apartmentsType")}
            />
            <Form.Select
              label={langPack["rent_type"]}
              options={rentTypes[langPack["_locale"] || "ru"].slice(-2)}
              value={rentType}
              width={4}
              onChange={(event, data) => this.fieldChange(null, data.value, "rentType")}
            />
          </Form.Group>
          <Form.Group>
            <Header>{langPack["date"]}</Header>
          </Form.Group>
          <Form.Group>
            <Form.Checkbox
              label={langPack["without_end_date"]}
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
              label={langPack["start_date"]}
              placeholder={langPack["from"]}
              type="date"
              value={dateToInputFormat(startDate)}
              max={dateToInputFormat(endDate)}
              onChange={(event, data) => this.fieldChange(event, new Date(data.value).valueOf(), "startDate")}
            />
            <Form.Input
              width={1}
              label={langPack["end_date"]}
              placeholder={langPack["to"]}
              type="date"
              disabled={unlimitedDate}
              value={dateToInputFormat(endDate)}
              min={dateToInputFormat(startDate)}
              onChange={(event, data) => this.fieldChange(event, new Date(data.value).valueOf(), "endDate")}
            />
          </Form.Group>
          <Form.Group>
            <Header>{langPack["budget"]}</Header>
          </Form.Group>
          <Form.Group>
            <Form.Input
              width={1}
              label={langPack["price"]}
              placeholder='100$'
              type="number"
              min={0}
              value={price}
              onChange={(event, data) => this.fieldChange(event, data.value, "price")}
            />
          </Form.Group>
          <Form.Group>
            <Header>{langPack["additional"]}</Header>
          </Form.Group>
          <Form.Group>
            <Form.Select
              label={langPack["benefits"]}
              options={benefits[langPack["_locale"] || "ru"]}
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
            <Header>{langPack["photos"]}</Header>
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
              content={langPack["save"]}
            />
          }
          header={langPack["are_you_sure"]}
          actions={[
            langPack["cancel"],
            <ButtonGroup
              key="yes-button"
            >
              <Button
                positive
                basic
                content={langPack["save"]}
                onClick={() => this.saveChanges()}
              />
              <Button
                positive
                content={langPack["save_n_publish"]}
                onClick={() => this.saveChanges(true)}
              />
            </ButtonGroup>
          ]}
        />
      </Segment>
    );
  }
}